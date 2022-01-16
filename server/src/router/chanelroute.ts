import express from "express";
import {
  CreateChanel,
  DeleteChanel,
  DeleteCookie,
  GetChanel,
  GetMyChanel,
  Login,
  UpdateDislikedVideo,
  UpdateLikedVideo,
  UpdateSubscribe,
  UpdateVideo,
} from "../controllers/chanelcontroller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/login", Login);
router.post("/create", CreateChanel);
router.get("/", GetChanel);
router.get("/my-chanel", verifyToken, GetMyChanel);
router.put("/update-video", verifyToken, UpdateVideo);
router.patch("/subscribe", verifyToken, UpdateSubscribe);
router.patch("/update-likedvideo", verifyToken, UpdateLikedVideo);
router.patch("/update-dislikedvideo", verifyToken, UpdateDislikedVideo);
router.delete("/delete", verifyToken, DeleteChanel);
router.delete("/delete-cookie", verifyToken, DeleteCookie);

export default router;
