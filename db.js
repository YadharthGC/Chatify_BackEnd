import mongoose from "mongoose";

export const handleConnectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/example");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("err");
  }
};
