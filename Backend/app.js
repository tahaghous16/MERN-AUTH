import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import connectDB from "./utils/connectDB.js";

const PORT = process.env.PORT || 3000;

const app = express();

const allowedOrigins = [process.env.ALLOWED_ORIGIN];
// const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

//Database Connection
connectDB();

app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like curl / mobile apps)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(cookieParser());

//API endpoints
app.get("/", (req, res) => {
  res.send("Backend is Working");
});

//Auth Router
app.use("/api/auth", authRouter);
//UserbRouter
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server Running at PORT: ${PORT}`);
});
