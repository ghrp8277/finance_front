import React, { useState } from "react";
import { Button } from "../components";
import { fetchLogin } from "@/services/auth";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";
import { setItem } from "@/utils/localStorage";
import { useNavigate } from "@/hooks/useNavigate";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const { navigateToMainPage, navigateToSignUp } = useNavigate();

  const handleLoginClick = async () => {
    if (!username) {
      showToast("유저명을 입력해 주세요.", constants.TOAST_TYPES.WARNING);
      return;
    }

    if (!password) {
      showToast("암호를 입력해 주세요.", constants.TOAST_TYPES.WARNING);
      return;
    }
    setError(null);

    const { success, authenticated, userId } = await fetchLogin(
      username,
      password
    );

    if (success && authenticated) {
      const user = JSON.stringify({
        id: userId,
        username,
      });
      setItem(
        constants.LOCAL_STORAGE.LOGIN,
        String(constants.DEFAULT_BOOL_TRUE)
      );
      setItem(constants.LOCAL_STORAGE.USER, user);
      navigateToMainPage();

      showToast(`반갑습니다. ${username}님`, constants.TOAST_TYPES.SUCCESS);
    } else {
      showToast(`로그인에 실패하였습니다.`, constants.TOAST_TYPES.ERROR);
    }
  };

  const handleSignUpClick = () => {
    navigateToSignUp();
  };

  const handleMainClick = () => {
    navigateToMainPage();
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
      <div className="p-10 w-full min-h-[800px] max-w-sm bg-black rounded-sm shadow-lg border border-gray-800 flex flex-col">
        <div className="flex-grow">
          <h1 className="text-md font-bold mb-6 text-left text-white">
            STOCK DISCUSSION 로그인
          </h1>

          <div className="mb-6">
            <input
              type="text"
              className="w-full p-2 bg-black text-sm text-green-razer border border-gray-500 placeholder-gray-500 placeholder-sm focus:outline-none focus:border-green-500"
              placeholder="유저명"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              className="w-full p-2 bg-black text-sm text-green-razer border border-gray-500 placeholder-gray-500 placeholder-sm focus:outline-none focus:border-green-500"
              placeholder="암호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="flex justify-end mt-6 text-white">
            <div
              onClick={handleSignUpClick}
              className="text-xs hover:cursor-pointer hover:text-green-300"
            >
              비밀번호를 잊으셨습니까?
            </div>
          </div>

          <Button
            type="submit"
            size="medium"
            color="green"
            purpose="primary"
            className="w-full !text-black text-sm mt-8 hover:text-green-300 hover:border-green-300"
            onClick={handleLoginClick}
          >
            로그인
          </Button>

          <div
            onClick={handleSignUpClick}
            className="mt-10 text-center text-sm text-white hover:cursor-pointer hover:text-green-300"
          >
            <div className="text-gray-300 mb-5 text-xs">
              아직 계정이 없으십니까?
            </div>
            계정 만들기 <span className="text-green-300">&gt;</span>
          </div>

          <div
            className="mt-5 text-center text-sm text-white hover:cursor-pointer hover:text-green-300"
            onClick={handleMainClick}
          >
            메인페이지 <span className="text-green-300">&gt;</span>
          </div>
        </div>

        <div className="text-center text-white mt-auto flex justify-center items-center">
          <img src="/razer-logo.svg" alt="Razer Logo" className="w-10 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
