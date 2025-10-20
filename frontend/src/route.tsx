import { createBrowserRouter } from "react-router";
import App from "@/App.tsx";

import { rootLoader } from "./loaders/rootLoader";
import { lazy } from "react";
import { homeLoader } from "./loaders/homeLoader.ts";

const LoginPage = lazy(() => import("./pages/Auth/Login.page.tsx"));
const RegisterPage = lazy(() => import("./pages/Auth/Register.page.tsx"));
const ForgotPassword = lazy(() => import("./pages/Auth/Forgot-passwod.page"));
const ResetPassword = lazy(() => import("./pages/Auth/Reset-password.page"));

const Home = lazy(() => import("./pages/Home/Home.page.tsx"));
const Workspace = lazy(() => import("./pages/Workspace/Workspace.tsx"));

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    loader: rootLoader,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <Home />,
      },
      {
        path: "workspace/:id",
        element: <Workspace />,
      },
      {
        path: "auth",
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "reset-password/:token",
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },
]);

export default router;
