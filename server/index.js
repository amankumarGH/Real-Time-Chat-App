import express from "express";
const app = express();
import router from "./routes/routes.js";
import messageRoute from "./routes/messageRoute.js";
import dotevn from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotevn.config();

app.use(express.urlencoded({ extended: true }));
const corsOption = {
  origin: "http://localhost:5174",
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.use("/api/v1/user", router);
app.use("/api/v1/message", messageRoute);

import connectDB from "./config/database.js";

app.listen(port, () => {
  connectDB();
  console.log(`"server started!" at ${port}`);
});
