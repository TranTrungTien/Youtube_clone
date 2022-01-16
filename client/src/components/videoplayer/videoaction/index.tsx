import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "../../../Utils/fomarttime";
//"http://localhost:4000/api/assets/get?id=1G5hVPoRqI-zbdav7l4zbUChHaoh8urii&size=93219973";

type VideoActionProps = {
  url: string;
  id?: string;
  nextVideoId?: string;
  duration: number;
  setLoading: (isLoading: boolean) => void;
};

const MAX_SOUND_WIDTH = 80;
const VideoAction = ({
  id,
  url,
  duration,
  nextVideoId,
  setLoading,
}: VideoActionProps) => {
  console.log("video action render");
  const navigation = useNavigate();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressbarRef = useRef<HTMLDivElement | null>(null);
  const progressbarBgRef = useRef<HTMLDivElement | null>(null);
  const totalTimeRef = useRef<HTMLSpanElement | null>(null);
  const currentTimeRef = useRef<HTMLSpanElement | null>(null);
  const soundBgRef = useRef<HTMLDivElement | null>(null);
  const soundRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mute, setMute] = useState<boolean>(true);

  useEffect(() => {
    videoRef.current = document.querySelector("#video") as HTMLVideoElement;
  }, []);
  useEffect(() => {
    if (duration && !totalTimeRef.current) {
      totalTimeRef.current = document.querySelector(
        "#totalTime"
      ) as HTMLSpanElement;
      totalTimeRef.current.textContent = format(duration);
    }
  }, [duration]);
  useEffect(() => {
    currentTimeRef.current = document.querySelector(
      "#currentTime"
    ) as HTMLSpanElement;
  }, []);
  useEffect(() => {
    progressbarRef.current = document.querySelector(
      "#progressbar"
    ) as HTMLDivElement;
  }, []);

  useEffect(() => {
    if (!progressbarBgRef.current && duration) {
      progressbarBgRef.current = document.querySelector(
        "#progressbar_bg"
      ) as HTMLDivElement;

      progressbarBgRef.current.onclick = (e: any) => {
        const progressbarBgWidth =
          progressbarBgRef.current?.getBoundingClientRect().width ?? 0;
        if (!progressbarBgWidth || !e.pageX) {
          return;
        } else {
          console.log({ duration });
          const currentTime =
            (duration / progressbarBgWidth) * parseFloat(e.pageX);
          if (videoRef.current) {
            videoRef.current.currentTime = currentTime;
          }
        }
      };
    }
  }, [duration]);

  useEffect(() => {
    soundRef.current = document.querySelector("#sound") as HTMLDivElement;
  }, []);

  useEffect(() => {
    soundBgRef.current = document.querySelector("#soundBg") as HTMLDivElement;
    if (soundBgRef.current && videoRef.current && soundRef.current) {
      const bounding = soundBgRef.current.getBoundingClientRect();
      const ratio = 1 / MAX_SOUND_WIDTH;
      soundBgRef.current.onclick = (e: any) => {
        const currentWidthSound = e.pageX - bounding.left;
        const currentSound = currentWidthSound * ratio;
        videoRef.current!.volume =
          currentSound > 1 ? 1 : currentSound < 0 ? 0 : currentSound;
        soundRef.current!.style.width =
          videoRef.current!.volume * MAX_SOUND_WIDTH + "px";
      };
    }
  }, []);

  useEffect(() => {
    console.log("load src run...");
    console.log(videoRef.current?.src);
    console.log(url);
    if ((!videoRef.current?.src && url) || videoRef.current?.src !== url) {
      console.log("src");

      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.load();
        videoRef.current.play();
        let countView = false;
        if (progressbarRef.current) {
          const bounding = progressbarBgRef.current?.getBoundingClientRect();
          const progressbarBgWidth = bounding?.width ?? 0;
          const ratio = progressbarBgWidth / duration;

          videoRef.current.ontimeupdate = () => {
            const currentTime = videoRef.current?.currentTime ?? 0;
            if (currentTime > 30 && !countView) {
              countView = true;
              try {
                axios.patch(
                  process.env.REACT_APP_BASE_URL_SERVER +
                    "/videos/increment-view",
                  { inc: 1, video_id: id },
                  { headers: { "content-types": "application/json" } }
                );
              } catch (error) {
                console.log({ error });
              }
            }
            console.log(countView);
            const width = currentTime * ratio;
            if (width > progressbarBgWidth) {
              progressbarRef.current!.style.width = progressbarBgWidth + "px";
            } else {
              progressbarRef.current!.style.width = width + "px";
            }

            if (currentTimeRef.current) {
              currentTimeRef.current.textContent = format(currentTime);
            }
          };
        }
        videoRef.current.onclick = () => {
          if (videoRef.current?.paused) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
          setIsPlaying((prevState) => !prevState);
        };
        videoRef.current.onended = function () {
          countView = false;
          navigation(`/watch?id=${nextVideoId}`);
        };
      }
    }
  }, [url, setLoading, duration, id, navigation, nextVideoId]);

  const onPlay = () => {
    console.log("video onplay");
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onMuteSound = () => {
    if (mute && videoRef.current?.muted && soundRef.current) {
      videoRef.current!.muted = false;
      soundRef.current.style.width =
        videoRef.current.volume * MAX_SOUND_WIDTH + "px";
      setMute(false);
    } else {
      videoRef.current!.muted = true;
      setMute(true);
    }
  };

  const openFullScreen = () => {
    // Trigger fullscreen
    if (videoRef.current) {
      const docElmWithBrowsersFullScreenFunctions =
        videoRef.current as HTMLVideoElement & {
          mozRequestFullScreen(): Promise<void>;
          webkitRequestFullscreen(): Promise<void>;
          msRequestFullscreen(): Promise<void>;
        };
      if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) {
        /* Firefox */
        docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
      } else if (
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen
      ) {
        /* Chrome, Safari and Opera */
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) {
        /* IE/Edge */
        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
      }
    }
  };

  // const closeFullScreen = () => {
  //   const docWithBrowsersExitFunctions =
  //     videoRef.current as HTMLVideoElement & {
  //       mozCancelFullScreen(): Promise<void>;
  //       webkitExitFullscreen(): Promise<void>;
  //       msExitFullscreen(): Promise<void>;
  //     };
  //   if (docWithBrowsersExitFunctions.exitFullscreen) {
  //     docWithBrowsersExitFunctions.exitFullscreen();
  //   } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
  //     /* Firefox */
  //     docWithBrowsersExitFunctions.mozCancelFullScreen();
  //   } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     docWithBrowsersExitFunctions.webkitExitFullscreen();
  //   } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
  //     /* IE/Edge */
  //     docWithBrowsersExitFunctions.msExitFullscreen();
  //   }
  // };

  return (
    <div style={{ bottom: "4%" }} className="absolute left-0 w-full z-10">
      <div className="flex flex-col justify-center items-start text-gray-300 w-full space-y-3">
        <div
          style={{ width: "99%" }}
          id="progressbar_bg"
          className="bg-gray-400 h-1 mx-auto cursor-pointer group w-full"
        >
          <div className="w-0 h-1 bg-red-600 relative" id="progressbar">
            <div className="absolute top-0 right-0 transform translate-x-2/3 -translate-y-1/3 bg-red-700 rounded-full w-3 h-3 hidden group-hover:block"></div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full px-6 ">
          <div className="flex justify-center items-center space-x-2 text-lg">
            <button className="hover:text-gray-100 w-5 h-5 md:w-7 md:h-7 grid place-content-center">
              <i className="fas fa-step-backward"></i>
            </button>
            <button
              onClick={onPlay}
              className="hover:text-gray-100 w-5 h-5 md:w-7 md:h-7 grid place-content-center"
            >
              {isPlaying ? (
                <i className="fas fa-pause"></i>
              ) : (
                <i className="fas fa-play"></i>
              )}
            </button>
            <button
              onClick={() => navigation(`/watch?id=${nextVideoId}`)}
              className="hover:text-gray-100 w-5 h-5 md:w-7 md:h-7 grid place-content-center"
            >
              <i className="fas fa-step-forward"></i>
            </button>
            <div
              id="volume"
              className="flex justify-start items-center space-x-1 group"
            >
              <button
                onClick={onMuteSound}
                className="hover:text-gray-100 w-5 h-5 md:w-7 md:h-7 grid place-content-center text-sm"
              >
                {mute ? (
                  <i className="fas fa-volume-mute"></i>
                ) : (
                  <i className="fas fa-volume-up"></i>
                )}
              </button>
              <div
                id="soundBg"
                className="h-1 bg-gray-600 rounded-sm relative cursor-pointer group-hover:w-20 w-0 transform transition-all invisible group-hover:visible opacity-0 group-hover:opacity-100 duration-200"
              >
                <div
                  id="sound"
                  className="w-0 h-1 bg-gray-300 rounded-sm absolute top-0 left-0 hidden group-hover:block"
                >
                  <div className="absolute top-0 right-0 w-2 h-2 transform translate-x-1/3 -translate-y-1/4 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
            <div>
              <span className="text-11px text-gray-400 font-thin flex items-center">
                <span className="block w-8 text-center" id="currentTime">
                  00:00
                </span>
                /
                <span className="block w-8 text-center" id="totalTime">
                  00:00
                </span>
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4 text-lg">
            <button className="hover:text-gray-100 w-5 h-5 md:w-7 md:h-7 grid place-content-center">
              <i className="fas fa-cog"></i>
            </button>
            <button className="hover:text-gray-100 w-5 h-5 md:w-7 md:h-7 grid place-content-center">
              <i className="fas fa-minus-square"></i>
            </button>
            <button className="hover:text-gray-100 w-5 h-5 md:w-7 md:h-7 grid place-content-center">
              <i className="fas fa-square"></i>
            </button>
            <button
              onClick={openFullScreen}
              className="hover:text-gray-100 w-5 h-5 md:w-7 md:h-7 grid place-content-center"
            >
              <i className="fas fa-expand"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAction;
