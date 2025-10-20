import { redirect } from "react-router";
import { getUser } from "@/apis/auth.api";
import workspaceApi from "@/apis/workspace.api";

export const homeLoader = async () => {
  const user = await getUser();
  if (!user) {
    return redirect("/auth");
  }

  const workspaces = await workspaceApi.getWorkspaces();
  return { workspaces };
};
