import { create } from "zustand";

interface AuthStore {
  data: any;
  isAuth: boolean;
  onLogin: (data?: any) => void;
  onLogout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  data: {},
  isAuth: false,
  onLogin: (data = {}) => set({ isAuth: true, data }),
  onLogout: () => set({ isAuth: false }),
}));
