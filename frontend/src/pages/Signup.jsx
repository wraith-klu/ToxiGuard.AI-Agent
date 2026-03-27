import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // ✅ reuse same CSS as login

const API =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8090";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      let data = {};
      try {
        data = await res.json();
      } catch { }

      if (res.ok) {
        alert("Account created successfully");
        navigate("/login");
      } else {
        alert(data.detail || "Signup failed");
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
      <div className="auth-container">

        {/* LEFT SIDE */}
        <div className="auth-card">
          <h2>Create Account</h2>

          <form onSubmit={handleSignup} className="auth-form">
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
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="auth-alt">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>

          <button
            className="back-home-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <img src="/sky.jpg" alt="AI" />
          <div className="auth-overlay">ToxiGuard.AI</div>
        </div>

      </div>
    </div>
  );
}