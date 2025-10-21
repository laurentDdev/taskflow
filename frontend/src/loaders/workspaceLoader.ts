import workspaceApi from "@/apis/workspace.api";
import type { LoaderFunctionArgs } from "react-router";

export const workspaceLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  return workspaceApi.getWorkspace(id);
};
