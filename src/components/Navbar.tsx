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
  // Clears both localStorage and sessionStorage
function handleout ()  {
  localStorage.clear();   // removes JWT or any persisted tokens
  sessionStorage.clear(); // removes user info, role, etc.
};


  function handleLogout() {
  
    navigate("/"); // redirect after logout
  }

  return (
    <nav className="navbar">
      <h2>Stock Market Discovery</h2>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              style={{
                color: location.pathname === link.path ? "#E94560" : "#fff",
                borderBottom:
                  location.pathname === link.path ? "2px solid #E94560" : "none",
              }}
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
                style={{
                  color: location.pathname === "/login" ? "#E94560" : "#fff",
                  borderBottom:
                    location.pathname === "/login" ? "2px solid #E94560" : "none",
                }}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                style={{
                  color: location.pathname === "/register" ? "#E94560" : "#fff",
                  borderBottom:
                    location.pathname === "/register" ? "2px solid #E94560" : "none",
                }}
              >
                Register
              </Link>
            </li>
          </>
        )}

        {isAuth && (
          <li>
            <button
              onClick={() => { handleout(); handleLogout(); }}
             style={{
        background: "transparent",
        border: "none",
        color: "#fff",
        cursor: "pointer",
      
        padding: "0",          // remove extra vertical padding
        margin: "0",           // no margin
        lineHeight: "1",       // compact line height
        fontSize: "16px",      // match nav link size
        height: "auto",        // let content define height
        verticalAlign: "middle" // align with text baseline
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
