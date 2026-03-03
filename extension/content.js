// ==================================================
// 🔐 Get settings via background script (SAFE)
// ==================================================

async function getSettings() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(
      { action: "GET_SETTINGS" },
      response => resolve(response || {})
    );
  });
}

// ==================================================
// 📡 Call backend
// ==================================================

async function analyzeComment(text) {
  const { token, enabled } = await getSettings();

  if (!token || !enabled) return null;

  try {
    const res = await fetch(
      "https://toxiguard-ai-agent-1.onrender.com/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
}

// ==================================================
// 🎯 Highlight toxic comment
// ==================================================

function markToxic(commentRow) {
  commentRow.style.background = "rgba(255, 0, 0, 0.25)";
  commentRow.style.borderRadius = "12px";
}

// ==================================================
// 🧠 Detect REAL Instagram comments
// ==================================================

function getCommentElements() {
  const results = [];

  document.querySelectorAll("ul li").forEach(li => {
    const username = li.querySelector("h3");
    if (!username) return;

    const spans = li.querySelectorAll("span");

    spans.forEach(span => {
      const text = span.innerText?.trim();

      if (
        text &&
        text.length > 2 &&
        !text.match(/^(Reply|Like|See translation|Edited)$/i)
      ) {
        results.push({
          element: span,
          row: li,
          text
        });
      }
    });
  });

  return results;
}

// ==================================================
// 🔍 Scan comments
// ==================================================

async function scanComments() {
  const comments = getCommentElements();

  for (const { element, row, text } of comments) {

    if (element.dataset.toxiguardChecked) continue;

    element.dataset.toxiguardChecked = "true";

    const result = await analyzeComment(text);

    // Robust toxic detection (supports multiple API formats)
    const isToxic =
      result?.toxic === true ||
      result?.is_toxic === true ||
      result?.label === "toxic" ||
      result?.prediction === "toxic" ||
      result?.confidence > 0.7;

    if (isToxic) {
      markToxic(row);
    }
  }
}

// ==================================================
// 🚀 MutationObserver — detect new comments
// ==================================================

const commentObserver = new MutationObserver(() => {
  scanComments();
});

commentObserver.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial scan
scanComments();

// ==================================================
// 🔁 Instagram SPA navigation handler
// ==================================================

let lastUrl = location.href;

const urlObserver = new MutationObserver(() => {
  const currentUrl = location.href;

  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;

    console.log("🔄 Instagram navigation detected");

    document
      .querySelectorAll("[data-toxiguard-checked]")
      .forEach(el => delete el.dataset.toxiguardChecked);

    setTimeout(scanComments, 1500);
  }
});

urlObserver.observe(document.body, {
  childList: true,
  subtree: true
});