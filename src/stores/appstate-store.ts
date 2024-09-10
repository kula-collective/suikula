import { User } from "@/types/user";
import { createStore } from "zustand/vanilla";

export type AppstateState = {
  authUser: User | null;
};

export type AppstateActions = {
  login: (user: User) => void;
  logout: () => void;
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
    login: (user: User) => set((state) => ({ ...state, authUser: user })),
    logout: () => set((state) => ({ ...state, authUser: null })),
  }));
};
