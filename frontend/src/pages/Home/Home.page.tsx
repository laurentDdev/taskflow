import { useTranslation } from "react-i18next";

import { useAuth } from "@/contexts/auth";
import HomeNavigation from "./components/HomeNavigation";
import HomeHeader from "./components/HomeHeader";
import { useEffect, useState } from "react";
import HomeContent from "./components/HomeContent";
import { useLoaderData } from "react-router";
import useWorkspaceStore from "@/stores/workspace.store";

const Home = () => {
  const { user, logout } = useAuth();
  const { setWorkspaces } = useWorkspaceStore();
  const [filter, setFilter] = useState("");
  const data = useLoaderData();

  useEffect(() => {
    setWorkspaces(data.workspaces);
  }, [data]);

  return (
    <div className="h-screen flex flex-col">
      <HomeNavigation user={user!} logout={logout} />
      <div className="p-5 gap-5 flex-1 flex flex-col">
        <HomeHeader filter={filter} setFilter={setFilter} />
        <HomeContent />
      </div>
    </div>
  );
};

export default Home;
