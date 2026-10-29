const fs = require('fs');

const lines = fs.readFileSync('C:\\Users\\DELL\\.gemini\\antigravity\\scratch\\healthcare_analysis\\cleaned_healthcare_dataset.csv', 'utf8').trim().split('\n');

const ageGroupMap = { '18-29 Young Adult': 0, '30-49 Adult': 1, '50-64 Middle-Aged': 2, '65+ Senior': 3 };
const genderMap = { 'Male': 0, 'Female': 1 };
const bmiCatMap = { 'Underweight': 0, 'Normal': 1, 'Overweight': 2, 'Obese': 3 };
const exMap = { 'Low': 0, 'Moderate': 1, 'High': 2 };
const riskMap = { 'Low Risk': 0, 'Moderate Risk': 1, 'High Risk': 2, 'Very High Risk': 3 };

const compact = lines.slice(1).map(l => {
  const v = l.split(',');
  return [
    parseInt(v[1]),
    ageGroupMap[v[2]],
    genderMap[v[3]],
    parseFloat(v[4]),
    bmiCatMap[v[5]],
    exMap[v[7]],
    parseInt(v[8]),
    parseInt(v[10]),
    parseInt(v[12]),
    parseInt(v[14]),
    parseInt(v[16]),
    parseInt(v[18]),
    parseInt(v[19]),
    parseInt(v[20]),
    parseInt(v[22]),
    parseInt(v[23]),
    parseInt(v[24]),
    parseFloat(v[28]),
    riskMap[v[29]]
  ];
});

const dataJson = JSON.stringify(compact);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Healthcare Unified Analytical Dashboard</title>
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <style>
    .transition-smooth { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
    .badge { display: inline-flex; align-items: center; padding: 0.15rem 0.6rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; }
  </style>
</head>
<body class="bg-[var(--background)] text-[var(--foreground)] antialiased p-4 md:p-8 min-h-screen">

  <!-- 1. EXECUTIVE HEADER & VISUAL HIERARCHY TOP -->
  <header class="mb-6 pb-6 border-b border-[var(--border)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div>
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span class="badge bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">Consolidated Analytical Dashboard</span>
        <span class="badge bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">N = 5,000 Patient Cohort</span>
        <span class="badge bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-mono">Dynamic Multi-Factor Cross-Filtering</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-bold tracking-tight">Smart Healthcare Unified Analytical Dashboard</h1>
      <p class="text-xs md:text-sm text-[var(--muted-foreground)] mt-1 max-w-3xl">
        Consolidated analytical platform providing a clear visual hierarchy of vital health patterns, behavioral risks, and clinical outcomes across stratified patient populations.
      </p>
    </div>

    <!-- Active Population Indicator -->
    <div class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 flex items-center gap-4">
      <div class="text-right">
        <p class="text-xs text-[var(--muted-foreground)] font-medium uppercase">Active Filtered Cohort</p>
        <p id="top-cohort-count" class="text-lg font-bold text-blue-600 dark:text-blue-400">5,000 <span class="text-xs font-normal text-[var(--muted-foreground)]">(100.0%)</span></p>
      </div>
      <button onclick="resetAllFilters()" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--card)] hover:border-blue-500 transition-smooth">
        Reset All
      </button>
    </div>
  </header>

  <!-- 2. INTERACTIVE MULTI-ATTRIBUTE FILTER CONSOLE -->
  <section class="mb-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-sm">
    <div class="flex items-center justify-between mb-3 border-b border-[var(--border)] pb-2">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
        <h2 class="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Interactive Cohort Slicers: BMI Category, Age Group, Exercise Level & Lifestyle</h2>
      </div>
      <span class="text-xs text-[var(--muted-foreground)]">Client-side dynamic re-aggregation</span>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <!-- Filter 1: Age Group -->
      <div>
        <label for="filter-age" class="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Age Group</label>
        <select id="filter-age" onchange="updateDashboard()" class="w-full text-xs bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] rounded-lg p-2 focus:ring-1 focus:ring-blue-500">
          <option value="-1">All Age Groups (18-79)</option>
          <option value="0">18-29 Young Adult</option>
          <option value="1">30-49 Adult</option>
          <option value="2">50-64 Middle-Aged</option>
          <option value="3">65+ Senior</option>
        </select>
      </div>

      <!-- Filter 2: BMI Category -->
      <div>
        <label for="filter-bmi" class="block text-xs font-medium text-[var(--muted-foreground)] mb-1">BMI Category</label>
        <select id="filter-bmi" onchange="updateDashboard()" class="w-full text-xs bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] rounded-lg p-2 focus:ring-1 focus:ring-blue-500">
          <option value="-1">All BMI Categories</option>
          <option value="0">Underweight (&lt;18.5)</option>
          <option value="1">Normal Weight (18.5-24.9)</option>
          <option value="2">Overweight (25-29.9)</option>
          <option value="3">Obese (&ge;30.0)</option>
        </select>
      </div>

      <!-- Filter 3: Exercise Level -->
      <div>
        <label for="filter-ex" class="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Exercise Level</label>
        <select id="filter-ex" onchange="updateDashboard()" class="w-full text-xs bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] rounded-lg p-2 focus:ring-1 focus:ring-blue-500">
          <option value="-1">All Exercise Levels</option>
          <option value="0">Low Physical Activity</option>
          <option value="1">Moderate Activity</option>
          <option value="2">High Physical Activity</option>
        </select>
      </div>

      <!-- Filter 4: Smoking Habit -->
      <div>
        <label for="filter-smoke" class="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Smoking Habit</label>
        <select id="filter-smoke" onchange="updateDashboard()" class="w-full text-xs bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] rounded-lg p-2 focus:ring-1 focus:ring-blue-500">
          <option value="-1">All Smoking Habits</option>
          <option value="1">Smoker</option>
          <option value="0">Non-Smoker</option>
        </select>
      </div>

      <!-- Filter 5: Alcohol Consumption -->
      <div>
        <label for="filter-alc" class="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Alcohol Habit</label>
        <select id="filter-alc" onchange="updateDashboard()" class="w-full text-xs bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] rounded-lg p-2 focus:ring-1 focus:ring-blue-500">
          <option value="-1">All Alcohol Habits</option>
          <option value="1">Drinker</option>
          <option value="0">Non-Drinker</option>
        </select>
      </div>

      <!-- Filter 6: Gender -->
      <div>
        <label for="filter-gen" class="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Gender</label>
        <select id="filter-gen" onchange="updateDashboard()" class="w-full text-xs bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] rounded-lg p-2 focus:ring-1 focus:ring-blue-500">
          <option value="-1">All Genders</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
        </select>
      </div>
    </div>
  </section>

  <!-- 3. TOP-LEVEL DYNAMIC KPI RIBBON -->
  <section class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
    <!-- KPI 1: Heart Disease Prevalence -->
    <div class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-sm hover:border-rose-500 transition-smooth">
      <div class="flex items-center justify-between text-[var(--muted-foreground)] text-xs font-semibold uppercase tracking-wider mb-1">
        <span>Heart Disease</span>
        <svg class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
      </div>
      <div id="kpi-heart-rate" class="text-2xl font-bold text-rose-600 dark:text-rose-400">30.0%</div>
      <div id="kpi-heart-count" class="text-xs text-[var(--muted-foreground)] mt-1">1,499 Diagnosed</div>
    </div>

    <!-- KPI 2: Blood Pressure Status -->
    <div class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-sm hover:border-amber-500 transition-smooth">
      <div class="flex items-center justify-between text-[var(--muted-foreground)] text-xs font-semibold uppercase tracking-wider mb-1">
        <span>Mean Blood Pressure</span>
        <span class="badge bg-amber-500/10 text-amber-500 font-mono">Systolic</span>
      </div>
      <div id="kpi-bp-mean" class="text-2xl font-bold">134.5 <span class="text-xs font-normal text-[var(--muted-foreground)]">mmHg</span></div>
      <div id="kpi-bp-stage2" class="text-xs text-amber-600 dark:text-amber-400 mt-1">44.5% in Stage 2 (&ge;140)</div>
    </div>

    <!-- KPI 3: Fatigue Condition Rate -->
    <div class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-sm hover:border-blue-500 transition-smooth">
      <div class="flex items-center justify-between text-[var(--muted-foreground)] text-xs font-semibold uppercase tracking-wider mb-1">
        <span>Fatigue Condition</span>
        <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </div>
      <div id="kpi-fatigue-rate" class="text-2xl font-bold text-blue-600 dark:text-blue-400">51.5%</div>
      <div id="kpi-fatigue-count" class="text-xs text-[var(--muted-foreground)] mt-1">2,573 Patients Reporting</div>
    </div>

    <!-- KPI 4: Lifestyle Substance Burden -->
    <div class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-sm hover:border-purple-500 transition-smooth">
      <div class="flex items-center justify-between text-[var(--muted-foreground)] text-xs font-semibold uppercase tracking-wider mb-1">
        <span>Alcohol & Smoking</span>
        <span class="badge bg-purple-500/10 text-purple-500 font-mono">Habits</span>
      </div>
      <div id="kpi-substance-rate" class="text-2xl font-bold">24.8%</div>
      <div id="kpi-substance-detail" class="text-xs text-[var(--muted-foreground)] mt-1">Both Smoking & Drinking</div>
    </div>

    <!-- KPI 5: Health Risk Score -->
    <div class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-sm hover:border-emerald-500 transition-smooth">
      <div class="flex items-center justify-between text-[var(--muted-foreground)] text-xs font-semibold uppercase tracking-wider mb-1">
        <span>Clinical Risk Score</span>
        <span class="badge bg-emerald-500/10 text-emerald-500 font-mono">0-100</span>
      </div>
      <div id="kpi-risk-score" class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">58.5 <span class="text-xs font-normal text-[var(--muted-foreground)]">/ 100</span></div>
      <div id="kpi-risk-high" class="text-xs text-rose-500 font-medium mt-1">64.5% High / Severe Tier</div>
    </div>
  </section>

  <!-- 4. CORE VISUALIZATION GRID: MULTI-FACTOR INSIGHTS -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

    <!-- CARD 1: CHRONIC DISEASE & CARDIOVASCULAR PREVALENCE (Col span 6) -->
    <div class="lg:col-span-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
      <div class="flex items-center justify-between border-b border-[var(--border)] pb-2">
        <div>
          <h3 class="font-bold text-sm tracking-tight">Heart Disease & Chronic Disease Prevalence</h3>
          <p class="text-xs text-[var(--muted-foreground)]">Cardiovascular disease, diabetes mellitus, and stroke across segments</p>
        </div>
        <span class="badge bg-rose-500/10 text-rose-500 font-mono">Prevalence</span>
      </div>

      <!-- Disease Bars -->
      <div class="space-y-3">
        <div>
          <div class="flex justify-between text-xs mb-1 font-medium">
            <span>Heart Disease Prevalence</span>
            <span id="bar-val-heart" class="font-bold text-rose-600 dark:text-rose-400">30.0% (1,499)</span>
          </div>
          <div class="w-full bg-[var(--border)] rounded-full h-3">
            <div id="bar-fill-heart" class="bg-rose-500 h-3 rounded-full transition-smooth" style="width: 30.0%"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs mb-1 font-medium">
            <span>Diabetes Mellitus</span>
            <span id="bar-val-diab" class="font-bold text-amber-600 dark:text-amber-400">34.9% (1,746)</span>
          </div>
          <div class="w-full bg-[var(--border)] rounded-full h-3">
            <div id="bar-fill-diab" class="bg-amber-500 h-3 rounded-full transition-smooth" style="width: 34.9%"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs mb-1 font-medium">
            <span>Stroke History</span>
            <span id="bar-val-stroke" class="font-bold text-blue-600 dark:text-blue-400">24.9% (1,243)</span>
          </div>
          <div class="w-full bg-[var(--border)] rounded-full h-3">
            <div id="bar-fill-stroke" class="bg-blue-500 h-3 rounded-full transition-smooth" style="width: 24.9%"></div>
          </div>
        </div>
      </div>

      <!-- Multimorbidity Segment -->
      <div class="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs">
        <div class="flex justify-between items-center mb-2 font-semibold">
          <span>Multimorbidity Breakdown</span>
          <span id="comorbid-pct" class="text-indigo-500">29.9% Multimorbid (&ge;2 conditions)</span>
        </div>
        <div class="grid grid-cols-4 gap-2 text-center text-xs">
          <div class="p-1.5 rounded bg-[var(--card)] border border-[var(--border)]">
            <div class="text-[var(--muted-foreground)]">0 Disease</div>
            <div id="cm-0" class="font-bold mt-0.5">64.3%</div>
          </div>
          <div class="p-1.5 rounded bg-[var(--card)] border border-[var(--border)]">
            <div class="text-[var(--muted-foreground)]">1 Disease</div>
            <div id="cm-1" class="font-bold mt-0.5">5.8%</div>
          </div>
          <div class="p-1.5 rounded bg-[var(--card)] border border-[var(--border)]">
            <div class="text-[var(--muted-foreground)]">2 Diseases</div>
            <div id="cm-2" class="font-bold mt-0.5">5.8%</div>
          </div>
          <div class="p-1.5 rounded bg-[var(--card)] border border-[var(--border)]">
            <div class="text-[var(--muted-foreground)]">All 3 Diseases</div>
            <div id="cm-3" class="font-bold text-rose-500 mt-0.5">24.1%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CARD 2: BLOOD PRESSURE & VITAL SIGNS SPECTRUM (Col span 6) -->
    <div class="lg:col-span-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
      <div class="flex items-center justify-between border-b border-[var(--border)] pb-2">
        <div>
          <h3 class="font-bold text-sm tracking-tight">Blood Pressure Staging (AHA Standards)</h3>
          <p class="text-xs text-[var(--muted-foreground)]">Distribution of blood pressure levels across the population segment</p>
        </div>
        <span class="badge bg-amber-500/10 text-amber-500 font-mono">Blood Pressure</span>
      </div>

      <!-- BP Breakdown Bars -->
      <div class="space-y-2.5">
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-medium">Hypertension Stage 2 (&ge;140 mmHg)</span>
            <span id="bp-st2" class="font-bold text-rose-500">44.5% (2,226)</span>
          </div>
          <div class="w-full bg-[var(--border)] rounded-full h-2.5">
            <div id="bp-fill-st2" class="bg-rose-500 h-2.5 rounded-full transition-smooth" style="width: 44.5%"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-medium">Hypertension Stage 1 (130-139 mmHg)</span>
            <span id="bp-st1" class="font-bold text-amber-500">10.4% (521)</span>
          </div>
          <div class="w-full bg-[var(--border)] rounded-full h-2.5">
            <div id="bp-fill-st1" class="bg-amber-500 h-2.5 rounded-full transition-smooth" style="width: 10.4%"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-medium">Elevated BP (120-129 mmHg)</span>
            <span id="bp-elev" class="font-bold text-blue-400">10.9% (544)</span>
          </div>
          <div class="w-full bg-[var(--border)] rounded-full h-2.5">
            <div id="bp-fill-elev" class="bg-blue-400 h-2.5 rounded-full transition-smooth" style="width: 10.9%"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-medium">Normal BP (&lt;120 mmHg)</span>
            <span id="bp-norm" class="font-bold text-emerald-500">34.2% (1,709)</span>
          </div>
          <div class="w-full bg-[var(--border)] rounded-full h-2.5">
            <div id="bp-fill-norm" class="bg-emerald-500 h-2.5 rounded-full transition-smooth" style="width: 34.2%"></div>
          </div>
        </div>
      </div>

      <!-- Co-occurring Vitals -->
      <div class="grid grid-cols-2 gap-3 pt-1 text-xs">
        <div class="p-3 bg-[var(--background)] rounded-lg border border-[var(--border)]">
          <span class="text-[var(--muted-foreground)] block mb-0.5">Mean Fasting Glucose</span>
          <span id="co-gluc" class="text-base font-bold text-emerald-600 dark:text-emerald-400">134.5 mg/dL</span>
          <span class="text-[11px] text-[var(--muted-foreground)] block mt-0.5">ADA Diabetic &ge;126</span>
        </div>
        <div class="p-3 bg-[var(--background)] rounded-lg border border-[var(--border)]">
          <span class="text-[var(--muted-foreground)] block mb-0.5">Mean Total Cholesterol</span>
          <span id="co-chol" class="text-base font-bold text-purple-600 dark:text-purple-400">224.6 mg/dL</span>
          <span class="text-[11px] text-[var(--muted-foreground)] block mt-0.5">NCEP High &ge;240</span>
        </div>
      </div>
    </div>

    <!-- CARD 3: BEHAVIORAL & LIFESTYLE HABITS (Col span 6) -->
    <div class="lg:col-span-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
      <div class="flex items-center justify-between border-b border-[var(--border)] pb-2">
        <div>
          <h3 class="font-bold text-sm tracking-tight">Smoking, Alcohol & Physical Activity Patterns</h3>
          <p class="text-xs text-[var(--muted-foreground)]">Behavioral lifestyle consumption patterns in filtered segment</p>
        </div>
        <span class="badge bg-blue-500/10 text-blue-500 font-mono">Lifestyle</span>
      </div>

      <div class="grid grid-cols-3 gap-3 text-center text-xs">
        <div class="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
          <span class="text-[var(--muted-foreground)] block">Smokers</span>
          <span id="ls-smoke" class="text-lg font-bold text-amber-500 mt-1 block">50.2%</span>
          <span id="ls-smoke-cnt" class="text-[11px] text-[var(--muted-foreground)]">2,508 pts</span>
        </div>

        <div class="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
          <span class="text-[var(--muted-foreground)] block">Drinkers</span>
          <span id="ls-alc" class="text-lg font-bold text-blue-500 mt-1 block">49.3%</span>
          <span id="ls-alc-cnt" class="text-[11px] text-[var(--muted-foreground)]">2,464 pts</span>
        </div>

        <div class="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
          <span class="text-[var(--muted-foreground)] block">Dual Substance</span>
          <span id="ls-dual" class="text-lg font-bold text-rose-500 mt-1 block">24.8%</span>
          <span class="text-[11px] text-[var(--muted-foreground)]">Smoke + Drink</span>
        </div>
      </div>

      <!-- Physical Activity Progression -->
      <div>
        <div class="flex justify-between text-xs mb-1 font-medium">
          <span>Physical Activity (Exercise Level) Breakdown</span>
          <span id="ls-ex-summary" class="text-[var(--muted-foreground)]">Low: 33.5% | Mod: 32.9% | High: 33.7%</span>
        </div>
        <div class="w-full bg-[var(--border)] rounded-full h-3 flex overflow-hidden">
          <div id="ex-bar-low" class="bg-rose-400 h-3 transition-smooth" style="width: 33.5%" title="Low Activity"></div>
          <div id="ex-bar-mod" class="bg-amber-400 h-3 transition-smooth" style="width: 32.9%" title="Moderate Activity"></div>
          <div id="ex-bar-high" class="bg-emerald-400 h-3 transition-smooth" style="width: 33.7%" title="High Activity"></div>
        </div>
        <div class="flex justify-between text-[11px] text-[var(--muted-foreground)] mt-1.5">
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-rose-400 inline-block"></span> Low Activity</span>
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> Moderate Activity</span>
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> High Activity</span>
        </div>
      </div>
    </div>

    <!-- CARD 4: ACUTE SYMPTOMATOLOGY & CLINICAL RISK TIERS (Col span 6) -->
    <div class="lg:col-span-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
      <div class="flex items-center justify-between border-b border-[var(--border)] pb-2">
        <div>
          <h3 class="font-bold text-sm tracking-tight">Fatigue Condition, Acute Symptoms & Risk Tiers</h3>
          <p class="text-xs text-[var(--muted-foreground)]">Reported patient discomfort and clinical risk stratification</p>
        </div>
        <span class="badge bg-purple-500/10 text-purple-500 font-mono">Risk Profile</span>
      </div>

      <!-- Symptoms 3-grid -->
      <div class="grid grid-cols-3 gap-3 text-center text-xs">
        <div class="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
          <span class="text-[var(--muted-foreground)] block">Fatigue Condition</span>
          <span id="sym-fatigue" class="text-lg font-bold text-blue-500 mt-1 block">51.5%</span>
          <span id="sym-fatigue-cnt" class="text-[11px] text-[var(--muted-foreground)]">2,573 pts</span>
        </div>
        <div class="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
          <span class="text-[var(--muted-foreground)] block">Chest Discomfort</span>
          <span id="sym-chest" class="text-lg font-bold text-rose-500 mt-1 block">50.4%</span>
          <span id="sym-chest-cnt" class="text-[11px] text-[var(--muted-foreground)]">2,519 pts</span>
        </div>
        <div class="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
          <span class="text-[var(--muted-foreground)] block">Dizziness / Vertigo</span>
          <span id="sym-diz" class="text-lg font-bold text-amber-500 mt-1 block">49.7%</span>
          <span id="sym-diz-cnt" class="text-[11px] text-[var(--muted-foreground)]">2,483 pts</span>
        </div>
      </div>

      <!-- Risk Tier Segmented Bar -->
      <div>
        <div class="flex justify-between text-xs mb-1 font-semibold">
          <span>Engineered Clinical Health Risk Tiers</span>
          <span id="risk-tier-label" class="text-rose-500">64.5% in High/Severe Tiers</span>
        </div>
        <div class="w-full bg-[var(--border)] rounded-full h-3 flex overflow-hidden">
          <div id="rt-low" class="bg-emerald-500 h-3 transition-smooth" style="width: 6.7%" title="Low"></div>
          <div id="rt-mod" class="bg-blue-500 h-3 transition-smooth" style="width: 28.9%" title="Moderate"></div>
          <div id="rt-high" class="bg-amber-500 h-3 transition-smooth" style="width: 41.7%" title="High"></div>
          <div id="rt-vhigh" class="bg-rose-500 h-3 transition-smooth" style="width: 22.8%" title="Very High"></div>
        </div>
        <div class="grid grid-cols-4 gap-1 text-[11px] text-[var(--muted-foreground)] mt-2 text-center">
          <div><strong class="text-emerald-500" id="rt-low-lbl">6.7%</strong> Low</div>
          <div><strong class="text-blue-500" id="rt-mod-lbl">28.9%</strong> Moderate</div>
          <div><strong class="text-amber-500" id="rt-high-lbl">41.7%</strong> High</div>
          <div><strong class="text-rose-500" id="rt-vhigh-lbl">22.8%</strong> Severe</div>
        </div>
      </div>
    </div>

  </div>

  <!-- 5. STAKEHOLDER INSIGHTS & DECISION SUPPORT PANEL -->
  <section class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
    <div class="flex items-center gap-2 mb-3">
      <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
      <h3 class="font-bold text-sm">Population Health Risk Assessment & Decision-Support Insights</h3>
    </div>
    <div id="cohort-dynamic-insight" class="text-xs text-[var(--foreground)] leading-relaxed space-y-2">
      <!-- Dynamically populated -->
    </div>
  </section>

  <!-- DATA & JAVASCRIPT LOGIC -->
  <script>
    const rawData = ${dataJson};

    function updateDashboard() {
      const fAge = parseInt(document.getElementById('filter-age').value);
      const fBmi = parseInt(document.getElementById('filter-bmi').value);
      const fEx = parseInt(document.getElementById('filter-ex').value);
      const fSmoke = parseInt(document.getElementById('filter-smoke').value);
      const fAlc = parseInt(document.getElementById('filter-alc').value);
      const fGen = parseInt(document.getElementById('filter-gen').value);

      let count = 0;
      let heartCount = 0;
      let diabCount = 0;
      let strokeCount = 0;
      let sumBp = 0;
      let bpSt2Count = 0;
      let bpSt1Count = 0;
      let bpElevCount = 0;
      let bpNormCount = 0;
      let sumChol = 0;
      let sumGluc = 0;
      let smokeCount = 0;
      let alcCount = 0;
      let dualCount = 0;
      let exLow = 0, exMod = 0, exHigh = 0;
      let fatigueCount = 0;
      let chestCount = 0;
      let dizCount = 0;
      let sumRisk = 0;
      let rtLow = 0, rtMod = 0, rtHigh = 0, rtVHigh = 0;
      let d0 = 0, d1 = 0, d2 = 0, d3 = 0;

      for (let i = 0; i < rawData.length; i++) {
        const r = rawData[i];
        if (fAge !== -1 && r[1] !== fAge) continue;
        if (fBmi !== -1 && r[4] !== fBmi) continue;
        if (fEx !== -1 && r[5] !== fEx) continue;
        if (fSmoke !== -1 && r[6] !== fSmoke) continue;
        if (fAlc !== -1 && r[7] !== fAlc) continue;
        if (fGen !== -1 && r[2] !== fGen) continue;

        count++;
        if (r[14] === 1) heartCount++;
        if (r[15] === 1) diabCount++;
        if (r[16] === 1) strokeCount++;

        const dCount = r[14] + r[15] + r[16];
        if (dCount === 0) d0++;
        else if (dCount === 1) d1++;
        else if (dCount === 2) d2++;
        else if (dCount === 3) d3++;

        const bp = r[8];
        sumBp += bp;
        if (bp >= 140) bpSt2Count++;
        else if (bp >= 130) bpSt1Count++;
        else if (bp >= 120) bpElevCount++;
        else bpNormCount++;

        sumChol += r[9];
        sumGluc += r[10];

        if (r[6] === 1) smokeCount++;
        if (r[7] === 1) alcCount++;
        if (r[6] === 1 && r[7] === 1) dualCount++;

        if (r[5] === 0) exLow++;
        else if (r[5] === 1) exMod++;
        else exHigh++;

        if (r[11] === 1) fatigueCount++;
        if (r[12] === 1) chestCount++;
        if (r[13] === 1) dizCount++;

        sumRisk += r[17];
        const rt = r[18];
        if (rt === 0) rtLow++;
        else if (rt === 1) rtMod++;
        else if (rt === 2) rtHigh++;
        else if (rt === 3) rtVHigh++;
      }

      if (count === 0) {
        document.getElementById('top-cohort-count').innerHTML = '0 <span class="text-xs font-normal text-[var(--muted-foreground)]">(0.0%)</span>';
        document.getElementById('cohort-dynamic-insight').innerHTML = '<p class="text-[var(--muted-foreground)]">No patient records match the selected filter combination. Please broaden your selection criteria.</p>';
        return;
      }

      const totalCohort = rawData.length;
      const pct = (count / totalCohort * 100).toFixed(1);
      document.getElementById('top-cohort-count').innerHTML = count.toLocaleString() + ' <span class="text-xs font-normal text-[var(--muted-foreground)]">(' + pct + '%)</span>';

      // KPI Heart
      const heartRate = (heartCount / count * 100).toFixed(1);
      document.getElementById('kpi-heart-rate').innerText = heartRate + '%';
      document.getElementById('kpi-heart-count').innerText = heartCount.toLocaleString() + ' Diagnosed';

      // KPI BP
      const avgBp = (sumBp / count).toFixed(1);
      const st2Pct = (bpSt2Count / count * 100).toFixed(1);
      document.getElementById('kpi-bp-mean').innerHTML = avgBp + ' <span class="text-xs font-normal text-[var(--muted-foreground)]">mmHg</span>';
      document.getElementById('kpi-bp-stage2').innerText = st2Pct + '% in Stage 2 (>=140)';

      // KPI Fatigue
      const fatigueRate = (fatigueCount / count * 100).toFixed(1);
      document.getElementById('kpi-fatigue-rate').innerText = fatigueRate + '%';
      document.getElementById('kpi-fatigue-count').innerText = fatigueCount.toLocaleString() + ' Patients Reporting';

      // KPI Substance
      const dualRate = (dualCount / count * 100).toFixed(1);
      document.getElementById('kpi-substance-rate').innerText = dualRate + '%';
      document.getElementById('kpi-substance-detail').innerText = 'Smoke: ' + (smokeCount / count * 100).toFixed(0) + '% | Alc: ' + (alcCount / count * 100).toFixed(0) + '%';

      // KPI Risk
      const avgRisk = (sumRisk / count).toFixed(1);
      const highSeverePct = ((rtHigh + rtVHigh) / count * 100).toFixed(1);
      document.getElementById('kpi-risk-score').innerHTML = avgRisk + ' <span class="text-xs font-normal text-[var(--muted-foreground)]">/ 100</span>';
      document.getElementById('kpi-risk-high').innerText = highSeverePct + '% High / Severe Tier';

      // Disease Bars
      const diabRate = (diabCount / count * 100).toFixed(1);
      const strokeRate = (strokeCount / count * 100).toFixed(1);
      document.getElementById('bar-val-heart').innerText = heartRate + '% (' + heartCount + ')';
      document.getElementById('bar-fill-heart').style.width = heartRate + '%';
      document.getElementById('bar-val-diab').innerText = diabRate + '% (' + diabCount + ')';
      document.getElementById('bar-fill-diab').style.width = diabRate + '%';
      document.getElementById('bar-val-stroke').innerText = strokeRate + '% (' + strokeCount + ')';
      document.getElementById('bar-fill-stroke').style.width = strokeRate + '%';

      // Multimorbidity
      const multiRate = ((d2 + d3) / count * 100).toFixed(1);
      document.getElementById('comorbid-pct').innerText = multiRate + '% Multimorbid (>=2 conditions)';
      document.getElementById('cm-0').innerText = (d0 / count * 100).toFixed(1) + '%';
      document.getElementById('cm-1').innerText = (d1 / count * 100).toFixed(1) + '%';
      document.getElementById('cm-2').innerText = (d2 / count * 100).toFixed(1) + '%';
      document.getElementById('cm-3').innerText = (d3 / count * 100).toFixed(1) + '%';

      // BP Breakdown
      const st1Pct = (bpSt1Count / count * 100).toFixed(1);
      const elevPct = (bpElevCount / count * 100).toFixed(1);
      const normPct = (bpNormCount / count * 100).toFixed(1);
      document.getElementById('bp-st2').innerText = st2Pct + '% (' + bpSt2Count + ')';
      document.getElementById('bp-fill-st2').style.width = st2Pct + '%';
      document.getElementById('bp-st1').innerText = st1Pct + '% (' + bpSt1Count + ')';
      document.getElementById('bp-fill-st1').style.width = st1Pct + '%';
      document.getElementById('bp-elev').innerText = elevPct + '% (' + bpElevCount + ')';
      document.getElementById('bp-fill-elev').style.width = elevPct + '%';
      document.getElementById('bp-norm').innerText = normPct + '% (' + bpNormCount + ')';
      document.getElementById('bp-fill-norm').style.width = normPct + '%';

      // Vitals Glucose & Chol
      document.getElementById('co-gluc').innerText = (sumGluc / count).toFixed(1) + ' mg/dL';
      document.getElementById('co-chol').innerText = (sumChol / count).toFixed(1) + ' mg/dL';

      // Lifestyle
      document.getElementById('ls-smoke').innerText = (smokeCount / count * 100).toFixed(1) + '%';
      document.getElementById('ls-smoke-cnt').innerText = smokeCount.toLocaleString() + ' pts';
      document.getElementById('ls-alc').innerText = (alcCount / count * 100).toFixed(1) + '%';
      document.getElementById('ls-alc-cnt').innerText = alcCount.toLocaleString() + ' pts';
      document.getElementById('ls-dual').innerText = dualRate + '%';

      const lowExPct = (exLow / count * 100).toFixed(1);
      const modExPct = (exMod / count * 100).toFixed(1);
      const highExPct = (exHigh / count * 100).toFixed(1);
      document.getElementById('ex-bar-low').style.width = lowExPct + '%';
      document.getElementById('ex-bar-mod').style.width = modExPct + '%';
      document.getElementById('ex-bar-high').style.width = highExPct + '%';
      document.getElementById('ls-ex-summary').innerText = 'Low: ' + lowExPct + '% | Mod: ' + modExPct + '% | High: ' + highExPct + '%';

      // Symptoms
      document.getElementById('sym-fatigue').innerText = fatigueRate + '%';
      document.getElementById('sym-fatigue-cnt').innerText = fatigueCount.toLocaleString() + ' pts';
      document.getElementById('sym-chest').innerText = (chestCount / count * 100).toFixed(1) + '%';
      document.getElementById('sym-chest-cnt').innerText = chestCount.toLocaleString() + ' pts';
      document.getElementById('sym-diz').innerText = (dizCount / count * 100).toFixed(1) + '%';
      document.getElementById('sym-diz-cnt').innerText = dizCount.toLocaleString() + ' pts';

      // Risk Tiers
      const rLowPct = (rtLow / count * 100).toFixed(1);
      const rModPct = (rtMod / count * 100).toFixed(1);
      const rHighPct = (rtHigh / count * 100).toFixed(1);
      const rVHighPct = (rtVHigh / count * 100).toFixed(1);
      document.getElementById('rt-low').style.width = rLowPct + '%';
      document.getElementById('rt-mod').style.width = rModPct + '%';
      document.getElementById('rt-high').style.width = rHighPct + '%';
      document.getElementById('rt-vhigh').style.width = rVHighPct + '%';
      document.getElementById('risk-tier-label').innerText = highSeverePct + '% in High/Severe Tiers';
      document.getElementById('rt-low-lbl').innerText = rLowPct + '%';
      document.getElementById('rt-mod-lbl').innerText = rModPct + '%';
      document.getElementById('rt-high-lbl').innerText = rHighPct + '%';
      document.getElementById('rt-vhigh-lbl').innerText = rVHighPct + '%';

      // Dynamic Decision-Support text
      let narrative = '';
      if (fAge === 3) {
        narrative = '<p><strong>Senior Population Segment (Age 65+):</strong> Saturated disease burden with <strong>' + heartRate + '% Heart Disease</strong> and <strong>' + strokeRate + '% Stroke history</strong>. In this segment, <strong>' + multiRate + '% of patients suffer from multi-morbidity</strong>. Priority clinical decision: secondary prevention, anti-hypertensive regimen adherence, and cardiovascular rehabilitation.</p>';
      } else if (fAge === 0 || fAge === 1) {
        narrative = '<p><strong>Under 50 Population Segment (Pre-Disease Cohort):</strong> Diagnosed chronic diseases are currently at <strong>0.0%</strong>. However, <strong>' + st2Pct + '% of these patients already present with Stage 2 Hypertension</strong>, and <strong>' + fatigueRate + '% report chronic fatigue conditions</strong>. This segment represents the single highest-value window for preventive behavioral lifestyle interventions (exercise and smoking cessation).</p>';
      } else if (fBmi === 3) {
        narrative = '<p><strong>Obese Population Segment (&ge;30 BMI):</strong> Elevated cardiovascular and metabolic strain with mean BP of <strong>' + avgBp + ' mmHg</strong> (' + st2Pct + '% in Stage 2 Hypertension) and an average risk score of <strong>' + avgRisk + '/100</strong>. Clinical decision: metabolic syndrome management and weight-loss intervention programs.</p>';
      } else {
        narrative = '<p><strong>Selected Segment Overview (' + count.toLocaleString() + ' patients | ' + pct + '% of total):</strong> Heart disease prevalence stands at <strong>' + heartRate + '%</strong>, with <strong>' + st2Pct + '% in Stage 2 Hypertension</strong>, <strong>' + fatigueRate + '% reporting fatigue conditions</strong>, and <strong>' + dualRate + '% presenting dual smoking and alcohol habits</strong>. Clinical risk score averages <strong>' + avgRisk + '/100</strong> (' + highSeverePct + '% in High or Severe risk tiers).</p>';
      }
      document.getElementById('cohort-dynamic-insight').innerHTML = narrative;
    }

    function resetAllFilters() {
      document.getElementById('filter-age').value = '-1';
      document.getElementById('filter-bmi').value = '-1';
      document.getElementById('filter-ex').value = '-1';
      document.getElementById('filter-smoke').value = '-1';
      document.getElementById('filter-alc').value = '-1';
      document.getElementById('filter-gen').value = '-1';
      updateDashboard();
    }

    // Run on initial load
    updateDashboard();
  </script>
</body>
</html>`;

fs.writeFileSync('C:\\Users\\DELL\\.gemini\\antigravity\\brain\\4032aadf-e966-450b-b945-67a446236cae\\healthcare_interactive_dashboard.html', html, 'utf8');
console.log('Successfully generated healthcare_interactive_dashboard.html');
