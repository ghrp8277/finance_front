export const extractErrorMessage = async (
  error: any
): Promise<{ message: string; json: any | null }> => {
  if (error.response) {
    try {
      const responseBody = await error.response.json();
      return { message: JSON.stringify(responseBody), json: responseBody };
    } catch (jsonError) {
      return { message: error.message, json: null };
    }
  } else {
    return { message: error.message, json: null };
  }
};
