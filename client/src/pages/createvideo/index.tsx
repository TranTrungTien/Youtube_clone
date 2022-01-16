import axios from "axios";
import { SyntheticEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getChanel } from "../../slices/chanelslice";

const CreateVideo = () => {
  const chanel = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  useEffect(() => {
    if (!chanel.user) {
      dispatch(getChanel()).catch(() => navigation("/sign-in"));
    }
  }, [chanel, dispatch, navigation]);
  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      video: {
        files: FileList;
      };
      poster: {
        files: FileList;
      };
      title: {
        value: string;
      };
      description: {
        value: string;
      };
    };
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = async function () {
      window.URL.revokeObjectURL(video.src);
      const formData = new FormData();
      if (!target.video.files[0]) {
        return;
      }
      formData.append(
        chanel?.user?.username ?? "",
        target.video.files[0],
        "video"
      );
      try {
        const videoAssetResponse = await axios.post(
          "http://localhost:4000/api/assets/create",
          formData,
          {
            headers: {
              "content-types": "multipart/form-data",
            },
          }
        );
        formData.delete(chanel?.user?.username ?? "");
        let posterResponse = undefined;
        if (target.poster.files[0]) {
          formData.append(
            chanel?.user?.username ?? "",
            target.poster.files[0],
            "poster"
          );

          posterResponse = await axios.post(
            "http://localhost:4000/api/assets/create",
            formData,
            {
              headers: {
                "content-types": "multipart/form-data",
              },
            }
          );
        }
        const data = {
          title: target.title.value,
          chanel_id: chanel?.user?._id ?? "",
          description: target.description.value,
          duration: video.duration,
          id: videoAssetResponse.data.id,
          poster: posterResponse?.data.id ?? "",
          size: target.video.files[0].size,
          mimeType: target.video.files[0].type,
        };
        const videoResponse = await axios.post(
          "http://localhost:4000/api/videos/create",
          data,
          {
            headers: {
              "content-types": "application/json",
            },
          }
        );
        console.log(videoResponse.data);

        axios.put(
          process.env.REACT_APP_BASE_URL_SERVER + "/chanels/update-video",
          { video_id: videoResponse.data._id },
          {
            headers: {
              "content-types": "application/json",
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log({ error });
      }
    };
    video.src = URL.createObjectURL(target.video.files[0]);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" name="video" id="video" />
        <input type="file" name="poster" id="poster" />
        <input type="text" name="title" id="title" />
        <input type="" name="description" id="description" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateVideo;
