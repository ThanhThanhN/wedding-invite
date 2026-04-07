import { useState } from 'react';
import './RotatingDisc.css';

const EMBED_SRC =
  'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/asksock/beo-dat-may-troi-thuy-chi-ost-nguoi-vo-cuoi-cung&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false';

export function RotatingDisc() {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMusic = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
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

      {isPlaying && (
        <iframe
          title="SoundCloud wedding music"
          src={EMBED_SRC}
          width="320"
          height="120"
          allow="autoplay; encrypted-media"
          loading="eager"
          style={{
            position: 'fixed',
            left: '-9999px',
            bottom: 0,
            opacity: 0,
            pointerEvents: 'none',
            border: 0,
          }}
        />
      )}
    </>
  );
}
