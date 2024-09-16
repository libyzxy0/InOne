import {
  getUserFromToken
} from "@/utils";
import db from '@/db/drizzle';
import {
  eq
} from 'drizzle-orm'
import {
  messages,
  threads,
  users
} from '@/db/schema';
import type {
  User
} from '@/types';

const handleStatusUpdate = async (token: string, status: string) => {
  const user: User = await getUserFromToken(token);
  if (user) {
    await db.update(users).set({
      status: status
    }).where(eq(users.id, user.id))
  }
}

export const socketHandler = (io) => {
  io.on("connection", (socket) => {

    socket.on("join-thread", async (data) => {
      if (!data.threadID) return;
      socket.join(data.threadID);
      await handleStatusUpdate(data.userToken, 'online')
    });

    socket.on("leave-thread",
      async (data) => {
        if (!data.threadID) return;
        socket.leave(data.threadID);
        await handleStatusUpdate(data.userToken, 'offline')
      });

    socket.on("send-message",
      async (data) => {
        try {
          const user: User | null = await getUserFromToken(data.user_token)

          const [insertedMessage] = await db.insert(messages).values({
            attachmentUrl: data.data.attachment_url,
            message: data.data.text,
            thread_id: data.threadID,
            user_id: user.id
          }).returning({
            created_at: messages.created_at, id: messages.id
          })

          io.to(data.threadID).emit("new-message", {
            id: insertedMessage.id,
            message: data.data.text,
            attachmentUrl: data.data.attachment_url,
            reactions: null,
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              avatar_url: user.avatar_url,
              status: user.status,
              id: user.id
            },
            created_at: insertedMessage.created_at,
            user_id: user.id
          });

        } catch (error) {
          console.error("Error handling sendMessage event:", error);
        }
      });


    socket.on('make-reaction',
      async (data) => {
        const user: User | null = await getUserFromToken(data.user_token);
        const [msgs] = await db.select().from(messages).where(eq(messages.id, data.messageID));

        if (user) {
          const existingReactions = msgs.reactions || [];
          const userReactionIndex = existingReactions.findIndex(
            (reaction) => reaction.userID === user.id
          );

          if (userReactionIndex !== -1) {
            if (existingReactions[userReactionIndex].reaction !== data.reaction) {
              existingReactions[userReactionIndex] = {
                ...existingReactions[userReactionIndex],
                reaction: data.reaction,
              };

              io.to(data.threadID).emit('new-reaction', {
                messageID: data.messageID,
                fullName: `${user.firstName} ${user.lastName}`,
                userID: user.id,
                reaction: data.reaction,
              });

              await db.update(messages).set({
                reactions: existingReactions,
              }).where(eq(messages.id, data.messageID));
            }
          } else {
            existingReactions.push({
              userID: user.id,
              fullName: `${user.firstName} ${user.lastName}`,
              reaction: data.reaction,
            });

            console.log('Emit new reaction');
            io.to(data.threadID).emit('new-reaction', {
              messageID: data.messageID,
              fullName: `${user.firstName} ${user.lastName}`,
              userID: user.id,
              reaction: data.reaction,
            });

            await db.update(messages).set({
              reactions: existingReactions,
            }).where(eq(messages.id, data.messageID));
          }
        }
      });

  });
};