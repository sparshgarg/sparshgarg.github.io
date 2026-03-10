# VendorGuard — Autonomous Vendor Remediation Agent

## What This Project Is
A Google Apps Script agent that autonomously manages vendor security remediation
issues. It polls issues.json in this repo, emails vendors requesting evidence,
evaluates their responses using the Gemini API (text + image/screenshot), and
closes or escalates issues without human intervention.

## Repository Files
- `grc.html` — GitHub Pages dashboard for human analysts (read + write)
- `issues.json` — Single source of truth for all issue state, shared between
  the dashboard and the Apps Script agent
- `controls.json` — RAG knowledge base of control definitions 
- `agent.gs` — Google Apps Script agent logic (to be added)

## The Agent Loop (Google Apps Script, runs every 10 seconds)
1. Reads issues.json from this repo via GitHub Contents API
2. Finds all issues with status Open → sends remediation request email via Gmail
3. Polls Gmail for vendor replies with evidence attachments
4. Calls Gemini API to evaluate the vendor's written response + screenshot evidence
5. Applies decision thresholds and updates issue status
6. Commits updated issues.json back to this repo via GitHub Contents API

## Decision Thresholds (do not change)
- relevance_score, mapping_score, sufficiency_score all ≥ 80 → SUFFICIENT → Close
- Any score 50–79 → ESCALATE → flag for human analyst
- Any score < 50 → INSUFFICIENT → send follow-up email to vendor
- High severity + any ambiguity → always ESCALATE

## Issue Status Values (do not change — agent depends on these exactly)
Open → Awaiting Evidence → Under Review → Closed | Escalated

## issues.json Schema (do not change any field names)
Each issue contains: issue_id, vendor_name, vendor_email, control_id,
issue_description, severity, date_opened, sla_deadline, status,
evidence_criteria, agent_last_action, agent_decision, relevance_score,
mapping_score, sufficiency_score, overall_confidence, agent_reasoning,
missing, audit_trail[]

## What Never To Change
- Field names in issues.json
- Status values (exact strings, case-sensitive)
- Decision threshold values (80 and 50 cutoffs)
- The audit_trail array structure
