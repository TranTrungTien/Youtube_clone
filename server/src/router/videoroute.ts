import express from "express";
import {
  GetChanelRelativeVideo,
  CreateVideo,
  DeleteVideo,
  GetRelativeVideo,
  GetVideo,
  IncrementLikeAndDislike,
  IncrementView,
  VideoRecommended,
  Search,
  UpdateCommentVideo,
} from "../controllers/videocontroller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create", CreateVideo);
router.get("/", GetVideo);
router.get("/recommended", VideoRecommended);
router.get("/related", GetRelativeVideo);
router.get("/search", Search);
router.get("/chanel-related", GetChanelRelativeVideo);
router.put("/update-comments", verifyToken, UpdateCommentVideo);
router.patch("/increment-view", IncrementView);
router.patch("/increment-likedislike", verifyToken, IncrementLikeAndDislike);
router.delete("/delete", verifyToken, DeleteVideo);

export default router;
