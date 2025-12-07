import ApiClient from "./ApiClient";
import type { UserDTO } from "../types/UserDTO";

export const UserService = {
  async login(username: string, password: string): Promise<UserDTO> {
    const res = await ApiClient.post("/auth/login", { username, password });
    localStorage.setItem("jwt", res.data.token);
    return res.data;
  },

  async register(username: string, password: string): Promise<void> {
    await ApiClient.post("/auth/register", { username, password });
  },

  async me(): Promise<UserDTO> {
    const res = await ApiClient.get("/auth/me");
    return res.data;
  },
};
