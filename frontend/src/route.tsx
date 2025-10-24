import {createBrowserRouter} from "react-router";
import App from "@/App.tsx";

import {lazy} from "react";
import {rootLoader} from "./loaders/rootLoader.ts";
import RootLayout from "./rootLayout.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import InviteToWorkspacePage from "@/pages/Workspace/InviteToWorkspace.page.tsx";

const LoginPage = lazy(() => import("./pages/Auth/Login.page.tsx"));
const RegisterPage = lazy(() => import("./pages/Auth/Register.page.tsx"));
const ForgotPassword = lazy(() => import("./pages/Auth/Forgot-passwod.page"));
const ResetPassword = lazy(() => import("./pages/Auth/Reset-password.page"));

const Home = lazy(() => import("./pages/Home/Home.page.tsx"));
const Workspace = lazy(() => import("./pages/Workspace/Workspace.tsx"));

const router = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [
            {
                loader: rootLoader,
                element: <ProtectedRoute> <RootLayout/> </ProtectedRoute>,
                children: [
                    {
                        index: true,
                        element: <Home/>,
                    },
                    {
                        path: "workspace/:id",
                        element: <Workspace/>,
                    },
                    {
                        path: 'workspace/invite/:inviteCode',
                        element: <InviteToWorkspacePage/>,
                    }
                ],
            },
            {
                path: "auth",
                children: [
                    {
                        index: true,
                        element: <LoginPage/>,
                    },
                    {
                        path: "register",
                        element: <RegisterPage/>,
                    },
                    {
                        path: "forgot-password",
                        element: <ForgotPassword/>,
                    },
                    {
                        path: "reset-password/:token",
                        element: <ResetPassword/>,
                    },
                ],
            },
        ],
    },
]);

export default router;
