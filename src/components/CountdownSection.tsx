type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

import countBanner from '../assets/count.jpg';

type CountdownSectionProps = {
  countdown: Countdown;
  groomName: string;
  brideName: string;
};

export function CountdownSection({
  countdown,
  groomName,
  brideName,
}: CountdownSectionProps) {
  return (
    <section className="section countdown-section" style={{
      backgroundImage: `url(${countBanner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "scroll",
      backgroundRepeat: "no-repeat",
      minHeight: "600px",
    }}>
      <p className="cd-label script">Save The Date</p>
      <h2 className="cd-names script">
        {groomName} &amp; {brideName}
      </h2>
      <div className="cd-grid">
        <div className="cd-item">
          <strong>{countdown.days}</strong>
          <span>Ngày</span>
        </div>
        <div className="cd-item">
          <strong>{countdown.hours}</strong>
          <span>Giờ</span>
        </div>
        <div className="cd-item">
          <strong>{countdown.minutes}</strong>
          <span>Phút</span>
        </div>
        <div className="cd-item">
          <strong>{countdown.seconds}</strong>
          <span>Giây</span>
        </div>
      </div>
    </section>
  );
}
