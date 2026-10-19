# Way To Knot — standalone Cloudflare migration

Status: PREPARATION ONLY. No deployment, Cloudflare DNS modification, or D1 data transfer has been performed.

## Existing implementation

- Next.js 16 with vinext and @cloudflare/vite-plugin.
- Sites build depends on `.openai/hosting.json`, `build/sites-vite-plugin`, and request-scoped Sites-specific bindings.
- D1 binding name: `DB`; production D1 database ID for a separate Cloudflare account is not known.
- API routes: `/api/search`, `/api/catalog/import`, `/api/catalog/status`. Directory storage is in D1 and imports use a runtime-only `CATALOG_IMPORT_TOKEN`.
- GitHub Actions catalog refresher is present but the D1 publishing step has not been verified working in the Sites environment.

## Safe cutover checklist

1. Confirm ownership of `waytoknot.com` in Cloudflare and identify authoritative DNS provider.
2. Provision a **new** Cloudflare D1 database (do not substitute any placeholder database ID).
3. Export/back up the current Sites D1 database, including directory records, FTS data, advisor sessions and other production tables, using an owner-authorized export path.
4. Implement/test a standalone Cloudflare Worker configuration independently from Sites-specific plugins; retain the `DB` binding and Cloudflare compatibility flags. Confirm API route behavior and runtime secrets in staging.
5. Run D1 schema migrations before importing data. Restore into staging, confirm entity counts, all 44 categories, search/FTS, advisor continuity, PDF functions and authenticated imports.
6. Set `CATALOG_IMPORT_TOKEN` privately in both staging Worker and GitHub Actions. Set `CATALOG_SITE_ORIGIN` as the new staging HTTPS origin; re-run the workflow and verify `Publish reviewed records to D1` actually executes.
7. Bind the custom domain only **after** staging smoke tests pass. Keep the previous deployment available for rollback and preserve existing DNS records until requirements are checked.
8. Verify TLS, canonical redirects, website search, critical routes, category filtering and indexed record counts.

## Critical restrictions

Never put secrets or D1 exports in GitHub. GitHub Actions' cache does not constitute a backup. A green workflow run alone does not prove a D1 sync occurred. Do not delete the old site or change production DNS before the backup and staging migration have succeeded.
