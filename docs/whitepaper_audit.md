# IronMind: Next-Gen AI Psychologist & Coach

Version: 0.1 Audit and Implementation Plan
Date: 2025-08-09
Owner: Product/Engineering

---

## 1) Executive Synthesis

- Purpose: Privacy-first, cross-platform AI psychologist + performance coach that blends therapeutic dialogue (CBT/DBT) with adaptive goal coaching, habit tracking, and relapse prevention.
- Core value: Voice-driven mood inference + personalized daily plan + proactive interventions + addiction reduction, all with strong privacy defaults.
- MVP (90 days): One-tap voice check-in, ASR → sentiment/intents, adaptive daily plan (grind/recovery), manual habit logging, basic wearables sync (steps/sleep), push notifications, XP rewards, local-first privacy.

---

## 2) Product Audit

- Strengths
  - Voice-first interaction differentiates; multimodal signals for robust personalization.
  - Clear safety and privacy posture; HIPAA-ready future.
  - Practical MVP scope; phased roadmap to clinician/enterprise.
- Risks/Gaps
  - On-device ASR/emotion models may be heavy; latency and battery constraints.
  - Safety/compliance complexity (self-harm, escalation, HIPAA variants).
  - Data integrations can bottleneck (HealthKit/Fit onboarding, OAuth scopes).
  - Continuous personalization may require sizable infra + experimentation.
- Mitigations
  - Start with on-device feature extraction + optional cloud ASR; cache and pre-warm models.
  - Implement strict safety policy, guardrails, and audit logging from day 1.
  - Phase integrations: start with Apple Health/Google Fit minimum viable metrics.
  - Use feature flags + AB testing infra early; focus on a few high-signal features.

---

## 3) User Personas & Jobs-To-Be-Done

- Ambitious Performer
  - JTBD: Maintain output during mood dips; wants structure & push.
  - KPIs: Weekly goal throughput, micro-task adherence, streaks.
- Recovery Seeker
  - JTBD: Reduce relapse frequency; wants timely interventions & alternatives.
  - KPIs: Episodes/week, time-to-intervention, adherence to cooling workflows.
- Mental Health Conscious
  - JTBD: Therapy-like support, self-awareness, journaling.
  - KPIs: Check-in frequency, completion of CBT exercises, wellbeing deltas (PHQ-9/GAD-7 optional).
- High-Achiever with Wearables
  - JTBD: Insights tying sleep/exercise to mood/productivity; optimized daily plan.
  - KPIs: Correlation insights usage, plan adherence, recovery days planned vs needed.

---

## 4) Feature Breakdown (Detailed)

Each feature lists purpose, inputs, outputs, UI, parameters, acceptance criteria (AC), telemetry, and tech notes.

### 4.1 Voice & Mood Analyzer
- Purpose: Detect mood/affect/arousal; extract voice biomarkers.
- Inputs: 15–90s voice clip; optional continuous in sessions.
- Outputs: Emotion vector (sadness, anxiety, anger, calm, energy) + confidences; biomarkers (pitch, jitter, energy, prosody); quality flags.
- UI: One-tap check-in, waveform, short summary, privacy toggle.
- Parameters: sample rate ≥16kHz; local processing flag; consent scopes.
- AC
  - P50 end-to-end latency ≤2.5s for local features; ≤6s with cloud ASR.
  - Emotion vector confidence calibrated (ECE ≤ 0.1 on internal validation).
  - Offline mode: features extracted, queued for sync.
- Telemetry: Latency, error rates, model confidences, opt-in only; no raw audio unless consented.
- Tech Notes: Use on-device feature extraction; Whisper tiny/base for ASR (on-device where possible), fall back to cloud per privacy setting.

### 4.2 NLU & Therapeutic Dialogue (CBT/DBT)
- Purpose: Understand content and cognitive distortions; provide guided exercises.
- Inputs: Transcript, session context, profile, prior mood vectors.
- Outputs: Therapy-grade response, interventions, reframes, journaling prompts.
- UI: Chat (voice+text), quick actions (breathing, reframe, micro-task).
- Parameters: Safety mode, escalation path, content filters.
- AC
  - Safety classification with ≥0.95 recall on self-harm keywords; human-reviewed lists.
  - Guardrails: deterministic flows for crises; log warning + resource display.
- Telemetry: Prompt categories, intervention uptake, safety triggers (counts; PII redacted).
- Tech Notes: Hosted LLM with safety layer; optional on-device intent classifier for fast paths.

### 4.3 Lifestyle & Habit Tracking
- Purpose: Context for mood shifts; correlate behaviors with mood.
- Inputs: HealthKit/Google Fit (steps, sleep), manual logs (meals, caffeine, meds, water), app usage.
- Outputs: Daily habit scores, correlations (e.g., 2 late nights → mood -15%), recommendations.
- UI: Daily dashboard, log cards, correlation insights.
- Parameters: Sync frequency, retention window, anonymization.
- AC
  - Minimum viable integrations: steps, sleep summary in MVP.
  - Correlation beta features gated; clearly marked as exploratory.
- Telemetry: Sync success, data completeness per day, user edits to auto-detected events.

### 4.4 Negative Habits & Addiction Module
- Purpose: Detect, prevent, reduce harmful behaviors.
- Inputs: Self-reports, geo triggers, app usage spikes, voice cues, physiology spikes.
- Outputs: Relapse risk score, interventions, replacement prompts, emergency cool-down.
- UI: Crisis card, alternatives, accountability partner options, milestones.
- Parameters: Risk thresholds, escalation opt-ins, geofence radius.
- AC
  - Time-to-intervention ≤30s from trigger detection in foreground; ≤2 min via push in background.
  - False positive rate controlled via user feedback loop (<10% reported).
- Telemetry: Trigger types, interventions accepted/declined, outcomes.

### 4.5 Adaptive Goal Coaching Engine
- Purpose: Map long-term goals → micro-goals → daily tasks respecting mental state.
- Inputs: SMART goals, history, current mood/energy, calendar availability.
- Outputs: Daily plan, grind/recovery mode, XP, habit-adjusted deadlines.
- UI: Roadmap, focus card, progress bar, micro-challenges.
- Parameters: Push frequency, difficulty scaling, recovery cooldown.
- AC
  - Daily plan always fits user’s declared availability; conflicts flagged.
  - Mode switching rule-based v1 (mood thresholds), learned policy later.
- Telemetry: Task completions, mode switches, plan adherence.

### 4.6 Predictive Alerts & Proactive Interventions
- Purpose: Predict dips; push timely interventions.
- Inputs: 7–30d trends, immediate signals.
- Outputs: Nudge type (hard/soft/recovery), micro-actions.
- UI: Notifications, widgets, scheduled prompts.
- Parameters: Sensitivity, quiet hours, opt-out modes.
- AC
  - Notification rate limits; quiet hours enforced.
  - Opt-out granularity per nudge type.
- Telemetry: CTR, intervention start rate, effectiveness rating.

### 4.7 Social & Accountability
- Purpose: Motivation via social support; privacy preserved.
- Features: Accountability partners, anonymized sharing, group challenges, therapist reports.
- Parameters: Share granularity, anonymization toggles.
- AC
  - Zero-knowledge sharing option; redact PII by default.
  - Partner contact flows explicit, reversible.
- Telemetry: Partner invitations, challenge joins, report exports.

### 4.8 Analytics, Insights & Reports
- Purpose: Explainable insights to users/clinicians.
- Outputs: Weekly mood map, triggers, heatmaps, risk timeline, PDF exports, JSON/CSV.
- AC
  - Exports reproducible from local audit log + server aggregates.
  - Clinician view gated behind HIPAA mode (future phase).

---

## 5) System Architecture (Practical Plan)

- Mobile App: React Native (TypeScript). Modules: Check-in, Chat, Habits, Goals, Insights, Settings.
- On-Device: Feature extraction (C++/Rust/JS bridge). Optional on-device Whisper.
- Backend: GCP (Cloud Run/GKE), Cloud SQL (Postgres), Redis, Cloud Storage; Pub/Sub for events.
- ML Serving: Vertex AI or custom TorchServe; MLflow registry.
- Integrations: HealthKit/Google Fit; Stripe; FCM/APNs; Twilio (escalation only).
- Privacy/Security: Local-first defaults; end-to-end encryption; DP for aggregates; retention policies.

Data Flow (MVP)
1) Voice captured → on-device features → optional on-device ASR.
2) If cloud ASR enabled: send audio or features with consent; else store locally.
3) Backend merges voice embeddings + transcript + wearable data → mood vector, plan.
4) App renders plan/interventions → schedules nudges → logs locally; syncs deltas.

---

## 6) Data Model (Initial Schemas)

- VoiceCheckin
```json
{
  "user_id": "uuid",
  "timestamp": "ISO8601",
  "mh_local_features": {"pitch_median": 120.2, "energy": 0.58},
  "mood_vector": {"sadness": 0.7, "anxiety": 0.2, "energy": 0.3},
  "transcript_hash": "sha256",
  "consent_flags": {"share_transcript": false}
}
```
- HabitEvent
```json
{
  "user_id": "uuid",
  "timestamp": "ISO8601",
  "habit_type": "smoking|alcohol|porn|gaming|other",
  "quantity": 2,
  "context": {"location": "bar", "stress_level": 7}
}
```
- Goal
```json
{
  "goal_id": "uuid",
  "user_id": "uuid",
  "title": "string",
  "description": "string",
  "start_date": "ISO8601",
  "target_date": "ISO8601",
  "status": "active|paused|completed",
  "kpis": ["string"],
  "availability": {"weekday_hours": 2, "weekend_hours": 3}
}
```
- Task
```json
{
  "task_id": "uuid",
  "goal_id": "uuid",
  "user_id": "uuid",
  "title": "string",
  "duration_min": 25,
  "difficulty": 3,
  "scheduled_for": "ISO8601",
  "completed_at": "ISO8601|null",
  "mode": "grind|recovery"
}
```
- Intervention
```json
{
  "intervention_id": "uuid",
  "user_id": "uuid",
  "type": "breathing|reframe|micro_task|walk|urge_surf|cool_down",
  "trigger": "scheduled|risk_detected|manual",
  "risk_score": 0.62,
  "started_at": "ISO8601",
  "completed_at": "ISO8601|null",
  "rating": 4
}
```

---

## 7) Privacy, Safety, Compliance

- Privacy Defaults
  - Local processing for audio features; hashed embeddings only by default.
  - Consent flows granular (transcript sharing, clinician export, partner sharing).
  - Retention: 0–365 days configurable; auto-purge.
- Safety
  - Self-harm detection with immediate local warning + resources; optional help call with consent.
  - Evidence-based CBT/DBT library reviewed by clinicians; changelog + provenance.
- Compliance
  - GDPR/CCPA baseline; DPA templates; HIPAA per clinician mode (Phase 3+).

---

## 8) Engineering Plan (MVP 90 Days)

- Milestones
  - M1 (Weeks 1–3): Foundations
    - Project setup (RN TS, backend, CI/CD), design system, local storage, auth.
    - On-device feature extraction POC; Whisper path decision; safety classifier v0.
  - M2 (Weeks 4–6): Core Flows
    - Voice check-in E2E; ASR integration; mood vector calc; daily plan v1.
    - Habit logging; HealthKit/Google Fit (steps/sleep); notifications.
  - M3 (Weeks 7–9): Coaching + Addiction v1
    - Grind/recovery engine; micro-task generator; XP system.
    - Addiction triggers basic; crisis workflows; accountability stub.
  - M4 (Weeks 10–12): Polish & Hardening
    - Privacy controls, offline sync, analytics dashboards, load tests, app store prep.

- Team
  - 1 PM, 1 UX, 2 RN, 1 Backend, 1 ML, 1 Native Eng (optional), 1 Clinical Advisor.

- Tech Choices
  - RN TS, GCP (Cloud Run/GKE), Postgres, Redis, Cloud Storage, Whisper, PyTorch.

---

## 9) Delivery Backlog (Detailed)

- Epic: Voice Check-in
  - User Story: As a user, I record a 30s check-in and get a mood summary.
  - Tasks
    - Implement audio capture (RN bridge), 16kHz mono.
    - On-device feature extraction module + unit tests.
    - ASR integration (on-device first; cloud fallback toggle).
    - Mood vector service (backend) + calibration.
    - UI: waveform + summary + retry; privacy toggle.

- Epic: Therapeutic Dialogue
  - User Story: As a user, I get supportive responses with exercises.
  - Tasks: Safety classifier, LLM gateway, prompt templates, quick actions, journaling schema.

- Epic: Adaptive Plan
  - User Story: As a user, I see a daily plan that adapts to my mood and availability.
  - Tasks: Goal/task models, plan generator, grind/recovery rules, XP system, notifications.

- Epic: Habits & Wearables
  - Tasks: HealthKit/Google Fit scaffolding, manual logs, correlation engine v0, insights UI.

- Epic: Addiction Module
  - Tasks: Risk scoring v0 (rule-based), triggers, interventions library, crisis card, partner stubs.

- Epic: Privacy & Security
  - Tasks: Consent manager, encryption at rest/in transit, retention policies, audit logging, DP pipeline for aggregates.

- Epic: Observability
  - Tasks: Sentry, metrics, logs with redaction, dashboards, AB testing switchboard.

---

## 10) KPIs & Experiments

- Activation: First voice check-in completion rate.
- Engagement: 3+ check-ins/week; daily plan adherence; intervention completion rate.
- Outcome: 30% reduction in self-reported addictive episodes in 90 days (engaged cohort).
- Satisfaction: NPS, in-intervention ratings.
- Experiments: Nudge sensitivity, micro-task types, recovery cooldowns, ASR/local processing ratios.

---

## 11) Cost & Ops Estimates

- MVP Dev: $250k–$450k depending on stack/native needs.
- Monthly Infra: $2k–$10k for low user base; ASR/LLM are primary drivers.
- Clinical Oversight: Part-time clinician review cadence; budget accordingly.

---

## 12) Open Questions & Risks

- On-device vs cloud ASR trade-offs per market, devices, and consent.
- Clinical liability boundaries per country; content guardrails localization.
- Wearable APIs rate limits and data quality variability.
- Personalization cold-starts and fairness across accents and demographics.

---

## 13) Next Steps (Actionable)

- Validate with 10–20 users (targeted interviews; consented recordings for model calibration).
- Clickable prototype (core flows) → usability testing.
- Assemble MVP team; finalize infra budget; kick off 90-day plan.
- Prepare expanded version with diagrams, full API spec, and investor deck.

---

## 14) Appendices

- A: Example Intervention Library (selected)
  - Acute anxiety: 90s paced breathing + grounding + 5-min walk.
  - Craving: 60s urge surf + alternative action + optional partner call.
  - Low energy: 15–25 min micro-task + caffeine timing + nap suggestion.

- B: Safety & Escalation Flow (v0)
  - Detect → Local warn → Resources → User consent → Optional call/notify partner → Log.

- C: Data Retention Profiles
  - Minimal (0d transient), Standard (90d), Extended (365d) with auto-purge.

