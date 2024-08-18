import { IApiResponse } from "@/types/common";
import { ILoginResponse } from "@/types/auth";
import constants from "@/constants";

export const getLoginModel = (res: IApiResponse<ILoginResponse>) => {
  const success = res.success;

  if (success) {
    const results = res?.data;

    return {
      success,
      authenticated: results?.authenticated ?? constants.DEFAULT_BOOL,
      accessToken: results?.accessToken ?? constants.DEFAULT_STR,
      userId: results?.userId ?? constants.DEFAULT_NUM,
    };
  }

  return {
    success,
    authenticated: constants.DEFAULT_BOOL,
    accessToken: constants.DEFAULT_STR,
    userId: constants.DEFAULT_NUM,
  };
};

export const getLogoutModel = (res: IApiResponse<any>) => {
  const success = res.success;

  return success;
};
