import ApiClient from "./ApiClient";
import type { UserDTO } from "../types/UserDTO";
import axios from "axios";

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
    const token = localStorage.getItem("jwt");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.get("http://localhost:8081/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  },
};