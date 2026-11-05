# OVIVO.IO — AI Automation First (implementation notes)

## Scope implemented on this branch
- Three-language AI experience lab on homepage and `/demo`: AI chatbot, browser voice interface and interactive workflow simulation.
- Dedicated `/api/demo-chat` endpoint, using `OPENAI_API_KEY` server-side only. Limits: 400-character input, 8 requests per IP per minute, model max 230 tokens and a 13-second timeout.
- Restored missing imports that prevented project compilation: `scroll-to-top`, `FloatingChatWidget`, `brand-polish`, `roi-calculator`. The brand component is intentionally a no-op; no logo assets have been changed.
- Updated company positioning and some unverified performance claims on the homepage.
- Existing production main branch, logo files and Supabase schema were not changed.

## Set up
1. Provision `OPENAI_API_KEY` as a **server-side** environment secret on hosting (never `NEXT_PUBLIC_OPENAI_API_KEY`).
2. Optionally use `OVIVO_DEMO_MODEL` (default: gpt-4o-mini).
3. Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`, and test all routes DE/EN/AR.
4. Review and apply approved original ovivo.io logo and light-theme palette to the existing design. Do **not** recreate the logo or invent a new brand asset.
5. Validate consent/privacy wording and legal address; complete legal pages before launch.

## Demo limitations
- Voice demo relies on browser speech recognition / browser text-to-speech. Browser recognition might involve external browser services. This is NOT a real-time WebRTC voice model or telephone assistant.
- Workflow demo is deliberately a local UI simulation. No external CRM, WhatsApp, email or calendar actions take place.
- Requests to AI provider are server-to-server. The existing in-memory rate limiter is **not** a global distributed budget/cost control. Before making this public, add shared Redis/storage rate limits, provider spending limits and optional CAPTCHA.
- API calls cost money. Never publish demo keys or use secrets in browser code.
- These changes are a reviewable implementation branch, not a deployed production system.
- This branch has **not** passed CI/build checks in this environment because offline npm dependency installation was unavailable.

## Remaining release gate
- Review all pages for unsupported performance figures / testimonials, older simulated content and GDPR claims; revise where necessary.
- Add original approved SVG/logo from the user's source assets; avoid substituting the existing decorative Sparkles icon as final brand identity.
- Audit admin and chat endpoints for authentication, secure access, and abuse controls.
- Verify responsive CSS, mobile navbar, language switching, forms, booking flows, backend storage, SEO, and all links.
- Refactor `next.config.js` to stop ignoring typecheck/lint errors after fixes.
- Obtain user approval before merge or deployment.
