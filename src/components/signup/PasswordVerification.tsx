import React from "react";
import { Input } from "@/components";

type PasswordVerificationProps = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordConfirm: string;
  setPasswordConfirm: React.Dispatch<React.SetStateAction<string>>;
  isPasswordMatch: boolean | null;
  setIsPasswordMatch: React.Dispatch<React.SetStateAction<boolean | null>>;
  isPasswordValid: boolean | null;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const PasswordVerification: React.FC<PasswordVerificationProps> = ({
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  isPasswordMatch,
  setIsPasswordMatch,
  isPasswordValid,
  setIsPasswordValid,
}) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(value.length >= 8);
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setIsPasswordMatch(value === password);
  };

  return (
    <>
      <div className="mb-6">
        <label className="block text-green-razer !text-sm mb-2">
          비밀번호 <span className="text-red-500">*</span>
        </label>
        <Input
          type="password"
          placeholder="비밀번호 입력(8~20자)"
          value={password}
          onChange={handlePasswordChange}
          className={`text-sm text-green-razer bg-black placeholder-gray-500 placeholder-sm ${
            isPasswordValid === false
              ? "border-red-500"
              : isPasswordValid === true
              ? "border-green-500"
              : ""
          }`}
        />
      </div>

      <div className="mb-6">
        <label className="block text-green-razer !text-sm mb-2">
          비밀번호 확인 <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center">
          <Input
            type="password"
            placeholder="비밀번호 재입력"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            className={`text-sm text-green-razer bg-black placeholder-gray-500 placeholder-sm ${
              isPasswordMatch === false
                ? "border-red-500"
                : isPasswordMatch === true
                ? "border-green-500"
                : ""
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default PasswordVerification;
