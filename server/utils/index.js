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
    // secure: process.env.NODE_ENV !== "development", // true only in prod
    // sameSite: process.env.NODE_ENV === "development" ? "lax" : "None", // 'None' in prod
       
    
        secure: true,           // ✅ Required for HTTPS

    sameSite: "None",       // ✅ Required for cross-origin cookies

    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};