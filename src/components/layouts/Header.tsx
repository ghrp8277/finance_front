// Header.tsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "@/hooks/useNavigate";
import { Button } from "..";
import constants from "@/constants";
import { removeItem } from "@/utils/localStorage";
import { fetchLogout } from "@/services/auth";
import { useSockJS } from "@/hooks/useSockJS";
import NotificationDropdown from "../NotificationDropdown";
import { fetchGetActivitiesUnRead } from "@/services/social";
import { useFavoriteStore } from "@/stores";
import useAuthStore from "@/stores/authStore";

const Header: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuthStore();
  const { navigateToLogin, navigateToMainPage, navigateToMy } = useNavigate();
  const { subscribe } = useSockJS();
  const { clearFavorites } = useFavoriteStore();
  const [activities, setActivities] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    navigateToLogin();
  };

  const handleLogoutClick = async () => {
    if (user) {
      const success = await fetchLogout(user.id);

      if (success) {
        logout();
        clearFavorites();
        navigateToLogin();
      }
    }
  };

  const loadActivities = async (page: number) => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      const { activities: newActivities, totalPages } =
        await fetchGetActivitiesUnRead({
          page,
          pageSize: constants.DEFAULT_PAGING.PAGESIZE,
        });

      setActivities((prevActivities) => [...prevActivities, ...newActivities]);
      setCurrentPage(page);
      setHasMore(page < totalPages - 1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      loadActivities(0);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (isLoggedIn && user) {
      const topics = [
        {
          topic: `/topic/activities/${user.id}`,
          fn: (message: any) => {
            const data = JSON.parse(message.body);
            setActivities((prevActivities) => [...prevActivities, data]);
          },
        },
        {
          topic: `/topic/logout/${user.id}`,
          fn: (message: any) => {
            const data = JSON.parse(message.body);

            if (data.success) {
              removeItem(constants.LOCAL_STORAGE.LOGIN);
              removeItem(constants.LOCAL_STORAGE.USER);

              navigateToLogin();
            }
          },
        },
      ];

      for (const { topic, fn } of topics) {
        subscribe(topic, fn);
      }
    }
  }, [isLoggedIn, user, subscribe]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastActivityElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadActivities(currentPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, currentPage]
  );

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 shadow-lg bg-black text-green-400 border-b border-green-500"
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container mx-auto flex justify-between items-center border-2 border-transparent rounded">
        <div className="flex items-center space-x-4">
          <Button
            onClick={navigateToMainPage}
            color="none"
            className="text-lg font-bold text-green-500 hover:text-green-300"
          >
            HOME
          </Button>
        </div>
        {isLoggedIn && user && (
          <div className="relative cursor-pointer" onClick={toggleDropdown}>
            <img
              src="/razer-logo.svg"
              alt="Razer Logo"
              className="w-6 h-auto block"
            />
            {activities.length > 0 && (
              <span className="absolute bottom-0 left-6 block w-1 h-1 bg-red-500 rounded-full"></span>
            )}
            {isDropdownOpen && (
              <NotificationDropdown
                activities={activities}
                setActivities={setActivities}
                lastActivityElementRef={lastActivityElementRef}
              />
            )}
          </div>
        )}
        <div>
          {isLoggedIn && user ? (
            <div className="flex items-center space-x-2">
              <Button
                size="medium"
                color="none"
                purpose="primary"
                onClick={navigateToMy}
                className="ml-4 text-green-500 hover:text-green-300"
              >
                {user.username}
              </Button>
              <Button
                size="medium"
                color="none"
                purpose="primary"
                onClick={handleLogoutClick}
                className="ml-4 text-green-500 hover:text-green-300"
              >
                로그아웃
              </Button>
            </div>
          ) : (
            <Button
              size="medium"
              color="none"
              purpose="primary"
              onClick={handleLoginClick}
              className="text-green-500 hover:text-green-300"
            >
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
