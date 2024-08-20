import React, { useState } from "react";
import Dialog from "./Dialog";
import Button from "./Button";
import CountDown from "./CountDown";
import { fetchEmailSend, fetchEmailVerify } from "@/services/email";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";

interface CodeInputDialogProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CodeInputDialog: React.FC<CodeInputDialogProps> = ({
  isOpen,
  onClose,
  email,
  onSuccess,
}) => {
  const [isCountCompleted, setIsCountCompleted] = useState(true);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [countHide, setCountHide] = useState(true);
  const { showToast } = useToast();

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      code[index] === "" &&
      index > 0
    ) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleComplete = () => {
    setIsCountCompleted(true);
    setCountHide(true);
  };

  const handleEmailSend = async () => {
    const response = await fetchEmailSend(email);

    if (response) {
      setIsCountCompleted(false);
      setCountHide(false);
    }
  };

  const handleCodeVerify = async () => {
    const isValid = await fetchEmailVerify(email, code.join(""));

    if (!isValid) {
      showToast("보안코드가 일치하지 않습니다.", constants.TOAST_TYPES.ERROR);
      return;
    }

    showToast("인증에 성공하였습니다.", constants.TOAST_TYPES.SUCCESS);
    onSuccess();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="text-center my-4 text-xl font-bold">이메일 인증</div>
      <div className="flex justify-center mb-2">
        <div className="text-left text-sm">
          이메일로 전송된 보안 코드 입력 바랍니다.
        </div>
      </div>
      <div className="flex justify-center space-x-2 mb-6">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-[50px] bg-black text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        ))}
      </div>
      <div className="flex justify-center mb-3">
        <div className="text-left text-xs flex">
          <CountDown
            className="!text-green-razer mr-1 font-bold"
            initialTime="3:00"
            color="green"
            hide={countHide}
            onComplete={handleComplete}
          />
          초 후에 새 코드를 요청할 수 있습니다.
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          onClick={handleCodeVerify}
          color="green"
          size="medium"
          className="text-xs w-[80px]"
        >
          확인
        </Button>
        <Button
          onClick={handleEmailSend}
          color="slate"
          size="medium"
          purpose="secondary"
          className="text-xs w-[80px]"
          disabled={!isCountCompleted}
        >
          새 코드
        </Button>
      </div>
    </Dialog>
  );
};

export default CodeInputDialog;
