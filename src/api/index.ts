import ky from "ky";
import { handleApiResponse } from "./handleApiResponse";
import { IApiResponse } from "@/types/common";
import { getItem } from "@/utils/localStorage";
import constants from "@/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const api = ky.create({
  prefixUrl: API_URL,
  timeout: 10000,
  credentials: "include",
});

const getAuthorizationHeader = (): Record<string, string> => {
  const user = JSON.parse(getItem(constants.LOCAL_STORAGE.USER) || "{}");
  if (user?.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` };
  }
  return {};
};

const getUserIdHeader = (): Record<string, string> => {
  const user = JSON.parse(getItem(constants.LOCAL_STORAGE.USER) || "{}");
  const headers: Record<string, string> = {};

  if (user?.id) {
    headers["user-id"] = user.id.toString();
  }

  return headers;
};

export const get = async <T>(
  url: string,
  params?: Record<string, string | number | boolean>,
  includeUserId: boolean = false
): Promise<IApiResponse<T>> => {
  const headers = {
    ...(includeUserId ? getUserIdHeader() : {}),
  };

  const options: any = {
    searchParams: params,
    headers,
  };

  return handleApiResponse<T>(api.get(url, options).json<T>());
};

export const post = async <T>(
  url: string,
  data: Record<string, any> | FormData,
  token: boolean = false,
  withCredentials: boolean = false
): Promise<IApiResponse<T>> => {
  const options: any = {
    method: "POST",
    credentials: withCredentials ? "include" : "same-origin",
  };

  if (data instanceof FormData) {
    options.body = data;
  } else {
    options.json = data;
  }

  if (token) {
    options.headers = {
      ...options.headers,
      ...getAuthorizationHeader(),
    };
  }

  return handleApiResponse<T>(api.post(url, options).json<T>());
};

export const put = async <T>(
  url: string,
  data: Record<string, any>,
  token: boolean = false,
  withCredentials: boolean = false
): Promise<IApiResponse<T>> => {
  const options: any = {
    json: data,
    credentials: withCredentials ? "include" : "same-origin",
  };

  if (token) {
    options.headers = {
      ...options.headers,
      ...getAuthorizationHeader(),
    };
  }

  return handleApiResponse<T>(api.put(url, options).json<T>());
};

export const patch = async <T>(
  url: string,
  data: Record<string, any>,
  token: boolean = false,
  withCredentials: boolean = false
): Promise<IApiResponse<T>> => {
  const options: any = {
    json: data,
    credentials: withCredentials ? "include" : "same-origin",
  };

  if (token) {
    options.headers = {
      ...options.headers,
      ...getAuthorizationHeader(),
    };
  }

  return handleApiResponse<T>(api.patch(url, options).json<T>());
};

export const del = async (
  url: string,
  token: boolean = false,
  data?: Record<string, any>,
  withCredentials: boolean = false
): Promise<IApiResponse<void>> => {
  const options: any = {
    credentials: withCredentials ? "include" : "same-origin",
  };

  if (token) {
    options.headers = {
      ...options.headers,
      ...getAuthorizationHeader(),
    };
  }

  if (data) {
    options.json = data;
  }

  return handleApiResponse<void>(api.delete(url, options).json<void>());
};
