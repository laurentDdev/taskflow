import HomeNavigation from "./components/HomeNavigation";
import HomeHeader from "./components/HomeHeader";
import { useState } from "react";
import HomeContent from "./components/HomeContent";
import { Navigate } from "react-router";
import { signOut, useSession } from "@/lib/auth-client";
import Loading from "../Loading.page";

const Home = () => {
  const { data: session, isPending } = useSession();
  const [filter, setFilter] = useState("");

  if (isPending) return <Loading />;

  if (!session?.user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="h-screen flex flex-col gap-2">
      <HomeNavigation user={session?.user} logout={signOut} />
        <HomeHeader filter={filter} setFilter={setFilter} />
        <HomeContent filter={filter} user={session.user} />
    </div>
  );
};

export default Home;
