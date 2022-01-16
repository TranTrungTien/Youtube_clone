import { IChanel } from "./chanelinterface";
import { IVideo } from "./videointerface";

export interface IComment {
  _id: string;
  chanel: IChanel;
  video: IVideo;
  text: string;
  like: number;
  dislike: number;
  createdAt: string;
  updatedAt: string;
}
