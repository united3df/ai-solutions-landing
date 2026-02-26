require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const url = process.env.NEON_DATABASE_URL;
if (!url) {
  console.error('NEON_DATABASE_URL is required');
  process.exit(1);
}

const sql = neon(url);
const migrationPath = path.join(__dirname, '../src/database/migrations/001_init.sql');
const sqlContent = fs.readFileSync(migrationPath, 'utf-8');

async function run() {
  const statements = sqlContent
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    await sql.query(stmt + ';', []);
  }
  console.log('Migration 001_init.sql completed');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
