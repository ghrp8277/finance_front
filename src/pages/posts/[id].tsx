import React, { useEffect, useState } from "react";
import { useNavigate } from "@/hooks/useNavigate";
import {
  fetchGetPostDetail,
  fetchGetPublicPostDetail,
} from "@/services/social";
import { IPost } from "@/types/social";
import PostDetail from "@/components/social/postForm/PostDetail";
import useAuthStore from "@/stores/authStore";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const PostDetailPage: React.FC = () => {
  const { getQueryParams } = useNavigate();
  const { id } = getQueryParams();
  const [post, setPost] = useState<IPost | null>(null);
  const { isLoggedIn } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostDetail = async () => {
      if (id && isLoggedIn !== null) {
        setLoading(true);
        if (isLoggedIn) {
          const postDetail = await fetchGetPostDetail(Number(id));
          setPost(postDetail);
        } else {
          const postDetail = await fetchGetPublicPostDetail(Number(id));
          setPost(postDetail);
        }
        setLoading(false);
      }
    };

    loadPostDetail();
  }, [id, isLoggedIn]);

  if (loading || !post) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
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
