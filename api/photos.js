import { get, set } from '@vercel/edge-config';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let photos = await get('photos');
      res.status(200).json({
        success: true,
        data: { photos: photos || [] },
      });
    } catch (error) {
      res.status(200).json({
        success: true,
        data: { photos: [] },
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { photos } = req.body;
      await set('photos', photos);
      res.status(200).json({
        success: true,
        message: 'Photos saved',
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
