export interface IPaging {
  page: number;
  pageSize: number;
  searchTerm?: string;
  searchCategory?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: any;
}
