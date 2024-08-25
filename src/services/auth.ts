import { post } from "@/api";
import { ILoginResponse } from "@/types/auth";
import { getLoginModel, getLogoutModel } from "@/models/auth";

const AUTH_URL = "auth";

export const fetchLogin = async (username: string, password: string) => {
  const response = await post<ILoginResponse>(
    `${AUTH_URL}/login`,
    {
      username,
      password,
    },
    true
  );

  return getLoginModel(response);
};

export const fetchLogout = async (userId: number) => {
  const response = await post(
    `${AUTH_URL}/logout`,
    {
      userId,
    },
    true
  );

  return getLogoutModel(response);
};
