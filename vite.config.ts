import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import { handleGenerateMeme, handleSearchVideos } from './apiMiddleware.js'

function studyBuddyApiPlugin(): Plugin {
  return {
    name: 'studybuddy-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '', `http://${req.headers.host || '127.0.0.1'}`);
        
        if (url.pathname === '/api/health') {
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ status: 'ok', service: 'StudyBuddy AI Embedded Backend' }));
        }

        if (url.pathname === '/api/generate-meme-image' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', chunk => { bodyStr += chunk; });
          req.on('end', () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const result = handleGenerateMeme(body);
              res.statusCode = result.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result.data || { error: result.error }));
            } catch (e: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: e.message }));
            }
          });
          return;
        }

        if (url.pathname === '/api/search-videos' && req.method === 'GET') {
          const query = url.searchParams.get('query') || '';
          const result = handleSearchVideos(query);
          res.statusCode = result.status;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify(result.data || { error: result.error }));
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), studyBuddyApiPlugin()],
})
