export const parseDate = (dateString: string): Date => {
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1;
  const day = parseInt(dateString.substring(6, 8), 10);
  return new Date(year, month, day);
};

const strChangeDate = (date: string | Date): Date => {
  if (date instanceof Date) {
    return date;
  }
  return new Date(date);
};

export const formatDate = (date: string | Date): string => {
  const parsedDate = strChangeDate(date);
  const year = parsedDate.getFullYear();
  const month = `0${parsedDate.getMonth() + 1}`.slice(-2);
  const day = `0${parsedDate.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export const formatDateTime = (date: string | Date): string => {
  const parsedDate = strChangeDate(date);
  const year = parsedDate.getFullYear();
  const month = `0${parsedDate.getMonth() + 1}`.slice(-2);
  const day = `0${parsedDate.getDate()}`.slice(-2);
  const hours = `0${parsedDate.getHours()}`.slice(-2);
  const minutes = `0${parsedDate.getMinutes()}`.slice(-2);
  const seconds = `0${parsedDate.getSeconds()}`.slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const timeAgo = (date: string | Date): string => {
  const parsedDate = strChangeDate(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval !== 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval !== 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval !== 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval !== 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return `${interval} minute${interval !== 1 ? "s" : ""} ago`;

  return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
};
