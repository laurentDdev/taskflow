import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Outlet } from "react-router";
import { Suspense, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthProvider";
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
      <AuthProvider>
        <div className={"min-h-screen min-w-screen"}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
