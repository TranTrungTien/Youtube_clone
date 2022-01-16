import { IComment } from "./commentinterface";
import { IChanel } from "./chanelinterface";
import { Types } from "mongoose";

export interface IVideo {
  _id?: string;
  id: string;
  title: string;
  chanel: IChanel;
  videoUrl: string;
  type: string;
  size: number;
  poster: string;
  duration: number;
  description: string;
  like: number;
  dislike: number;
  comments: Types.ObjectId[];
  views: number;
}
