"""
Smart Healthcare Analytics - Flask Web Application
Embedding Tableau Dashboards & Stories for Interactive Clinical Decision-Making
"""

from flask import Flask, render_template, jsonify, request
import os
import json

app = Flask(__name__)

# Default Tableau Public embed URLs (can be overridden via environment variables)
TABLEAU_DASHBOARD_URL = os.environ.get(
    "TABLEAU_DASHBOARD_URL",
    "https://public.tableau.com/views/SmartHealthcareAnalyticsDashboard/Smart_Healthcare_Analytics_Dashboard"
)

TABLEAU_STORY_URL = os.environ.get(
    "TABLEAU_STORY_URL",
    "https://public.tableau.com/views/SmartHealthcareDataStory/Smart_Healthcare_Data_Story"
)

# Cohort Summary Statistics (5,000 Patient Records)
COHORT_SUMMARY = {
    "total_patients": 5000,
    "gender_distribution": {"Female": "50.1%", "Male": "49.9%"},
    "mean_blood_pressure": "134.45 mmHg",
    "stage_2_hypertension_rate": "44.5%",
    "disease_prevalence": {
        "heart_disease": "30.0%",
        "diabetes": "34.9%",
        "stroke": "24.9%"
    },
    "lifestyle_factors": {
        "smoking_rate": "50.2%",
        "alcohol_rate": "49.3%",
        "low_physical_activity": "32.9%"
    },
    "age_segments": {
        "Teenager (18-30)": {"count": 1019, "mean_bp": 134.50, "fatigue": "51.1%", "chronic_disease": "0.0%"},
        "Young Adult (31-40)": {"count": 793, "mean_bp": 134.67, "fatigue": "52.6%", "chronic_disease": "0.0%"},
        "Adult (41-50)": {"count": 813, "mean_bp": 133.61, "fatigue": "51.9%", "chronic_disease": "0.0%"},
        "Middle Age (51-60)": {"count": 804, "mean_bp": 133.97, "fatigue": "51.0%", "chronic_disease": "21.8% Diab, 11.7% Heart"},
        "Senior (61-70)": {"count": 819, "mean_bp": 134.34, "fatigue": "48.5%", "chronic_disease": "100% Diab, 79.7% Heart"},
        "Old (>70)": {"count": 752, "mean_bp": 135.67, "fatigue": "54.4%", "chronic_disease": "100% Saturated Multimorbidity"}
    }
}

@app.route("/")
def index():
    """Portal Home Page: Executive Overview & Metric Highlights"""
    return render_template(
        "index.html",
        title="Smart Healthcare Analytics Portal",
        summary=COHORT_SUMMARY
    )

@app.route("/dashboard")
def dashboard():
    """Embedded Tableau Healthcare Analytical Dashboard"""
    viz_url = request.args.get("url", TABLEAU_DASHBOARD_URL)
    return render_template(
        "dashboard.html",
        title="Interactive Healthcare Dashboard",
        viz_url=viz_url,
        summary=COHORT_SUMMARY
    )

@app.route("/story")
def story():
    """Embedded Tableau Healthcare Data Story (5 Scenes)"""
    viz_url = request.args.get("url", TABLEAU_STORY_URL)
    return render_template(
        "story.html",
        title="Clinical Data Story: 5 Evidence Scenes",
        viz_url=viz_url
    )

@app.route("/api/summary")
def api_summary():
    """REST API endpoint returning cohort baseline statistics"""
    return jsonify({
        "status": "success",
        "cohort": COHORT_SUMMARY
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f" * Starting Smart Healthcare Flask App on http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
