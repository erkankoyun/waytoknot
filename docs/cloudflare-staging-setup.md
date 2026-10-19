# Standalone Cloudflare staging setup

**Preparation only:** The repository has no independent Cloudflare account authorization, D1 database ID, source database export, or successful standalone build proof. Do not attach the production domain until tests pass.

## D1 creation

Cloudflare Dashboard → Storage & databases → D1 → Create database.
Name the new database `waytoknot-staging`, then copy the D1 database ID from its overview. Do not delete or alter the existing Sites database.

The example `wrangler.cloudflare.example.jsonc` documents the intended `DB` binding. It is **not** deployable as-is; it contains a placeholder database ID and a worker entrypoint that must be confirmed against the standalone build output before deployment.

## Standalone build trial

The opt-in `vite.config.cloudflare.ts` removes the Sites-specific Vite plugin and connector preview plugin. It has not yet been tested on Cloudflare CI. Perform a standalone build in a staging branch, inspect emitted Wrangler configuration, and resolve any references to Sites-only services. Do not replace the current `vite.config.ts` or production deployment commands until this succeeds.

Once staging D1 exists, migrate D1 schema and restore verified data before live traffic. Keep both site and database backup until counts, FTS search, advisor sessions, APIs, and import path pass tests. Do not put a database export or credentials in GitHub.

Current live domain DNS records must be verified separately: existing Cloudflare A records differed from Namecheap's older values, and an earlier CNAME verification record was not observed in the Cloudflare DNS inventory.
