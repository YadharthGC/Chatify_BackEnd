import { generateToken } from "../lib/utilis.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const handleSignup = async (req, res) => {
  try {
    console.log(req.body);
    let { email, name, password } = req.body;
    let alreadyUser = await User.findOne({ email });
    if (!alreadyUser) {
      //password change
      let salt = await bcrypt.genSaltSync(10);
      let hash = await bcrypt.hash(password, salt);
      //
      let newUser = new User({
        email: email,
        fullName: name,
        password: hash,
      });

      if (newUser) {
        //generate jwt
        // generateToken(newUser._id, res);
        await newUser.save();

        res.status(200).json({
          msg: "registered sucesfully",
          id: newUser._id,
          email: newUser.email,
          name: newUser.fullName,
        });
      } else {
        res.status(400).json({
          msg: "Something wrong",
        });
      }
    } else {
      res.status(400).json({
        msg: "Email Already exists",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Something wrong",
      err: err,
    });
  }
};

export const handleLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.send(400).json({
          msg: "Invalid Crediantials",
        });
      } else {
        // generateToken(user._id, res);
        res.status(200).json({
          msg: "login sucesfully",
          id: user._id,
          email: user.email,
          name: user.name,
        });
      }
    } else {
      res.send(400).json({
        msg: "Invalid Crediantials",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleMainUser = async (req, res) => {
  try {
    let mainUserId = req.params.id;
    let alreadyUser = await User.findOne({ _id: mainUserId });
    console.log(alreadyUser);
    if (alreadyUser) {
      res.status(200).json({
        msg: "userExists",
        id: alreadyUser._id,
        email: alreadyUser.email,
        name: alreadyUser.fullName,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleLogout = async (req, res) => {
  try {
    console.log(req, res);
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      msg: "logout successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const handleUpdateProfile = async (req, res) => {
  try {
    console.log(req.body);
    const { email, name, id } = req.body;
    let user = await User.findOne({ _id: id });
    if (user) {
      user.email = email;
      user.fullName = name;

      res.status(200).json({
        msg: "profile updated successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleCheckAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log(err);
  }
};
