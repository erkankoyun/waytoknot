import { searchVendors } from "@/lib/catalog";
export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const q = (params.get("q") || "").slice(0, 200);
  return Response.json(searchVendors(q, (params.get("category") || "").slice(0,40), (params.get("city") || "").slice(0,80), Number(params.get("page") || 1), Number(params.get("radius") || 0), params.get("suggest") === "1"), { headers: { "Cache-Control": "public, max-age=60" } });
}
