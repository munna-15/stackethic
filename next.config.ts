import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },

  htmlLimitedBots:
    /Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview/i,
};

export default nextConfig;
