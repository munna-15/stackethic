

import { default as handler } from "./.open-next/worker.js";

export { ContactRateLimiter } from "./src/lib/ContactRateLimiter";

export default {
  fetch: handler.fetch,
} satisfies ExportedHandler<CloudflareEnv>;
