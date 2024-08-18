import React, { useState, useEffect } from "react";
import { Button } from "../components";
import { fetchSignUp } from "@/services/users";
import EmailVerification from "@/components/signup/EmailVerification";
import UsernameVerification from "@/components/signup/UsernameVerification";
import PasswordVerification from "@/components/signup/PasswordVerification";
import { Tooltip } from "@/components/index";
import { useNavigate } from "@/hooks/useNavigate";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";

const SignupPage = () => {
  const { showToast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { navigateToLogin } = useNavigate();

  useEffect(() => {
    setIsFormValid(
      username !== "" &&
        password !== "" &&
        passwordConfirm !== "" &&
        email !== "" &&
        isPasswordMatch === true &&
        isPasswordValid === true &&
        isDuplicate === false &&
        isImageSelected === true
    );
  }, [
    username,
    password,
    passwordConfirm,
    email,
    isPasswordMatch,
    isPasswordValid,
    isDuplicate,
    isImageSelected,
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsImageSelected(true);
    }
  };

  const handleImageClick = () => {
    document.getElementById("profileImage")?.click();
  };

  const handleSignUp = async () => {
    const { success } = await fetchSignUp(
      username,
      password,
      email,
      profileImage!
    );

    if (success) {
      navigateToLogin();
      showToast("가입이 완료되었습니다.", constants.TOAST_TYPES.SUCCESS);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
      <div className="p-8 w-full max-w-md bg-black rounded-sm shadow-lg border border-gray-800">
        <h1 className="text-md font-bold mb-5 text-left text-white">
          STOCK DISCUSSION 계정 만들기
        </h1>
        <div className="text-xs text-left text-white mb-10">
          STOCK DISCUSSION ID는 STOCK DISCUSSION 서비스에서 사용할 수 있는
          계정입니다.
        </div>
        <div className="mb-6 flex flex-col items-center relative">
          <Tooltip message="프로필 사진 업로드" position="bottom">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 p-1">
                <img
                  src={previewImage || "/default-profile.png"}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-full"
                  onClick={handleImageClick}
                />
              </div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </Tooltip>
        </div>

        <UsernameVerification
          username={username}
          setUsername={setUsername}
          isDuplicate={isDuplicate}
          setIsDuplicate={setIsDuplicate}
        />

        <PasswordVerification
          password={password}
          setPassword={setPassword}
          passwordConfirm={passwordConfirm}
          setPasswordConfirm={setPasswordConfirm}
          isPasswordMatch={isPasswordMatch}
          setIsPasswordMatch={setIsPasswordMatch}
          isPasswordValid={isPasswordValid}
          setIsPasswordValid={setIsPasswordValid}
        />

        <EmailVerification email={email} setEmail={setEmail} />

        <div className="flex justify-between">
          <Button
            type="submit"
            size="medium"
            purpose="primary"
            color="green"
            className="w-full font-bold !text-black text-sm hover:text-green-300"
            disabled={!isFormValid}
            onClick={handleSignUp}
          >
            생성
          </Button>
        </div>

        <div className="mt-10 text-gray-300 text-center text-xs">
          이미 계정이 있으십니까?
          <div
            onClick={navigateToLogin}
            className="text-sm text-white mt-5 hover:cursor-pointer hover:text-green-300"
          >
            로그인<span className="text-green-razer ml-2">&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
