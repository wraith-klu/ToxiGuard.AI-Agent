import { useNavigate } from "react-router-dom";
import "./InstallExtension.css";

export default function InstallExtension() {
  const navigate = useNavigate();

  return (
    <div className="install-page">
      <div className="install-container">

        <div className="install-header">
          <h1>Install ToxiGuard Extension</h1>
          <p className="subtitle">
            Enable real-time AI moderation directly inside Instagram.
            No complex setup. No credentials required.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="install-cta">
          <a
            href="/extension.zip"
            download
            className="download-btn"
          >
            Download Extension (.zip)
          </a>

          <p className="secure-note">
            Works with Chrome & Chromium-based browsers
          </p>
        </div>

        {/* Installation Steps */}
        <div className="steps-card">
          <h3>Installation Guide</h3>

          <div className="steps-grid">
            <div className="step">
              <span>1</span>
              <p>Download the extension ZIP file</p>
            </div>

            <div className="step">
              <span>2</span>
              <p>Extract it to a local folder</p>
            </div>

            <div className="step">
              <span>3</span>
              <p>Open Chrome → <b>chrome://extensions</b></p>
            </div>

            <div className="step">
              <span>4</span>
              <p>Enable <b>Developer Mode</b></p>
            </div>

            <div className="step">
              <span>5</span>
              <p>Click <b>Load Unpacked</b></p>
            </div>

            <div className="step">
              <span>6</span>
              <p>Select the extracted extension folder</p>
            </div>
          </div>
        </div>

        <div className="usage-card">
          <h3>How to Use ToxiGuard</h3>

          <div className="steps-grid">

            <div className="step">
              <span>1</span>
              <p>Click the ToxiGuard icon in your Chrome toolbar</p>
            </div>

            <div className="step">
              <span>2</span>
              <p>Make sure you are logged in</p>
            </div>

            <div className="step">
              <span>3</span>
              <p>Enable <b>Moderation</b> using the toggle switch</p>
            </div>

            <div className="step">
              <span>4</span>
              <p>Open <b>Instagram</b> in Google Chrome</p>
            </div>

            <div className="step">
              <span>5</span>
              <p>Log in to your Instagram account</p>
            </div>

            <div className="step">
              <span>6</span>
              <p>Open any post and view the comments section</p>
            </div>

            <div className="step">
              <span>7</span>
              <p>
                ToxiGuard will automatically scan and detect abusive or toxic
                comments in real time
              </p>
            </div>

          </div>

          <div className="usage-note">
            <p>
              If moderation does not start immediately, refresh the Instagram page
              after enabling it.
            </p>
          </div>
        </div>


        
        {/* Security Section */}
        <div className="security-box">
          <h4>Security & Privacy</h4>
          <p>
            ToxiGuard does not store Instagram passwords.
            All moderation is processed securely via your authenticated session.
          </p>
        </div>

        {/* Back Button */}
        <div className="install-footer">
          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}