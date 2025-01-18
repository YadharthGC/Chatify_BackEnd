import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const handleGetUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.body.id } }).select(
      "-password"
    );
    if (allUsers.length) {
      return res.status(200).json({
        allUsers: allUsers,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleGetMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    // const senderId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    res.status(200).json({
      messages: messages,
    });
  } catch (err) {
    console.log(err);
  }
};

export const handleSendMessages = async (req, res) => {
  try {
    const { message, senderId, receiverId } = req.body;
    // const senderId = req.user._id;

    let newMessage = await new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });
    await newMessage.save();

    //todo:realTime functionality --->socket io
    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log(receiverSocketId, "RECEIVERsOCKETID");
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    if (newMessage) {
      res.status(200).json({
        msg: "msg sent succesffully",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
