import { io } from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io("ws://localhost:3000");

export const useSocket = () => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    socket.on("event", (data) => {
      console.log("Socket:", data);
      setMessages([...messages, data.msg.message])
    })
  }, [messages])
  
  const sendMessage = async (message, threadID) => {
    socket.emit("message", { message: message, threadID: threadID });
  }
  
  return { sendMessage, messages }
}