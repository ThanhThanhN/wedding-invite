import { useState, useCallback } from 'react';

type RsvpData = {
  name: string;
  attend: 'yes' | 'no' | '';
  guests: string;
  side: 'groom' | 'bride' | '';
};

export function useRsvp() {
  const [rsvpData, setRsvpData] = useState<RsvpData>({
    name: '',
    attend: '',
    guests: '1',
    side: '',
  });
  const [rsvpSent, setRsvpSent] = useState(false);

  const updateRsvpData = useCallback((field: keyof RsvpData, value: unknown) => {
    setRsvpData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleRsvp = useCallback(async () => {
    const { name, attend, side } = rsvpData;

    if (!name.trim() || !attend || !side) return;

    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpData),
      });

      setRsvpSent(true);
    } catch (error) {
      console.error('Error sending RSVP:', error);
    }
  }, [rsvpData]);

  return {
    rsvpData,
    rsvpSent,
    updateRsvpData,
    handleRsvp,
  };
}
