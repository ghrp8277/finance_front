import React from "react";
import { formatDateTime } from "../../../utils/dateUtils";
import { useNavigate } from "@/hooks/useNavigate";
import CommentSection from "../comment/CommentSection";
import { IComment } from "@/types/social";

type PostDetailProps = {
  id: number;
  title: string;
  date: string;
  content: string;
  comments: IComment[] | null;
};

const PostDetail: React.FC<PostDetailProps> = ({
  id,
  title,
  date,
  content,
  comments,
}) => {
  const { navigateBack } = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
      <div className="w-full max-w-4xl mx-auto p-10 bg-gray-900 border border-green-500 shadow-2xl rounded-lg text-green-500">
        <div className="flex justify-between items-center mb-8">
          <button
            className="text-green-500 hover:text-green-300 text-sm flex items-center"
            onClick={() => navigateBack()}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            뒤로가기
          </button>
        </div>

        <div className="border-b pb-6 mb-8 flex justify-between items-center border-green-500">
          <h1 className="text-3xl font-bold">{title}</h1>
          <span className="text-sm">{formatDateTime(date)}</span>
        </div>

        <div className="whitespace-pre-line leading-relaxed mb-10">
          {content}
        </div>
        <CommentSection id={id} comments={comments || []} />
      </div>
    </div>
  );
};

export default PostDetail;
