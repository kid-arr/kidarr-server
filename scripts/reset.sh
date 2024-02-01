#!/usr/bin/env bash
export PGUSER=postgres
export PGPASSWORD=hackme
export PGHOST=localhost

echo Removing migrations
rm -rf drizzle
echo "Dropping db"

echo "Dropping production db"
dropdb -f --if-exists kidarr
echo "Creating production db"
createdb kidarr

bun db:generate
bun db:migrate

# bun run src/db/migrate.ts
bun db:seed
