from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()


def analyze_sentiment(text: str) -> dict:
    """
    Lightweight sentiment analysis (fast, no downloads)
    """

    if not text or not text.strip():
        return {
            "polarity": 0.0,
            "subjectivity": 0.0,
            "label": "neutral",
            "confidence": 0.0
        }

    scores = analyzer.polarity_scores(text)
    compound = scores["compound"]

    if compound >= 0.05:
        label = "positive"
    elif compound <= -0.05:
        label = "negative"
    else:
        label = "neutral"

    return {
        "polarity": round(compound, 3),
        "subjectivity": 1.0,
        "label": label,
        "confidence": round(abs(compound), 3)
    }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
# from textblob import TextBlob


# # =====================================================
# # SENTIMENT ANALYSIS
# # =====================================================

# def analyze_sentiment(text: str) -> dict:
#     """
#     Analyze sentiment polarity and subjectivity.

#     Returns:
#         {
#             "polarity": float (-1.0 → 1.0),
#             "subjectivity": float (0.0 → 1.0),
#             "label": "positive" | "neutral" | "negative",
#             "confidence": float (0.0 → 1.0)
#         }
#     """

#     if not text or not text.strip():
#         return {
#             "polarity": 0.0,
#             "subjectivity": 0.0,
#             "label": "neutral",
#             "confidence": 0.0
#         }

#     try:
#         blob = TextBlob(text)
#         polarity = float(blob.sentiment.polarity)
#         subjectivity = float(blob.sentiment.subjectivity)

#         # Label classification
#         if polarity > 0.15:
#             label = "positive"
#         elif polarity < -0.15:
#             label = "negative"
#         else:
#             label = "neutral"

#         # Confidence mapping
#         confidence = min(abs(polarity), 1.0)

#         return {
#             "polarity": round(polarity, 3),
#             "subjectivity": round(subjectivity, 3),
#             "label": label,
#             "confidence": round(confidence, 3)
#         }

#     except Exception as e:
#         print("⚠️ Sentiment error:", e)

#         return {
#             "polarity": 0.0,
#             "subjectivity": 0.0,
#             "label": "neutral",
#             "confidence": 0.0
#         }
