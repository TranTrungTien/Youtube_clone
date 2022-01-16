import axios from "axios";
import { useEffect, useState } from "react";
import { IVideo } from "../../interfaces/videointerface";
import TagSuggestions from "../tagsugguests";
import RelativeVideoCard from "../videocard/relative";
type RelatedVideoProps = {
  queryString?: string;
  id?: string;
  chanel_id?: string;
  onNextVideoId: (videoId: string | undefined) => void;
};
const RelatedVideo = ({
  chanel_id,
  id,
  queryString,
  onNextVideoId,
}: RelatedVideoProps) => {
  console.log("relative video render");
  const [relatedVideo, setRelatedVideo] = useState<IVideo[] | undefined>(
    undefined
  );
  const [chanelRelatedVideos, setChanelRelatedVideos] = useState<
    IVideo[] | undefined
  >(undefined);
  useEffect(() => {
    const getRelatedVideo = async () => {
      try {
        const response = await axios.get<IVideo[]>(
          process.env.REACT_APP_BASE_URL_SERVER + "/videos/related",
          {
            headers: {
              "content-types": "application/json",
            },
            params: {
              queryString: queryString,
            },
          }
        );
        setRelatedVideo(response.data);
      } catch (error) {
        console.log({ error });
      }
    };
    const getChanelRelatedVideos = async () => {
      try {
        const response = await axios.get<IVideo[]>(
          process.env.REACT_APP_BASE_URL_SERVER + "/videos/chanel-related",
          {
            headers: {
              "content-types": "application/json",
            },
            params: {
              chanel_id: chanel_id,
            },
          }
        );
        if (response.data.length > 0) {
          let data: IVideo[] = [];
          for (let i = 0; i < response.data.length; ++i) {
            if (id !== response.data[i]._id) {
              data.push(response.data[i]);
            }
          }
          onNextVideoId(data[0]._id);
          setChanelRelatedVideos(data);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    if (queryString) {
      getRelatedVideo();
      getChanelRelatedVideos();
    }
  }, [queryString, chanel_id, onNextVideoId, id]);

  return (
    <div className="w-full md:w-72 space-y-2">
      <TagSuggestions relativeList={true} />
      {chanelRelatedVideos &&
        chanelRelatedVideos.map((video, index) => {
          return <RelativeVideoCard key={index} video={video} />;
        })}
      {relatedVideo &&
        relatedVideo.map((video, index) => {
          if (video._id === id) {
            return null;
          }
          return <RelativeVideoCard key={index} video={video} />;
        })}
    </div>
  );
};

export default RelatedVideo;
