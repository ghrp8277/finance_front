export interface ICheckUsernameResponse {
  isDuplicate: boolean;
}

export interface ISignUpResponse {
  user: {
    id: number;
    username: string;
  };
}

export interface IGetUserByIdResponse {
  results: {
    id: number;
    email: string;
    greeting: string;
    joinDate: string;
    profileImageUrl: string;
    username: string;
  };
}
