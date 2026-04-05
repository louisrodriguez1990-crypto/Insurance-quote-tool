export async function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: https://bestquote.io/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
