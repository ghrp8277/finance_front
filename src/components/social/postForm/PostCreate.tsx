import React, { useState } from "react";
import { Input, Button } from "@/components/index";
import { useNavigate } from "@/hooks/useNavigate";
import { fetchCreatePost } from "@/services/social";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";
import useAuthStore from "@/stores/authStore";

const PostCreate: React.FC = () => {
  const { getQueryParams, navigateBack, navigateToStockDetail } = useNavigate();
  const { market, code, name } = getQueryParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { showToast } = useToast();
  const { user } = useAuthStore();

  const handleSubmit = async () => {
    if (title.trim() === "" || content.trim() === "") {
      showToast("제목과 내용을 모두 입력해주세요.", constants.TOAST_TYPES.INFO);
      return;
    }

    await handleCreatePost();

    setTitle("");
    setContent("");
    navigateToStockDetail({
      market,
      code,
      name,
    });
  };

  const handleCreatePost = async () => {
    if (user) {
      await fetchCreatePost({
        title,
        author: user.username,
        content,
        stockCode: code,
        accountName: name,
        userId: user.id,
      });

      showToast(
        "게시글이 성공적으로 작성되었습니다.",
        constants.TOAST_TYPES.SUCCESS
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl mx-auto p-10 bg-gray-900 text-green-500 shadow-2xl rounded-lg border border-green-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-center">
            종목 토론 게시판
          </h2>
          <button
            className="text-green-500 hover:text-green-300 text-sm flex items-center"
            onClick={() => navigateBack()}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            뒤로가기
          </button>
        </div>

        <div className="mb-6 text-center">
          <div className="text-lg font-bold text-green-500 mb-5">{market}</div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 justify-center">
            <span className="bg-gray-800 text-green-500 rounded-full px-4 py-1 text-center">
              {code}
            </span>
            <span className="text-gray-400 text-center">{name}</span>
          </div>
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="title"
            className="block text-green-500 font-medium mb-2"
          >
            제목
          </label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="게시글의 제목을 입력하세요"
            className="w-full p-4 bg-black text-green-500 border border-green-500 rounded-md focus:ring-2 focus:ring-green-500 text-lg shadow-sm"
            maxLength={100}
          />
          <span className="absolute bottom-2 right-2 text-gray-400 text-sm">
            {title.length} / 100
          </span>
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="content"
            className="block text-green-500 font-medium mb-2"
          >
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="게시글의 내용을 입력하세요. 토론할 주제나 의견을 자유롭게 작성하세요."
            className="w-full h-48 p-4 bg-black text-green-500 border border-green-500 rounded-md focus:ring-2 focus:ring-green-500 text-lg resize-none shadow-sm"
            maxLength={1000}
          />
          <span className="absolute bottom-2 right-2 text-gray-400 text-sm">
            {content.length} / 1000
          </span>
        </div>

        <div className="flex justify-end">
          <Button
            size="medium"
            color="neonGreen"
            onClick={handleSubmit}
            className="text-sm px-6 py-3"
          >
            작성하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
