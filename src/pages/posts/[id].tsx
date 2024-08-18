import React, { useEffect, useState } from "react";
import { useNavigate } from "@/hooks/useNavigate";
import {
  fetchGetPostDetail,
  fetchGetPublicPostDetail,
} from "@/services/social";
import { IPost } from "@/types/social";
import PostDetail from "@/components/social/postForm/PostDetail";
import { useStorage } from "@/hooks/useStorage";

const PostDetailPage: React.FC = () => {
  const { getQueryParams } = useNavigate();
  const { id } = getQueryParams();
  const [post, setPost] = useState<IPost | null>(null);
  const { isLoggedIn } = useStorage();

  useEffect(() => {
    const loadPostDetail = async () => {
      if (id) {
        if (isLoggedIn) {
          const postDetail = await fetchGetPostDetail(Number(id));
          setPost(postDetail);
        } else {
          const postDetail = await fetchGetPublicPostDetail(Number(id));
          setPost(postDetail);
        }
      }
    };

    loadPostDetail();
  }, [id, isLoggedIn]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <PostDetail
      id={Number(id)}
      title={post.title}
      date={post.createdAt}
      content={post.content}
      comments={post.comments}
    />
  );
};

export default PostDetailPage;
