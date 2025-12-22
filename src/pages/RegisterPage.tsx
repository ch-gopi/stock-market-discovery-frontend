import { useState } from "react";
import { UserService } from "../api/UserService";
import "../components/styles/register.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);


  async function handleRegister() {
  try {
    await UserService.register(username, password);
    setMessage("🎉 Registration successful! You can now log in.");
  } catch (err: any) {
    // If using Axios
    if (err.response && err.response.data && err.response.data.error) {
      setMessage("❌ Registration failed: " + err.response.data.error);
    } else {
      setMessage("❌ Registration failed: " + err.message);
    }
  }
}


  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
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
        <button type="button" onClick={handleRegister}>Register</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
