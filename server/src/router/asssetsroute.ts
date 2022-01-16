import express from "express";
import {
  GetImageAsset,
  GetVideoAsset,
  UploadVideo,
} from "../controllers/assetscontroller";
const router = express.Router();

router.post("/create", UploadVideo);
router.get("/video", GetVideoAsset);
router.get("/image", GetImageAsset);

export default router;
