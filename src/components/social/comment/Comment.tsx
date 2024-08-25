import React, { useState, useEffect } from "react";
import { Input, Button } from "@/components/index";
import { IComment } from "@/types/social";
import { useStorage } from "@/hooks/useStorage";
import {
  fetchIncrementCommentLikes,
  fetchDecrementCommentLikes,
} from "@/services/social";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";

interface CommentProps {
  comment: IComment & { replies?: IComment[] };
  onAddReply: (commentId: number, replyText: string) => void;
  onDeleteComment: (commentId: number) => void;
  depth?: number;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onAddReply,
  onDeleteComment,
  depth = 0,
}) => {
  const [replyText, setReplyText] = useState("");
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(comment.likedByUser);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { isLoggedIn, user } = useStorage();
  const { showToast } = useToast();

  useEffect(() => {
    setIsLiked(comment.likedByUser);
  }, [comment.likedByUser]);

  const handleReplySubmit = () => {
    if (replyText.trim() === "") return;
    onAddReply(comment.id, replyText);
    setReplyText("");
    setShowReplyInput(false);
  };

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      showToast("로그인이 필요합니다.", constants.TOAST_TYPES.WARNING);
      return;
    }

    if (user) {
      if (isLiked) {
        const { success, err } = await fetchDecrementCommentLikes(
          comment.id,
          user.id
        );
        if (success) {
          setLikes((prevLikes) => prevLikes - 1);
          setIsLiked(false);
        }
      } else {
        const { success, err } = await fetchIncrementCommentLikes(
          comment.id,
          user.id
        );
        if (success) {
          setLikes((prevLikes) => prevLikes + 1);
          setIsLiked(true);
        } else {
          if (err && err.status === 409) {
            showToast(
              "이미 좋아요를 선택하였습니다.",
              constants.TOAST_TYPES.ERROR
            );
          }
        }
      }
    }
  };

  const handleDeleteClick = () => {
    onDeleteComment(comment.id);
  };

  return (
    <div className={`my-4 ${depth > 0 ? `ml-${depth * 4}` : ""}`}>
      <div className="flex">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
        <div className="ml-4 flex-1">
          <div className="text-gray-700 flex items-center justify-between">
            <div>
              <span className="font-semibold text-green-500">
                {comment.username}
              </span>
              <span className="ml-2 text-gray-400 text-sm">
                {comment.createdAt}
              </span>
            </div>
            <div className="flex items-center">
              {isLoggedIn && (
                <Button
                  size="small"
                  color="none"
                  onClick={() => setShowReplyInput(!showReplyInput)}
                  className="ml-4 text-xs text-green-500 hover:bg-black hover:text-green-300"
                >
                  댓글달기
                </Button>
              )}
              {isLoggedIn && user?.id === comment.userId && (
                <Button
                  size="small"
                  color="none"
                  onClick={handleDeleteClick}
                  className="ml-4 text-xs text-red-400 hover:bg-black hover:text-red-300"
                >
                  삭제
                </Button>
              )}
            </div>
          </div>
          <div className="mt-2 text-gray-300">{comment.content}</div>
          <div className="flex items-center mt-2">
            <svg
              onClick={handleLikeClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isLiked ? "#44D62C" : "none"}
              stroke="#44D62C"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 cursor-pointer"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="ml-2 text-sm text-green-500">{likes}</span>
          </div>
          {showReplyInput && (
            <div className="flex flex-row space-y-2 mt-4 mb-8">
              <Input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="답글을 입력하세요."
                className="flex-1 w-full text-green-500 border-green-500 focus:border-green-300"
              />
              <Button
                size="small"
                color="none"
                onClick={handleReplySubmit}
                className="self-end whitespace-nowrap border ml-5 text-green-500 hover:bg-black hover:text-green-300"
              >
                답글 작성
              </Button>
            </div>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-4 mt-4">
              <Button
                size="small"
                color="none"
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-green-500 hover:bg-black hover:text-green-300"
              >
                {showReplies
                  ? "대댓글 숨기기"
                  : `대댓글 보기 (${comment.replies.length})`}
              </Button>
              {showReplies && (
                <div className="mt-4">
                  {comment.replies.map((reply) => (
                    <Comment
                      key={reply.id}
                      comment={reply}
                      onAddReply={onAddReply}
                      onDeleteComment={onDeleteComment}
                      depth={depth + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
