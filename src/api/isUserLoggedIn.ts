import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number;
}

// Helper to check if a user is logged in with a non-expired token
export const isUserLoggedIn = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
