import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import VideoRouter from "./router/videoroute";
import AssetsRouter from "./router/asssetsroute";
import ChanelRouter from "./router/chanelroute";
import CommentRouter from "./router/commentroute";
import { DBConnect } from "./helper/mongoose";
import cookieParser from "cookie-parser";
dotenv.config({ path: "../.env" });

const app: Application = express();
const PORT = process.env.PORT || 4000;

DBConnect();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/chanels", ChanelRouter);
app.use("/api/videos", VideoRouter);
app.use("/api/assets", AssetsRouter);
app.use("/api/comments", CommentRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("The sedulous hyena ate the antelope!");
});
app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}`);
});
