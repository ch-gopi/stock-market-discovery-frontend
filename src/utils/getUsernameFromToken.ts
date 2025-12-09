import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub?: string;       // often used for username
  username?: string;  // sometimes explicitly included
  exp?: number;       // expiry timestamp
  iat?: number;       // issued at
}

export function getUsernameFromToken(): string | null {
  const token = localStorage.getItem("jwt");
  if (!token) return null;

  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.username || decoded.sub || null;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
