import { useEffect, useState } from 'react';
import { getEdgeConfigValue } from './edgeConfig';

/**
 * Hook để lấy dữ liệu từ Vercel Edge Config
 * @param key - Key của dữ liệu cần lấy
 * @returns {value, isLoading, error} - Giá trị, trạng thái loading, và lỗi (nếu có)
 */
export function useEdgeConfig(key: string) {
  const [value, setValue] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchValue = async () => {
      try {
        setIsLoading(true);
        const result = await getEdgeConfigValue(key);
        setValue(result);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setValue(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (key) {
      fetchValue();
    }
  }, [key]);

  return { value, isLoading, error };
}
