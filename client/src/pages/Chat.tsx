import React, {
  useEffect,
  useRef,
  useState
} from "react";
import {
  Header
} from "@/components/Header";
import {
  MessagesLayout
} from "@/layouts/MessagesLayout";
import {
  MessageSelf,
  Message
} from "@/components/MessageBubble";
import {
  useSocket
} from "@/hooks/useSocket";
import {
  MessageBox
} from "@/components/MessageBox";
import {
  useAuth
} from '@/hooks/useAuth'

function formatTime(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 1) {
    // Format time as HH:MM
    const hours = past.getUTCHours().toString().padStart(2, '0');
    const minutes = past.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else {
    return `${diffInDays} day${diffInDays > 1 ? 's': ''} ago`;
  }
}

export default function Chat() {
  const [threadID,
    setThreadID] = useState("");
  const {
    user
  } = useAuth()
  const {
    messages
  } = useSocket(threadID);
  const messagesEndRef = useRef < HTMLDivElement > (null);

  useEffect(() => {
    if (messagesEndRef.current) {
      /* Add delay because there's a delay in socket response. UI doesn't update instantly */
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  },
    [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header thread={threadID} onChangeThread={(v) => setThreadID(v)} />
      <MessagesLayout>
        {messages &&
        messages.map((data, index) => (
          data.user_id === user.id ? (
            <MessageSelf
              key={index}
              time={data.created_at && formatTime(data.created_at)}
              reactions={data.reactions}
              >
              {data.message}
            </MessageSelf>
          ): (
            <Message
              key={index}
              time={data.created_at && formatTime(data.created_at)}
              reactions={data.reactions}
              name={data.user && `${data.user.firstName} ${data.user.lastName}`}
              >
              {data.message}
            </Message>
          )
        ))
        }

        <div ref={messagesEndRef} className="h-16" />
      </MessagesLayout>
      <MessageBox threadID={threadID} />
    </div>
  );
}