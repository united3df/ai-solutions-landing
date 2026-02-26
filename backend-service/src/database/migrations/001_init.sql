CREATE TABLE IF NOT EXISTS posts (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  content     TEXT NOT NULL,
  excerpt     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'published',
  meta_title  TEXT NOT NULL,
  meta_desc   TEXT NOT NULL,
  keyword     TEXT,
  score       INTEGER,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS topics (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  keyword    TEXT,
  intent     TEXT,
  priority   INTEGER DEFAULT 5,
  used       BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
