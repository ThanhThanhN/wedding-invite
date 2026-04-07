import { useRef, useState, useEffect } from 'react';
import musicFile from '../assets/music.mp3';
import './RotatingDisc.css';

const AUDIO_SRC = musicFile;

export function RotatingDisc() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Autoplay muted to keep disc rotating
    audio.muted = true;
    audio.play().catch(() => {
      // Ignore - autoplay muted often fails but that's ok
    });

    // Listen to audio events to sync state
    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      // Loop will auto-restart, just make sure we're still "playing"
      setIsPlaying(true);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Unmute and play on user click
      audio.muted = false;
      audio.play().catch((err) => {
        console.log('Play failed:', err);
      }).then(() => {
        setIsPlaying(true);
      });
    }
  };

  return (
    <>
      <button 
        className={`rotating-disc ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title={isPlaying ? 'Tắt nhạc' : 'Phát nhạc'}
      >
        <span className="disc-icon" aria-hidden="true" />
      </button>

      <audio
        ref={audioRef}
        autoPlay
        muted
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={AUDIO_SRC} type="audio/mpeg" />
      </audio>
    </>
  );
}
