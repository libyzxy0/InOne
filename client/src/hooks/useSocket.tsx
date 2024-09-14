import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@/hooks/useAuth";
import { API_BASE } from '@/constants'
import axios from 'axios'

const socket = io("ws://localhost:3000");

export const useSocket = (threadID) => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth(); 

  useEffect(() => {
    if (!threadID) return;
    
    socket.emit("join-thread", threadID);
    fetchMessages();
    
    socket.on("new-message", handleNewMessage);

    return () => {
      socket.emit("leave-thread", threadID);
      socket.off("new-message");
    };
  }, [threadID]);
  
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_BASE}/get-thread/${threadID}`);
      const msgsArray = response.data[0]['messages'];
      console.log("Retrieve messages:", msgsArray)
      setMessages(msgsArray);
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleNewMessage = (message) => {
    console.log('Message:', message)
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  const sendMessage = (data, token) => {
    if (!user || !data) return;
    socket.emit("send-message", {
      data,
      threadID,
      user_token: token,
    });
  };

  return { sendMessage, messages };
};
