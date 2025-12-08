import { Link, useLocation, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../api/isUserLoggedIn";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = isUserLoggedIn();

  const links = [
    { path: "/", label: "Home" },
    { path: "/quotes", label: "Quotes" },
    { path: "/historical", label: "Historical" },
    { path: "/watchlist", label: "Watchlist" },
  ];

  function handleout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  function handleLogout() {
    navigate("/");
  }

  return (
    <nav className="navbar">
      <h2 className="logo">Stock Market Discovery</h2>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {!isAuth && (
          <>
            <li>
              <Link
                to="/login"
                className={location.pathname === "/login" ? "active" : ""}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={location.pathname === "/register" ? "active" : ""}
              >
                Register
              </Link>
            </li>
          </>
        )}

        {isAuth && (
          <li>
            <button
              className="logout-btn"
              onClick={() => {
                handleout();
                handleLogout();
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
