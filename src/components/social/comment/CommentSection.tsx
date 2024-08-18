import React, { useState } from "react";
import { Input, Button } from "@/components/index";
import Comment from "./Comment";
import Dialog from "@/components/common/Dialog";
import {
  fetchCreateComment,
  fetchCreateReply,
  fetchDeleteComment,
} from "@/services/social";
import { IComment } from "@/types/social";
import { buildCommentTree } from "@/utils/commentUtils";
import { useStorage } from "@/hooks/useStorage";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";

type CommentSectionProps = {
  id: number;
  comments: IComment[];
};

const CommentSection: React.FC<CommentSectionProps> = ({
  id,
  comments: initialComments,
}) => {
  const [comments, setComments] = useState(initialComments);
  const [commentTree, setCommentTree] = useState(
    buildCommentTree(initialComments)
  );
  const [newComment, setNewComment] = useState("");
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user, isLoggedIn } = useStorage();
  const { showToast } = useToast();

  const handleAddReply = async (parentCommentId: number, replyText: string) => {
    if (replyText.trim() === "") {
      showToast("댓글 내용이 비어있습니다.", constants.TOAST_TYPES.INFO);
      return;
    }

    if (user) {
      const newCommentData = await fetchCreateReply(
        id,
        parentCommentId,
        user.id,
        user.username,
        replyText
      );
      if (newCommentData.success) {
        const updatedComments = [...comments, newCommentData];
        setComments(updatedComments);
        setCommentTree(buildCommentTree(updatedComments));
        showToast("새 댓글이 작성되었습니다.", constants.TOAST_TYPES.SUCCESS);
      }
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      showToast("댓글 내용이 비어있습니다.", constants.TOAST_TYPES.INFO);
      return;
    }

    if (user) {
      const newCommentData = await fetchCreateComment(
        id,
        user.id,
        user.username,
        newComment
      );
      if (newCommentData.success) {
        const updatedComments = [...comments, newCommentData];
        setComments(updatedComments);
        setCommentTree(buildCommentTree(updatedComments));
        setNewComment("");
        showToast("새 댓글이 작성되었습니다.", constants.TOAST_TYPES.SUCCESS);
      }
    }
  };

  const confirmDeleteComment = (commentId: number) => {
    setCommentToDelete(commentId);
    setIsDialogOpen(true);
  };

  const handleDeleteComment = async () => {
    if (user && commentToDelete !== null) {
      const { success, ids } = await fetchDeleteComment(
        commentToDelete,
        user.id
      );

      if (success && ids) {
        const updatedComments = comments.filter(
          (comment) => !ids.includes(comment.id)
        );
        setComments(updatedComments);
        setCommentTree(buildCommentTree(updatedComments));
        showToast("댓글이 삭제되었습니다.", constants.TOAST_TYPES.SUCCESS);
      }
      setIsDialogOpen(false);
    }
  };
  console.log(comments);
  return (
    <div className="mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4 text-green-500">
        댓글 <span className="text-green-300">{comments.length}</span>
      </h3>
      {isLoggedIn && (
        <div className="flex space-x-4 mt-4 mb-8">
          <Input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="text-green-500 border-green-500 focus:border-green-300"
          />
          <Button
            size="small"
            color="neonGreen"
            onClick={handleAddComment}
            className="whitespace-nowrap border-green-500 hover:bg-green-600"
          >
            댓글 작성
          </Button>
        </div>
      )}
      {commentTree.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onAddReply={handleAddReply}
          onDeleteComment={(id) => confirmDeleteComment(id)}
        />
      ))}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <div className="p-4 rounded text-green-500">
          <h2 className="text-xl font-semibold mb-4">
            정말로 댓글을 삭제하시겠습니까?
          </h2>
          <div className="flex justify-end space-x-4">
            <Button
              size="small"
              color="none"
              onClick={() => setIsDialogOpen(false)}
              className="whitespace-nowrap border-green-500 text-green-500 hover:text-green-300"
            >
              취소
            </Button>
            <Button
              size="small"
              color="red"
              onClick={handleDeleteComment}
              className="whitespace-nowrap border-red-500 hover:bg-red-600"
            >
              삭제
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CommentSection;
