import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type AuthStore, createAuthStore } from "@/stores/auth-store";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined
);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const AuthStoreProvider = ({ children }: CounterStoreProviderProps) => {
  const storeRef = useRef<AuthStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`createAuthStore must be used within AuthStoreProvider`);
  }

  return useStore(authStoreContext, selector);
};
