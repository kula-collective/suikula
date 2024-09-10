import { User } from "@/types/user";
import { create } from "zustand";

type AppStateStore = {
  user?: User;
  login: (user: User) => void;
};

export const useAppStateStore = create<AppStateStore>((set) => ({
  login: (user: User) => set((state) => ({ ...state, user })),
}));

type KulaStore = {
  kula: number;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
};

export const useKulaStore = create<KulaStore>((set) => ({
  kula: 0,
  add: () => set((state) => ({ kula: state.kula + 1 })),
  remove: () => set((state) => ({ kula: state.kula - 1 })),
  removeAll: () => set({ kula: 0 }),
}));
