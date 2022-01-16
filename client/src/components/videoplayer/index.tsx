import { useState } from "react";
import VideoAction from "./videoaction";
import "./videoplayer.css";

type VideoPlayerProps = {
  id?: string;
  nextVideoId?: string;
  url: string;
  duration: number;
  loadingVideo: boolean;
};

const VideoPlayer = ({
  id,
  url,
  nextVideoId,
  duration,
  loadingVideo,
}: VideoPlayerProps) => {
  const [loading, setLoading] = useState(true);

  const onLoading = (isLoading: boolean) => {
    console.log({ isLoading });
    console.log({ loading });
    if (isLoading !== loading) {
      console.log("set loading ....");
      setLoading(isLoading);
    }
  };
  console.log({ loading });

  const onProgress = (event: any) => {
    if (event.target.readyState === 1 || event.target.readyState === 2) {
      if (!loading) {
        setLoading(true);
      }
    } else if (event.target.readyState === 3 || event.target.readyState === 4) {
      if (loading) {
        setLoading(false);
      }
    }
  };
  return (
    <div
      className="relative w-full"
      style={{
        backgroundImage:
          "linear-gradient(to top, black, transparent, transparent, transparent)",
      }}
    >
      {nextVideoId && (
        <VideoAction
          id={id}
          url={url}
          nextVideoId={nextVideoId}
          duration={duration}
          setLoading={onLoading}
        />
      )}
      {(loading || loadingVideo) && (
        <div className="flex justify-center items-center absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button>
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </button>
        </div>
      )}
      <video
        id="video"
        onCanPlay={() => setLoading(false)}
        onProgress={onProgress}
        src={undefined}
        autoPlay={true}
        muted={true}
        playsInline={true}
        className=" min-h-40vh max-h-40vh h-40vh md:max-h-screen md:h-85vh md:min-h-85vh relative w-full"
      ></video>
    </div>
  );
};

export default VideoPlayer;
