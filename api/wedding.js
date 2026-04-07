import { get, set } from '@vercel/edge-config';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Lấy từng field riêng từ Edge Config
      const groomName = await get('groomName');
      const brideName = await get('brideName');
      const weddingDate = await get('weddingDate');
      const bannerImage = await get('bannerImage');

      res.status(200).json({
        success: true,
        data: {
          groomName: groomName || 'Thanh Thành',
          brideName: brideName || 'Thu Nga',
          weddingDate: weddingDate || '2026-12-20T09:30',
          bannerImage: bannerImage || null,
        },
      });
    } catch (error) {
      res.status(200).json({
        success: true,
        data: {
          groomName: 'Thanh Thành',
          brideName: 'Thu Nga',
          weddingDate: '2026-12-20T09:30',
          bannerImage: null,
        },
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { groomName, brideName, weddingDate, bannerImage } = req.body;
      
      // Lưu từng field riêng to Edge Config
      if (groomName) await set('groomName', groomName);
      if (brideName) await set('brideName', brideName);
      if (weddingDate) await set('weddingDate', weddingDate);
      if (bannerImage !== undefined) await set('bannerImage', bannerImage);
      res.status(200).json({
        success: true,
        message: 'Wedding data saved',
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
