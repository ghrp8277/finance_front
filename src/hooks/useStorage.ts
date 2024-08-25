import { useState, useEffect } from "react";
import { getItem } from "@/utils/localStorage";
import constants from "@/constants";

interface User {
  id: number;
  username: string;
}

export const useStorage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loginStatus = getItem(constants.LOCAL_STORAGE.LOGIN) === "true";
    setIsLoggedIn(loginStatus);

    if (loginStatus) {
      const userData = getItem(constants.LOCAL_STORAGE.USER);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return {
    user,
    isLoggedIn,
  };
};
