import workspaceApi from "@/apis/workspace.api";
import notificationApi from "@/apis/notification.api.ts";

export const rootLoader = async () => {
  const data = await Promise.all([workspaceApi.getWorkspaces(), notificationApi.getNotifications()]);
  return { workspaces: data[0], notifications: data[1] };
};
