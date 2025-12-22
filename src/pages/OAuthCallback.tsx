import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      console.error("OAuth error:", params.get("error_description"));
      return;
    }

    if (code) {
      const codeVerifier = localStorage.getItem("pkce_verifier");
      if (!codeVerifier) {
        console.error("Missing PKCE verifier in localStorage");
        return;
      }

      // 🔑 Exchange authorization code for tokens
      fetch("https://localhost:8443/realms/Stock-Market-App/protocol/openid-connect/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: "oauth2-pkce",
          code,
          redirect_uri: "http://localhost:5173/oauth/callback",
          code_verifier: codeVerifier
        })
      })
        .then(res => {
          if (!res.ok) throw new Error("Token request failed");
          return res.json();
        })
        .then(data => {
          // Save tokens
          localStorage.setItem("jwt", data.access_token);
          localStorage.setItem("id_token", data.id_token);
          localStorage.setItem("refresh_token", data.refresh_token);

          // Cleanup PKCE verifier
          localStorage.removeItem("pkce_verifier");

          // Redirect to home
          navigate("/");
        })
        .catch(err => {
          console.error("Token exchange failed:", err);
        });
    }
  }, [navigate]);

  return <p>Completing login...</p>;
}
