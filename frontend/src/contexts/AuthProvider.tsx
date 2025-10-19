import authApi from "@/apis/auth.api";
import type { AuthUser } from "@/types/AuthUser";
import { useState, type PropsWithChildren } from "react";
import { Navigate, useLoaderData, useLocation } from "react-router";
import { AuthContext } from "./auth";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const data = useLoaderData() as AuthUser | null;
  const [user, setUser] = useState<AuthUser | null>(data);
  const location = useLocation();

  const login = async (email: string, password: string) => {
    const userData = await authApi.loginUser(email, password);
    setUser(userData);
  };

  const logout = async () => {
    await authApi.logoutUser();
    setUser(null);
  };

  const isAuthPage = location.pathname.startsWith("/auth");

  if (!user && !isAuthPage) {
    return <Navigate to="/auth" replace />;
  }

  if (user && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthContext.Provider value={{ user, login, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
