// src/utils/auth.ts
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  sub: string;      // username
  userId: number;   // custom claim
  exp: number;      // expiration timestamp
}

export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem("jwt");
  if (!token) return null;

  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded.userId;
  } catch (err) {
    console.error("Failed to decode JWT", err);
    return null;
  }
};

export const isUserLoggedIn = (): boolean => {
  const token = localStorage.getItem("jwt");
  if (!token) return false;

  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded.exp * 1000 > Date.now(); // check expiry
  } catch {
    return false;
  }
};
