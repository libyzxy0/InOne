import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { MessagesLayout } from "@/layouts/MessagesLayout";
import { ThreadMessageEmpty } from "@/components/ThreadMessageEmpty";
import { ThreadMessageLoading } from "@/components/ThreadMessageLoading";
import {
  MessageSelf,
  MessageSelfAttachment,
  MessageAttachment,
  Message,
} from "@/components/MessageBubble";
import { useSocket } from "@/hooks/useSocket";
import { MessageBox } from "@/components/MessageBox";
import { useAuth } from "@/hooks/useAuth";
import { formatTime } from "@/utils/format-time";
import type { Message as MessageType } from "@/types";
import type { User } from "@/types";

function MessageSelfWrapper({ data }: { data: MessageType }) {
  if (data.message && !data.attachmentUrl) {
    return (
      <MessageSelf
        messageID={data.id}
        threadID={data.thread_id}
        time={data.created_at && formatTime(data.created_at)}
        reactions={data.reactions}
      >
        {data.message}
      </MessageSelf>
    );
  } else if (!data.message && data.attachmentUrl) {
    return (
      <MessageSelfAttachment
        fileUrl={data.attachmentUrl}
        time={data.created_at && formatTime(data.created_at)}
        messageID={data.id}
        threadID={data.thread_id}
        reactions={data.reactions}
      />
    );
  } else if (data.message && data.attachmentUrl) {
    return (
      <>
        <MessageSelf
          messageID={data.id}
          threadID={data.thread_id}
          time={data.created_at && formatTime(data.created_at)}
          reactions={data.reactions}
        >
          {data.message}
        </MessageSelf>
        <MessageSelfAttachment
          fileUrl={data.attachmentUrl}
          time={data.created_at && formatTime(data.created_at)}
          messageID={data.id}
          threadID={data.thread_id}
          reactions={data.reactions}
        />
      </>
    );
  } else {
    return null;
  }
}

function MessageWrapper({ data }: { data: MessageType }) {
  if (data.message && !data.attachmentUrl) {
    return (
      <Message
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
    );
  } else if (!data.message && data.attachmentUrl) {
    return (
      <MessageAttachment
        fileUrl={data.attachmentUrl}
        time={data.created_at && formatTime(data.created_at)}
        messageID={data.id}
        threadID={data.thread_id}
        reactions={data.reactions}
        firstName={data.user ? data.user.firstName : null}
        lastName={data.user ? data.user.lastName : null}
        avatarUrl={data.user ? data.user.avatar_url : null}
      />
    );
  } else if (data.message && data.attachmentUrl) {
    return (
      <>
        <Message
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
        <MessageAttachment
          fileUrl={data.attachmentUrl}
          time={data.created_at && formatTime(data.created_at)}
          messageID={data.id}
          threadID={data.thread_id}
          reactions={data.reactions}
          firstName={data.user ? data.user.firstName : null}
          lastName={data.user ? data.user.lastName : null}
          avatarUrl={data.user ? data.user.avatar_url : null}
        />
      </>
    );
  } else {
    return null;
  }
}

export default function Chat() {
  const [threadID, setThreadID] = useState("");
  const {
    user,
  }: {
    user: User | null;
  } = useAuth();
  const { messages, signalToScroll, pending } = useSocket(threadID);

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
    <div
      className={`flex flex-col ${messages.length > 0 && "h-screen"} bg-white`}
    >
      <Header thread={threadID} onChangeThread={setThreadID} />

      {pending ? (
        <ThreadMessageLoading />
      ) : messages?.length > 0 ? (
        <MessagesLayout>
          {messages.map((data: MessageType, index: number) =>
            data.user_id === user?.id ? (
              <MessageSelfWrapper key={index} data={data} />
            ) : (
              <MessageWrapper key={index} data={data} />
            ),
          )}
          <div ref={messagesEndRef} className="h-16" />
        </MessagesLayout>
      ) : (
        <ThreadMessageEmpty />
      )}

      <MessageBox threadID={threadID} />
    </div>
  );
}
