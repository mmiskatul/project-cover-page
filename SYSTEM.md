# Cover-Page System

This is a single independent Next.js 16 project with UI + backend in one folder.

## Folder Structure

```text
cover-page/
  src/
    app/                         # Next routes and API handlers
      api/                       # Backend HTTP endpoints
    components/
      ui/                        # UI primitives
      client-components/         # Rendering + interaction (use client)
      server-components/         # Server wrappers + local server operations
      ...                        # Existing reusable UI/features
    server/                      # Backend services and data layer
      db.ts
      models/
      services/
    lib/                         # Shared app utilities and server actions
  public/                        # Static assets
```

## Architecture Rules

1. Client rendering and interactivity live in `src/components/client-components`.
2. Local server operations and orchestration live in `src/components/server-components` and `src/server/services`.
3. All backend HTTP logic lives in `src/app/api/**/route.ts`.
4. API routes call the `src/server` layer, not inline heavy logic.
