export interface UserDTO {
  id: string;
  username: string;
  roles: string[];
  token?: string; // returned on login
}
