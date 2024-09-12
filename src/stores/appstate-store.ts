import { User } from "@/types/user";
import { createStore } from "zustand/vanilla";

export type AppstateState = {
  authUser: User | null;
};

export type AppstateActions = {
  saveUser: (user: User) => void;
  resetUser: () => void;
};

export type AppstateStore = AppstateState & AppstateActions;

export const defaultInitState: AppstateState = {
  authUser: null,
};

export const createAppstateStore = (
  initState: AppstateState = defaultInitState
) => {
  return createStore<AppstateStore>()((set) => ({
    ...initState,
    saveUser: (user: User) => set((state) => ({ authUser: user })),
    resetUser: () => set((state) => ({ authUser: null })),
  }));
};
