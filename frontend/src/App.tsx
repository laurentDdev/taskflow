import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Outlet } from "react-router";
import { Suspense, useEffect } from "react";
import Loading from "./pages/Loading.page";
import useWSStore from "./stores/ws.store";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { setGlobalSubscription, deleteGlobalSubscription } = useWSStore();

  useEffect(() => {
    setGlobalSubscription();

    return () => {
      deleteGlobalSubscription();
    };
  }, [setGlobalSubscription, deleteGlobalSubscription]);

  return (
    <ThemeProvider defaultTheme={"light"}>
      <div className={"min-h-screen min-w-screen"}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
