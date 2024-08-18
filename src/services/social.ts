import { get, post, del } from "@/api";
import constants from "@/constants";
import {
  getCreateCommentModel,
  getCreatePostModel,
  getCreateReplyModel,
  getDecrementCommentLikesModel,
  getDeleteCommentModel,
  getFollowModel,
  getIncrementCommentLikesModel,
  getPostDetailModel,
  getPostsModel,
  getUnfollowedUsersModel,
  getUnreadFeedActivitiesModel,
} from "@/models/social";
import { IPaging } from "@/types/common";
import {
  ICreateCommentResponse,
  ICreatePostDto,
  ICreatePostResponse,
  ICreateReplyResponse,
  IFollowResponse,
  IGetPostsResponse,
  IGetUnfollowedUsersResponse,
  IGetUnreadFeedActivitiesResponse,
  IPostDetailResponse,
} from "@/types/social";

const SOCIAL_URL = "social";

export const fetchGetPosts = async (
  code: string,
  paging: IPaging = {
    page: constants.DEFAULT_PAGING.PAGE,
    pageSize: constants.DEFAULT_PAGING.PAGESIZE,
  }
) => {
  const response = await get<IGetPostsResponse>(
    `${SOCIAL_URL}/posts/symbol/${code}?page=${paging.page}&pageSize=${paging.pageSize}`
  );
  return getPostsModel(response);
};

export const fetchCreatePost = async (createPostDto: ICreatePostDto) => {
  const { userId, title, author, accountName, content, stockCode } =
    createPostDto;
  const response = await post<ICreatePostResponse>(
    `${SOCIAL_URL}/posts`,
    {
      userId,
      title,
      author,
      accountName,
      content,
      stockCode,
    },
    true
  );

  return getCreatePostModel(response);
};

export const fetchGetPostDetail = async (id: number) => {
  const response = await get<IPostDetailResponse>(
    `${SOCIAL_URL}/posts/detail/${id}`,
    undefined,
    true
  );
  return getPostDetailModel(response);
};

export const fetchGetPublicPostDetail = async (id: number) => {
  const response = await get<IPostDetailResponse>(
    `${SOCIAL_URL}/posts/public/detail/${id}`
  );
  return getPostDetailModel(response);
};

export const fetchCreateComment = async (
  id: number,
  userId: number,
  username: string,
  content: string
) => {
  const response = await post<ICreateCommentResponse>(
    `${SOCIAL_URL}/posts/${id}/comments`,
    {
      userId,
      username,
      content,
    },
    true
  );

  return getCreateCommentModel(response);
};

export const fetchCreateReply = async (
  id: number,
  commentId: number,
  userId: number,
  username: string,
  content: string
) => {
  const response = await post<ICreateReplyResponse>(
    `${SOCIAL_URL}/posts/${id}/comments/${commentId}/reply`,
    {
      userId,
      username,
      content,
    },
    true
  );

  return getCreateReplyModel(response);
};

export const fetchDeleteComment = async (id: number, userId: number) => {
  const response: any = await del(`${SOCIAL_URL}/comments/${id}`, true, {
    userId,
  });
  return getDeleteCommentModel(response);
};

export const fetchIncrementCommentLikes = async (
  id: number,
  userId: number
) => {
  const response = await post(
    `${SOCIAL_URL}/comments/${id}/like`,
    {
      userId,
    },
    true
  );
  return getIncrementCommentLikesModel(response);
};

export const fetchDecrementCommentLikes = async (
  id: number,
  userId: number
) => {
  const response = await post(
    `${SOCIAL_URL}/comments/${id}/unlike`,
    {
      userId,
    },
    true
  );
  return getDecrementCommentLikesModel(response);
};

export const fetchGetUnFollwedUsers = async (
  paging: IPaging = {
    page: constants.DEFAULT_PAGING.PAGE,
    pageSize: constants.DEFAULT_PAGING.PAGESIZE,
  }
) => {
  const response = await get<IGetUnfollowedUsersResponse>(
    `${SOCIAL_URL}/unfollowed-users?page=${paging.page}&pageSize=${paging.pageSize}`,
    undefined,
    true
  );
  return getUnfollowedUsersModel(response);
};

export const fetchFollowUser = async (
  followerId: number,
  followeeId: number
) => {
  const response = await post<IFollowResponse>(
    `${SOCIAL_URL}/follow`,
    {
      followerId,
      followeeId,
    },
    true
  );

  return getFollowModel(response);
};

export const fetchActivityRead = async (id: number) => {
  const response = await post(
    `${SOCIAL_URL}/activities/${id}/mark-read`,
    {},
    true
  );
  return response;
};

export const fetchGetActivitiesUnRead = async (
  paging: IPaging = {
    page: constants.DEFAULT_PAGING.PAGE,
    pageSize: constants.DEFAULT_PAGING.PAGESIZE,
  }
) => {
  const response = await get<IGetUnreadFeedActivitiesResponse>(
    `${SOCIAL_URL}/activities/unread?page=${paging.page}&pageSize=${paging.pageSize}`,
    undefined,
    true
  );
  return getUnreadFeedActivitiesModel(response);
};
