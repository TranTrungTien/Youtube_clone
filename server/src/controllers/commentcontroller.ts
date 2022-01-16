import { Request, Response } from "express";
import Comment from "../models/commentmode";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;
export const CreateComment = async (req: Request, res: Response) => {
  const chanel_id = req.chanel.id as string;
  const video_id = req.body.video_id as string;
  const text = req.body.text as string;
  if (!ObjectId.isValid(chanel_id) || !ObjectId.isValid(video_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  try {
    const comment = new Comment({
      chanel: chanel_id,
      dislike: 0,
      like: 0,
      text: text,
      video: video_id,
    });
    const response = await comment.save();
    if (response) {
      return res.status(201).send(response);
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }
};

export const GetComment = (req: Request, res: Response) => {};
