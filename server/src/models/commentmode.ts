import mongoose, { Schema } from "mongoose";
import { IComment } from "../interfaces/commentinterface";

const commentSchema = new mongoose.Schema<IComment>(
  {
    chanel: {
      type: Schema.Types.ObjectId,
      ref: "Chanel",
    },
    dislike: Number,
    like: Number,
    text: String,
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
