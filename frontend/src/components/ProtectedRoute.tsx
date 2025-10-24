import {type PropsWithChildren} from 'react';
import {useSession} from "@/lib/auth-client.ts";
import {Navigate} from "react-router";
import Loading from "@/pages/Loading.page.tsx";

const ProtectedRoute = ({children}: PropsWithChildren) => {
    const {data: session, isPending} = useSession()

    if (isPending) {
        return <Loading />
    }

    if (!session?.user) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;