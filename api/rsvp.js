import { get, set } from '@vercel/edge-config';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const rsvpData = req.body;
      let rsvpList = await get('rsvps');
      
      if (!Array.isArray(rsvpList)) {
        rsvpList = [];
      }

      rsvpList.push({
        ...rsvpData,
        submittedAt: new Date().toISOString(),
      });

      await set('rsvps', rsvpList);

      res.status(200).json({
        success: true,
        message: 'RSVP saved',
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
