import type { T_Feature_Access, T_User } from "@/types/user";
import { createStore } from "zustand/vanilla";

export type AuthState = {
  user: T_User | null;
  featureAccess: T_Feature_Access[];
};

export type AuthActions = {
  addAuthData: (input: T_User | null) => void;
  setFeatureAccess: (input: T_Feature_Access[]) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  user: null,
  featureAccess: [],
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    addAuthData(input) {
      set(() => ({ user: input }));
    },
    setFeatureAccess(input) {
      set(() => ({ featureAccess: input }));
    },
  }));
};
