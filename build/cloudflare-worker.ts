// Standalone Worker, without ChatGPT Sites connector/runtime dependencies.
import handler from "vinext/server/fetch-handler";
import {enrichDirectoryBatch} from "../lib/catalog-enrichment";

export default {
  async scheduled(_controller:ScheduledController, env:Cloudflare.Env) {
    if(env.DB)await enrichDirectoryBatch(env.DB);
  },
  fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext) {
    return handler.fetch(request, env, ctx);
  },
};
