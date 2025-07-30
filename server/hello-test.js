import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";
import { testcreate } from "./controllers/userController.js";

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
    origin: "*", // Allows requests from any origin
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: false, // Must be false when origin is '*'
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api", routes);

app.get("/test", (req, res) => {
  res.send("✅ Server is working!");
});app.use(routeNotFound);
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));