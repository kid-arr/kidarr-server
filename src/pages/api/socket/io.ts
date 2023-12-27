import { type Server as NetServer } from "http";
import { type NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { type NextApiResponseServerIo } from "@/lib/models/types/next-api-response-socket";

export const config = {
  api: {
    bodyParser: false,
  },
};
const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });
    io.on("connection", (socket) => {
      socket.emit("hello", "world");
      socket.on("message", (message) => console.log(message));
    });
    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};
export default ioHandler;
