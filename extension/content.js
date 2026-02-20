// --------------------------------------------------
// 🔐 Get settings (token + enabled state)
// --------------------------------------------------

async function getSettings() {
  return await chrome.storage.local.get(["token", "enabled"]);
}

// --------------------------------------------------
// 📡 Call backend with JWT
// --------------------------------------------------

async function analyzeComment(text) {

  const { token, enabled } = await getSettings();

  if (!token || !enabled) return null;

  try {
    const res = await fetch("http://127.0.0.1:8090/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });

    if (!res.ok) return null;

    return await res.json();

  } catch (err) {
    console.error("API error:", err);
    return null;
  }
}

// --------------------------------------------------
// 🎯 Highlight toxic comment
// --------------------------------------------------

function markToxic(element) {
  element.style.backgroundColor = "rgba(255, 0, 0, 0.25)";
  element.style.borderRadius = "10px";
}

// --------------------------------------------------
// 🧠 Get Instagram comment text nodes (stable selector)
// --------------------------------------------------

function getCommentElements() {
  return document.querySelectorAll("li h3 + div span");
}

// --------------------------------------------------
// 🔍 Scan comments continuously
// --------------------------------------------------

async function scanComments() {

  const comments = getCommentElements();

  for (const el of comments) {

    if (el.dataset.checked) continue;

    el.dataset.checked = "true";

    const text = el.innerText.trim();

    if (!text || text.length < 3) continue;

    const result = await analyzeComment(text);

    if (result?.toxic) {
      const commentRow = el.closest("li");
      if (commentRow) markToxic(commentRow);
    }
  }
}

// Instagram loads dynamically
setInterval(scanComments, 2000);