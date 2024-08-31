import create from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  setAuthState: (authState: Partial<AuthState>) => void;
  logout: () => void;
}

interface User {
  id: number;
  username: string;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  setAuthState: (authState) => set((state) => ({ ...state, ...authState })),
  logout: () => set({ isLoggedIn: false, user: null }),
}));

export default useAuthStore;
