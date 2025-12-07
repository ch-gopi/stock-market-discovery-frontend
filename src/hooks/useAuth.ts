import { useState, useEffect } from "react";
import { UserService } from "../api/UserService";
import type{ UserDTO } from "../types/UserDTO";
export function useAuth() {
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await UserService.me();
        setUser(data);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  async function login(username: string, password: string) {
    const data = await UserService.login(username, password);
    setUser(data);
  }

  function logout() {
    localStorage.removeItem("jwt");
    setUser(null);
  }

  return { user, login, logout };
}
