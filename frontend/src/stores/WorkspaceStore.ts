import { defineStore } from "pinia";
import type { Workspace } from "../types/workspace";

const workspacesStore = defineStore("workspaces", {
  state: () => ({
    workspaces: [] as Workspace[],
  }),
  actions: {},
  getters: {},
});
