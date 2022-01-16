import mongoose, { Schema } from "mongoose";
import { IChanel } from "../interfaces/chanelinterface";

const chanelSchema = new mongoose.Schema<IChanel>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imageProfileUrl: String,
    password: {
      type: String,
      required: true,
    },
    likedVideos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    dislikedVideos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    yourVideos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chanel",
      },
    ],
    playlists: [
      {
        title: {
          type: String,
          required: true,
        },
        videos: [
          {
            type: Schema.Types.ObjectId,
            ref: "Video",
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
chanelSchema.index({ username: "text" });
export default mongoose.model("Chanel", chanelSchema);
