import { createStore } from "zustand/vanilla";

type KulaStore = {
  kula: number;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
};

export const useKulaStore = createStore<KulaStore>((set) => ({
  kula: 0,
  add: () => set((state) => ({ kula: state.kula + 1 })),
  remove: () => set((state) => ({ kula: state.kula - 1 })),
  removeAll: () => set({ kula: 0 }),
}));
