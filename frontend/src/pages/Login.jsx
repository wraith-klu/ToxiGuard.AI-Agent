import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";


const API =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8090";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);

        alert("Login successful");
        navigate("/dashboard");
      } else {
        alert(data.detail || "Login failed");
      }

    } catch (err) {
      alert("Backend not reachable");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="auth-alt">
          Don’t have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign Up
          </Link>
        </p>

        {/* Back to Home */}
        <button
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}