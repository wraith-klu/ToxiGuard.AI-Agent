import os
import joblib
from collections import Counter

from fastapi import FastAPI, Depends, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from utils.preprocessing import preprocess
from utils.abuse_words import detect_abusive_tokens
from utils.sentiment import analyze_sentiment
from utils.llm_guard import analyze_toxicity_llm

from auth_utils import create_access_token, verify_token
from database import Base, engine, get_db
from models import User

from passlib.context import CryptContext


# =====================================================
# PASSWORD HASHING
# =====================================================

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


# =====================================================
# CREATE TABLES
# =====================================================

Base.metadata.create_all(bind=engine)


# =====================================================
# APP INIT
# =====================================================

app = FastAPI(
    title="ToxiGuard AI",
    description="Hybrid Toxic Content Detection",
    version="7.0.0"
)
origins = [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# LOAD ML MODEL
# =====================================================

BASE_DIR = os.path.dirname(__file__)

MODEL_PATH = os.path.join(BASE_DIR, "abuse_model.joblib")
ENCODER_PATH = os.path.join(BASE_DIR, "label_encoder.joblib")

model = None
encoder = None

try:
    model = joblib.load(MODEL_PATH)
    encoder = joblib.load(ENCODER_PATH)
    print("✅ ML model loaded")
except Exception as e:
    print("⚠️ Model load failed:", e)


# =====================================================
# REQUEST SCHEMAS
# =====================================================

class TextRequest(BaseModel):
    text: str


class AuthRequest(BaseModel):
    email: str
    password: str


# =====================================================
# HEALTH CHECK
# =====================================================

@app.get("/")
def health():
    return {"status": "ToxiGuard running"}


# =====================================================
# SIGNUP
# =====================================================

@app.post("/auth/signup", status_code=201)
def signup(req: AuthRequest, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == req.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=req.email,
        password_hash=hash_password(req.password)
    )

    db.add(user)
    db.commit()

    return {"message": "User created successfully"}


# =====================================================
# LOGIN
# =====================================================

@app.post("/auth/login")
def login(req: AuthRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == req.email).first()

    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})

    return {"token": token}


# =====================================================
# AUTH DEPENDENCY
# =====================================================

def get_current_user(authorization: str = Header(None)):

    if not authorization:
        raise HTTPException(status_code=401, detail="Token missing")

    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)

    return payload["sub"]


# =====================================================
# HELPERS
# =====================================================

def generate_suggestions(words):
    return {w: "Use respectful language." for w in words}


def build_response(payload):
    words = payload.get("abusive_words", [])
    payload["word_frequency"] = dict(Counter(words))
    payload["suggestions"] = generate_suggestions(words)
    return payload


def adjust_sentiment(sentiment, toxic):
    if toxic and sentiment:
        sentiment["label"] = "negative"
    return sentiment


# =====================================================
# MAIN PREDICT ENDPOINT (PROTECTED)
# =====================================================

@app.post("/predict")
def predict(
    req: TextRequest,
    user: str = Depends(get_current_user)
):

    text = req.text.strip()

    if not text:
        return {"error": "Empty input"}

    # ---------------- PREPROCESS ----------------

    processed = preprocess(text)
    clean_text = processed["clean_text"]

    sentiment = analyze_sentiment(clean_text)

    # ---------------- RULE ENGINE ----------------

    abusive_hits = detect_abusive_tokens(clean_text)
    rules_triggered = len(abusive_hits) > 0
    rules_conf = 0.95 if rules_triggered else 0.0

    # ---------------- ML ENGINE ----------------

    ml_result = None
    toxic_probability = 0.0

    if model and encoder:
        probs = model.predict_proba([clean_text])[0]
        labels = list(encoder.classes_)

        if "toxic" in labels:
            toxic_probability = float(probs[labels.index("toxic")])

        ml_result = {
            "label": encoder.inverse_transform([probs.argmax()])[0],
            "toxicity_probability": round(toxic_probability, 3)
        }

    # ---------------- LLM ENGINE ----------------

    llm_result = analyze_toxicity_llm(text)
    llm_toxic = llm_result.get("toxic", False)
    llm_conf = llm_result.get("confidence", 0.0) if llm_toxic else 0.0

    # ---------------- FINAL TOXIC DECISION ----------------

    toxic = rules_triggered or toxic_probability >= 0.7 or llm_toxic

    final_confidence = (
        max(rules_conf, toxic_probability, llm_conf)
        if toxic else max(toxic_probability, llm_conf)
    )

    final_confidence = round(final_confidence, 3)

    # ---------------- SEVERITY ----------------

    if final_confidence > 0.85:
        severity = "high"
    elif final_confidence > 0.6:
        severity = "medium"
    else:
        severity = "low"

    # ---------------- SENTIMENT ----------------

    sentiment = adjust_sentiment(sentiment, toxic)

    # ---------------- MERGE ABUSIVE WORDS ----------------

    abusive_words = list(set(
        abusive_hits +
        llm_result.get("detected_phrases", [])
    ))

    # =====================================================
    # ⭐ SOURCE DETECTION (Rules > ML > LLM)
    # =====================================================

    if rules_triggered:
        source = "rules"
    elif toxic_probability >= 0.7:
        source = "ml"
    elif llm_toxic:
        source = "llm"
    else:
        source = "none"

    # =====================================================
    # ⭐ REASON (LLM EXPLANATION)
    # =====================================================

    reason = llm_result.get("explanation") or "No explanation available"

    # =====================================================
    # FINAL PAYLOAD
    # =====================================================

    payload = {
        "user": user,
        "toxic": toxic,
        "confidence": final_confidence,
        "severity": severity,
        "source": source,
        "reason": reason,
        "abusive_words": abusive_words,
        "sentiment": sentiment,
        "ml": ml_result,
        "llm": llm_result,
        "rules": {"triggered": rules_triggered}
    }

    return build_response(payload)