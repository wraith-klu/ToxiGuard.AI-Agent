import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-badge">AI Moderation for Instagram</div>

        <h1>🛡️ ToxiGuard AI</h1>

        <h3>
          Stop Toxic Comments Before They Go Viral
        </h3>

        <p className="hero-sub">
          ToxiGuard AI automatically detects, filters, and removes abusive,
          spam, and toxic comments in real time — protecting your brand,
          community, and reputation 24/7.
        </p>

        <div className="cta">
          <Link to="/signup" className="btn primary">
            Start Free Trial
          </Link>

          <Link to="/install" className="btn install">
            Install Extension
          </Link>

          <Link to="/login" className="btn secondary">
            Login
          </Link>
        </div>

        <div className="social-proof">
          Trusted by creators & fast-growing brands
        </div>
      </section>

      {/* ================= METRICS ================= */}
      <section className="metrics-strip">
        <div className="metric">
          <h3>97%</h3>
          <p>Detection Accuracy</p>
        </div>
        <div className="metric">
          <h3>&lt;10s</h3>
          <p>Response Time</p>
        </div>
        <div className="metric">
          <h3>24/7</h3>
          <p>Continuous Protection</p>
        </div>
        <div className="metric">
          <h3>0 Manual</h3>
          <p>Moderation Needed</p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <h2>Powerful Moderation Engine</h2>

        <div className="grid">
          <div className="card">
            <h3>Hybrid AI Detection</h3>
            <p>
              Combines rule-based filtering, machine learning,
              and LLM-based analysis for maximum precision.
            </p>
          </div>

          <div className="card">
            <h3>Real-Time Filtering</h3>
            <p>
              Comments are evaluated instantly as they appear —
              no delay, no manual review.
            </p>
          </div>

          <div className="card">
            <h3>Sentiment Intelligence</h3>
            <p>
              Track audience mood trends and detect negativity spikes
              before they escalate.
            </p>
          </div>

          <div className="card">
            <h3>Extension + Dashboard</h3>
            <p>
              Moderate directly from Instagram or use the analytics dashboard
              for deeper insights.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how">
        <h2>How It Works</h2>

        <div className="grid steps">
          <div className="step">
            <span>1</span>
            <p>Create your secure account</p>
          </div>

          <div className="step">
            <span>2</span>
            <p>Install the browser extension</p>
          </div>

          <div className="step">
            <span>3</span>
            <p>AI monitors & filters automatically</p>
          </div>

          <div className="step">
            <span>4</span>
            <p>Track insights from dashboard</p>
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="benefits">
        <h2>Built For Modern Digital Teams</h2>

        <div className="grid">
          <div className="card">
            <h3>Creators</h3>
            <p>Protect your personal brand and community trust.</p>
          </div>

          <div className="card">
            <h3>Brands</h3>
            <p>Maintain professional engagement and reputation.</p>
          </div>

          <div className="card">
            <h3>Agencies</h3>
            <p>Manage multiple accounts with scalable moderation.</p>
          </div>

          <div className="card">
            <h3>Communities</h3>
            <p>Foster safe and respectful online spaces.</p>
          </div>
        </div>
      </section>

      {/* ================= SECURITY ================= */}
      <section className="security">
        <h2>Security & Privacy First</h2>
        <p>
          We do not store Instagram credentials. All authentication is token-based,
          encrypted, and compliant with modern security standards.
        </p>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="final-cta">
        <h2>Ready to Protect Your Community?</h2>
        <p>Start for free. Upgrade anytime.</p>

        <Link to="/signup" className="btn primary large">
          Get Started
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} ToxiGuard AI. All rights reserved.</p>

        <p>
          Built by{" "}
          <a
            href="https://wraithklu.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="author"
          >
            @Wraaiiitthhh
          </a>
        </p>
      </footer>

    </div>
  );
}