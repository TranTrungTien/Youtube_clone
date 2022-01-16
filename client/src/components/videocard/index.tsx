import { Link } from "react-router-dom";
import { IVideo } from "../../interfaces/videointerface";
import "./videocard.css";

type CardProps = {
  video?: IVideo;
  relativeList: boolean;
};

const VideoCard = ({ video, relativeList }: CardProps) => {
  const search = true;
  const searchStyle = "md:flex justify-start items-start md:space-x-2 flex-1";
  const videoCardStyle = `md:flex ${
    relativeList ? "md:flex-row" : "md:space-y-2 md:flex-col"
  } justify-center items-start w-full space-y-2 md:space-y-0`;
  console.log(video);
  return (
    <Link
      to={"/watch?id=" + video?._id}
      className={search ? searchStyle : videoCardStyle}
    >
      <div
        className={`${
          search ? "w-full max-h-56 h-56 md:w-60" : "max-h-56 h-56 w-full"
        } ${
          relativeList ? "md:max-h-16 md:h-16 md:w-28" : "md:max-h-32 md:h-32"
        }`}
      >
        <video
          src={undefined}
          className="w-full h-full object-cover object-center rounded-sm"
          poster="https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/IMG-Fieldhouse-10.jpg?itok=Whi8hHo9"
        />
      </div>
      <div
        className={`px-1 justify-start items-start ${
          relativeList
            ? "flex-1 mt-0 flex md:block"
            : "space-x-1 flex px-1 md:space-x-2"
        }`}
      >
        {!search && (
          <div
            className={`${relativeList ? "block md:hidden" : "block"} w-6 h-6`}
          >
            {!video?.chanel.imageProfileUrl ? (
              <button className="w-6 h-6 rounded-full bg-pink-700 text-gray-50">
                {video?.chanel.username[0]}
              </button>
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
        )}
        <div className="">
          <h2 className={`text-11px font-medium text-gray-200 text`}>
            {video?.title}
          </h2>
          {search ? (
            <div className="flex justify-start items-center space-x-1">
              <div
                className={`${
                  relativeList ? "block md:hidden" : "block"
                } w-6 h-6`}
              >
                {!video?.chanel.imageProfileUrl ? (
                  <button className="w-6 h-6 rounded-full bg-pink-700 text-gray-50">
                    {video?.chanel.username[0]}
                  </button>
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
              <h5 className="text_chanel text-10px">
                {video?.chanel.username}{" "}
              </h5>
            </div>
          ) : (
            <h5 className="text_chanel text-10px">{video?.chanel.username} </h5>
          )}
          <div className="flex-1 font-thin text-9px">
            <span>1.9 billion views</span> . <span>10 years ago</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
