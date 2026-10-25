export default function handler(req, res) {
  res.status(200).json({ 
    status: 'ok', 
    service: 'StudyBuddy AI Vercel Serverless Backend', 
    timestamp: new Date().toISOString() 
  });
}
