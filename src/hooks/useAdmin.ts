import { useState, useCallback, useEffect } from 'react';
import bannerImg from '../assets/banner.jpg';

const ADMIN_PASSWORD = 'wedding2026';
const DEFAULT_BANNER = bannerImg;

type WeddingData = {
  groomName: string;
  brideName: string;
  weddingDate: string;
  bannerImage: string | null;
};

// Convert "10/05/2026" → "2026-10-05T00:00"
function parseWeddingDate(dateStr: string): string {
  if (!dateStr) return '';
  
  // Nếu bereits là datetime-local format
  if (dateStr.includes('T')) return dateStr;
  
  // Convert từ "10/05/2026" sang "2026-10-05T00:00"
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00`;
  }
  
  return dateStr;
}

// Convert "2026-10-05T00:00" → "10/05/2026"
function formatWeddingDate(dateStr: string): string {
  if (!dateStr) return '';
  
  // Nếu already là dạng DD/MM/YYYY
  if (dateStr.includes('/')) return dateStr;
  
  const [datePart] = dateStr.split('T');
  const [year, month, day] = datePart.split('-');
  return `${day}/${month}/${year}`;
}

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPw, setAdminPw] = useState('');
  const [authError, setAuthError] = useState('');
  const [weddingData, setWeddingData] = useState<WeddingData>({
    groomName: 'Thanh Thành',
    brideName: 'Thu Nga',
    weddingDate: '2026-10-05T00:00',
    bannerImage: DEFAULT_BANNER,
  });

  // Load wedding data from Edge Config
  useEffect(() => {
    const loadWeddingData = async () => {
      try {
        const res = await fetch('/api/wedding');
        const data = await res.json();
        if (data.success && data.data) {
          // Convert weddingDate to datetime-local format
          setWeddingData({
            ...data.data,
            weddingDate: parseWeddingDate(data.data.weddingDate),
            bannerImage: data.data.bannerImage || DEFAULT_BANNER,
          });
        }
      } catch (error) {
        console.error('Error loading wedding data:', error);
      }
    };

    loadWeddingData();
  }, []);

  const handleLogin = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAuthError('');
      setAdminPw('');
      return true;
    } else {
      setAuthError('Sai mật khẩu.');
      return false;
    }
  }, []);

  const updateWeddingData = useCallback(
    async (updates: Partial<WeddingData>) => {
      // Convert weddingDate back to DD/MM/YYYY format khi save
      const dataToSave = {
        ...weddingData,
        ...updates,
        weddingDate: updates.weddingDate
          ? formatWeddingDate(updates.weddingDate)
          : weddingData.weddingDate,
      };

      setWeddingData({
        ...updates,
        weddingDate: updates.weddingDate || weddingData.weddingDate,
      } as WeddingData);

      // Save to Edge Config
      try {
        await fetch('/api/wedding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSave),
        });
      } catch (error) {
        console.error('Error saving wedding data:', error);
      }
    },
    [weddingData]
  );

  return {
    isAdmin,
    adminPw,
    setAdminPw,
    authError,
    handleLogin,
    weddingData,
    updateWeddingData,
  };
}
