import { IVideo } from "../../interfaces/videointerface";
import HomeVideoCard from "../videocard/home";

type VideoListProps = {
  list: IVideo[] | null;
};

const VideoList = ({ list }: VideoListProps) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 lg:px-4 lg:py-4 md:gap-x-3 gap-y-6`}
    >
      {list &&
        list.map((video, index) => <HomeVideoCard video={video} key={index} />)}
    </div>
  );
};

export default VideoList;
