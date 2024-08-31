import FlowUserList from "@/components/main/FlowUserList";
import ChangePassword from "@/components/main/ChangePassword";
import React, { useEffect, useState } from "react";
import { fetchGetUserById } from "@/services/users";
import useAuthStore from "@/stores/authStore";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { formatDateTime } from "@/utils/dateUtils";
import { fetchLogout } from "@/services/auth";
import { useNavigate } from "@/hooks/useNavigate";
import Dialog from "@/components/common/Dialog";
import CodeInputDialog from "@/components/common/CodeInputDialog";
import { useFavoriteStore } from "@/stores";

const MyPage: React.FC = () => {
  const { clearFavorites } = useFavoriteStore();
  const { user, isLoggedIn, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [greeting, setGreeting] = useState("");
  const { navigateToLogin } = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState<boolean>(false);

  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
    if (!localPart || !domain) return email;

    const localMasked =
      localPart.length > 1
        ? localPart[0] + "*" + localPart.slice(-1)
        : localPart;

    const domainMasked =
      domain.length > 3
        ? domain.slice(0, 2) + "***" + domain.slice(-1)
        : domain;

    return `${localMasked}@${domainMasked}`;
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      if (isLoggedIn !== null) {
        if (!isLoggedIn) {
          navigateToLogin();
        }

        setLoading(true);

        if (isLoggedIn && user) {
          const { username, email, joinDate, greeting } =
            await fetchGetUserById(user.id);

          setEmail(email);
          setUsername(username);
          setJoinDate(joinDate);
          setGreeting(greeting);
        }

        setLoading(false);
      }
    };

    loadUserInfo();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    if (isLoggedIn && user) {
      const success = await fetchLogout(user.id);

      if (success) {
        logout();
        clearFavorites();
        navigateToLogin();
      }
    }
  };

  const handleChangePassword = () => {
    setIsCodeDialogOpen(true);
  };

  const handleCodeVerificationSuccess = () => {
    setIsCodeDialogOpen(false);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="absolute left-0 top-0 w-full h-full z-0 bg-black bg-opacity-50"></div>
      <div className="flex mt-5 relative z-1">
        <div className="flex-1">
          <div className="text-green-razer text-lg mb-5">회원정보</div>
          <div
            className="
              relative flex text-white text-xs bg-gray-800 
              transition-all duration-200
              justify-center items-center w-full min-h-[55px] mb-[10px] 
              "
          >
            <div className="flex-1 text-center">유저명</div>
            <div className="flex-1 text-left">{username}</div>
            <span className="text-green-300 pr-2">&gt;</span>
          </div>
          <div
            className="
              relative flex text-white text-xs bg-gray-800 
              transition-all duration-200
              justify-center items-center w-full min-h-[55px] mb-[10px] 
              cursor-pointer hover:bg-black"
            onClick={handleChangePassword}
          >
            <div className="flex-1 text-center">암호</div>
            <div className="flex-1 text-left">******</div>
            <span className="text-green-300 pr-2">&gt;</span>
          </div>
          <div
            className="
              relative flex text-white text-xs bg-gray-800 
              transition-all duration-200
              justify-center items-center w-full min-h-[55px] mb-[10px] 
              "
          >
            <div className="flex-1 text-center">이메일</div>
            <div className="flex-1 text-left">{maskEmail(email)}</div>
            <span className="text-green-300 pr-2">&gt;</span>
          </div>
          <div
            className="
              relative flex text-white text-xs bg-gray-800 
              transition-all duration-200
              justify-center items-center w-full min-h-[55px] mb-[10px] 
              "
          >
            <div className="flex-1 text-center">가입일</div>
            <div className="flex-1 text-left">{formatDateTime(joinDate)}</div>
            <span className="text-green-300 pr-2">&gt;</span>
          </div>
          <div
            className="
              relative flex text-white text-xs bg-gray-800 
              transition-all duration-200
              justify-center items-center w-full min-h-[55px] mb-[10px] 
              cursor-pointer hover:bg-black"
            onClick={handleLogout}
          >
            <div className="flex-1 text-center">로그아웃</div>
            <div className="flex-1 text-left">장치에서 로그아웃</div>
            <span className="text-green-300 pr-2">&gt;</span>
          </div>
        </div>
        <div className="flex-1 ml-5">
          <div className="text-green-razer text-lg mb-5">팔로우</div>
          <FlowUserList />
        </div>
      </div>
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <ChangePassword />
      </Dialog>

      <CodeInputDialog
        email={email}
        isOpen={isCodeDialogOpen}
        onClose={() => setIsCodeDialogOpen(false)}
        onSuccess={handleCodeVerificationSuccess}
      />
    </div>
  );
};

export default MyPage;
