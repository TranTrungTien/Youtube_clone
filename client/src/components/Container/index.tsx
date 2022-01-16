import axios from "axios";
import { useEffect, useState } from "react";
import { IVideo } from "../../interfaces/videointerface";
import TagSuggestions from "../tagsugguests";
import VideoList from "../videolist";

const Container = () => {
  const [videoRecommended, setVideoRecommended] = useState<{
    loading: boolean;
    videos: IVideo[] | null;
    err: Error | null;
  }>({ loading: true, videos: null, err: null });

  useEffect(() => {
    const getVideoRecommended = async () => {
      try {
        const response = await axios.get<IVideo[]>(
          process.env.REACT_APP_BASE_URL_SERVER + "/videos/recommended",
          {
            headers: {
              "content-types": "application/json",
            },
          }
        );
        console.log(response.data);
        setVideoRecommended({
          loading: false,
          videos: response.data,
          err: null,
        });
      } catch (error) {
        console.log({ error });
      }
    };
    getVideoRecommended();
  }, []);
  return (
    <div className="h-screen overflow-y-auto flex-1 bg-bg_gray_181818 w-full relative pb-14">
      <TagSuggestions relativeList={false} />
      <VideoList list={videoRecommended.videos} />
    </div>
  );
};

export default Container;
