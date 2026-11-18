import { DurableObject } from "cloudflare:workers";

export class ContactRateLimiter extends DurableObject {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
      });
    }

    const now = Date.now();
    const windowMs = 24 * 60 * 60 * 1000;

    const result = await this.ctx.storage.transaction(async (txn) => {
      const timestamps = (await txn.get<number[]>("timestamps")) ?? [];

      const recent = timestamps.filter(
        (timestamp) => now - timestamp < windowMs,
      );

      if (recent.length >= 2) {
        return {
          allowed: false,
          retryAfter: Math.ceil((recent[0] + windowMs - now) / 1000),
        };
      }

      recent.push(now);

      await txn.put("timestamps", recent);

      return {
        allowed: true,
        retryAfter: 0,
      };
    });

    return Response.json(result);
  }
}
