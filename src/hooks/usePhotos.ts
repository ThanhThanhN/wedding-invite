import { useState, useCallback, useEffect } from 'react';

type Photo = {
  id: string;
  title: string;
  src: string;
  uploadedAt: string;
};

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load photos từ Edge Config
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const res = await fetch('/api/photos');
        const data = await res.json();
        if (data.success && data.data?.photos) {
          setPhotos(data.data.photos);
        }
      } catch (error) {
        console.error('Error loading photos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const addPhoto = useCallback(async (photo: Omit<Photo, 'id'>) => {
    const newPhoto = {
      ...photo,
      id: `photo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    };

    const updatedPhotos = [newPhoto, ...photos];
    setPhotos(updatedPhotos);

    // Save to Edge Config
    try {
      await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: updatedPhotos }),
      });
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  }, [photos]);

  const removePhoto = useCallback(async (id: string) => {
    const updatedPhotos = photos.filter(p => p.id !== id);
    setPhotos(updatedPhotos);

    // Save to Edge Config
    try {
      await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: updatedPhotos }),
      });
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  }, [photos]);

  return { photos, isLoading, addPhoto, removePhoto };
}
