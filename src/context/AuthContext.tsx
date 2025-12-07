import { createContext, useContext, useState, useEffect } from "react";
import { UserService } from "../api/UserService";
import type{ UserDTO } from "../types/UserDTO";

interface AuthContextType {
  user: UserDTO | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    UserService.me()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  async function login(username: string, password: string) {
    const data = await UserService.login(username, password);
    setUser(data);
  }

  function logout() {
    localStorage.removeItem("jwt");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
