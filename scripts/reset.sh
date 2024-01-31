#!/usr/bin/env bash
export PGUSER=postgres
export PGPASSWORD=hackme
export PGHOST=localhost

echo Removing migrations
rm -rf drizzle
echo "Dropping db"

if $NODE_NEV ne "production"; then
  echo "Dropping production db"
  dropdb -f --if-exists kidarr
  echo "Creating production db"
  createdb kidarr
fi

bun db:generate
bun db:migrate

# bun run src/db/migrate.ts
bun db:seed
