```markdown
# 🛡️ ToxiGuard AI

**ToxiGuard AI** is an **AI-powered social media moderation platform** that detects, analyzes, and removes toxic comments in real time. It combines **Machine Learning models, LLM explainability, and a Chrome extension** to protect creators, brands, and online communities from harmful content.


## 🌐 Live Demo

**Frontend (Vercel)**  
👉 https://toxiai.vercel.app

**Backend API (Render)**  
👉 https://toxiguard-ai-agent-1.onrender.com/  
👉 API Docs: https://toxiguard-ai-agent-1.onrender.com/docs

**GitHub Repository**  
👉 https://github.com/wraith-klu/ToxiGuard-AI


## 🧠 Tech Stack

* ⚛️ **React (Vite)** — Premium glassmorphism UI
* 🚀 **FastAPI** — High-performance backend API
* 🧠 **Machine Learning** — TF-IDF + Logistic Regression
* 🤖 **LLM (OpenRouter)** — Context-aware moderation fallback
* 🧩 **Chrome Extension** — Real-time social media protection
* 📊 **Analytics** — KPI dashboard, charts, word clouds
* 🗄️ **SQLite Database** — User authentication & history


## ✨ Key Features

### 🔎 AI Moderation Engine
* ✅ Real-time toxic content detection
* ✅ ML-based classification (high accuracy)
* ✅ LLM fallback for nuanced cases
* ✅ Abusive keyword highlighting
* ✅ Toxicity severity estimation
* ✅ Confidence scoring

### 📊 Analytics & Insights
* ✅ KPI dashboard (word count, abusive count, toxicity)
* ✅ Toxicity confidence bar
* ✅ Pie chart distribution
* ✅ Abuse table with CSV export
* ✅ Word cloud visualization
* ✅ Analysis history tracking

### 🔐 User System
* ✅ Secure signup & login
* ✅ Personal moderation dashboard
* ✅ Persistent analysis history

### 🧩 Browser Protection
* ✅ Chrome extension for real-time moderation
* ✅ Works on social platforms
* ✅ Protects creators and communities

### 🎨 UI/UX
* ✅ Premium glassmorphism design
* ✅ Responsive layout
* ✅ Modern analytics interface


## 📁 Project Structure

```
ToxiGuard-AI/
│
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── auth_utils.py
│   ├── models.py
│   ├── train_model.py
│   ├── requirements.txt
│   ├── abuse_model.joblib
│   ├── label_encoder.joblib
│   └── utils/
│       ├── abuse_words.py
│       ├── preprocessing.py
│       ├── sentiment.py
│       └── llm_guard.py
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js
│       ├── styles.css
│       └── components/
│           ├── Header.jsx
│           ├── TextInput.jsx
│           ├── LiveResult.jsx
│           ├── KPI.jsx
│           ├── Charts.jsx
│           ├── AbuseTable.jsx
│           ├── History.jsx
│           └── WordClouds.jsx
│
├── extension/
│   ├── manifest.json
│   ├── content.js
│   ├── background.js
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
│
└── README.md
````


## 🧩 Backend Setup (Local)

### 1️⃣ Create virtual environment

```bash
cd backend
python -m venv venv
venv\Scripts\activate
````

### 2️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Environment variables

Create:

```
backend/.env
```

Add:

```env
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=arcee-ai/trinity-large-preview:free
```

### 4️⃣ Train ML model (run once)

```bash
python train_model.py
```

Generates:

```
abuse_model.joblib
label_encoder.joblib
```

### 5️⃣ Run backend

```bash
uvicorn app:app --host 0.0.0.0 --port 8090 --reload
```

Backend:

```
http://127.0.0.1:8090
```

Docs:

```
http://127.0.0.1:8090/docs
```

## ⚛️ Frontend Setup (Local)

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Environment variable

Create:

```
frontend/.env
```

Add:

```env
VITE_BACKEND_URL=http://127.0.0.1:8090
```

### 3️⃣ Run frontend

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

## 🔗 API Usage

### Endpoint

```
POST /predict
```

### Request

```json
{
  "text": "you are stupid"
}
```

### Response

```json
{
  "toxic": true,
  "confidence": 0.95,
  "severity": "high",
  "reason": "Matched abusive keywords",
  "abusive_words": ["stupid"],
  "sentiment": {
    "label": "negative",
    "polarity": -0.6,
    "confidence": 0.6
  },
  "source": "rules"
}
```

## ⚠️ Common Issues & Fixes

### ❌ Backend not opening

```bash
uvicorn app:app --host 0.0.0.0 --port 8090 --reload
```

Verify:

```
http://127.0.0.1:8090/docs
```

### ❌ Node dependency conflicts

```bash
npm cache clean --force
npm install
npm run dev
```

Recommended:

```
Node 18 LTS
```

### ❌ ML model not loading

```bash
python train_model.py
```

### ❌ API not responding / CORS issues

Ensure backend is running and frontend `.env` has correct URL.

## 📦 Production Build

```bash
npm run build
```

Output:

```
frontend/dist
```

## 👨‍💻 Author

**Saurabh Yadav**

## 📜 License

MIT License

```
```
