import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    return (
        <div className="home">

            {/* HERO SECTION */}
            <section className="hero">
                <h1>🛡️ ToxiGuard AI</h1>

                <p>
                    Protect your social media presence with AI-powered moderation.
                    Automatically detect, filter, and remove toxic, abusive, or spam
                    comments from your Instagram posts in real time.
                </p>

                {/* ⭐ PRIMARY ACTIONS */}
                <div className="cta">

                    {/* Install first — main product action */}
                    <Link to="/install" className="btn install">
                        Install Extension
                    </Link>

                    {/* Secondary actions */}
                    <Link to="/signup" className="btn primary">
                        Get Started Free
                    </Link>

                    <Link to="/login" className="btn secondary">
                        Login
                    </Link>

                </div>

                <p className="sub">
                    Trusted by creators, brands, and communities worldwide
                </p>
            </section>

            {/* FEATURES */}
            <section className="features">
                <h2>Why ToxiGuard AI?</h2>

                <div className="grid">
                    <div className="card">
                        <h3>Real-time Detection</h3>
                        <p>Identifies harmful comments instantly using advanced NLP models.</p>
                    </div>

                    <div className="card">
                        <h3>Auto Removal</h3>
                        <p>Deletes toxic comments before they harm your community.</p>
                    </div>

                    <div className="card">
                        <h3>Instagram Integration</h3>
                        <p>Works seamlessly with your existing workflow.</p>
                    </div>

                    <div className="card">
                        <h3>Sentiment Analytics</h3>
                        <p>Track audience mood and engagement trends over time.</p>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="how">
                <h2>How It Works</h2>

                <ol>
                    <li>Create your secure ToxiGuard account</li>
                    <li>Install the browser extension</li>
                    <li>Login to your moderation dashboard</li>
                    <li>AI monitors comments automatically</li>
                </ol>
            </section>

            {/* BENEFITS */}
            <section className="benefits">
                <h2>Who Is It For?</h2>

                <div className="grid">
                    <div className="card">
                        <h3>Content Creators</h3>
                        <p>Maintain a positive environment for your followers.</p>
                    </div>

                    <div className="card">
                        <h3>Brands</h3>
                        <p>Protect brand reputation and customer interactions.</p>
                    </div>

                    <div className="card">
                        <h3>Communities</h3>
                        <p>Encourage healthy conversations and reduce harassment.</p>
                    </div>

                    <div className="card">
                        <h3>Moderators</h3>
                        <p>Automate repetitive moderation tasks.</p>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="stats">
                <h2>Impact at a Glance</h2>

                <div className="grid">
                    <div className="card">
                        <h3>99%</h3>
                        <p>Toxic comments detected accurately</p>
                    </div>

                    <div className="card">
                        <h3>24/7</h3>
                        <p>Continuous automated protection</p>
                    </div>

                    <div className="card">
                        <h3>0 Effort</h3>
                        <p>No manual moderation required</p>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="final-cta">
                <h2>Start Protecting Your Community Today</h2>

                <Link to="/install" className="btn primary large">
                    Install Extension Now
                </Link>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <p>© {new Date().getFullYear()} ToxiGuard AI. All rights reserved.</p>
                <p>
                    Crafted by{" "}
                    <a
                        href="https://wraithklu.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="author"
                    >

                        <span style={{ fontWeight: "bold", fontFamily: "italic", fontSize: "1.2rem", color: "#5ecbff" }}>@Wraaiiitthhh</span>
                    </a>
                </p>      
            </footer>

        </div>
    );
}
