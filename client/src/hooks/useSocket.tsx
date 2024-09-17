import { useState, useEffect, useCallback } from "react";
import { socket } from "@/lib/socket-io";
import { useAuth } from "@/hooks/useAuth";
import { API_BASE } from "@/constants";
import axios from "axios";
import Cookies from "js-cookie";
import type { Message } from "@/types";

type SendMessageType = {
  text: string | null;
  attachment_url: string | null;
};

type SocketReactionType = {
  messageID: string;
  reaction: string;
  fullName: string;
  userID: string;
};

export const useReaction = (threadID: string) => {
  const { user } = useAuth();
  const makeReact = useCallback(
    async (reaction: string, messageID: string, token: string) => {
      if (!user || !reaction || !messageID) return;
      socket.emit("make-reaction", {
        reaction,
        messageID,
        threadID,
        user_token: token,
      });
    },
    [user],
  );
  return { makeReact };
};

export const useSocket = (threadID: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(true);
  const [signalToScroll, setSignalScroll] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!threadID) return;
    Cookies.set("thread", threadID, { expires: 30 });
    socket.emit("join-thread", {
      threadID,
      userToken: Cookies.get("authtoken"),
    });

    fetchMessages();

    socket.on("new-message", handleNewMessage);
    socket.on("new-reaction", handleNewReaction);

    return () => {
      socket.emit("leave-thread", {
        threadID,
        userToken: Cookies.get("authtoken"),
      });
      socket.off("new-message");
      socket.off("new-reaction");
    };
  }, [threadID]);

  const fetchMessages = async () => {
    try {
      setPending(true);
      const response = await axios.get(`${API_BASE}/get-thread/${threadID}`);
      const msgsArray: Message[] = response.data[0]?.messages || [];
      setMessages(msgsArray);
      setSignalScroll(Math.random().toString(36).substring(2, 5));
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const handleNewMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    setSignalScroll(Math.random().toString(36).substring(2, 5));
  };

  const handleNewReaction = async (reaction: SocketReactionType) => {
    console.log("A user reacted!");
    const newReaction = {
      reaction: reaction.reaction,
      fullName: reaction.fullName,
      userID: reaction.userID,
    };

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === reaction.messageID
          ? {
              ...msg,
              reactions: msg.reactions
                ? [...msg.reactions, newReaction]
                : [newReaction],
            }
          : msg,
      ),
    );
  };

  const sendMessage = useCallback(
    (data: SendMessageType, token: string) => {
      if (!user || !data) return;
      socket.emit("send-message", {
        data,
        threadID,
        user_token: token,
      });
    },
    [user, threadID],
  );

  return {
    sendMessage,
    messages,
    pending,
    signalToScroll,
  };
};
