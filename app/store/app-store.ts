import { create } from "zustand";

interface AppStore {
  errors: string[];
  successMessages: string[];
  isAuthenticated: boolean;
  setIsAuthentication: (val: boolean) => void;
  setErrors: (val: string[]) => void;
  setSuccessMessages: (val: string[]) => void;
  clearErrors: () => void;
  clearSuccessMessages: () => void;
  searchField: string;
  setSearchField: (value: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isAuthenticated: false,
  setIsAuthentication: (isAuthenticated: boolean) => set({ isAuthenticated }),
  errors: [],
  successMessages: [],
  setErrors: (val: string[]) => set({ errors: val }),
  clearErrors: () => set({ errors: [] }),
  setSuccessMessages: (val: string[]) => set({ successMessages: val }),
  clearSuccessMessages() {
    set({ successMessages: [] });
  },
  searchField: "",
  setSearchField: (value) => set({ searchField: value }),
}));
