<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/601a1b52-1751-488c-a5fe-be767ad8ff53

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and fill the variables you have available
3. Run the app:
   `npm run dev`

## Deploy to Vercel

The repo is pre-configured for Vercel (`vercel.json`, `next.config.ts` with `output: 'standalone'`).

1. Import the repo in Vercel — framework auto-detected as **Next.js**, no build override needed.
2. In **Settings → Environment Variables** add the following for the Production (and Preview) environment:

   | Variable | Required | Purpose |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | yes | Canonical URL for OG/Twitter metadata, sitemap and robots. e.g. `https://rangeloviedo.com` |
   | `NEXT_PUBLIC_GHL_FORM_URL` | recommended | Direct link to the GoHighLevel qualification form (used as CTA fallback) |
   | `NEXT_PUBLIC_GHL_CALENDAR_URL` | recommended | Direct link to the GoHighLevel calendar |
   | `NEXT_PUBLIC_GHL_FORM_EMBED_URL` | optional | iFrame embed URL for the form. If set, renders inline in the contact section |
   | `NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL` | optional | iFrame embed URL for the calendar |
   | `NEXT_PUBLIC_RANGEL_WHATSAPP` | optional | International phone, no `+` or spaces — enables the WhatsApp secondary CTA |
   | `NEXT_PUBLIC_RANGEL_EMAIL` | optional | Email shown in the footer as direct fallback |
   | `NEXT_PUBLIC_RANGEL_PHONE` | optional | Phone shown in the footer as direct fallback |
   | `NEXT_PUBLIC_CONTACTO_BG_VIDEO` | optional | Public `.mp4` path for the contact section background video; leave empty for the static fallback |
   | `GEMINI_API_KEY` | only if Gemini features are used | Server-side key for Google Generative AI |

3. All `NEXT_PUBLIC_*` vars must be set **at build time** in Vercel — re-deploy after adding them.
4. When none of the GHL vars are present, every CTA gracefully falls back to the `#contacto` anchor and the in-page form/calendar embeds are hidden in favor of plain buttons — the landing remains fully functional.
5. After the first deploy verify:
   - `https://<domain>/robots.txt` and `/sitemap.xml` return valid content
   - `Cache-Control: public, max-age=31536000, immutable` is present on responses for `/_next/static/*`, `/assets/*`, `/brand/*`, `/rog/*` (DevTools → Network)
   - Vercel Analytics and Speed Insights start receiving data within ~1h
