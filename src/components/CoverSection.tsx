import '../App.css';
import { RotatingDisc } from './RotatingDisc';

type CoverSectionProps = {
  bannerImage: string | null;
  groomName: string;
  brideName: string;
  weddingDate: string;
};

export function CoverSection({
  bannerImage,
  groomName,
  brideName,
  weddingDate,
}: CoverSectionProps) {
  const weddingDateObj = new Date(weddingDate);
  const dateStr = `${weddingDateObj.getDate()}.${weddingDateObj.getMonth() + 1}.${weddingDateObj.getFullYear()}`;

  return (
    <section className="section cover-section">
      <div className="cover-photo">
        {bannerImage && (
          <img src={bannerImage} alt="Ảnh cưới" className="cover-img" />
        )}
        <div className="cover-overlay" />
        <div className="cover-content">
          <p className="cover-label script">Lễ Thành Hôn</p>
          <h1 className="cover-names">
            <span className="script">{groomName}</span>
            <RotatingDisc />
            <span className="script">{brideName}</span>
          </h1>
          <div className="cover-divider" />
          <p className="cover-date">{dateStr}</p>
        </div>
      </div>
    </section>
  );
}
