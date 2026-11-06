# OVIVO.IO — Deploy without Vercel (Hostinger / IONOS)

Current app: **Next.js 13.5.1 App Router**, server-side API routes, Supabase integration, optional OpenAI / n8n. It is **NOT a static HTML website**; uploading a `public_html` ZIP without a Node.js web app runtime will break contact requests and AI services.

## Recommended: Hostinger Business Web Hosting / Cloud (managed Node.js)

Hostinger currently documents native Next.js server app deployment from either GitHub or a ZIP on supported Business and Cloud plans:
https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/

1. In hPanel, check that the hosting plan supports **Node.js Web App**. Premium / basic shared PHP hosting may not qualify.
2. Add a website -> **Node.js Web App** -> GitHub Repository (preferred), or upload a ZIP of this full source repository.
3. Select the repository `qusai-ALASSAD/ovivo.io` and the approved branch (currently staging: `feature/ai-first-three-demos`). **Do not assume `main` contains the changes.** If GitHub connection does not allow choosing a branch, download the approved branch ZIP or merge only after review.
4. Select a compatible Node runtime (Node **20 or 22** if supported), framework **Next.js**, install dependencies from the committed lockfile, and build using `npm run build`.
5. In the hosting dashboard configure the **server-side environment variables**, not in the public repository:
   - `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — publishable/anon key
   - `SUPABASE_SERVICE_ROLE_KEY` — **SECRET**, server only
   - `OPENAI_API_KEY` — **SECRET**, server only, if AI chat will be enabled
   - `N8N_CHAT_WEBHOOK_URL` and `N8N_CHAT_WEBHOOK_TOKEN` — optional
   - `N8N_DEMO_WEBHOOK_URL` and `N8N_DEMO_WEBHOOK_TOKEN` — optional
   Confirm provider-specific extras by checking code and the existing Vercel configuration. Avoid setting unused integrations.
6. First deploy on a **temporary test URL**. Confirm `/software/`, `/pricing/`, `/request/?service=starter`, `/contact/`, `/imprint/` and `/privacy/` in all languages.
7. Send **one consented test inquiry** through `/request/` and verify the row in OVIVO's **actual** Supabase `leads` table (not PutzGo). Verify AI/chat and n8n only after enabling them; do not point test workflows at live customer data.
8. Complete German legal notices (legal name, business address and provider data), privacy/provider disclosures and consent where required, and remove test/placeholder content **before public launch**.
9. In Hostinger, connect `ovivo.io`, use the exact DNS records displayed by Hostinger for this application, enable SSL, and only then cut over from Vercel. DNS is held at your registrar: domain registration **does not** need to move.

**Important:** Hostinger Node.js hosting has platform restrictions such as no inbound WebSockets and no perpetual background workers. OVIVO's current API routes can run as a web app; any future background n8n worker or persistent service should be hosted separately. See https://www.hostinger.com/support/hostinger-node-js-limits-for-web-and-cloud-plans/.

## Alternative: IONOS VPS with Node.js

IONOS Deploy Now is intended for static/SPAs/PHP outputs, NOT the current dynamic Next.js server routes without additional backend infrastructure:
https://www.ionos.com/help/hosting/deploy-now/deploy-now-supported-technologies-and-scope-of-customer-service/

For a VPS with Ubuntu and Node.js 20+:

```bash
# After server hardening, firewall, HTTPS proxy, and Git authentication:
git clone https://github.com/qusai-ALASSAD/ovivo.io.git
cd ovivo.io
git checkout feature/ai-first-three-demos
npm ci
npm run build
PORT=3000 npm run start
```

This command starts a service only for the current shell. For production, set up a managed process (systemd), a reverse proxy (Nginx/Caddy), Let's Encrypt HTTPS, security updates, backups and environment variables installed outside the repository. **Never share your VPS passwords or API keys in chat.**

## Source ZIP

Download the full source branch archive:
https://github.com/qusai-ALASSAD/ovivo.io/archive/refs/heads/feature/ai-first-three-demos.zip

A source ZIP is **not a finished static HTML bundle**. Deploy it through Hostinger's **Node.js Web App / ZIP upload** feature (supported plan) or on a correctly configured VPS.

## Release blockers

- OVIVO's correct live Supabase project is not yet confirmed via the connected database account.
- Legal identity/imprint and actual vendor/privacy disclosures are still draft.
- AI and n8n production workflow success has not been proven by real integrations.
- The current Next.js dependency is old; review security advisories and plan a tested upgrade before exposing the public website.
- The custom domain must be configured in hosting/DNS and tested; no DNS switch was performed in this commit.
