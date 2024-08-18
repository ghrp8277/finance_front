import React from "react";
import { Card } from "@/components/index";
import { Input, Button } from "@/components/index";

const ChangePassword: React.FC = () => {
  return (
    <div className="w-full flex justify-center my-5">
      <Card className="p-[80px] bg-black rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <img
            src="/default-profile.png"
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <span className="text-lg font-semibold text-green-400">hhaaddo</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              현재 비밀번호
            </label>
            <Input
              type="password"
              placeholder="현재 비밀번호"
              className="w-full p-2 bg-black text-green-400 border-b border-gray-500 focus:outline-none focus:border-green-500 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              새 비밀번호
            </label>
            <Input
              type="password"
              placeholder="새 비밀번호"
              className="w-full p-2 bg-black text-green-400 border-b border-gray-500 focus:outline-none focus:border-green-500 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              새 비밀번호 확인
            </label>
            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              className="w-full p-2 bg-black text-green-400 border-b border-gray-500 focus:outline-none focus:border-green-500 placeholder-gray-500"
            />
          </div>

          <div className="mt-6">
            <Button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              비밀번호 변경
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChangePassword;
