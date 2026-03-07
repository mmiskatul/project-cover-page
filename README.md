# Cover Page

Standalone Next.js 16 full-stack app.

## Features

- Same UI/routing flow as the original project:
  - `/`
  - `/template`
  - `/template/[templateName]`
  - `/download`
  - `/merge`
  - `/recent`
  - `/about`
- Backend logic via Next API routes:
  - `/api/stats`
  - `/api/feedback`
  - `/api/generate-pdf`
  - `/api/merge-auto`
- Refactored server layer in `src/server` for DB/models/services.
- Explicit client/server component split:
  - `src/components/client-components`
  - `src/components/server-components`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local`:

```bash
MONGODB_URI=your_mongodb_uri
PUPPETEER_EXECUTABLE_PATH=optional_custom_chrome_path
```

If `MONGODB_URI` is missing, stats fall back and feedback persistence is disabled.

## Vercel PDF Runtime

- `npm install` now generates `public/chromium-pack.tar` during `postinstall`.
- `/api/generate-pdf` uses `puppeteer-core` with `@sparticuz/chromium-min`.
- On Vercel, the route downloads the Chromium pack from the deployed `/chromium-pack.tar` asset.
- For local development, set `PUPPETEER_EXECUTABLE_PATH` if you want to use an installed Chrome/Chromium binary instead of the packaged serverless runtime.
