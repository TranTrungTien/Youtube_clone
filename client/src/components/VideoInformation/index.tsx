import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { IVideo } from "../../interfaces/videointerface";
import { formatDateClearly } from "../../Utils/formatdate";
import "../videocard/videocard.css";

type TitleProps = {
  video: IVideo;
};

const Title = ({ video }: TitleProps) => {
  const chanel = useAppSelector((state) => state.user);
  const navigation = useNavigate();
  const location = useLocation();
  const [like, setLike] = useState({ isLike: false, justEnter: false });
  const [dislike, setDislike] = useState({
    isDislike: false,
    justEnter: false,
  });
  useEffect(() => {
    if (chanel) {
      if (chanel.user) {
        let checkLike = false;
        for (let i = 0; i < chanel.user?.likedVideos?.length; ++i) {
          if (video._id === chanel.user.likedVideos?.[i]._id) {
            checkLike = true;
            break;
          }
        }
        let checkDislike = false;
        for (let i = 0; i < chanel.user?.dislikedVideos?.length; ++i) {
          if (video._id === chanel.user?.dislikedVideos?.[i]._id) {
            checkDislike = true;
            break;
          }
        }
        setLike({ isLike: checkLike, justEnter: false });
        setDislike({ isDislike: checkDislike, justEnter: false });
      }
    }
  }, [chanel, video._id]);
  const onLike = async () => {
    await axios.patch(
      process.env.REACT_APP_BASE_URL_SERVER + "/videos/increment-likedislike",
      {
        action: "like",
        decrementLike: like.isLike ? true : false,
        video_id: video._id,
      },
      {
        headers: {
          "content-types": "application/json",
        },
        withCredentials: true,
      }
    );
    await axios.patch(
      process.env.REACT_APP_BASE_URL_SERVER + "/chanels/update-likedvideo",
      { video_id: video._id, addmore: like.isLike ? false : true },
      {
        headers: {
          "content-types": "application/json",
        },
        withCredentials: true,
      }
    );
    setLike({ isLike: !like.isLike, justEnter: true });
  };

  const onDislike = async () => {
    await axios.patch(
      process.env.REACT_APP_BASE_URL_SERVER + "/videos/increment-likedislike",
      {
        action: "dislike",
        decrementDisLike: dislike.isDislike ? true : false,
        video_id: video._id,
      },
      {
        headers: {
          "content-types": "application/json",
        },
        withCredentials: true,
      }
    );
    await axios.patch(
      process.env.REACT_APP_BASE_URL_SERVER + "/chanels/update-dislikedvideo",
      { video_id: video._id, addmore: dislike.isDislike ? false : true },
      {
        headers: {
          "content-types": "application/json",
        },
        withCredentials: true,
      }
    );
    setDislike({ isDislike: !dislike.isDislike, justEnter: true });
  };
  const onLikeAnhDislike = async (action: string) => {
    if (!chanel) {
      navigation("/sign-in", { state: location.pathname + location.search });
    } else if (action === "like") {
      if (dislike.isDislike) {
        onDislike();
      }
      onLike();
    } else {
      if (like.isLike) {
        onLike();
      }
      onDislike();
    }
  };
  return (
    <div className="flex md:flex-row flex-col justify-between md:items-end md:space-x-6 mb-3 space-y-2 md:space-y-0">
      <div className="">
        <h1 className="text-gray-200 font-medium text-xs text">
          {video.title}
        </h1>
        <span
          style={{ fontSize: "10px" }}
          className=" text-gray-400 font-light"
        >
          <span className="text-gray-300 font-medium">{video.views}</span> views
          . {formatDateClearly(video.createdAt)}
        </span>
      </div>
      <div className="flex-1 text-gray-400 text-xs flex justify-evenly md:justify-end items-center space-x-5 w-full">
        <button
          onClick={() => onLikeAnhDislike("like")}
          className="flex justify-start items-center space-x-1"
        >
          <span
            className={`${like.isLike ? "text-gray-200" : "text-gray-500"}`}
          >
            <i className="fas fa-thumbs-up"></i>
          </span>
          <span>
            {like.justEnter
              ? like.isLike
                ? video.like + 1
                : like.justEnter
                ? video.like
                : video.like - 1
              : video.like}
          </span>
        </button>
        <button
          onClick={() => onLikeAnhDislike("dislike")}
          className="flex justify-start items-center space-x-1"
        >
          <span
            className={`${
              dislike.isDislike ? "text-gray-200" : "text-gray-500"
            }`}
          >
            <i className="fas fa-thumbs-down"></i>
          </span>
          <span>
            {dislike.justEnter
              ? dislike.isDislike
                ? video.dislike + 1
                : dislike.justEnter
                ? video.dislike
                : video.dislike - 1
              : video.dislike}
          </span>
        </button>
        <button className="flex justify-start items-center space-x-1">
          <span className="text-gray-500">
            <i className="fas fa-share"></i>
          </span>
          <span>SHARE</span>
        </button>
        <button className="flex justify-start items-center space-x-1">
          <span className="text-gray-500">
            <i className="fas fa-folder-plus"></i>
          </span>
          <span>SAVE</span>
        </button>
        <button className="flex justify-start items-center space-x-1">
          <span className="text-gray-500">
            <i className="fas fa-ellipsis-h"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

type DescriptionProps = {
  video: IVideo;
};

const Description = ({ video }: DescriptionProps) => {
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [subscribe, setSubscribe] = useState<boolean | undefined>(undefined);
  console.log({ showMoreDesc });
  const chanel = useAppSelector((state) => state.user);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (chanel.user && video.chanel?.subscriptions?.length > 0) {
      let res = false;
      for (let i = 0; i < video.chanel?.subscriptions?.length; ++i) {
        if (chanel.user?._id === video.chanel?.subscriptions[i]._id) {
          res = true;
          break;
        }
      }
      setSubscribe(res);
    }
  }, [chanel, video.chanel?.subscriptions]);
  const onSubscribe = async () => {
    if (!chanel) {
      navigation("/sign-in", { state: location.pathname + location.search });
    } else {
      if (chanel?.user?._id === video.chanel._id) {
        //edit
      } else {
        //subscribe
        if (!subscribe) {
          const response = await axios.patch(
            process.env.REACT_APP_BASE_URL_SERVER + "/chanels/subscribe",
            { subscribeChanel: video.chanel._id },
            {
              headers: { "content-types": "application/json" },
              withCredentials: true,
            }
          );
          console.log(response.data);
        }
      }
    }
  };

  return (
    <div className="border-b border-t border-lightgray_323232 py-5">
      <div className="flex justify-between items-start md:space-x-20">
        <div className="flex justify-start items-start space-x-2">
          <div className="w-10 h-10">
            {!video?.chanel?.imageProfileUrl ? (
              <button className="w-10 h-10 rounded-full bg-pink-700 text-gray-50">
                {video?.chanel.username[0]}
              </button>
            ) : (
              <img
                src={video?.chanel.imageProfileUrl}
                alt="user profile"
                className="w-full h-full object-cover object-center rounded-full"
              />
            )}
          </div>
          <div className="flex-1">
            <div>
              <Link to={`/chanel?id=` + video.chanel._id}>
                <h2 className="text-gray-200 text-xs">
                  {video.chanel.username}
                </h2>
              </Link>
              <span className="text-gray-400 text-9px">
                <span className="text-gray-300 font-medium">
                  {video.chanel.subscriptions.length}
                </span>{" "}
                subscribers
              </span>
            </div>
            <button
              onClick={() => setShowMoreDesc(true)}
              className="text-8px text-gray-300 font-thin"
            >
              {!showMoreDesc && "SHOW MORE"}
            </button>
            {showMoreDesc && (
              <>
                <div className="">
                  <p className="text-gray-200 text-10px">{video.description}</p>
                </div>
                <button
                  onClick={() => setShowMoreDesc(false)}
                  className="text-8px text-gray-300 font-thin"
                >
                  SHOW LESS
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center space-x-3">
          <button className="px-5 py-2 text-xs rounded-sm font-semibold bg-transparent border border-blue-700 text-blue-700">
            {chanel?.user?._id === video.chanel._id ? "ANALYSIS" : "JOIN"}
          </button>
          <button
            onClick={onSubscribe}
            className={`px-5 py-2 text-xs rounded-sm font-semibold text-gray-100 ${
              subscribe ? "bg-lightgray_323232" : "bg-fresh_red_cc0000"
            }`}
          >
            {chanel?.user?._id === video.chanel._id
              ? "EDIT"
              : subscribe
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </button>
        </div>
      </div>
    </div>
  );
};

type VideoInformationProps = {
  video: IVideo;
};
const VideoInformation = ({ video }: VideoInformationProps) => {
  return (
    <div className=" w-full">
      <Title video={video} />
      <Description video={video} />
    </div>
  );
};

export default VideoInformation;
