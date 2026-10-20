#!/usr/bin/env bash
set -euo pipefail
# Dedicated staging database only. No credentials are read or printed.
# Execute from repository root after reviewing schema SQL.
for file in drizzle/0000_happy_justin_hammer.sql drizzle/0001_light_mentor.sql; do
  echo "Applying schema: $file"
  pnpm exec wrangler d1 execute waytoknot-staging --remote --config wrangler.jsonc --file "$file"
done
echo "Staging schema installed. Restore existing production data separately."
