import { CalendarGrid } from './CalendarGrid';
import nhacohyBanner from '../assets/nhacohybanner.jpg';

export function NhaCoHySection({ groomName, brideName }: { groomName: string; brideName: string }) {
  return (
    <section className="section nha-co-hy" style={{
      backgroundImage: `url(${nhacohyBanner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "scroll",
      backgroundRepeat: "no-repeat",
      minHeight: "800px",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      alignItems: "center",
    }}>
      <div className="hy-deco">♥</div>
      <h2 className="hy-title script">Nhà Có Hỷ</h2>
      <p className="hy-sub">Trân trọng báo tin lễ thành hôn của</p>
      <div className="couple-names-block">
        <h3 className="script groom-n">{groomName}</h3>
        <span className="amp-fancy">&amp;</span>
        <h3 className="script bride-n">{brideName}</h3>
      </div>
    </section>
  );
}

export function QuoteSection() {
  return (
    <section className="section quote-section">
      <div className="quote-box">
        <span className="quote-mark">&ldquo;</span>
        <p>
          Chúng mình sắp bắt đầu một hành trình mới cùng nhau.
          <br />
          Niềm vui này sẽ trọn vẹn hơn khi có bạn bên cạnh.
          <br />
          Vì vậy, chúng mình mong được bạn chung vui trong ngày hạnh phúc này.
        </p>
        <span className="quote-mark">&rdquo;</span>
      </div>
    </section>
  );
}

export function CalendarSection({ weddingDate }: { weddingDate: string }) {
  return (
    <section className="section calendar-section">
      <CalendarGrid weddingDate={weddingDate} />
    </section>
  );
}
