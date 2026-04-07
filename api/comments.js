import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
  // Chỉ chấp nhận GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch dữ liệu comments từ Edge Config
    let comments = null;
    
    try {
      comments = await get('comments');
    } catch (e) {
      // Nếu Edge Config không có dữ liệu, trả về default
      console.log('Edge Config is not available or comments key not found:', e.message);
      comments = { comments: [] };
    }
    
    res.status(200).json({
      success: true,
      data: comments || { comments: [] },
    });
  } catch (error) {
    console.error('Error fetching comments from Edge Config:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
