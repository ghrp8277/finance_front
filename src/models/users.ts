import constants from "@/constants";
import { IApiResponse } from "@/types/common";
import { ICheckUsernameResponse, ISignUpResponse } from "@/types/user";

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
  };
};
