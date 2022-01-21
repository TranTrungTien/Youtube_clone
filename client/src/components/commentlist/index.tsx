import axios from "axios";
import { FormEvent } from "react";
import { useAppSelector } from "../../app/hooks";
import { IChanel } from "../../interfaces/chanelinterface";
import { IComment } from "../../interfaces/commentinterface";
import Comment from "../comment";
import "./commentlist.css";

type UserInputProps = {
  chanel: IChanel;
  video_id?: string;
};
const UserInput = ({ video_id, chanel }: UserInputProps) => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("submit comment");
    e.preventDefault();
    if (!chanel || !video_id) {
      return;
    }
    const target = e.target as typeof e.target & {
      comment: {
        value: string;
      };
      reset: () => void;
    };

    if (target.comment.value === "") {
      return;
    }
    try {
      const response = await axios.post<IComment>(
        process.env.REACT_APP_BASE_URL_SERVER + "/comments/create",
        {
          video_id: video_id,
          text: target.comment.value,
        },
        {
          headers: {
            "content-types": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const updateVideoResponse = await axios.patch(
        process.env.REACT_APP_BASE_URL_SERVER + "/videos/update-comments",
        {
          comment_id: response.data._id,
          video_id: video_id,
        },
        {
          headers: {
            "content-types": "application/json",
          },
        }
      );
      console.log(updateVideoResponse.data);

      target.reset();
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="w-full flex justify-start items-start space-x-2">
      <div className="w-8 h-8 text-gray-300">
        {!chanel?.imageProfileUrl ? (
          <button className="w-8 h-8 rounded-full bg-pink-700 text-gray-50">
            {chanel?.username[0]}
          </button>
        ) : (
          <img
            src={chanel.imageProfileUrl}
            alt="user profile"
            className="w-full h-full object-cover object-center rounded-full"
          />
        )}
      </div>
      <form
        onSubmit={onSubmit}
        autoComplete="off"
        autoCorrect="false"
        className="flex flex-col items-end justify-center flex-1"
      >
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Add a public comment"
          className="text-xs text-gray-200 bg-transparent w-full focus:outline-none border-b border-lightgray_323232 py-1 mt-px px-2"
        />
        <div id="input_button" className="mt-2 hidden">
          <div className="flex justify-center items-center space-x-2 font-thin">
            <button
              id="cancel_btn"
              className="px-5 py-2 rounded-sm text-xs font-medium text-gray-200"
            >
              CANCEL
            </button>
            <button
              type="submit"
              id="comment_btn"
              className="px-5 py-2 rounded-sm text-xs font-medium bg-lightgray_323232 text-gray-400 cursor-not-allowed"
            >
              COMMENT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

type CommentListProps = {
  video_id?: string;
  commentList?: IComment[];
};
const CommentList = ({ commentList, video_id }: CommentListProps) => {
  const chanel = useAppSelector((state) => state.user);
  // const [commentList, setCommentList] = useState<{
  //   loading: boolean;
  //   comments: IComment[] | null;
  //   err: null | Error;
  // }>({ loading: true, comments: null, err: null });
  // useEffect(() => {
  //   const getComments = async () => {
  //     const response = await axios.get<IComment[]>(
  //       process.env.REACT_APP_BASE_URL_SERVER + "/comments",
  //       {
  //         headers: {
  //           "content-types": "application/json",
  //         },
  //         params: { video_id: video_id },
  //       }
  //     );
  //       if(response.data){
  //         setCommentList({loading : false, comments: response.data, err: null});
  //       }
  //   };
  //   if (video_id) {
  //     getComments();
  //   }
  // }, [video_id]);
  return (
    <div className="hidden md:block mt-6 w-full">
      <div className="text-xs text-gray-300 flex items-center space-x-2 justify-start">
        <h3>{commentList?.length ?? 0} Comments</h3>
        <div className="flex items-center space-x-2 justify-center">
          <i className="fas fa-sort-amount-down"></i>
          <span style={{ fontSize: "11px" }}>SORT BY</span>
        </div>
      </div>
      <div className="mt-5">
        {chanel.user && <UserInput chanel={chanel.user} video_id={video_id} />}
        <div className="mt-5 space-y-4">
          {commentList &&
            commentList?.length > 0 &&
            commentList.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
