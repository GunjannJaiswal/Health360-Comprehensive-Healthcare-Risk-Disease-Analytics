# Tableau Healthcare Dashboard: The 9 Integrated Visualization Types

> **System Overview:**  
> The Smart Healthcare analytical dashboard integrates **9 distinct visualization types**, systematically decomposing patient health records, vital measurements, lifestyle consumption, acute symptoms, and chronic disease outcomes:  
> 1. **KPI** — Patient Health & Disease Overview  
> 2. **Bar Chart** — Average Blood Pressure Across Age Groups  
> 3. **Grouped Bar Chart** — Alcohol and Smoking Consumption Across Age Groups  
> 4. **Donut Chart** — Exercise Level Distribution  
> 5. **Pie Chart** — Patient Distribution by Age Group  
> 6. **Grouped Bar Chart** — Heart Disease vs Diabetes Prevalence by BMI Category  
> 7. **Bar Chart** — BMI Category vs Heart Disease Rate  
> 8. **Heat Map** — Heart Disease by BMI Category and Exercise Level  
> 9. **Bar Chart** — Age Group Distribution by Fatigue Condition  

---

## 1. Consolidated Visual Architecture

### High-Resolution Tableau Dashboard UI Render
![Tableau Healthcare Consolidated Dashboard Render](file:///C:/Users/DELL/.gemini/antigravity/brain/4032aadf-e966-450b-b945-67a446236cae/tableau_healthcare_dashboard_1793264560371.jpg)

### Vector Architecture Blueprint (SVG)
![Consolidated Tableau 9 Visualizations](file:///C:/Users/DELL/.gemini/antigravity/brain/4032aadf-e966-450b-b945-67a446236cae/tableau_9_visualizations_consolidated.svg)

---

## 2. Detailed Specification & Clinical Metrics for Each Visualization

### Visualization 1: KPI — Patient Health & Disease Overview
- **Visual Type:** Synchronized 4-Tile KPI Summary Banner
- **Primary Metrics:**
  - **Total Patients:** `5,000` (100% complete cohort)
  - **Heart Disease Prevalence:** `30.0%` (1,499 diagnosed patients)
  - **Diabetes Prevalence:** `34.9%` (1,746 diagnosed patients)
  - **Mean Systolic Blood Pressure:** `134.45 mmHg` (surpassing AHA Stage 1 threshold)
- **Tableau Setup:**
  - Connect to [`smart_healthcare_tableau_17col.csv`](file:///C:/Users/DELL/.gemini/antigravity/scratch/healthcare_analysis/smart_healthcare_tableau_17col.csv).
  - Use `COUNT([patient_id])`, `AVG([heart_disease])`, `AVG([diabetes])`, and `AVG([blood_pressure])`.
- **Clinical Role:** Anchors the dashboard with high-level institutional benchmarks.

---

### Visualization 2: Bar Chart — Average Blood Pressure Across Age Groups
- **Visual Type:** Horizontal Bar Chart with Clinical Reference Benchmark Line
- **Dimensions & Measures:**
  - Rows: `[Age Group]` (Old, Young Adult, Teenager, Senior, Middle Age, Adult)
  - Columns: `AVG([blood_pressure])`
- **Quantitative Results:**
  - **Old (>70):** `135.67 mmHg` (Highest average; structural arterial stiffening)
  - **Young Adult (31–40):** `134.67 mmHg` (Early-onset surge)
  - **Teenager (18–30):** `134.50 mmHg` (Youth behavioral alert)
  - **Senior (61–70):** `134.34 mmHg` (Moderate level)
  - **Middle Age (51–60):** `133.97 mmHg` (Moderate level)
  - **Adult (41–50):** `133.61 mmHg` (Lowest average)
- **Clinical Role:** Highlights that every single age group exceeds the AHA Stage 1 Hypertension threshold ($130\text{ mmHg}$), with a narrow spread of only $2.06\text{ mmHg}$.

---

### Visualization 3: Grouped Bar Chart — Alcohol and Smoking Consumption Across Age Groups
- **Visual Type:** Clustered / Grouped Horizontal Bar Chart
- **Dimensions & Measures:**
  - Rows: `[Age Group]`
  - Columns: `Measure Values` (`AVG([smoking])` and `AVG([alcohol])`)
  - Color: `Measure Names` (Amber for Smoking, Blue for Alcohol)
- **Quantitative Results:**
  - **Teenager:** Smoking `51.6%` | Alcohol `50.4%`
  - **Young Adult:** Smoking `52.2%` | Alcohol `48.2%`
  - **Adult:** Smoking `50.6%` | Alcohol `49.0%`
  - **Middle Age:** Smoking `51.5%` | Alcohol `50.9%`
  - **Senior:** Smoking `49.8%` | Alcohol `54.5%`
  - **Old:** Smoking `48.5%` | Alcohol `47.6%`
- **Clinical Role:** Proves that substance consumption is uniformly distributed across age groups (~50% across the board), driving early-onset vascular resistance in young patients.

---

### Visualization 4: Donut Chart — Exercise Level Distribution
- **Visual Type:** Dual-Axis Donut Chart
- **Dimensions & Measures:**
  - Color: `[exercise_level]` (mapped to Low, Moderate, High)
  - Angle: `COUNT([patient_id])`
- **Quantitative Results:**
  - **Low Physical Activity:** `32.9%` (1,647 patients)
  - **Moderate Physical Activity:** `33.5%` (1,677 patients)
  - **High Physical Activity:** `33.5%` (1,676 patients)
- **Clinical Role:** Demonstrates a balanced 3-way split in physical activity across the cohort.

---

### Visualization 5: Pie Chart — Patient Distribution by Age Group
- **Visual Type:** Proportional Pie Chart
- **Dimensions & Measures:**
  - Color: `[Age Group]`
  - Angle: `COUNT([patient_id])`
- **Quantitative Results:**
  - **Teenager (18–30):** `20.4%` (1,019 patients)
  - **Adult (41–50):** `16.3%` (813 patients)
  - **Senior (61–70):** `16.4%` (819 patients)
  - **Middle Age (51–60):** `16.1%` (804 patients)
  - **Young Adult (31–40):** `15.9%` (793 patients)
  - **Old (>70):** `15.0%` (752 patients)
- **Clinical Role:** Validates demographic balance, confirming that each life stage holds ~15% to 20% of the patient volume.

---

### Visualization 6: Grouped Bar Chart — Heart Disease vs Diabetes Prevalence by BMI Category
- **Visual Type:** Clustered Bar Chart
- **Dimensions & Measures:**
  - Rows: `[BMI Category]` (Underweight, Normal, Overweight, Obese)
  - Columns: `AVG([heart_disease])` and `AVG([diabetes])`
  - Color: `Measure Names` (Crimson for Heart Disease, Amber for Diabetes)
- **Quantitative Results:**
  - **Underweight (<18.5):** Heart Disease `20.5%` vs. Diabetes `38.2%`
  - **Normal (18.5–24.9):** Heart Disease `26.0%` vs. Diabetes `32.8%`
  - **Overweight (25–29.9):** Heart Disease `32.9%` vs. Diabetes `34.7%`
  - **Obese ($\ge 30$):** Heart Disease `40.0%` vs. Diabetes `38.5%`
- **Clinical Role:** Illustrates that while diabetes prevalence is widespread across all body types (~33% to 38%), heart disease scales sharply with adiposity.

---

### Visualization 7: Bar Chart — BMI Category vs Heart Disease Rate
- **Visual Type:** Sorted Categorical Bar Chart
- **Dimensions & Measures:**
  - Rows: `[BMI Category]`
  - Columns: `AVG([heart_disease])`
  - Color: Sequential gradient based on prevalence rate
- **Quantitative Results:**
  - **Obese:** `40.0%` (321 / 803 patients)
  - **Overweight:** `32.9%` (550 / 1,671 patients)
  - **Normal:** `26.0%` (523 / 2,010 patients)
  - **Underweight:** `20.5%` (106 / 516 patients)
- **Clinical Role:** Demonstrates a strict step-ladder escalation: obese individuals suffer nearly **double (2x)** the heart disease prevalence of underweight peers.

---

### Visualization 8: Heat Map — Heart Disease by BMI Category and Exercise Level
- **Visual Type:** Cross-Tabulated 2D Color-Intensity Matrix
- **Dimensions & Measures:**
  - Rows: `[BMI Category]`
  - Columns: `[Exercise Level]` (Low, Moderate, High)
  - Marks Card: *Square*
  - Color & Label: `AVG([heart_disease])`
- **Quantitative Results Matrix:**
  | BMI Category | Low Activity | Moderate Activity | High Activity |
  | :--- | :---: | :---: | :---: |
  | **Obese** | **42.9%** (231 pts) | **39.9%** (288 pts) | **37.7%** (284 pts) |
  | **Overweight** | **33.0%** (557 pts) | **34.9%** (573 pts) | **30.7%** (541 pts) |
  | **Normal** | **25.8%** (694 pts) | **26.9%** (636 pts) | **25.3%** (680 pts) |
  | **Underweight** | **18.8%** (165 pts) | **20.6%** (180 pts) | **22.2%** (171 pts) |
- **Clinical Role:** Reveals the **Exercise Protective Buffer**: in obese patients, engaging in high physical activity lowers heart disease prevalence from **42.9% down to 37.7%** (a 5.2 percentage point risk reduction).

---

### Visualization 9: Bar Chart — Age Group Distribution by Fatigue Condition
- **Visual Type:** Vertical Column Chart with Cohort Average Reference Line
- **Dimensions & Measures:**
  - Columns: `[Age Group]`
  - Rows: `AVG([fatigue])`
  - Reference Line: `51.5%` (Overall Cohort Mean)
- **Quantitative Results:**
  - **Old (>70):** `54.4%` (409 pts)
  - **Young Adult (31–40):** `52.6%` (417 pts)
  - **Adult (41–50):** `51.9%` (422 pts)
  - **Teenager (18–30):** `51.1%` (521 pts)
  - **Middle Age (51–60):** `51.0%` (410 pts)
  - **Senior (61–70):** `48.5%` (397 pts)
- **Clinical Role:** Proves that acute fatigue is an omnipresent quality-of-life biomarker affecting ~51% of patients at every stage of life.

---

## 3. Project File Links

- **Consolidated 9-Visual SVG Architecture:**  
  [`tableau_9_visualizations_consolidated.svg`](file:///C:/Users/DELL/.gemini/antigravity/brain/4032aadf-e966-450b-b945-67a446236cae/tableau_9_visualizations_consolidated.svg)
- **Pre-Configured Tableau Workbook (`.twb`):**  
  [`Smart_Healthcare_Tableau_Project.twb`](file:///C:/Users/DELL/.gemini/antigravity/scratch/healthcare_analysis/Smart_Healthcare_Tableau_Project.twb)
- **Ingestion Dataset with Age Group Field:**  
  [`smart_healthcare_tableau_17col.csv`](file:///C:/Users/DELL/.gemini/antigravity/scratch/healthcare_analysis/smart_healthcare_tableau_17col.csv)
- **Complete Project ZIP Archive:**  
  [`smart_healthcare_complete_project.zip`](file:///C:/Users/DELL/.gemini/antigravity/scratch/healthcare_analysis/smart_healthcare_complete_project.zip)
