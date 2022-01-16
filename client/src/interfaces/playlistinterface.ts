import { IVideo } from "./videointerface";

export interface IPlaylist {
  _id: string;
  title: string;
  videos: IVideo[];
  createdAt: string;
  updatedAt: string;
}
