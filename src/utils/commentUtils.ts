import { IComment } from "@/types/social";

export function buildCommentTree(
  comments: IComment[]
): (IComment & { replies?: IComment[] })[] {
  const commentMap: { [key: number]: IComment & { replies?: IComment[] } } = {};
  const rootComments: (IComment & { replies?: IComment[] })[] = [];

  comments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  comments.forEach((comment) => {
    if (comment.parentCommentId) {
      const parent = commentMap[comment.parentCommentId];
      if (parent) {
        parent.replies?.push(commentMap[comment.id]);
      }
    } else {
      rootComments.push(commentMap[comment.id]);
    }
  });

  return rootComments;
}

export const flattenCommentTree = (
  commentTree: (IComment & { replies?: IComment[] })[]
): IComment[] => {
  const flatList: IComment[] = [];

  const flatten = (comments: (IComment & { replies?: IComment[] })[]) => {
    comments.forEach((comment) => {
      flatList.push(comment);
      if (comment.replies) {
        flatten(comment.replies);
      }
    });
  };

  flatten(commentTree);
  return flatList;
};
