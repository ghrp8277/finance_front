export interface ILoginResponse {
  authenticated: boolean;
  accessToken: string;
  userId: number;
}

export interface IAuthStatusResponse {
  isAuthenticated: boolean;
  user: {
    id: number;
    username: string;
  };
}
