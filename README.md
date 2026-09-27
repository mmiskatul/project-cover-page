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

## Docker & Cloud Deployment

This app uses Puppeteer to render PDFs. To run reliably on any cloud provider (Render, Railway, Fly.io, DigitalOcean, AWS, VPS), use the Docker container which includes all necessary Chromium binaries and system fonts.

### Run with Docker Compose

```bash
docker compose up -d --build
```

Open `http://localhost:3000`.

### Run with Docker CLI

```bash
# Build the image
docker build -t cover-page .

# Run the container
docker run -d --name cover-page -p 3000:3000 -e PORT=3000 cover-page
```

### Cloud Deployment (Render, Railway, VPS, etc.)
- Set build type to **Dockerfile**.
- The Dockerfile automatically installs `chromium` and sets `PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium`.
- If your host provides a dynamic `$PORT` (e.g. Render, Heroku), the container automatically binds to that port.

