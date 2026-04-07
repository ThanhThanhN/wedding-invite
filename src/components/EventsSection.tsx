type EventsSectionProps = {
  weddingDate: string;
};

import sukienBanner from "../assets/sukien.jpg";
import address1Banner from "../assets/adress1.jpg";
import address2Banner from "../assets/adress2.jpg";

export function EventsSection({ weddingDate }: EventsSectionProps) {
  const weddingDateObj = new Date(weddingDate);
  const dateStr = `${weddingDateObj.getDate()}.${weddingDateObj.getMonth() + 1}.${weddingDateObj.getFullYear()}`;
  const timeStr = weddingDateObj.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section
      className="section events-section"
      style={{
        backgroundImage: `url(${sukienBanner})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="section-title script">Sự Kiện Cưới</h2>
      <div className="events-grid">
        <div
          className="event-card"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${address1Banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
            minHeight: "700px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "3px solid #8B6F47",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h4>TIỆC CƯỚI NHÀ TRAI</h4>
          <p className="event-time-label">CHỦ NHẬT &mdash; {timeStr}</p>
          <p className="event-date-big">{dateStr}</p>
          <p className="event-venue">TẠI TƯ GIA NHÀ TRAI</p>
          <p className="event-addr">
            Cầu Ràm, Thôn Do Nghĩa, Xã Vĩnh Lại, Tỉnh Hải Phòng
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <iframe
              title="Nhà trai - Cầu Ràm, Hải Phòng"
              src="https://www.google.com/maps?q=Cầu+Ràm,+Hải+Phòng&output=embed"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "12px", marginTop: "8px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div
          className="event-card"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${address2Banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
            minHeight: "700px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "3px solid #8B6F47",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h4>TIỆC CƯỚI NHÀ GÁI</h4>
          <p className="event-time-label">THỨ BẢY &mdash; 18:00</p>
          <p className="event-date-big">19.12.2026</p>
          <p className="event-venue">TẠI TƯ GIA NHÀ GÁI</p>
          <p className="event-addr">La Cả, Ỷ La, Dương Nội, Hà Đông, Hà Nội</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <iframe
              title="Nhà gái - Ao Đình làng La Cả"
              src="https://www.google.com/maps?q=Ao+Đình+làng+La+Cả&output=embed"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "12px", marginTop: "8px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
