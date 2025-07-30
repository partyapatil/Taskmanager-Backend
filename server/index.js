import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";
// import { reset, testcreate } from "./controllers/userController.js";
import User from "./models/user.js";
import bcrypt from "bcryptjs"; // or 'bcrypt' depending on your project setup

dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();
// app.use(
//     cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:3001",
//       "http://127.0.0.1:5173",
//       "http://localhost:5173",
//       "http://localhost:5174",

//     ],
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "http://localhost:5173", // ❗must be exact
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true, // Must be false when origin is '*'
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api", routes);

// app.get("/test",testcreate)
app.use(errorHandler);


const reset = async (req, res) => {
try {
    const email = "testusserff@example.com";
    const newPassword = "111111111";

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
console.log(hashed)
    res.json({ message: "✅ Password reset successfully for " + email });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Internal server error",data: error.message });
  }
}

app.get("/reset",reset)

app.use(routeNotFound);
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// mv index.js hello-test.js
