import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const API = "http://127.0.0.1:8090";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {

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

      const data = await res.json();

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

      <h2>Create Account</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Creating..." : "Sign Up"}
      </button>

    </div>
  );
}