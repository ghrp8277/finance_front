import React, { useState } from "react";
import { Input, Button } from "@/components/index";
import { fetchChangePassword } from "@/services/users";
import { useStorage } from "@/hooks/useStorage";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";
import Card from "@/components/common/Card";

const ChangePassword: React.FC = () => {
  const { user } = useStorage();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { showToast } = useToast();

  const handleChangePassword = async () => {
    if (!user) return;

    if (!password || !newPassword || !confirmNewPassword) {
      showToast("모든 필드를 입력해 주세요.", constants.TOAST_TYPES.INFO);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showToast("새 비밀번호가 일치하지 않습니다.", constants.TOAST_TYPES.INFO);
      return;
    }

    const { success, err } = await fetchChangePassword(
      user.id,
      password,
      newPassword
    );

    if (success) {
      showToast(
        "비밀번호가 성공적으로 변경되었습니다.",
        constants.TOAST_TYPES.SUCCESS
      );
    } else {
      if (err.status === 400) {
        showToast(
          "현재 비밀번호가 일치하지 않습니다.",
          constants.TOAST_TYPES.ERROR
        );
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b border-gray-600 pb-4">
        <span className="text-md font-semibold">비밀번호 변경</span>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-400">
            현재 비밀번호
          </span>
          <Input
            type="password"
            placeholder="현재 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-2/3 p-2 bg-gray-900 text-green-400 placeholder-sm border border-gray-700 rounded focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-400">새 비밀번호</span>
          <Input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-2/3 p-2 bg-gray-900 text-green-400 placeholder-sm border border-gray-700 rounded focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-400">
            새 비밀번호 확인
          </span>
          <Input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-2/3 p-2 bg-gray-900 text-green-400 border placeholder-sm border-gray-700 rounded focus:outline-none focus:border-green-500"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          className="bg-blue-500 text-white text-xs h-[40px] py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={handleChangePassword}
        >
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
