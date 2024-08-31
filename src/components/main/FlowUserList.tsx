import React, { useEffect, useState } from "react";
import { Card, Button } from "@/components/index";
import { fetchGetUnFollwedUsers, fetchFollowUser } from "@/services/social";
import { IUserSync } from "@/types/social";
import useAuthStore from "@/stores/authStore";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";

const FlowUserList: React.FC = () => {
  const { isLoggedIn, user } = useAuthStore();
  const [users, setUsers] = useState<IUserSync[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const loadUnFollwedUserList = async () => {
      if (isLoggedIn) {
        const { users } = await fetchGetUnFollwedUsers();
        setUsers(users);
      }
    };

    loadUnFollwedUserList();
  }, [isLoggedIn]);

  const handleFollowUser = async (id: number, username: string) => {
    if (isLoggedIn && user) {
      await fetchFollowUser(user.id, id);

      showToast(
        `${username} 팔로우 완료! 이제부터 피드 알람을 확인 할 수 있어요.`,
        constants.TOAST_TYPES.SUCCESS
      );

      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      {isLoggedIn && (
        <div className="flex justify-center space-x-4 my-2">
          {users.map((user) => (
            <Card
              key={user.userId}
              className="w-48 h-64 text-black p-4 rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
            >
              <img
                src={"/default-profile.png"}
                alt={`${user.username} 프로필 이미지`}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-center text-sm font-semibold truncate">
                {user.username}
              </p>
              <Button
                color="green"
                onClick={() => handleFollowUser(user.userId, user.username)}
                className="!text-black text-sm mt-8 w-full py-2"
              >
                팔로우
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlowUserList;
