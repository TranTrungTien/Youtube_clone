import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CommentList from "../../components/commentlist";
import RelatedVideo from "../../components/relatedvideo";
import VideoInformation from "../../components/VideoInformation";
import VideoPlayer from "../../components/videoplayer";
import { IVideo } from "../../interfaces/videointerface";
import Header from "../../parts/header";

const Video = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log({ id });
  const [video, setVideo] = useState<{
    loading: boolean;
    video: IVideo | null;
    err: Error | null;
  }>({ loading: true, video: null, err: null });
  const [nextVideoId, setNextVideoId] = useState<string | undefined>(undefined);

  const onNextVideoId = (videoId: string | undefined) => {
    console.log({ videoId });
    if (!videoId) return;
    setNextVideoId(videoId);
  };

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await axios.get<IVideo>(
          process.env.REACT_APP_BASE_URL_SERVER + "/videos",
          {
            headers: {
              "content-types": "application/json",
            },
            params: {
              id: id,
            },
          }
        );
        setVideo({ loading: false, video: response.data, err: null });
      } catch (error) {
        console.log({ error });
      }
    };
    if (id) {
      getVideo();
    }
  }, [id]);
  console.log({ video });
  return (
    <div className="bg-bg_gray_181818 h-screen max-h-screen overflow-y-auto w-full">
      <div>
        <Header />
        {video.video ? (
          <>
            <VideoPlayer
              id={video.video._id}
              url={video.video.videoUrl}
              duration={video.video.duration}
              loadingVideo={video.loading}
              nextVideoId={nextVideoId}
            />
            <div className="w-full px-1 md:w-3/4 mx-auto mt-6 flex md:flex-row flex-col justify-center items-start md:space-x-4">
              <div className="flex flex-col justify-start items-start flex-1 w-full">
                <VideoInformation video={video.video} />
                <div className="block md:hidden text-xs my-5 text-gray-200">
                  Comment 123445
                </div>
                <CommentList commentList={video.video.comment} />
              </div>
              <RelatedVideo
                chanel_id={video.video.chanel._id}
                id={video.video._id}
                queryString={video.video.title}
                onNextVideoId={onNextVideoId}
              />
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Video;
