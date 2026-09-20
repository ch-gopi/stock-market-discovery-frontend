// Matches GET /auth/me response shape from user-service
export interface UserDTO {
  username: string;
  authorities?: { authority: string }[];
}

// Matches POST /auth/login and POST /auth/refresh response shape from user-service
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
