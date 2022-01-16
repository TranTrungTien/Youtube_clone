import { IComment } from "../../interfaces/commentinterface";
import { Link } from "react-router-dom";
type CommentProps = {
  comment?: IComment;
};
const Comment = ({ comment }: CommentProps) => {
  return comment ? (
    <div className="flex justify-start items-start space-x-2">
      <div className={`w-8 h-8`}>
        {!comment.chanel.imageProfileUrl ? (
          <Link
            to={"/chanel?id=" + comment?.chanel._id}
            className="w-full h-full grid place-content-center rounded-full bg-pink-700 text-gray-50"
          >
            {comment?.chanel.username[0]}
          </Link>
        ) : (
          <div className="w-8 h-8">
            <img
              src={comment?.chanel.imageProfileUrl}
              alt="user profile"
              className="w-full h-full object-cover object-center rounded-full"
            />
          </div>
        )}
      </div>
      <div
        style={{ fontSize: "10px" }}
        className="text-gray-200 font-light flex-1 space-y-1"
      >
        <div className="flex justify-start items-end space-x-1">
          <h1 className="text-gray-100">{comment.chanel.username}</h1>
          <p className="text-gray-400" style={{ fontSize: "9px" }}>
            1 years ago
          </p>
        </div>
        <div>
          <p className="text-gray-50">{comment.text}</p>
        </div>
        <div className="flex justify-start items-center space-x-3 text-gray-400">
          <div className="space-x-1">
            <i className="fas fa-thumbs-up"></i>
            <span>{comment.like}</span>
          </div>
          <div className="space-x-1">
            <i className="fas fa-thumbs-down"></i>
            <span>{comment.dislike}</span>
          </div>
          <div>
            <span style={{ fontSize: "11px" }}>REPLY</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Comment;
