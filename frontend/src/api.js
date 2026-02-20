// =====================================================
// Backend Configuration
// =====================================================

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8090";

// =====================================================
// Shared fetch helper (WITH AUTH)
// =====================================================

async function apiFetch(url, options = {}) {

  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options,
  });

  // 🔐 Handle expired / invalid token
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }

  return res.json();
}

// =====================================================
// Predict Toxicity
// =====================================================

export async function predictText(text) {

  return apiFetch(`${BASE_URL}/predict`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });

}