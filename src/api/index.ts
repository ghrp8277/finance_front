import ky from "ky";
import { handleApiResponse } from "./handleApiResponse";
import { IApiResponse } from "@/types/common";
import useAuthStore from "@/stores/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const api = ky.create({
  prefixUrl: API_URL,
  timeout: 10000,
  credentials: "include",
});

const getUserIdHeader = (): Record<string, string> => {
  const user = useAuthStore.getState().user;
  const headers: Record<string, string> = {};

  if (user?.id) {
    headers["user-id"] = user.id.toString();
  }

  return headers;
};

export const get = async <T>(
  url: string,
  params?: Record<string, string | number | boolean>,
  includeUserId: boolean = false,
  withCredentials: boolean = true
): Promise<IApiResponse<T>> => {
  const headers = {
    ...(includeUserId ? getUserIdHeader() : {}),
  };

  const options: any = {
    searchParams: params,
    headers,
    credentials: withCredentials ? "include" : "same-origin",
  };

  return handleApiResponse<T>(api.get(url, options).json<T>());
};

export const post = async <T>(
  url: string,
  data: Record<string, any> | FormData,
  withCredentials: boolean = true
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

  return handleApiResponse<T>(api.post(url, options).json<T>());
};

export const put = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = true
): Promise<IApiResponse<T>> => {
  const options: any = {
    json: data,
    credentials: withCredentials ? "include" : "same-origin",
  };

  return handleApiResponse<T>(api.put(url, options).json<T>());
};

export const patch = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = true
): Promise<IApiResponse<T>> => {
  const options: any = {
    json: data,
    credentials: withCredentials ? "include" : "same-origin",
  };

  return handleApiResponse<T>(api.patch(url, options).json<T>());
};

export const del = async (
  url: string,
  data?: Record<string, any>,
  withCredentials: boolean = true
): Promise<IApiResponse<void>> => {
  const options: any = {
    credentials: withCredentials ? "include" : "same-origin",
  };

  if (data) {
    options.json = data;
  }

  return handleApiResponse<void>(api.delete(url, options).json<void>());
};
