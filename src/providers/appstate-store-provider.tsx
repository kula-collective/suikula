// src/providers/appstate-store-provider.tsx
"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import {
  type AppstateStore,
  createAppstateStore,
} from "@/stores/appstate-store";

export type AppstateStoreApi = ReturnType<typeof createAppstateStore>;

export const AppstateStoreContext = createContext<AppstateStoreApi | undefined>(
  undefined
);

export interface AppstateStoreProviderProps {
  children: ReactNode;
}

export const AppstateStoreProvider = ({
  children,
}: AppstateStoreProviderProps) => {
  const storeRef = useRef<AppstateStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAppstateStore();
  }

  return (
    <AppstateStoreContext.Provider value={storeRef.current}>
      {children}
    </AppstateStoreContext.Provider>
  );
};

export const useAppstateStore = <T,>(
  selector: (store: AppstateStore) => T
): T => {
  const appstateStoreContext = useContext(AppstateStoreContext);

  if (!appstateStoreContext) {
    throw new Error(
      `useAppstateStore must be used within AppstateStoreProvider`
    );
  }

  return useStore(appstateStoreContext, selector);
};
