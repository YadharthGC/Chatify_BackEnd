import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import { Socket } from "dgram";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}
io.on("connection", (socket) => {
  try {
    console.log("user connected", socket.id);
    const userid = socket.handshake.query.userid;
    if (userid) userSocketMap[userid] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", (socket) => {
      console.log("user disconnected", socket.id);
      delete userSocketMap[userid];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  } catch (err) {
    console.log(err);
  }
});

export { io, app, server };
