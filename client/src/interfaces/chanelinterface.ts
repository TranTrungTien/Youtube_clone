import { IPlaylist } from "./playlistinterface";
import { IVideo } from "./videointerface";

export interface IChanel {
  _id: string;
  username: string;
  password: string;
  email: string;
  imageProfileUrl: string;
  imageCoverUrl: string;
  likedVideos: IVideo[];
  dislikedVideos: IVideo[]; //IVideo[];
  yourVideos: IVideo[];
  playlists: IPlaylist[];
  subscriptions: IChanel[];
  createdAt: string;
  updatedAt: string;
}
