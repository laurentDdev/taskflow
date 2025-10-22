import { create } from "zustand";
import { io, Socket } from "socket.io-client";

type State = {
  socket: Socket | null;
};

type Action = {
  connect: () => void;
  disconnect: () => void;
};

const useWSStore = create<State & Action>((set, get) => ({
  socket: null,
  connect: () => {
    if (get().socket) return;

    const socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    set({ socket });
  },
  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },
}));

export default useWSStore;
