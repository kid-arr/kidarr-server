#!/usr/bin/env bash
export PGUSER=postgres
export PGPASSWORD=hackme
export PGHOST=localhost

echo Removing migrations
rm -rf drizzle
echo "Dropping db"

dropdb -f --if-exists kidarr
echo "Creating db"
createdb kidarr

bunx drizzle-kit generate:pg --config=./drizzle.config.ts
bunx drizzle-kit push:pg --config=./drizzle.config.ts

# bun run src/db/migrate.ts
bun run ./src/server/db/scripts/seed.ts
bun run ./src/server/db/scripts/auth.ts
