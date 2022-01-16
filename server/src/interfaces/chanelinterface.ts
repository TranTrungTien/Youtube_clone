import { Types } from "mongoose";

export interface IChanel {
  _id?: string;
  username: string;
  password: string;
  email: string;
  imageProfileUrl: string;
  imageCoverUrl: string;
  subscriptions: Types.ObjectId[];
  yourVideos: Types.ObjectId[];
  likedVideos: Types.ObjectId[]; //IVideo[];
  dislikedVideos: Types.ObjectId[]; //IVideo[];
  playlists: [
    {
      title: string;
      videos: Types.ObjectId[];
      createdAt: string;
      updatedAt: string;
    }
  ]; //IPlaylist[];
}
