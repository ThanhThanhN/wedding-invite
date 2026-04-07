import { useState, useCallback, useEffect, useMemo } from 'react';
import { useEdgeConfig } from '../utils/useEdgeConfig';

type Wish = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
};

export function useWishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  // Load wishes từ Edge Config
  const { value: edgeConfigData, isLoading: isLoadingEdge } = useEdgeConfig('comments');

  // Transform comments từ Edge Config
  const edgeWishes = useMemo(() => {
    if (!edgeConfigData?.comments || !Array.isArray(edgeConfigData.comments)) {
      return [];
    }
    return edgeConfigData.comments
      .map((comment: Record<string, string>, index: number) => {
        const [author, message] = Object.entries(comment)[0] || [];
        return author && message
          ? {
              id: `edge_${index}`,
              author,
              message,
              createdAt: new Date(0).toISOString(),
            }
          : null;
      })
      .filter(Boolean) as Wish[];
  }, [edgeConfigData]);

  // Load stored wishes
  useEffect(() => {
    const loadWishes = async () => {
      try {
        const res = await fetch('/api/wishes');
        const data = await res.json();
        if (data.success && data.data?.wishes) {
          setWishes(data.data.wishes);
        }
      } catch (error) {
        console.error('Error loading wishes:', error);
      }
    };

    loadWishes();
  }, []);

  const allWishes = useMemo(
    () => [...wishes, ...edgeWishes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    [wishes, edgeWishes]
  );

  const addWish = useCallback(async () => {
    const trimmedAuthor = author.trim();
    const trimmedMessage = message.trim();

    if (!trimmedAuthor || !trimmedMessage) return;

    const newWish = {
      id: `wish_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      author: trimmedAuthor,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    setAuthor('');
    setMessage('');

    // Save to Edge Config
    try {
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wishes: updatedWishes }),
      });
    } catch (error) {
      console.error('Error saving wish:', error);
    }
  }, [author, message, wishes]);

  return {
    allWishes,
    isLoading: isLoadingEdge,
    author,
    setAuthor,
    message,
    setMessage,
    addWish,
  };
}
