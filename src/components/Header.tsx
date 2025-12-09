import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../api/isUserLoggedIn";

const HeaderComponent = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Support both sync and async implementations of isUserLoggedIn
    Promise.resolve(isUserLoggedIn()).then((res) => {
      setIsAuthenticated(Boolean(res));
    });
  }, []);

  function handleLogout() {
    localStorage.removeItem("jwt"); // clear token
    setIsAuthenticated(false);
    navigate("/home"); // redirect back to public homepage
  }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#001f3f",
        padding: "1rem 2rem",
        color: "white",
      }}
    >
      <h1>Market Discovery Platform</h1>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "1rem",
          margin: 0,
          padding: 0,
        }}
      >
        {isAuthenticated ? (
          <li>
            <button type="button"
              onClick={handleLogout}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default HeaderComponent;
