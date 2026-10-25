import { handleGenerateMeme } from '../apiMiddleware.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const result = handleGenerateMeme(req.body);
  return res.status(result.status || 200).json(result.data || { error: result.error });
}
