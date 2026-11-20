// lib/image-loader.ts
export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `/cdn-cgi/image/width=${width},quality=${quality || 75},format=auto${src}`;
}
