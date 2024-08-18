export interface ICheckUsernameResponse {
  isDuplicate: boolean;
}

export interface ISignUpResponse {
  user: {
    id: number;
    username: string;
  };
}
