import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { MessagesLayout } from "@/layouts/MessagesLayout";
import { MessageSelf, Message } from "@/components/MessageBubble";
import { useSocket } from "@/hooks/useSocket";
import { MessageBox } from "@/components/MessageBox";
import { useAuth } from "@/hooks/useAuth";
import { formatTime } from "@/utils/format-time";
import type { Message as MessageType } from "@/types";
import type { User } from "@/types";

export default function Chat() {
  const [threadID, setThreadID] = useState("");
  const {
    user,
  }: {
    user: User | null;
  } = useAuth();
  const { messages, signalToScroll } = useSocket(threadID);
  
  useEffect(() => {
    console.log('[Main] New message!')
  }, [messages])
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current!.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [signalToScroll]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header thread={threadID} onChangeThread={setThreadID} />
      <MessagesLayout>
        {messages &&
          messages.map((data: MessageType, index: number) =>
            data.user_id === user?.id ? (
              <MessageSelf
                messageID={data.id}
                threadID={data.thread_id}
                key={index}
                time={data.created_at && formatTime(data.created_at)}
                reactions={data.reactions}
              >
                {data.message}
              </MessageSelf>
            ) : (
              <Message
                key={index}
                messageID={data.id}
                threadID={data.thread_id}
                time={data.created_at && formatTime(data.created_at)}
                reactions={data.reactions}
                firstName={data.user ? data.user.firstName : null}
                lastName={data.user ? data.user.lastName : null}
                avatarUrl={data.user ? data.user.avatar_url : null}
              >
                {data.message}
              </Message>
            ),
          )}

        <div ref={messagesEndRef} className="h-16" />
      </MessagesLayout>
      <MessageBox threadID={threadID} />
    </div>
  );
}
