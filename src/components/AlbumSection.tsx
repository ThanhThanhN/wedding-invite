import { useState } from 'react';

type Photo = {
  id: string;
  title: string;
  src: string;
  uploadedAt: string;
};

type AlbumSectionProps = {
  photos: Photo[];
  isAdmin: boolean;
  onRemovePhoto: (id: string) => void;
};

export function AlbumSection({
  photos,
  isAdmin,
  onRemovePhoto,
}: AlbumSectionProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <>
      <section className="section album-section">
        <h2 className="section-title script">Album Cưới</h2>
        <p className="section-sub">Những khoảnh khắc đáng nhớ của chúng mình</p>
        <div className="album-grid">
          {photos.map((p, i) => (
            <button
              key={p.id}
              className="album-thumb"
              type="button"
              onClick={() => setLightboxIdx(i)}
            >
              <img src={p.src} alt={p.title} loading="lazy" />
              {isAdmin && (
                <span
                  className="remove-badge"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePhoto(p.id);
                  }}
                >
                  ✕
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {lightboxIdx !== null && photos[lightboxIdx] && (
        <div className="lightbox" onClick={() => setLightboxIdx(null)}>
          <button className="lb-close" onClick={() => setLightboxIdx(null)}>
            ✕
          </button>
          <button
            className="lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((i) =>
                i !== null && i > 0 ? i - 1 : photos.length - 1
              );
            }}
          >
            ‹
          </button>
          <img
            src={photos[lightboxIdx].src}
            alt={photos[lightboxIdx].title}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lb-next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((i) =>
                i !== null && i < photos.length - 1 ? i + 1 : 0
              );
            }}
          >
            ›
          </button>
          <p className="lb-title" onClick={(e) => e.stopPropagation()}>
            {photos[lightboxIdx].title}
          </p>
        </div>
      )}
    </>
  );
}
