import HomeNavigation from "./components/HomeNavigation";
import HomeHeader from "./components/HomeHeader";
import { useEffect, useState } from "react";
import HomeContent from "./components/HomeContent";
import { Navigate, useLoaderData } from "react-router";
import useWorkspaceStore from "@/stores/workspace.store";
import { signOut, useSession } from "@/lib/auth-client";
import Loading from "../Loading.page";

const Home = () => {
  const { data: session, isPending } = useSession();
  const { setWorkspaces } = useWorkspaceStore();
  const [filter, setFilter] = useState("");
  const data = useLoaderData();

  useEffect(() => {
    setWorkspaces(data.workspaces);
  }, [data, setWorkspaces]);

  if (isPending) return <Loading />;

  if (!session?.user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="h-screen flex flex-col">
      <HomeNavigation user={session?.user} logout={signOut} />
      <div className="p-5 gap-5 flex-1 flex flex-col">
        <HomeHeader filter={filter} setFilter={setFilter} />
        <HomeContent filter={filter} />
      </div>
    </div>
  );
};

export default Home;
