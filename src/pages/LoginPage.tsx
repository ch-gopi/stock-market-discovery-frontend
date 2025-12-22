import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../api/UserService";
import "../components/styles/login.css";

// 🔑 Helper functions for PKCE
function base64UrlEncode(str: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallenge(verifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(digest);
}

function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  // 🔑 Keycloak configuration
  const KEYCLOAK_URL = "https://localhost:8443";
  const REALM = "Stock-Market-App";     // <-- your Keycloak realm name
  const CLIENT_ID = "oauth2-pkce";      // <-- your Keycloak client ID
  const REDIRECT_URI = "http://localhost:5173/oauth/callback"; // must match Keycloak client settings

  async function handleLogin() {
    try {
      const user = await UserService.login(username, password);
      if (!user || !user.token) {
        setMessage("❌ Login failed: missing token");
        return;
      }
      localStorage.setItem("jwt", user.token);
      setMessage(`🎉 Welcome back, ${user.username ?? username}!`);

      // Redirect to home page
      navigate("/");
    } catch (err: any) {
      setMessage("❌ Login failed: " + (err?.message ?? String(err)));
    }
  }

  // 🔗 GitHub social login handler with PKCE
  const handleGithubLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Save verifier for later token exchange
    localStorage.setItem("pkce_verifier", codeVerifier);

    const authUrl = `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/auth` +
      `?client_id=${CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=openid` +
      `&kc_idp_hint=github` +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256`;

    window.location.href = authUrl;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        {/* Username/Password form */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleLogin}>Login</button>
        {message && <p className="message">{message}</p>}

        {/* Social login buttons */}
       {/* Social login buttons */}
      <div className="social-login">
  <button className="github-login-button" onClick={handleGithubLogin}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      className="github-icon"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.45.11-3.02 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 2.92-.39c.99.01 1.99.13 2.92.39 2.22-1.5 3.2-1.19 3.2-1.19.63 1.57.23 2.73.11 3.02.75.81 1.2 1.85 1.2 3.11 0 4.43-2.7 5.4-5.27 5.69.42.36.8 1.09.8 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56A10.5 10.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
    <span className="github-login-text">Login with GitHub</span>
  </button>
        </div>

      </div>
    </div>
  );
}
