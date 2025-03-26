import { Router } from 'itty-router';
import { handleHello } from './api/hello';
import { handleUser } from './api/user';

const router = Router();

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle CORS preflight requests
router.options('*', () => {
  return new Response(null, {
    headers: corsHeaders,
  });
});

router.get('/api/hello', handleHello);
router.get('/api/user/:id', handleUser);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    try {
      const response = await router.handle(request);
      if (!response) {
        return new Response('Not Found', { status: 404 });
      }
      
      // Add CORS headers to all responses
      const newResponse = new Response(response.body, response);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        newResponse.headers.set(key, value);
      });
      
      return newResponse;
    } catch (error) {
      return new Response('Internal Server Error', { 
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};

export interface Env {
  DB: D1Database;
}
