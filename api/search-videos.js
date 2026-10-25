import { handleSearchVideos } from '../apiMiddleware.js';

export default function handler(req, res) {
  const query = req.query?.query || '';
  const result = handleSearchVideos(query);
  return res.status(result.status || 200).json(result.data || { error: result.error });
}
