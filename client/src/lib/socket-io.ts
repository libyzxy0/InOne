import { io } from "socket.io-client";
import { WEB_SOCKET_URL } from "@/constants";

export const socket = io(WEB_SOCKET_URL);

socket.on("connect_error", (error) => {
  console.log("[SocketConnectError]:", error.message);
});
