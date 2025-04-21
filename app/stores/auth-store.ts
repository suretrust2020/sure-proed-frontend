import type { T_User } from "@/types/user";
import { createStore } from "zustand/vanilla";

export type AuthState = {
  user: T_User | null;
};

export type AuthActions = {
  addAuthData: (input: T_User | null) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  user: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    addAuthData(input) {
      set(() => ({ user: input }));
    },
  }));
};
