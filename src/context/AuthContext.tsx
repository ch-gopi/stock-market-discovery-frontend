import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserService } from "../api/UserService";
import type{ UserDTO } from "../types/UserDTO";

interface AuthContextType {
  user: UserDTO | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    UserService.me()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  async function login(username: string, password: string) {
    // login only returns tokens; fetch the profile separately once the jwt is stored
    await UserService.login(username, password);
    const profile = await UserService.me();
    setUser(profile);
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
