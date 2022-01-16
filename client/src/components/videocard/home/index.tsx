import { Link } from "react-router-dom";
import { IVideo } from "../../../interfaces/videointerface";
import { format } from "../../../Utils/fomarttime";
import "../videocard.css";

type HomeVideoCardProps = {
  video?: IVideo;
};

const HomeVideoCard = ({ video }: HomeVideoCardProps) => {
  console.log(video);
  return (
    <div
      className={`md:flex md:space-y-2 md:flex-col justify-center items-start w-full space-y-2 md:space-y-0 h-full group overflow-hidden`}
    >
      <div className={`md:max-h-32 md:h-32 max-h-56 h-56 w-full relative`}>
        <Link to={"/watch?id=" + video?._id}>
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
        </Link>
        <div
          style={{
            backgroundImage:
              "linear-gradient(to top , rgba(0, 0,0, 0.6), rgba(0, 0,0, 0.6))",
          }}
          className="text-9px text-gray-300 font-medium leading-3 px-2 rounded absolute right-1 bottom-px"
        >
          <span>{format(video?.duration)}</span>
        </div>
      </div>
      <div
        className={`px-1 justify-between items-start space-x-1 flex md:space-x-2 flex-1 w-full`}
      >
        <div className={`w-6 h-6`}>
          {!video?.chanel.imageProfileUrl ? (
            <Link
              to={"/chanel?id=" + video?.chanel._id}
              className="w-full h-full grid place-content-center rounded-full bg-pink-700 text-gray-50"
            >
              {video?.chanel.username[0]}
            </Link>
          ) : (
            <div className="w-6 h-6">
              <img
                src={video?.chanel.imageProfileUrl}
                alt="user profile"
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="">
            <Link to={"/watch?id=" + video?._id} className="block">
              <h2 className={`text-10px font-medium text-gray-200 text`}>
                {video?.title}
              </h2>
            </Link>
          </div>
          <div className="truncate mt-1">
            <Link to={"/chanel?id=" + video?.chanel._id}>
              <span className="text_chanel text-9px text-gray-400 font-medium hover:text-gray-200 truncate">
                {video?.chanel.username}
              </span>
            </Link>
          </div>

          <div className="font-light text-9px text-gray-400 leading-3">
            <span>1.9 billion views</span> . <span>10 years ago</span>
          </div>
        </div>
        <div className="hidden w-4 h-4 md:grid place-content-center">
          <button className="text-11px w-4 h-4 text-gray-400 hover:text-gray-200 group-hover:block hidden ">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeVideoCard;
