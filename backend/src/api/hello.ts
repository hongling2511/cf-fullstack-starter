export async function handleHello() {
  return new Response(
    JSON.stringify({
      message: 'Hello from Cloudflare Workers!',
      timestamp: new Date().toISOString()
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
