import React, { useState } from "react";
import { fetchEmailSend, fetchEmailVerify } from "@/services/email";
import CountDown from "@/components/common/CountDown";
import Button from "../common/Button";
import Input from "../common/Input";

type EmailVerificationProps = {
  email: string;
  setEmail: (email: string) => void;
};

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  setEmail,
}) => {
  const [isCountCompleted, setIsCountCompleted] = useState(true);
  const [countHide, setCountHide] = useState(true);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState<boolean | null>(null);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleComplete = () => {
    setIsCountCompleted(true);
    setCountHide(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleEmailSend = async () => {
    const response = await fetchEmailSend(email);

    if (response) {
      setIsCountCompleted(false);
      setCountHide(false);
      setIsVerificationSent(true);
      setEmailDisabled(true);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleCodeVerify = async () => {
    const isValid = await fetchEmailVerify(email, verificationCode);
    setIsCodeValid(isValid);
  };

  return (
    <div className="mb-6">
      <label className="block text-green-razer !text-sm mb-2">
        이메일 주소 <span className="text-red-500">*</span>
      </label>
      <div className="flex">
        <Input
          type="text"
          placeholder="example@gmail.com"
          className={`text-sm text-green-razer mr-2 bg-black placeholder-gray-500 placeholder-sm ${
            isEmailValid ? "border-green-500" : ""
          }`}
          value={email}
          onChange={handleEmailChange}
          disabled={emailDisabled}
        />
        <CountDown
          className="text-sm my-auto mr-1"
          initialTime="3:00"
          color="green"
          hide={countHide}
          onComplete={handleComplete}
        />
        <Button
          type="button"
          color="green"
          size="small"
          className="!text-black hover:text-green-300 px-4 rounded-r text-xs border border-green-400"
          disabled={!isCountCompleted || !isEmailValid}
          onClick={handleEmailSend}
        >
          메일 인증
        </Button>
      </div>

      {isVerificationSent && (
        <div className="mt-4">
          <label className="block text-green-400 mb-2">
            인증번호 <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <Input
              type="text"
              placeholder="인증번호 입력"
              className="text-sm text-green-razer mr-2 bg-black placeholder-gray-500 placeholder-sm"
              value={verificationCode}
              onChange={handleCodeChange}
              maxLength={6}
            />
            <Button
              type="button"
              color="green"
              size="small"
              className="!text-black hover:text-green-300 px-4 rounded-r text-xs border border-green-400"
              onClick={handleCodeVerify}
            >
              인증 확인
            </Button>
          </div>
          {isCodeValid === false && (
            <p className="text-red-500 mt-2">인증번호가 올바르지 않습니다.</p>
          )}
          {isCodeValid === true && (
            <p className="text-green-500 mt-2">인증이 완료되었습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
