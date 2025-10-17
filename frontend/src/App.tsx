import {ThemeProvider} from "@/components/theme-provider.tsx";
import {Outlet} from "react-router";
import {Suspense} from "react";

function App() {

  return (
    <ThemeProvider defaultTheme={"light"}>
        <div className={"min-h-screen min-w-screen p-2"}>
            <Suspense fallback={"Loading ..."} >
                <Outlet/>
            </Suspense>
        </div>
    </ThemeProvider>
  )
}

export default App
