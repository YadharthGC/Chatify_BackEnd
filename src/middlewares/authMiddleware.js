import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({
        msg: "Unauthorized",
      });
    } else {
      const decoded = jwt.verify(token, process.env.JWT);
      if (!decoded) {
        return res.status(400).json({
          msg: "Invalid token",
        });
      }
      const user = await User.findById(decoded.userId).select("-password");
      req.user = user;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
