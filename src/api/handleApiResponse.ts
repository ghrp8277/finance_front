import { logError } from "./logger";
import { extractErrorMessage } from "./extractErrorMessage";
import { IApiResponse } from "@/types/common";

export const handleApiResponse = async <T>(
  apiCall: Promise<T>
): Promise<IApiResponse<T>> => {
  try {
    const data = await apiCall;
    return { success: true, data };
  } catch (error) {
    const { message, json } = await extractErrorMessage(error);
    logError(`API request failed: ${message}`, error);
    return { success: false, error: json || message };
  }
};
