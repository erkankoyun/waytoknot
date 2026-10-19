# Business discovery and review

This is an ingestion pipeline, not a claim that 100,000 sites have been checked. Discovery records are candidates. The default import keeps unreviewed candidates private; explicit owner-authorized publication labels them as unverified.

## Open-data discovery

Install optional extraction dependencies with `python -m pip install -r scripts/catalog/requirements.txt`. Then run:

```bash
python scripts/catalog/discover_overture.py --limit 100000 --output .catalog-work/overture-candidates.jsonl
python scripts/catalog/pipeline.py ingest .catalog-work/overture-candidates.jsonl
python scripts/catalog/pipeline.py status
```

The default bounding box covers the contiguous United States; use `--bbox=west,south,east,north` for other regions, including Alaska/Hawaii. The country filter remains US. The release is read from Overture STAC. Source category, GERS identifier and upstream source attribution are retained. Missing websites, missing localities, unsupported categories and social-only pages are excluded. Deduplication uses normalized website, business name, city/state and branch address. A chain with multiple genuine branches is not assumed to have a unique website for every branch.

Official references:

- https://docs.overturemaps.org/getting-data/cloud-sources/
- https://docs.overturemaps.org/guides/places/
- https://docs.overturemaps.org/attribution/

## Review and resume

```bash
python scripts/catalog/pipeline.py crawl --limit 1000 --workers 4
python scripts/catalog/pipeline.py status
python scripts/catalog/pipeline.py export .catalog-work/reviewed.jsonl
```

SQLite checkpoints survive process interruption. Runs use 1–8 workers, never review a domain concurrently, check robots.txt, bound page sizes and timeouts, reject private destinations and flag cross-domain redirects for review. A successful HTML response must also match the business name. Parked sites and uncertain results stay out of search. This does not prove every listed business accepts weddings or has current availability. Visitors must confirm services directly.

Do not overwrite a reviewed record with an unreviewed candidate. DNS, robot restrictions and rate limits can prevent automatic checks; uncertain records require review. A Firecrawl connection can provide an alternative crawl service, but suggesting that connection does not activate it or authorize an unbounded paid run.

## Publication

Set `CATALOG_IMPORT_TOKEN` only in the process environment and as a Sites runtime secret. Never put it in source, command arguments, logs or browser code.

```bash
python scripts/catalog/pipeline.py sync https://gelin-cicegi.mighty-chair-7509.chatgpt.site
```

Default sync sends reviewed records only. Use `--include-pending` to stage unreviewed candidates in private database rows; they remain excluded from public search. Up to 50 records are sent atomically per batch. Re-running safely deduplicates committed batches. Import failures stop the run.

The existing `lib/vendors.json` seed was manually researched from official business pages. If importing this reviewed seed, convert it to JSONL and explicitly use `ingest ... --reviewed-seed`; never use that flag for newly discovered data. `reviewed` and `website-fetched` are distinct provenance states.

The category taxonomy lives in `public/assets/wedding-categories.json`. Add category mappings deliberately, not by treating every clothing shop as a tuxedo specialist or every camera shop as a wedding photographer.

Check crawl totals with the queue status command and public import totals at `/api/catalog/status`. Local test coverage includes a separate in-memory set of 100,000 **synthetic test records**, which must never be imported into production.

Explicit owner-authorized candidate publication: `python scripts/catalog/pipeline.py sync https://SITE-ORIGIN --publish-unverified`. These rows use `listed` status and show “Website not yet verified”; no review date or verification is invented. Default sync still stages candidates privately.

## 2026-10-19 category expansion

`data/2026-10-19-category-expansion.jsonl` contains 880 additional US business listings: 20 in each of the 44 categories, deduplicated against the existing 969 listings. Official business pages and official supplier stockist/location pages are recorded as source URLs. Some records are separate branches of the same brand. City coordinates approximate a city or advertised service area, not an exact storefront. No full-site verification or wedding availability is claimed; all entries retain an empty review date and an unverified publication flag. `data/2026-10-19-coverage-report.json` records the production category counts after import.
