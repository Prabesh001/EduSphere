// CommentList.js

import { Avatar } from "@mui/material";
import { baseUrl } from "../../config";

const CommentList = ({ comments }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {comments?.map((comment, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded-md mb-4">
          <div className="flex items-center mb-2 gap-x-2">
            <Avatar
              src={
                comment.user?.profile?.googlePhoto !== ""
                  ? comment.user?.profile?.googlePhoto
                  : baseUrl + "/" + comment.user?.profile?.photoUrl
              }
            />
            <span className="font-semibold">{comment.user.firstName}</span>
          </div>
          <p className="text-gray-800 dark:text-gray-300">{comment.comment}</p>
          <div className="flex items-center mt-2">
            <span className="text-gray-600 dark:text-gray-400 mr-2">Rating:</span>
            <div className="flex">
              {Array.from({ length: comment.rating }, (_, index) => (
                <span key={index} className="text-yellow-500">
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
