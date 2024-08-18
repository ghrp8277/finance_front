import { get, post } from "@/api";
import { ICheckUsernameResponse, ISignUpResponse } from "@/types/user";
import { getCheckUsernameModel, getSignupModel } from "@/models/users";

const USERS_URL = "users";

export const fetchCheckUsername = async (username: string) => {
  const response = await get<ICheckUsernameResponse>(
    `${USERS_URL}/check-username`,
    { username }
  );
  return getCheckUsernameModel(response);
};

export const fetchSignUp = async (
  username: string,
  password: string,
  email: string,
  profileImage?: File
) => {
  const user = {
    username,
    password,
    email,
    profile: {
      greeting: `Hello, I'm ${username}!`,
    },
  };

  const formData = new FormData();
  formData.append(
    "user",
    new Blob([JSON.stringify(user)], { type: "application/json" })
  );

  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  const response = await post<ISignUpResponse>(
    `${USERS_URL}/register`,
    formData
  );

  return getSignupModel(response);
};
