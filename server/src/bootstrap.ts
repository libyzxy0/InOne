import "dotenv/config";
import {
  Application
} from "express";
import {
  createServer
} from "http";
import {
  Server
} from "socket.io";
import {
  socketHandler
} from "@/handlers/web-socket.handler";

/**
* Initializes the application
* @param app - The express "Application"
*/
const Bootstrap = async (app: Application) => {
  const PORT: number = parseInt(process.env.PORT, 10) || 3000;

  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "https://inoneforall.vercel.app"],
      methods: ["GET", "POST"],
    },
  });


  await socketHandler(io);

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

export default Bootstrap;