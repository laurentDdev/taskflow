import workspaceApi from "@/apis/workspace.api";
import type { Workspace } from "@/types/Workspace";
import { create } from "zustand";

type State = {
  workspaces: Workspace[];
};

type Action = {
  createWorkspace: (name: string, description: string) => Promise<void>;
  setWorkspaces: (workspaces: Workspace[]) => void;
};

const useWorkspaceStore = create<State & Action>((set) => ({
  workspaces: [],
  createWorkspace: async (name: string, description: string) => {
    const workspace = await workspaceApi.createWorkspace(name, description);
    set((state) => ({ workspaces: [...state.workspaces, workspace] }));
  },
  setWorkspaces: (workspaces: Workspace[]) => set({ workspaces }),
}));

export default useWorkspaceStore;
