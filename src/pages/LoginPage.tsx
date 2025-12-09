import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../api/UserService";
import "../components/styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleLogin() {
    try {
      const user = await UserService.login(username, password);
      if (!user || !user.token) {
        setMessage("❌ Login failed: missing token");
        return;
      }
      localStorage.setItem("jwt", user.token);
      setMessage(`🎉 Welcome back, ${user.username ?? username}!`);

      // 🔄 Redirect to NewHomePage
      navigate("/");
    } catch (err: any) {
      setMessage("❌ Login failed: " + (err?.message ?? String(err)));
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
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
      </div>
    </div>
  );
}
