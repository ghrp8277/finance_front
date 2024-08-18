import React from "react";
import { Input, Button } from "@/components";
import { fetchCheckUsername } from "@/services/users";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";

type UsernameVerificationProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  isDuplicate: boolean | null;
  setIsDuplicate: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const UsernameVerification: React.FC<UsernameVerificationProps> = ({
  username,
  setUsername,
  isDuplicate,
  setIsDuplicate,
}) => {
  const { showToast } = useToast();

  const handleCheckClick = async () => {
    if (username.length < 4 || username.length > 20) {
      showToast(
        "아이디는 최소 4자에서 최대 20자까지 입력 가능합니다.",
        constants.TOAST_TYPES.ERROR
      );
      return;
    }

    const isDuplicate = await fetchCheckUsername(username);

    if (isDuplicate) {
      showToast("중복된 아이디가 있습니다.", constants.TOAST_TYPES.INFO);
      return;
    }

    setIsDuplicate(isDuplicate);
    showToast("사용가능한 아이디입니다.", constants.TOAST_TYPES.SUCCESS);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length <= 20) {
      setUsername(value);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-green-razer !text-sm mb-2">
        아이디 <span className="text-red-500">*</span>
      </label>
      <div className="flex">
        <Input
          type="text"
          placeholder="아이디 입력"
          className={`text-sm text-green-razer mr-2 bg-black placeholder-gray-500 placeholder-sm ${
            isDuplicate === false ? "border-green-500" : ""
          }`}
          value={username}
          onChange={handleChange}
        />
        <Button
          type="button"
          color="green"
          size="small"
          className="!text-black hover:text-green-300 px-4 rounded-r text-xs border border-green-400"
          onClick={handleCheckClick}
        >
          중복 확인
        </Button>
      </div>
    </div>
  );
};

export default UsernameVerification;
