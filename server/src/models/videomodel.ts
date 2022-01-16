import mongoose, { Schema } from "mongoose";
import { IVideo } from "../interfaces/videointerface";

const videoSchema = new mongoose.Schema<IVideo>(
  {
    chanel: {
      type: Schema.Types.ObjectId,
      ref: "Chanel",
    },
    description: {
      type: String,
      default: "",
    },
    videoUrl: String,
    dislike: Number,
    like: Number,
    poster: String,
    id: String,
    size: {
      type: Number,
      default: 0,
    },
    type: String,
    duration: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    views: Number,
  },
  { timestamps: true }
);

videoSchema.index({ title: "text" });

export default mongoose.model("Video", videoSchema);
