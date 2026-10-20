import { categoryLabels, type Vendor } from './catalog';

export async function mapDirectoryPage(db: D1Database, cursor = '') {
  const position = /^\d+$/.test(cursor) ? Number(cursor) : 0;
  // Seek the table's rowid directly. Do not scan/sort every published record per page.
  const { results } = await db.prepare("SELECT rowid AS cursor_id,payload FROM directory_records NOT INDEXED WHERE rowid>? AND status IN ('approved','listed') ORDER BY rowid LIMIT 501").bind(Number.isSafeInteger(position) ? position : 0).all<{cursor_id:number;payload:string}>();
  const page = results.slice(0, 500);
  return { results:page.map(row=>JSON.parse(row.payload) as Vendor), category_labels:categoryLabels, next_cursor:results.length>500?String(page[page.length-1].cursor_id):null };
}
