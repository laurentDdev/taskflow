import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Outlet } from "react-router";
import { Suspense, useEffect } from "react";
import Loading from "./pages/Loading.page";
import useWSStore from "./stores/ws.store";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function App() {
  const { connect, disconnect, socket } = useWSStore();
  const { t } = useTranslation("global");

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
        console.log("Received notification:", data);
        toast.info(t(data.title));
      });
    }
  }, [socket, t]);

  return (
    <ThemeProvider defaultTheme={"light"}>
      <div className={"min-h-screen min-w-screen"}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;
