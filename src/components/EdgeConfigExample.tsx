/**
 * Ví dụ về cách sử dụng Vercel Edge Config trong React component
 * 
 * 1. Đầu tiên, tạo một giá trị trong Vercel Edge Config dashboard
 * 
 * 2. Sau đó sử dụng hook useEdgeConfig:
 */

import { useEdgeConfig } from '../utils/useEdgeConfig';

export function EdgeConfigExample() {
  // Ví dụ: Lấy giá trị "greeting" từ Edge Config
  const { value: greeting, isLoading, error } = useEdgeConfig('greeting');

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <h2>Lời chào từ Edge Config:</h2>
      <p>{greeting || 'Không có dữ liệu'}</p>
    </div>
  );
}

/**
 * HƯỚNG DẪN TỪ VERCEL:
 * 
 * 1. ✅ Đã cài Edge Config package: npm install @vercel/edge-config
 * 
 * 2. ✅ Tạo các utility files để sử dụng Edge Config
 *    - src/utils/edgeConfig.ts
 *    - src/utils/useEdgeConfig.ts
 * 
 * 3. ⏳ Bước tiếp theo:
 *    - Vào Vercel Dashboard > Project > Storage > Edge Config
 *    - Tạo key-value pairs (ví dụ: greeting = "Hello World")
 *    - Copy EDGE_CONFIG_ID
 *    - Lưu vào .env.local hoặc biến môi trường Vercel:
 *      VITE_EDGE_CONFIG_ID=your_edge_config_id
 *      VITE_EDGE_CONFIG_TOKEN=your_token
 * 
 * 4. Sử dụng trong components:
 *    const { value, isLoading, error } = useEdgeConfig('your-key');
 * 
 * 5. Deploy lại và test trên production
 */
