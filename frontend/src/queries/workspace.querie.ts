import { useQuery, useQueryCache } from "@pinia/colada";
import workspaceApi from "../apis/workspace.api.ts";
import type { Workspace } from "../types/workspace";

export const useWorkspacesQuery = () => {
  return useQuery({
    key: ["workspaces"],
    query: () => workspaceApi.findAll(),
  });
};

export const useWorkspaceQuery = (id: string) => {
  const queryClient = useQueryCache();
  console.log("Id ", id);
  return useQuery({
    key: ["workspace", id],
    query: () => workspaceApi.findById(id),
    placeholderData: () => {
      const workspaceCache = queryClient.getQueryData([
        "workspaces",
      ]) as Workspace[];

      if (workspaceCache) {
        console.log("Finding in cache");
        return workspaceCache.find((w) => w.id === id);
      }

      return undefined;
    },
  });
};
