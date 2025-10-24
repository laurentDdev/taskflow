
import useWSStore from "@/stores/ws.store.ts";
import useNotificationStore from "@/stores/notification.store.ts";
import useWorkspaceStore from "@/stores/workspace.store.ts";
import {useTranslation} from "react-i18next";
import {Outlet, useLoaderData} from "react-router";
import {useEffect, useRef} from "react";
import {toast} from "sonner";

const RootLayout = () => {
  const { connect, disconnect, socket } = useWSStore();
  const { addNotification, setNotifications } = useNotificationStore();
  const { setWorkspaces } = useWorkspaceStore();
  const { t } = useTranslation("global");
  const data = useLoaderData();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (connect) {
      connect();
    }

    return () => {
      if (disconnect) {
        disconnect();
      }
    };
  }, [connect, disconnect]);

  useEffect(() => {
    if (socket) {
      socket.on("receivedNotification", (data) => {
        addNotification(data);
        toast.info(t(data.title));
      });
    }
  }, [socket, t]);

  if (data && !initializedRef.current) {
    initializedRef.current = true;
    setWorkspaces(data.workspaces);
    setNotifications(data.notifications);
  }
  return <>
    <Outlet />
  </>;
};

export default RootLayout;
