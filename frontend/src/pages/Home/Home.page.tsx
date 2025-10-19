import { useTranslation } from "react-i18next";

import { useAuth } from "@/contexts/auth";
import HomeNavigation from "./components/HomeNavigation";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="h-screen ">
      <HomeNavigation user={user!} logout={logout} />
    </div>
  );
};

export default Home;
