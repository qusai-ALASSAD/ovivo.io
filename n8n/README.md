# OVIVO.IO — Live n8n Demo Setup

The frontend never connects directly to n8n. A visitor starts a demo at `/demo`; the backend POST `/api/demo-workflow` calls an authenticated production n8n webhook and reports **success only after a matching completed response**.

## Existing infrastructure context
The OVIVO n8n domain has previously been configured at `https://n8n.ovivo.io`. Its **current availability is unverified**. No VPS SSH credentials or n8n access are stored in this repository; configure secrets on the site host.

## Import workflow
1. Log in to your n8n account at `https://n8n.ovivo.io`.
2. Import `n8n/ovivo-demo-sandbox.workflow.json`.
3. On **Secure Demo Webhook**, create an **n8n Header Auth credential** with header name `X-Ovivo-Demo-Token` and a unique high-entropy random value (create within n8n; do not commit it).
4. Publish/activate the workflow in n8n. Ensure the production endpoint is HTTPS and is exactly:
   `https://n8n.ovivo.io/webhook/ovivo-demo-v1`
5. Configure **server-only** hosting environment variables:
   - `N8N_DEMO_WEBHOOK_URL=https://n8n.ovivo.io/webhook/ovivo-demo-v1`
   - `N8N_DEMO_WEBHOOK_TOKEN=<matching header-auth value>`
6. Restart/redeploy after env changes. Test a single run on the staging branch and inspect n8n executions.

The sample flow actually executes on n8n and returns one verified ID per invocation, classifying a synthetic request and preparing sandbox CRM, confirmation and notification **drafts**. It deliberately **does not** write to a production CRM or send real messages. Those are separate integrations requiring client-specific authorization, consent and isolation.

### Response contract
```json
{"runId":"<echo uuid from request>","status":"completed","steps":["received","classified","crm_demo","confirmation_demo","team_notification_demo"]}
```
A response with a different runId, invalid steps, a timeout, missing credentials, or an n8n error produces an error state for the visitor, never a fake success.

## n8n-powered AI chatbot (optional)
Use `N8N_CHAT_WEBHOOK_URL` and `N8N_CHAT_WEBHOOK_TOKEN` (server only) to direct the site's AI chat and voice-transcript responses to your existing n8n Agent workflow. Implement/import an AI Agent flow that accepts:
```json
{"requestId":"<uuid>","lang":"de","message":"<visitor text>","demo":true}
```
and responds with:
```json
{"requestId":"<same uuid>","answer":"<brief response>"}
```
Apply the same n8n Header Auth configuration using `X-Ovivo-Demo-Token`. Keep chat as a non-action demo until authentication, separation of user sessions, consent and production tools are approved. If no chat webhook is set, the endpoint can use `OPENAI_API_KEY` server-side instead.

### Security & production checklist
- Never expose n8n URLs with embedded tokens or public API keys in browser JavaScript.
- Limit usage and abuse at a shared gateway/datastore; per-instance in-memory limits are not a global spending cap.
- Enable n8n execution retention limits, disable/limit storing visitor chat messages, and redact sensitive logs.
- Real CRM, calendar, WhatsApp, email and phone integrations require distinct client credentials, data-processing agreements, permissions and idempotency controls.
- Voice demo currently uses browser speech recognition and speech synthesis, **not** a phone-call AI voice agent.
- Validate all multilingual content, privacy notice, cookies, Impressum, workflows, build and mobile before going live.
- Do not deploy this PR to the currently active `app.ovivo.io` Netlify site by mistake: that project is `workhub-app`, not the marketing site.
