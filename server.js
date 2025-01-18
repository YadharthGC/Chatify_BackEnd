import express from "express";
import authRoutes from "./src/routes/authRoute.js";
import messageRoute from "./src/routes/messageRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { handleConnectDb } from "./db.js";
import cors from "cors";
import { app, server, io } from "./src/lib/socket.js";

dotenv.config();
// const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/chat/auth", authRoutes);
app.use("/chat/messages", messageRoute);

server.listen(port, () => {
  console.log("running in port", port);
  handleConnectDb();
});
