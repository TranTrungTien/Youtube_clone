import { useAppSelector } from "../../app/hooks";
import { IComment } from "../../interfaces/commentinterface";
import Comment from "../comment";
import "./commentlist.css";

const UserInput = () => {
  return (
    <div className="w-full flex justify-start items-start space-x-2">
      <div className="w-8 h-8 text-gray-300">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDH9IiGBLPW9ls2O38sPigsI-oNzbOZyK_HlbOdhjMT6ZkwCruMh8S0qzxHVi_VAesggo&usqp=CAU"
          alt="user profile"
          className="w-full h-full object-cover object-center rounded-full"
        />
      </div>
      <form className="flex flex-col items-end justify-center flex-1">
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Add a public comment"
          className="text-xs text-gray-200 bg-transparent w-full focus:outline-none border-b border-lightgray_323232 py-1 mt-px px-2"
        />
        <div id="input_button" className="hidden mt-2">
          <div className="flex justify-center items-center space-x-2 font-thin">
            <button className="px-5 py-2 rounded-sm text-xs font-medium text-gray-200">
              CANCEL
            </button>
            <button className="px-5 py-2 rounded-sm text-xs font-medium bg-lightgray_323232 text-gray-400">
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
const CommentList = ({ commentList }: CommentListProps) => {
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
        <h3>267 Comments</h3>
        <div className="flex items-center space-x-2 justify-center">
          <i className="fas fa-sort-amount-down"></i>
          <span style={{ fontSize: "11px" }}>SORT BY</span>
        </div>
      </div>
      <div className="mt-5">
        {chanel && <UserInput />}
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
