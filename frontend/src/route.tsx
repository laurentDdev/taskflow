import {createBrowserRouter} from "react-router";
import App from "@/App.tsx";
import LoginPage from "@/pages/Auth/Login.page.tsx";
import RegisterPage from "@/pages/Auth/Register.page.tsx";


const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: 'auth',
                children: [
                    {
                        index: true,
                        element: <LoginPage />
                    },
                    {
                        path: 'register',
                        element: <RegisterPage />
                    }
                ]
            },
        ]
    }
])







export default router;