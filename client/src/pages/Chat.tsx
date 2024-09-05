import { Header } from "@/components/Header";
import { MessagesLayout } from "@/layouts/MessagesLayout";
import { MessageSelf, Message } from "@/components/MessageBubble";
import { useEffect, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { MessageBox } from "@/components/MessageBox";

export default function Chat() {
  const { messages } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
    <div className="flex flex-col">
      <Header />
      <MessagesLayout>
        <Message name="Jan Liby Dela Costa" time="1:00 PM" avatarUrl="https://http.cat/404">Kupal HAHAHAHAHAHAH</Message>
        
        {messages && messages.map((data, index) => (
          <MessageSelf
            key={index}
            time="2:30 PM"
            reactions={[
              {
                reaction: "😂",
                userID: "123456789",
                fullName: "Jan Liby Dela Costa",
              },
              {
                reaction: "😂",
                userID: "123456782",
                fullName: "Rens Belga Acuña",
              },
            ]}
          >
            {data}
          </MessageSelf>
        ))}
      </MessagesLayout>
      <MessageBox />
    </div>
    <div ref={messagesEndRef}></div>
    </>
  );
}
