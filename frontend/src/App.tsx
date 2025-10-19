import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Outlet } from "react-router";
import { Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthProvider";

function App() {
  return (
    <ThemeProvider defaultTheme={"light"}>
      <AuthProvider>
        <div className={"min-h-screen min-w-screen"}>
          <Suspense fallback={"Loading ..."}>
            <Outlet />
          </Suspense>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
