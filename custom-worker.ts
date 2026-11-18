// @ts-expect-error -- OpenNext generates this file during the build

import { default as handler } from "./.open-next/worker.js";

export { ContactRateLimiter } from "./src/lib/ContactRateLimiter";

export default {
  fetch: handler.fetch,
} satisfies ExportedHandler<CloudflareEnv>;
