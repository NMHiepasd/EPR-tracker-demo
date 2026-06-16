# EPR Documentation App — Moc An Chau

React + Tailwind CSS application for EPR compliance documentation and LOT traceability.

## Quick Start

```bash
npm install
npm start
```

Opens at http://localhost:3000

## Build for production

```bash
npm run build
```

## Demo Accounts

| ID | Password | Role | Access |
|---|---|---|---|
| admin | Amin@2025 | Admin | All features + LOT management |
| ma_user | MA@2025 | MA | MA + LOT sheets only |
| recycler01 | Rec@2025 | REC | LOT + REC sheets only |

## Demo LOT

Use LOT **5534** to see the full traceability demo (5-step pipeline with documents).

## Features

- **Bilingual VI/EN** — toggle anywhere in the app
- **LOT Gate** — users must enter a valid LOT number before accessing forms
- **Role-based access** — each role sees only their sheets
- **14 EPR forms** — MA (S01–S05), LOT (S06), REC (S07–S13), AI (S14)
- **LOT Traceability** — timeline with 8 KPI metrics + expandable document details
- **Admin panel** — create/edit/toggle/delete LOT numbers
- **Computed fields** — auto-calculated net weights, totals, loss rates
- **Repeatable rows** — add/delete rows in table sections

## Project Structure

```
src/
├── data/
│   ├── constants.js     # Users, groups, LOT seed data, trace data
│   └── sheets.js        # All 14 sheet definitions
├── hooks/
│   └── useLang.jsx      # Bilingual context (VI/EN)
├── utils/
│   └── compute.js       # Formula evaluator
├── components/
│   ├── LangToggle.jsx
│   ├── FieldControl.jsx
│   ├── RepeatSection.jsx
│   ├── SheetForm.jsx
│   ├── TraceView.jsx
│   ├── Sidebar.jsx
│   ├── LoginScreen.jsx
│   ├── LotGate.jsx
│   └── AdminPanel.jsx
├── App.jsx
└── index.js
```
