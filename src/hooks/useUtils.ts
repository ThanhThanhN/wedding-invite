import { useState, useEffect, useMemo } from 'react';

export function useCountdown(weddingDate: string) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    const ms = new Date(weddingDate).getTime() - now;
    if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const s = Math.floor(ms / 1000);
    return {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    };
  }, [weddingDate, now]);

  return countdown;
}

export function useFileToDataUrl() {
  return async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Cannot read file'));
      reader.readAsDataURL(file);
    });
  };
}
