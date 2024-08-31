import React, { useEffect, useState } from "react";
import { fetchGetPosts } from "@/services/social";
import { IPost } from "@/types/social";
import Pagination from "@/components/common/Pagination";
import constants from "@/constants";
import { formatDateTime } from "../../../utils/dateUtils";
import Button from "@/components/common/Button";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "@/hooks/useNavigate";

type PostListProps = {
  market: string;
  code: string;
  name: string;
};

const PostList: React.FC<PostListProps> = ({ market, code, name }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(constants.DEFAULT_PAGING.PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(constants.DEFAULT_PAGING.PAGESIZE);
  const { isLoggedIn } = useAuthStore();
  const { navigateToCreatePost, navigateToPostDetail } = useNavigate();

  useEffect(() => {
    const loadPostList = async () => {
      const { posts, total_pages } = await fetchGetPosts(code);
      setPosts(posts);
      setTotalPages(total_pages);
    };

    loadPostList();
  }, [code]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const handleCreatePost = () => {
    navigateToCreatePost({ market, code, name });
  };

  const handlePostClick = (postId: number) => {
    navigateToPostDetail(postId);
  };

  return (
    <div className="mx-auto text-green-500 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-800 text-green-500 rounded-full px-4 py-1 inline-block">
          관련 게시글
        </div>
        {isLoggedIn && (
          <Button color="neonGreen" onClick={handleCreatePost}>
            포스트 작성
          </Button>
        )}
      </div>
      <table className="w-full text-sm table-fixed bg-gray-900 text-green-500">
        <thead>
          <tr className="border-b border-green-500">
            <th className="w-1/12 py-2 text-center">No</th>
            <th className="w-6/12 text-center">제목</th>
            <th className="w-3/12 text-center">작성자</th>
            <th className="w-2/12 text-center">생성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <td className="w-1/12 py-2 text-center text-gray-400">
                {post.id}
              </td>
              <td className="w-6/12 text-center px-4">{post.title}</td>
              <td className="w-3/12 text-center text-gray-400">
                {post.author}
              </td>
              <td className="w-2/12 text-center text-gray-400">
                {formatDateTime(post.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageRangeDisplayed={5}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  );
};

export default PostList;
