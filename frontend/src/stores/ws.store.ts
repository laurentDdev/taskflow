import { transmit } from "@/lib/transmit";
import type { Subscription } from "@adonisjs/transmit-client";
import { create } from "zustand";

type State = {
  baseUrl: string;
  globalSubscription: Subscription | null;
};

type Action = {
  setGlobalSubscription: () => Promise<void>;
  deleteGlobalSubscription: () => void;
};

const useWSStore = create<State & Action>((set) => ({
  baseUrl: import.meta.env.VITE_API_URL as string,
  globalSubscription: null,
  setGlobalSubscription: async () => {
    const globalSubscription = transmit.subscription("global");
    await globalSubscription.create();
    set({ globalSubscription });
  },
  deleteGlobalSubscription: () =>
    set((state) => {
      if (state.globalSubscription) {
        state.globalSubscription.delete();
      }
      return {
        ...state,
        globalSubscription: null,
      };
    }),
}));

export default useWSStore;
