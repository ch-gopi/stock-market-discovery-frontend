import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  exp: number;
  roles?: string[];
}

export function getUserFromToken(token: string) {
  const decoded = jwtDecode<JwtPayload>(token);
  return { username: decoded.sub, roles: decoded.roles || [] };
}

export function isTokenExpired(token: string): boolean {
  const decoded = jwtDecode<JwtPayload>(token);
  return Date.now() >= decoded.exp * 1000;
}
