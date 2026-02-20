# train_model.py

import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder

from utils.preprocessing import normalize_text


# =====================================================
# LOAD DATASET (Jigsaw)
# =====================================================

DATA_PATH = "data/train.csv"

df = pd.read_csv(DATA_PATH)

print("Dataset loaded:", df.shape)


# =====================================================
# CONVERT MULTI-LABEL → SINGLE LABEL
# =====================================================

toxicity_cols = [
    "toxic",
    "severe_toxic",
    "obscene",
    "threat",
    "insult",
    "identity_hate"
]

# If ANY toxic category is 1 → toxic
df["label"] = df[toxicity_cols].max(axis=1)

df["label"] = df["label"].map({
    1: "toxic",
    0: "clean"
})

print("\nClass distribution:")
print(df["label"].value_counts())


# =====================================================
# CLEAN TEXT
# =====================================================

df["text"] = df["comment_text"].astype(str).apply(normalize_text)


# =====================================================
# ENCODE LABELS
# =====================================================

encoder = LabelEncoder()
df["label_encoded"] = encoder.fit_transform(df["label"])

joblib.dump(encoder, "label_encoder.joblib")


X = df["text"]
y = df["label_encoded"]


# =====================================================
# TRAIN TEST SPLIT
# =====================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# =====================================================
# MODEL PIPELINE
# =====================================================

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(
        ngram_range=(1, 2),
        max_features=20000,
        min_df=2
    )),
    ("clf", LogisticRegression(
        max_iter=3000,
        class_weight="balanced",
        n_jobs=-1
    ))
])


# =====================================================
# TRAIN
# =====================================================

pipeline.fit(X_train, y_train)


# =====================================================
# EVALUATION
# =====================================================

y_pred = pipeline.predict(X_test)

print("\nClassification Report:")
print(classification_report(
    y_test,
    y_pred,
    target_names=encoder.classes_
))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

accuracy = pipeline.score(X_test, y_test)
print(f"\nModel accuracy: {accuracy * 100:.2f}%")


# =====================================================
# SAVE MODEL
# =====================================================

joblib.dump(pipeline, "abuse_model.joblib")

print("\n✅ Model saved as 'abuse_model.joblib'")
print("✅ Encoder saved as 'label_encoder.joblib'")