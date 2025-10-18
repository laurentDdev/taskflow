import type { AuthUser } from "@/types/AuthUser";
import type { PropsWithChildren } from "react";
import { createContext } from "react-router";

export type AuthContextType = {
  user: AuthUser;
  login: (user: AuthUser) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
