import { User } from "@/types/user";
import { createStore } from "zustand/vanilla";

export type AppstateState = {
  user: User | null;
};

export type AppstateActions = {
  login: (user: User) => void;
  logout: () => void;
};

export type AppstateStore = AppstateState & AppstateActions;

export const defaultInitState: AppstateState = {
  user: null,
};

export const createAppstateStore = (
  initState: AppstateState = defaultInitState
) => {
  return createStore<AppstateStore>()((set) => ({
    ...initState,
    login: (user: User) => set((state) => ({ user })),
    logout: () => set((state) => ({ user: null })),
  }));
};
