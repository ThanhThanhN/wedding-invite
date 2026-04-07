import { get, set } from '@vercel/edge-config';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let wishes = await get('wishes');
      res.status(200).json({
        success: true,
        data: { wishes: wishes || [] },
      });
    } catch (error) {
      res.status(200).json({
        success: true,
        data: { wishes: [] },
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { wishes } = req.body;
      await set('wishes', wishes);
      res.status(200).json({
        success: true,
        message: 'Wishes saved',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
