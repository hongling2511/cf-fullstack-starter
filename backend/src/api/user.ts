export const handleUser = async (req: Request, env: Env) => {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  const result = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
};
