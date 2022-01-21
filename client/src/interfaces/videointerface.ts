import { IComment } from "./commentinterface";
import { IChanel } from "./chanelinterface";

export interface IVideo {
  _id?: string;
  id: string;
  title: string;
  chanel: IChanel;
  videoUrl: string;
  poster: string;
  type: string;
  size: number;
  duration: number;
  description: string;
  like: number;
  dislike: number;
  comments?: IComment[];
  views: number;
  mimeType: string;
  createdAt?: string;
  updatedAt?: string;
}
