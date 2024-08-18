export const logError = (message: string, error: any) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ${message}`, error);
};
