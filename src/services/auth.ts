import { get, post } from "@/api";
import { IAuthStatusResponse, ILoginResponse } from "@/types/auth";
import {
  getAuthStatusModel,
  getLoginModel,
  getLogoutModel,
} from "@/models/auth";

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

export const fetchAuthStatus = async () => {
  const response = await get<IAuthStatusResponse>(
    `${AUTH_URL}/status`,
    undefined,
    false,
    true
  );
  return getAuthStatusModel(response);
};
