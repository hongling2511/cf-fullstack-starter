import { Router } from 'itty-router';

const router = Router();

router.get('/api/hello', () => {
  return new Response(JSON.stringify({
    message: 'Hello from Cloudflare Workers!',
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
});

export default router; 