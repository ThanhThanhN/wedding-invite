type EventsSectionProps = {
  weddingDate: string;
};

export function EventsSection({ weddingDate }: EventsSectionProps) {
  const weddingDateObj = new Date(weddingDate);
  const dateStr = `${weddingDateObj.getDate()}.${weddingDateObj.getMonth() + 1}.${weddingDateObj.getFullYear()}`;
  const timeStr = weddingDateObj.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section className="section events-section">
      <h2 className="section-title script">Sự Kiện Cưới</h2>
      <div className="events-grid">
        <div className="event-card">
          <h4>TIỆC CƯỚI NHÀ TRAI</h4>
          <p className="event-time-label">CHỦ NHẬT &mdash; {timeStr}</p>
          <p className="event-date-big">{dateStr}</p>
          <p className="event-venue">TẠI TƯ GIA NHÀ TRAI</p>
          <p className="event-addr">Thôn X, Xã Y, Huyện Z</p>
        </div>
        <div className="event-card">
          <h4>TIỆC CƯỚI NHÀ GÁI</h4>
          <p className="event-time-label">THỨ BẢY &mdash; 18:00</p>
          <p className="event-date-big">19.12.2026</p>
          <p className="event-venue">TẠI NHÀ HÀNG SEN VÀNG</p>
          <p className="event-addr">Số 1, Đường E, Quận F</p>
        </div>
      </div>
    </section>
  );
}
