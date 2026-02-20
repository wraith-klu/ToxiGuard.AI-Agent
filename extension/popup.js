const API = "http://127.0.0.1:8090";

// Wait until popup DOM is ready
document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const toggle = document.getElementById("toggle");

  // --------------------------------------------------
  // 🔐 LOGIN
  // --------------------------------------------------

  loginBtn.onclick = async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.token) {

        await chrome.storage.local.set({
          token: data.token,
          enabled: true
        });

        showControl();

      } else {
        alert(data.detail || "Login failed");
      }

    } catch (err) {
      alert("Backend not reachable");
      console.error(err);
    }
  };

  // --------------------------------------------------
  // 🧭 LOAD STATE
  // --------------------------------------------------

  chrome.storage.local.get("token", (data) => {
    if (data.token) showControl();
  });

  // --------------------------------------------------
  // 🎛 TOGGLE MODERATION
  // --------------------------------------------------

  toggle.onchange = async (e) => {
    await chrome.storage.local.set({ enabled: e.target.checked });
  };

  // --------------------------------------------------
  // 🚪 LOGOUT
  // --------------------------------------------------

  logoutBtn.onclick = async () => {
    await chrome.storage.local.clear();
    location.reload();
  };

});


// --------------------------------------------------
// 👁️ SHOW CONTROL PANEL
// --------------------------------------------------

function showControl() {

  document.getElementById("login-section").style.display = "none";
  document.getElementById("control-section").style.display = "block";

  chrome.storage.local.get("enabled", (data) => {
    document.getElementById("toggle").checked = !!data.enabled;
  });
}