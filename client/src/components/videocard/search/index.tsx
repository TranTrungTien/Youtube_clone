import { Link } from "react-router-dom";
import { IVideo } from "../../../interfaces/videointerface";
import "../videocard.css";

type SearchVideoCardProps = {
  video?: IVideo;
};

const SearchVideoCard = ({ video }: SearchVideoCardProps) => {
  console.log(video);
  console.log("w-full max-h-56 h-56 md:w-60 md:max-h-32 md:h-32");
  return (
    <div className={"flex justify-start items-start md:space-x-2 flex-1"}>
      <div className={`flex-1 md:flex-none md:w-60 md:max-h-32 md:h-32 h-28`}>
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
      </div>
      <div
        className={`px-1 flex-1 justify-start items-start space-x-1 flex md:space-x-2`}
      >
        <div className="space-y-2 text-gray-300">
          <div className="space-y-px">
            <Link to={"/watch?id=" + video?._id}>
              <h2 className={`text-11px font-medium text-gray-200 text`}>
                {video?.title}
              </h2>
            </Link>
            <div className="hidden md:block flex-1 font-light text-8px">
              <span>1.9 billion views</span> . <span>10 years ago</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-start items-center md:space-x-1">
              <div className={`w-5 h-5 hidden md:block`}>
                {!video?.chanel.imageProfileUrl ? (
                  <Link
                    to={"/chanel?id=" + video?.chanel._id}
                    className="w-full h-full grid place-content-center rounded-full bg-pink-700 text-gray-50"
                  >
                    {video?.chanel.username[0]}
                  </Link>
                ) : (
                  <div className="w-5 h-5">
                    <img
                      src={video?.chanel.imageProfileUrl}
                      alt="user profile"
                      className="w-full h-full object-cover object-center rounded-full"
                    />
                  </div>
                )}
              </div>
              <Link to={"/chanel?id=" + video?.chanel._id} className="">
                <h5 className="text_chanel text-9px text-gray-300 hover:text-gray-200">
                  {video?.chanel.username}{" "}
                </h5>
              </Link>
            </div>
          </div>
          <div className="md:hidden flex-1 font-light text-8px">
            <span>1.9 billion views</span> . <span>10 years ago</span>
          </div>
          <div className="flex-1 font-light text-8px hidden md:block">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
              repudiandae explicabo assumenda in voluptates, ullam totam
              voluptas optio nulla provident quibusdam aliquid qui, harum
              adipisci repellat nam. Dolor, cumque a?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchVideoCard;
