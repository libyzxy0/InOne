import { getUserFromToken } from "@/utils";
import db from '@/db/drizzle';
import { messages } from '@/db/schema';
import type { User } from '@/types';

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log('User connected:', socket.id);

    socket.on("join-thread", (threadID) => {
      if (!threadID) return;
      socket.join(threadID);
      console.log(`User ${socket.id} joined thread: ${threadID}`);
    });
    
    socket.on("leave-thread", (threadID) => {
      if (!threadID) return;
      socket.leave(threadID);
      console.log(`User ${socket.id} left thread: ${threadID}`);
    });

    socket.on("send-message", async (data) => {
      try {
        const user = await getUserFromToken(data.user_token)
        
        const [insertedMessage] = await db.insert(messages).values({
          attachmentUrl: data.data.attachment_url, 
          message: data.data.text, 
          thread_id: data.threadID, 
          user_id: user.id
        }).returning({ created_at: messages.created_at, id: messages.id })
        
        io.to(data.threadID).emit("new-message", {
          id: insertedMessage.id, 
          message: data.data.text,
          attachmentUrl: data.data.attachment_url,
          reactions: [{
            reaction: "😂", 
            userID: "123",
            fullName: "Jan Liby Dela Costa"
          }], 
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
        
        console.log(`Message sent to room ${data.threadID}`);

      } catch (error) {
        console.error("Error handling sendMessage event:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
