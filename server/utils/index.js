import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
await mongoose.connect(process.env.uri);

    //console.log("DB connection established"+process.env.uri);
  } catch (error) {
    //console.log("DB Error: " + error);
  }

};

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Change sameSite from strict to none when you deploy your app
  res.cookie("token", token, {
    httpOnly: true,
    secure:false,
    // secure: process.env.NODE_ENV !== "development",
    sameSite: "lax", 
    maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
  });
};