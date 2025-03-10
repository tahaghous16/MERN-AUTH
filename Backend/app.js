import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const PORT = process.env.PORT || 3000;

const app = express();

const allowedOrigins = ["mern-auth-frontend-opal.vercel.app
"];

//Database Connection
mongoose
  .connect(
    "mongodb+srv://Taha_Ghous:yb-C7kpvfMc7k7v@cluster0.61woh.mongodb.net/"
  )
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

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
