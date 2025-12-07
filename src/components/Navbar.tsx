import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/quotes", label: "Quotes" },
    { path: "/historical", label: "Historical" },
    { path: "/watchlist", label: "Watchlist" },
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];

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
      </ul>
    </nav>
  );
}
