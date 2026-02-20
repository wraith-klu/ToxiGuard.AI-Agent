import { useNavigate } from "react-router-dom";
import "./InstallExtension.css";

export default function InstallExtension() {
  const navigate = useNavigate();

  return (
    <div className="install-page">
      <div className="install-card">

        <h1>ToxiGuard Extension</h1>

        <p className="subtitle">
          Protect your social media from toxic comments in real time.
          Install the Chrome extension to enable automatic moderation.
        </p>

        {/* Download Button */}
        <a
          href="/extension.zip"
          download
          className="download-btn"
        >
          ⬇ Download Extension
        </a>

        {/* Steps */}
        <div className="steps">
          <h3>How to Install</h3>

          <ol>
            <li>Download the extension ZIP file</li>
            <li>Extract the ZIP to a folder</li>
            <li>Open Chrome → chrome://extensions</li>
            <li>Enable <b>Developer Mode</b></li>
            <li>Click <b>Load Unpacked</b></li>
            <li>Select the extracted folder</li>
          </ol>
        </div>

        {/* Back */}
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}