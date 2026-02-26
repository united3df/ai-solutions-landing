# Blog Generation Service

NestJS service for automated SEO blog post generation. Uses Gemini 1.5 Flash for topic filtering, content generation, and review. Stores posts in Neon (PostgreSQL).

## Quick Start

```bash
git clone <repo>
cd backend-service
cp .env.example .env
# Edit .env with your credentials
npm install
npm run db:migrate
npm run start:dev
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEON_DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `CRON_SECRET` | Token for cron endpoint (x-cron-token header) | `random-32-char-string` |
| `ADMIN_TOKEN` | Token for admin API (x-admin-token header) | `another-random-string` |
| `SITE_TOPIC` | Site theme and target audience description | `Tech blog for developers` |
| `SITE_LANGUAGE` | Content language | `ru` |
| `TOPIC_FILTER_THRESHOLD` | Min topic score (default: 6) | `6` |
| `POST_REVIEW_THRESHOLD` | Min post score (default: 7) | `7` |
| `MAX_TOPIC_RETRIES` | Topic attempts before fail (default: 3) | `3` |
| `MAX_POST_RETRIES` | Post regeneration attempts (default: 2) | `2` |

## Module Structure

```
src/
├── database/     # Neon PostgreSQL, migrations
├── gemini/       # Gemini API client
├── skills/       # MD skill files loader
├── topics/       # Topic management, auto-generation
├── blog/         # Pipeline orchestration, cron endpoint
├── admin/        # Admin API
└── common/       # Guards, types, utils
```

**Flow:** Cron/Admin trigger → TopicsService.getNextTopic → Gemini filter → Gemini generate → Gemini review → DatabaseService.insertPost

## Skills

Skills are MD files in `skills/` at project root:

- `content-patterns.md` — AEO/GEO blocks, structure
- `ai-seo.md` — SEO criteria, scoring
- `ai-writing-detection.md` — Banned words and patterns

Add or edit these files to tune generation behavior.

## API Docs (Swagger)

After starting the app, open `http://localhost:3000/api/docs` for interactive API documentation.

## Cron Setup (cron-job.org)

- **URL:** `https://your-service.vercel.app/api/cron`
- **Method:** POST
- **Headers:** `x-cron-token: <CRON_SECRET>`
- **Schedule:** e.g. `0 10 * * *` (daily at 10:00 UTC)

## Admin API Reference

All admin endpoints require `x-admin-token` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /admin/posts | List posts |
| GET | /admin/posts/:id | Get full post |
| PUT | /admin/posts/:id | Update post |
| DELETE | /admin/posts/:id | Delete post |
| POST | /admin/posts/:id/publish | Set status published |
| POST | /admin/posts/:id/draft | Set status draft |
| GET | /admin/topics | List topics |
| POST | /admin/topics | Add topic `{ title, keyword?, priority? }` |
| DELETE | /admin/topics/:id | Delete topic |
| POST | /admin/generate | Run generation (same as cron) |
| GET | /admin/stats | `{ totalPosts, publishedPosts, draftPosts, unusedTopics }` |

## Deploy

### Railway

1. Connect repo, set env vars
2. Build: `npm run build`
3. Start: `npm run start:prod`

### Vercel

NestJS on Vercel requires serverless adapter. Prefer Railway or Render for long-running cron.
