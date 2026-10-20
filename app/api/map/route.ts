import { env } from 'cloudflare:workers';
import { mapDirectoryPage } from '@/lib/map-directory';

// Keyset pagination avoids the search endpoint's expensive counts and OFFSET scans.
// This endpoint always uses the live D1 directory; it never substitutes seed records.
export async function GET(request: Request) {
  const cursor = (new URL(request.url).searchParams.get('cursor') || '').slice(0, 1000);
  const db = (env as { DB?: D1Database }).DB;
  if (!db) return Response.json({ error: 'The live directory is not connected.' }, { status: 503 });
  try {
    return Response.json(await mapDirectoryPage(db, cursor), { headers: {'Cache-Control':'public, max-age=60'} });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    const reason = /limit|quota|exceed/i.test(message) ? 'database_limit' : /JSON|Unexpected token|position/i.test(message) ? 'invalid_record' : 'database_unavailable';
    console.error('Vendor map directory failed:', message);
    return Response.json({ error:'Live vendor data is temporarily unavailable. Please retry.', reason }, {status:503,headers:{'Cache-Control':'no-store'}});
  }
}
