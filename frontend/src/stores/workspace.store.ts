import workspaceApi from "@/apis/workspace.api";
import type { Workspace } from "@/types/Workspace";
import { create } from "zustand";

export const WorkspaceNavigation = {
  Boards: "boards",
  Members: "members",
  Settings: "settings",
} as const;

type State = {
  workspaces: Workspace[];
  workspaceNavigation: string;
};

type Action = {
  createWorkspace: (name: string, description: string) => Promise<void>;
  setWorkspaceNavigation: (navigation: string) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
};

const useWorkspaceStore = create<State & Action>((set) => ({
  workspaces: [],
  workspaceNavigation: WorkspaceNavigation.Boards,
  createWorkspace: async (name: string, description: string) => {
    const workspace = await workspaceApi.createWorkspace(name, description);
    set((state) => ({ workspaces: [...state.workspaces, workspace] }));
  },
  setWorkspaceNavigation: (navigation: string) =>
    set({ workspaceNavigation: navigation }),
  setWorkspaces: (workspaces: Workspace[]) => set({ workspaces }),
}));

export default useWorkspaceStore;
