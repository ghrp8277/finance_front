import constants from "@/constants";
import { IApiResponse } from "@/types/common";
import {
  ICheckUsernameResponse,
  IGetUserByIdResponse,
  ISignUpResponse,
} from "@/types/user";

export const getCheckUsernameModel = (
  res: IApiResponse<ICheckUsernameResponse>
) => {
  const success = res.success;

  if (success) {
    const results = res?.data;
    return results?.isDuplicate ?? constants.DEFAULT_BOOL;
  }

  return constants.DEFAULT_BOOL;
};

export const getSignupModel = (res: IApiResponse<ISignUpResponse>) => {
  const success = res.success;

  if (success) {
    const results = res?.data;
    return {
      id: results?.user.id ?? constants.DEFAULT_NUM,
      username: results?.user.username ?? constants.DEFAULT_STR,
      success,
    };
  }

  return {
    id: constants.DEFAULT_NUM,
    username: constants.DEFAULT_STR,
    success,
    err: res.error,
  };
};

export const getChangePasswordModel = (res: IApiResponse<any>) => {
  const success = res.success;

  return {
    success,
    err: res.error,
  };
};

export const getUserByIdModel = (res: IApiResponse<IGetUserByIdResponse>) => {
  const success = res.success;

  if (success) {
    const results = res?.data?.results;

    return {
      id: results?.id ?? constants.DEFAULT_NUM,
      email: results?.email ?? constants.DEFAULT_STR,
      greeting: results?.greeting ?? constants.DEFAULT_STR,
      joinDate: results?.joinDate ?? constants.DEFAULT_STR,
      profileImageUrl: results?.profileImageUrl ?? constants.DEFAULT_STR,
      username: results?.username ?? constants.DEFAULT_STR,
      success,
    };
  }

  return {
    id: constants.DEFAULT_NUM,
    email: constants.DEFAULT_STR,
    greeting: constants.DEFAULT_STR,
    joinDate: constants.DEFAULT_STR,
    profileImageUrl: constants.DEFAULT_STR,
    username: constants.DEFAULT_STR,
    success,
    err: res.error,
  };
};
