import constants from "@/constants";
import { IApiResponse } from "@/types/common";
import { IEmailVerifyResponse } from "@/types/email";

export const getEmailVerifyModel = (
  res: IApiResponse<IEmailVerifyResponse>
) => {
  const success = res.success;

  if (success) {
    const results = res?.data;

    const isValid = results?.isValid ?? constants.DEFAULT_BOOL;

    return isValid;
  }

  return constants.DEFAULT_BOOL;
};
