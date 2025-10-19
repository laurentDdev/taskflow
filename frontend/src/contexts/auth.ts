import type { AuthUser } from "@/types/AuthUser";
import { createContext, useContext } from "react";

export type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => void;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
