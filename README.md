# XetaX CRM — Marketing Website

Pure HTML + CSS + vanilla JS (zero dependencies, no build step).

## Run locally
```bash
cd website && python3 -m http.server 8090
# open http://localhost:8090
```
Ya kisi bhi static host (Netlify / Vercel / GitHub Pages / nginx) par `website/` folder deploy kar do.

## Structure
- `index.html` — single-page site (hero, value strip, templates, features, product tour, AI Autopilot, Live Chat Desk, AI assistant, chatbot, WhatsApp, invoicing, business tabs, trust, CTA)
- `css/style.css` — LIGHT theme, clean SaaS look, responsive (<720px mobile), reduced-motion safe
- `js/main.js` — scroll reveal, counters, product-tour tabs, business-type tabs, mobile menu
- `assets/shot-*.png` — real product screenshots (1600×1000): dashboard, records, contacts, whatsapp, inbox, campaign, automations, ai, templates, team, meetings, agents, autopilot, desk, desk-chat, ai-record, invoice-form, invoices, profile

## Screenshots refresh karne ho to
CRM ko localhost:5000 par chala kar pages ke naye screenshots lo aur `assets/` me same
naam se replace kar do — website automatically naye dikhayegi.
