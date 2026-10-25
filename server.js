import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { handleGenerateMeme, handleSearchVideos } from './apiMiddleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'StudyBuddy AI Production Server', 
    timestamp: new Date().toISOString() 
  });
});

// Meme image generation endpoint
app.post('/api/generate-meme-image', (req, res) => {
  const result = handleGenerateMeme(req.body);
  res.status(result.status).json(result.data || { error: result.error });
});

// Topic video search endpoint
app.get('/api/search-videos', (req, res) => {
  const query = req.query.query || '';
  const result = handleSearchVideos(query);
  res.status(result.status).json(result.data || { error: result.error });
});

// Serve frontend static build if dist exists
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`StudyBuddy AI Production server running on http://localhost:${PORT}`);
});
