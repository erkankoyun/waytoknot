# Way to Knot — US Wedding Planning

English-language US wedding vendor search, a five-step wedding planning guide, PDF plans, a vendor map and a seating planner. The existing visual design and the rose favicon supplied by the owner are preserved.

## Features

- `/api/search`: searches 53 reviewed US business records across a 44-category taxonomy using English and Turkish phrases, conservative typo correction, prefix suggestions, city/category filters and pagination. Nearby queries use a configurable 1–100 mile radius around approximate city or service-area centers; additional coverage is concentrated in New York’s Capital Region. Records in `lib/vendors.json` include official source URLs and review dates. Coverage is limited to this directory; it does not search the whole web. No prices, ratings or live availability are invented.
- `/api/advisor`: collects a US city, guest count, USD budget, style and priorities. Profiles are stored in D1 for 30 days and protected by random 256-bit session tokens. Supports contact details, resume, reset, follow-up questions and PDF downloads.
- PDF: English budget breakdown and personal next steps, with Unicode support for the brand and visitor names.
- Advisor: a clearly labeled planning guide by default. When the optional AI credentials are configured, AI SDK provides model responses in English by default. AI failures return an explicit error.
- Email: saving a profile does not send email. Delivery is available only after Resend and a verified sender are configured, and only when a visitor clicks the email button for their own saved address. Otherwise, a PDF download is offered.
- Map: approximate city locations, official websites and directions. Exact business addresses should be confirmed with vendors.
- Seating: English controls, sample guests, warnings and printable output; `stage` and `aisle` preferences are supported.

## Development

Requires Node.js 22.13+ and pnpm. Run `pnpm install`, `pnpm test`, `pnpm exec tsc --noEmit`, and `pnpm build`.

Static pages and assets are in `public/`, API routes in `app/api/`, business logic in `lib/`, the D1 schema in `db/schema.ts`, and versioned migrations in `drizzle/`. Keep the D1 binding named `DB`. Sites applies migrations during publication. Build output, dependencies, local runtime state and real environment files must not be added to the repository.

## Optional service configuration

`.env.example` contains names only. Configure actual values as secrets in the Sites runtime. Never put credentials in browser code or GitHub.

| Variable | Purpose |
| --- | --- |
| `AI_GATEWAY_API_KEY` | AI Gateway access key |
| `AI_MODEL` | A `provider/model` identifier available in the Gateway model catalog |
| `RESEND_API_KEY` | Restricted key for transactional email delivery |
| `EMAIL_FROM` | Sender address on an owner-verified domain |

AI Gateway model catalog: https://ai-gateway.vercel.sh/v1/models

Resend API reference: https://resend.com/docs/api-reference/emails/send-email

The original site's private server code and crawled vendor index were not included in the supplied archive. Migrating that coverage requires a source/database export or documented API access from its owner. This independent implementation uses the starter US directory described above. Real AI and email credentials are not configured in this version.

The reference-style English navigation includes a standalone wedding information guide and real footer destinations. The centered script wordmark is Way to Knot; the owner-supplied rose favicon is preserved.

## Brand and domain

Official brand: **Way to Knot**. Primary domain: https://waytoknot.com. The site runs on ChatGPT Sites with the existing D1 database. This GitHub repository is a source copy; GitHub pushes do not automatically deploy to Sites.

Search records show source URLs and review dates. “Near me” requires a city; device geolocation is not collected. Empty results offer explicit alternative queries and a labeled external Google Maps link. The index is maintained in `lib/vendors.json`; neither continuous web crawling nor automatic discovery is enabled. Prices, ratings and availability are not indexed.


## Large directory and ingestion

The public category selector contains 44 wedding-related service types, grouped by purpose. Categories with no listings are labeled honestly. The current reviewed seed contains 53 real businesses; the goal of 100,000 records is not a completed crawl.

D1 stores reviewed businesses and private candidates separately. FTS5 powers paginated search, with source URLs, dates, category/city filters and approximate nearby matching. An authenticated `/api/catalog/import` endpoint accepts batches of up to 50. `/api/catalog/status` exposes counts, not private candidate records. Only reviewed records appear publicly. Do not store bulk datasets, queue databases or credentials in GitHub.

See `scripts/catalog/README.md` for discovery, resumable crawling, deduplication and controlled publication. Store `CATALOG_IMPORT_TOKEN` as a secret in the Sites runtime. Existing advisor data stays in its own tables.
