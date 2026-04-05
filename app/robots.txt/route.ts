export async function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: https://insurequote.com/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
