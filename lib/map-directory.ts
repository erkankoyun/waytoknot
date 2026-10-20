import { categoryLabels, type Vendor } from './catalog';

export async function mapDirectoryPage(db: D1Database, cursor = '') {
  const { results } = await db.prepare("SELECT id,payload FROM directory_records WHERE status IN ('approved','listed') AND id>? ORDER BY id LIMIT 501").bind(cursor).all<{id:string;payload:string}>();
  const page = results.slice(0, 500);
  return { results:page.map(row=>JSON.parse(row.payload) as Vendor), category_labels:categoryLabels, next_cursor:results.length>500?page[page.length-1].id:null };
}
