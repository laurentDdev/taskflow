import workspaceApi from "@/apis/workspace.api";

export const homeLoader = async () => {
  const workspaces = await workspaceApi.getWorkspaces();
  return { workspaces };
};
