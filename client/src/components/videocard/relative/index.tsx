import { Link } from "react-router-dom";
import { IVideo } from "../../../interfaces/videointerface";
import { format } from "../../../Utils/fomarttime";
import "../videocard.css";

type RelativeVideoCardProps = {
  isPlaylistChanel?: boolean;
  video?: IVideo;
};
const RelativeVideoCard = ({
  isPlaylistChanel,
  video,
}: RelativeVideoCardProps) => {
  return (
    <Link
      to={"/watch?id=" + video?._id}
      className={`
        ${
          isPlaylistChanel
            ? "flex items-start justify-start md:block md:max-w-min md:space-y-1"
            : "md:flex md:flex-row justify-center items-start w-full space-y-2 md:space-y-0"
        } group
      `}
    >
      <div
        className={`relative ${
          isPlaylistChanel ? "flex-1 md:flex-none" : "max-h-56 h-56"
        } md:max-h-16 md:h-16 md:w-28 w-full`}
      >
        <video
          src={undefined}
          //video?.poster ? undefined : video?.videoUrl
          className="w-full h-full object-cover object-center rounded-sm"
          poster={
            video?.poster
              ? video.poster
              : "https://images5.alphacoders.com/680/thumb-1920-680900.jpg"
          }
        />
        <div className="absolute right-1 text-xs font-thin top-0 h-full w-auto flex-col justify-start items-end space-y-px mt-px hidden group-hover:flex">
          <button
            style={{
              backgroundImage:
                "linear-gradient(to top , rgba(0, 0,0, 0.6), rgba(0, 0,0, 0.6))",
            }}
            className="text-gray-400 p-1 hidden group-hover:block"
          >
            <i className="far fa-clock"></i>
          </button>
          <button
            style={{
              backgroundImage:
                "linear-gradient(to top , rgba(0, 0,0, 0.6), rgba(0, 0,0, 0.6))",
            }}
            className="text-gray-400 p-1 hidden group-hover:block"
          >
            <i className="fas fa-list-ul"></i>
          </button>
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(to top , rgba(0, 0,0, 0.6), rgba(0, 0,0, 0.6))",
          }}
          className="text-8px text-gray-300 font-medium leading-3 px-2 rounded absolute right-1 bottom-px"
        >
          <span>{format(video?.duration)}</span>
        </div>
      </div>
      <div
        className={`px-1 justify-start items-start flex-1 mt-0 flex md:block`}
      >
        <div className="text-gray-400 space-y-1">
          <h2 className={`text-11px font-medium text-gray-200 text`}>
            {video?.title}
          </h2>
          <div className="space-y-px">
            <h5 className="text_chanel text-9px hover:text-gray-200">
              {video?.chanel.username}{" "}
            </h5>
            <div className="flex-1 font-light text-9px">
              <span>1.9B views</span> . <span>10 years ago</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelativeVideoCard;
