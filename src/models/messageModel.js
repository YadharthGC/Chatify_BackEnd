import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: String },
  receiverId: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
