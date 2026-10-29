/**
 * Zero-Dependency Node.js Companion Server for Flask Healthcare App
 * Allows immediate local testing of the web application templates and API
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5000;
const BASE_DIR = __dirname;

const COHORT_SUMMARY = {
  total_patients: 5000,
  gender_distribution: { Female: "50.1%", Male: "49.9%" },
  mean_blood_pressure: "134.45 mmHg",
  stage_2_hypertension_rate: "44.5%",
  disease_prevalence: {
    heart_disease: "30.0%",
    diabetes: "34.9%",
    stroke: "24.9%"
  },
  lifestyle_factors: {
    smoking_rate: "50.2%",
    alcohol_rate: "49.3%",
    low_physical_activity: "32.9%"
  }
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/api/summary') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'success', cohort: COHORT_SUMMARY }, null, 2));
    return;
  }

  // Render HTML templates
  let templateName = 'index.html';
  let title = 'Smart Healthcare Analytics Portal';

  if (pathname === '/dashboard') {
    templateName = 'dashboard.html';
    title = 'Interactive Healthcare Dashboard';
  } else if (pathname === '/story') {
    templateName = 'story.html';
    title = 'Clinical Data Story: 5 Evidence Scenes';
  }

  const baseHtml = fs.readFileSync(path.join(BASE_DIR, 'templates', 'base.html'), 'utf8');
  let contentHtml = fs.readFileSync(path.join(BASE_DIR, 'templates', templateName), 'utf8');

  // Basic template replacement
  contentHtml = contentHtml.replace(/{% extends "base.html" %}/g, '')
                           .replace(/{% block content %}/g, '')
                           .replace(/{% endblock %}/g, '')
                           .replace(/{{ title }}/g, title)
                           .replace(/{{ viz_url }}/g, parsedUrl.query.url || 'https://public.tableau.com/views/SmartHealthcareAnalyticsDashboard/Smart_Healthcare_Analytics_Dashboard')
                           .replace(/{{ summary.total_patients }}/g, '5,000')
                           .replace(/{{ summary.mean_blood_pressure }}/g, '134.45 mmHg')
                           .replace(/{{ summary.disease_prevalence.heart_disease }}/g, '30.0%')
                           .replace(/{{ summary.stage_2_hypertension_rate }}/g, '44.5%');

  let finalHtml = baseHtml.replace('{% block content %}{% endblock %}', contentHtml)
                          .replace(/{{ title }}/g, title);

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(finalHtml);
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` * Smart Healthcare Web App running at http://127.0.0.1:${PORT}`);
  console.log(` * Routes available:`);
  console.log(`   - Home:      http://127.0.0.1:${PORT}/`);
  console.log(`   - Dashboard: http://127.0.0.1:${PORT}/dashboard`);
  console.log(`   - Story:     http://127.0.0.1:${PORT}/story`);
  console.log(`   - REST API:  http://127.0.0.1:${PORT}/api/summary`);
  console.log(`======================================================\n`);
});
