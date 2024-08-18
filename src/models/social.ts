import constants from "@/constants";
import { IApiResponse } from "@/types/common";
import {
  ICreateCommentResponse,
  ICreatePostResponse,
  ICreateReplyResponse,
  IDeleteCommentResponse,
  IFollowResponse,
  IGetPostsResponse,
  IGetUnfollowedUsersResponse,
  IGetUnreadFeedActivitiesResponse,
  IPostDetailResponse,
} from "@/types/social";

export const getPostsModel = (res: IApiResponse<IGetPostsResponse>) => {
  const success = res.success;

  if (success) {
    const results = res?.data;
    const posts = results?.results;

    return {
      total_elements: posts?.total_elements ?? constants.DEFAULT_NUM,
      current_page: posts?.current_page ?? constants.DEFAULT_NUM,
      total_pages: posts?.total_pages ?? constants.DEFAULT_NUM,
      posts: posts?.posts ?? constants.DEFAULT_ITEMS,
    };
  }

  return {
    total_elements: constants.DEFAULT_NUM,
    current_page: constants.DEFAULT_NUM,
    total_pages: constants.DEFAULT_NUM,
    posts: constants.DEFAULT_ITEMS,
  };
};

export const getCreatePostModel = (res: IApiResponse<ICreatePostResponse>) => {
  const success = res.success;

  if (success) {
    const results = res.data;
    const post = results?.results;

    return {
      postStockName: post?.post_stock_name ?? constants.DEFAULT_STR,
      postId: post?.post_id ?? constants.DEFAULT_NUM,
      userId: post?.user_id ?? constants.DEFAULT_NUM,
      postStockCode: post?.post_stock_code ?? constants.DEFAULT_STR,
    };
  }

  return {
    postStockName: constants.DEFAULT_STR,
    postId: constants.DEFAULT_NUM,
    userId: constants.DEFAULT_NUM,
    postStockCode: constants.DEFAULT_STR,
  };
};

export const getPostDetailModel = (res: IApiResponse<IPostDetailResponse>) => {
  const success = res.success;

  if (success) {
    const postData = res.data?.results;

    return {
      id: postData?.id ?? constants.DEFAULT_NUM,
      accountName: postData?.accountName ?? constants.DEFAULT_STR,
      author: postData?.author ?? constants.DEFAULT_STR,
      content: postData?.content ?? constants.DEFAULT_STR,
      createdAt: postData?.createdAt ?? constants.DEFAULT_STR,
      likes: postData?.likes ?? constants.DEFAULT_NUM,
      title: postData?.title ?? constants.DEFAULT_STR,
      userId: postData?.userId ?? constants.DEFAULT_NUM,
      views: postData?.views ?? constants.DEFAULT_NUM,
      comments: postData?.comments ?? constants.DEFAULT_ITEMS,
    };
  }

  return {
    id: constants.DEFAULT_NUM,
    accountName: constants.DEFAULT_STR,
    author: constants.DEFAULT_STR,
    content: constants.DEFAULT_STR,
    createdAt: constants.DEFAULT_STR,
    likes: constants.DEFAULT_NUM,
    title: constants.DEFAULT_STR,
    userId: constants.DEFAULT_NUM,
    views: constants.DEFAULT_NUM,
    comments: constants.DEFAULT_ITEMS,
  };
};

export const getCreateCommentModel = (
  res: IApiResponse<ICreateCommentResponse>
) => {
  const success = res.success;

  if (success) {
    const commentData = res.data?.results;

    return {
      success,
      id: commentData?.id ?? constants.DEFAULT_NUM,
      content: commentData?.content ?? constants.DEFAULT_STR,
      createdAt: commentData?.createdAt ?? constants.DEFAULT_STR,
      likes: commentData?.likes ?? constants.DEFAULT_NUM,
      parentCommentId: commentData?.parentCommentId ?? null,
      postId: commentData?.postId ?? constants.DEFAULT_NUM,
      userId: commentData?.userId ?? constants.DEFAULT_NUM,
      username: commentData?.username ?? constants.DEFAULT_STR,
      likedByUser: commentData?.likedByUser ?? constants.DEFAULT_BOOL,
    };
  }

  return {
    success,
    id: constants.DEFAULT_NUM,
    content: constants.DEFAULT_STR,
    createdAt: constants.DEFAULT_STR,
    likes: constants.DEFAULT_NUM,
    parentCommentId: null,
    postId: constants.DEFAULT_NUM,
    userId: constants.DEFAULT_NUM,
    username: constants.DEFAULT_STR,
    likedByUser: constants.DEFAULT_BOOL,
  };
};

export const getCreateReplyModel = (
  res: IApiResponse<ICreateReplyResponse>
) => {
  const success = res.success;

  if (success) {
    const commentData = res.data?.results;

    return {
      success,
      id: commentData?.id ?? constants.DEFAULT_NUM,
      content: commentData?.content ?? constants.DEFAULT_STR,
      createdAt: commentData?.createdAt ?? constants.DEFAULT_STR,
      likes: commentData?.likes ?? constants.DEFAULT_NUM,
      parentCommentId: commentData?.parentCommentId ?? null,
      postId: commentData?.postId ?? constants.DEFAULT_NUM,
      userId: commentData?.userId ?? constants.DEFAULT_NUM,
      username: commentData?.username ?? constants.DEFAULT_STR,
      likedByUser: commentData?.likedByUser ?? constants.DEFAULT_BOOL,
    };
  }

  return {
    success,
    id: constants.DEFAULT_NUM,
    content: constants.DEFAULT_STR,
    createdAt: constants.DEFAULT_STR,
    likes: constants.DEFAULT_NUM,
    parentCommentId: null,
    postId: constants.DEFAULT_NUM,
    userId: constants.DEFAULT_NUM,
    username: constants.DEFAULT_STR,
    likedByUser: constants.DEFAULT_BOOL,
  };
};

export const getDeleteCommentModel = (
  res: IApiResponse<IDeleteCommentResponse>
) => {
  const success = res.success;

  if (success) {
    const results = res.data?.results;

    return {
      success,
      ids: results?.deletedCommentIds,
    };
  }
  return {
    success,
    ids: constants.DEFAULT_ITEMS,
  };
};

export const getIncrementCommentLikesModel = (res: IApiResponse<any>) => {
  return res.success;
};

export const getDecrementCommentLikesModel = (res: IApiResponse<any>) => {
  return res.success;
};

export const getUnfollowedUsersModel = (
  res: IApiResponse<IGetUnfollowedUsersResponse>
) => {
  const success = res.success;

  if (success) {
    const results = res.data?.results;

    return {
      totalElements: results?.totalElements ?? constants.DEFAULT_NUM,
      currentPage: results?.currentPage ?? constants.DEFAULT_NUM,
      totalPages: results?.totalPages ?? constants.DEFAULT_NUM,
      users: results?.users ?? constants.DEFAULT_ITEMS,
    };
  }

  return {
    totalElements: constants.DEFAULT_NUM,
    currentPage: constants.DEFAULT_NUM,
    totalPages: constants.DEFAULT_NUM,
    users: constants.DEFAULT_ITEMS,
  };
};

export const getUnreadFeedActivitiesModel = (
  res: IApiResponse<IGetUnreadFeedActivitiesResponse>
) => {
  const success = res.success;

  if (success) {
    const results = res.data?.results;

    return {
      totalElements: results?.total_elements ?? constants.DEFAULT_NUM,
      currentPage: results?.current_page ?? constants.DEFAULT_NUM,
      totalPages: results?.total_pages ?? constants.DEFAULT_NUM,
      activities: results?.activities ?? constants.DEFAULT_ITEMS,
    };
  }

  return {
    totalElements: constants.DEFAULT_NUM,
    currentPage: constants.DEFAULT_NUM,
    totalPages: constants.DEFAULT_NUM,
    activities: constants.DEFAULT_ITEMS,
  };
};

export const getFollowModel = (res: IApiResponse<IFollowResponse>) => {
  const success = res.success;

  if (success) {
    const results = res.data?.results;

    return {
      success,
      followerId: results?.follower_id ?? constants.DEFAULT_NUM,
      followeeId: results?.followee_id ?? constants.DEFAULT_NUM,
    };
  }

  return {
    success,
    followerId: constants.DEFAULT_NUM,
    followeeId: constants.DEFAULT_NUM,
  };
};
