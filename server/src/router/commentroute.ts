import express from "express";
import { CreateComment, GetComment } from "../controllers/commentcontroller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create", verifyToken, CreateComment);
router.get("/", GetComment);

export default router;
