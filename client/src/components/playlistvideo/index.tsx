import { IVideo } from "../../interfaces/videointerface";
import RelativeVideoCard from "../videocard/relative";

type PlaylistVideoProps = {
  title: string;
  list?: IVideo[];
};
const PlaylistVideo = ({ title, list }: PlaylistVideoProps) => {
  return (
    <div className="w-full relative">
      <div className="flex flex-col justify-start items-start border-b border-lightgray_323232 pb-8">
        <div className="flex justify-start items-center space-x-4 text-xs font-light text-gray-300 py-4">
          <div>
            <h2 className="text-gray-100 font-medium">{title}</h2>
          </div>
          <div className="flex justify-start items-center space-x-2">
            <div>
              <i className="fas fa-play"></i>
            </div>
            <button className="text-11px font-light">PLAY ALL</button>
          </div>
        </div>
        <div className="md:flex justify-start items-center md:space-x-2">
          {list &&
            list.map((video, index) => (
              <RelativeVideoCard
                video={video}
                key={index}
                isPlaylistChanel={true}
              />
            ))}
        </div>
      </div>
      <div
        className={`${
          list?.length && list.length < 6 ? "md:hidden" : "md:absolute"
        } hidden top-1/3 right-0 transform -translate-y-1/3`}
      >
        <button className="w-8 h-8 grid place-content-center bg-bg_gray_202020 rounded-full text-gray-400 hover:text-gray-200">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default PlaylistVideo;
