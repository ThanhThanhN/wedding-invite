// Utility để làm việc với Vercel Edge Config
// Điều này cho phép bạn fetch dữ liệu từ Edge Config thông qua serverless function

/**
 * Lấy giá trị từ Edge Config thông qua API endpoint
 * @param key - Key của dữ liệu cần lấy (ví dụ: 'comments')
 * @returns Giá trị từ Edge Config hoặc null nếu không tìm thấy
 */
export async function getEdgeConfigValue(key: string): Promise<unknown> {
  try {
    // Gọi API endpoint của Vercel để lấy dữ liệu từ Edge Config
    const response = await fetch('/api/' + key);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch from Edge Config: ${response.statusText}`,
      );
    }

    const data = await response.json();
    
    // Nếu API trả về { success: true, data: {...} }
    if (data.success && data.data) {
      return data.data;
    }
    
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ Edge Config:', error);
    return null;
  }
}

/**
 * Hook để sử dụng Edge Config trong React components
 */
export { useEdgeConfig } from "./useEdgeConfig";
