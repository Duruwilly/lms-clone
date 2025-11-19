import { create } from "zustand";
import type { User } from "~/models/users";

interface UserStore {
  user?: User | null;
  setUser: (user: User | null) => void;
  access_token?: string | null;
  setAccessToken: (access_token: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  access_token: null,
  setAccessToken: (access_token: string) => set({ access_token }),
  clearUser: () =>
    set((state) => ({ ...state, user: undefined, access_token: undefined })),
}));
