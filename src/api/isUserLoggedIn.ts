// Simple helper to check if a user is logged in
export const isUserLoggedIn = () => {
  const username = localStorage.getItem("jwt");
  return username !== null;
};
