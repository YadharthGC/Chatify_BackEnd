import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    let token = jwt.sign({ userId }, process.env.JWT, {
      expiresIn: "1d",
    });

    console.log(token);

    res.cookie("jwt", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV !== "development",
    });

    return token;
  } catch (err) {
    console.log(err);
  }
};
