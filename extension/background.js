// ==================================================
// 🚀 Extension loaded
// ==================================================

console.log("ToxiGuard AI Extension Running");

// ==================================================
// 🔐 Handle requests from content scripts
// ==================================================

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  // 👉 Send stored token + enabled state
  if (msg.action === "GET_SETTINGS") {

    chrome.storage.local.get(["token", "enabled"], data => {
      sendResponse(data);
    });

    return true; // required for async response
  }

});