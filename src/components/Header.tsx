import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../api/isUserLoggedIn";


const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Promise.resolve(isUserLoggedIn()).then((res) => {
      setIsAuthenticated(Boolean(res));
    });
  }, []);

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    navigate("/home");
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
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Market Discovery Platform</h1>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "1.5rem",
          margin: 0,
          padding: 0,
          alignItems: "center",
        }}
      >
        <li>
          <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/quotes" style={{ color: "white", textDecoration: "none" }}>
            Quotes
          </Link>
        </li>
        <li>
          <Link to="/historical" style={{ color: "white", textDecoration: "none" }}>
            Historical
          </Link>
        </li>
        <li>
          <Link to="/watchlist" style={{ color: "white", textDecoration: "none" }}>
            Watchlist
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button
              type="button"
              onClick={handleLogout}
             style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "2px solid red",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  lineHeight: "1", // 🔥 ensures vertical alignment
                  display: "inline-block", // 🔥 aligns with text links
                  verticalAlign: "middle", // 🔥 aligns with other nav items
                  marginTop: "-88px", // optional fine-tune
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
