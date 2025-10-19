import { createBrowserRouter } from "react-router";
import App from "@/App.tsx";
import LoginPage from "@/pages/Auth/Login.page.tsx";
import RegisterPage from "@/pages/Auth/Register.page.tsx";
import { rootLoader } from "./loaders/rootLoader";
import ForgotPassword from "./pages/Auth/Forgot-passwod.page";
import ResetPassword from "./pages/Auth/Reset-password.page";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    loader: rootLoader,
    children: [
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
