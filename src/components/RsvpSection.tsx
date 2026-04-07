import type { FormEvent } from 'react';

type RsvpData = {
  name: string;
  attend: 'yes' | 'no' | '';
  guests: string;
  side: 'groom' | 'bride' | '';
};

type RsvpSectionProps = {
  rsvpData: RsvpData;
  rsvpSent: boolean;
  onUpdateRsvp: (field: keyof RsvpData, value: unknown) => void;
  onHandleRsvp: (e: FormEvent) => void;
};

export function RsvpSection({
  rsvpData,
  rsvpSent,
  onUpdateRsvp,
  onHandleRsvp,
}: RsvpSectionProps) {
  return (
    <section className="section rsvp-section">
      <h2 className="section-title script">Xác Nhận Tham Dự</h2>
      {rsvpSent ? (
        <div className="rsvp-thanks">
          <p>Cảm ơn bạn đã xác nhận! ♥</p>
        </div>
      ) : (
        <form className="rsvp-form" onSubmit={onHandleRsvp}>
          <input
            type="text"
            placeholder="Họ và tên"
            value={rsvpData.name}
            onChange={(e) => onUpdateRsvp('name', e.target.value)}
          />
          <div className="rsvp-options">
            <label className={rsvpData.attend === 'yes' ? 'active' : ''}>
              <input
                type="radio"
                name="attend"
                value="yes"
                checked={rsvpData.attend === 'yes'}
                onChange={() => onUpdateRsvp('attend', 'yes')}
              />
              Có, tôi sẽ tham dự
            </label>
            <label className={rsvpData.attend === 'no' ? 'active' : ''}>
              <input
                type="radio"
                name="attend"
                value="no"
                checked={rsvpData.attend === 'no'}
                onChange={() => onUpdateRsvp('attend', 'no')}
              />
              Rất tiếc không thể tham dự
            </label>
          </div>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="Số lượng người tham dự"
            value={rsvpData.guests}
            onChange={(e) => onUpdateRsvp('guests', e.target.value)}
          />
          <div className="rsvp-options">
            <label className={rsvpData.side === 'groom' ? 'active' : ''}>
              <input
                type="radio"
                name="side"
                value="groom"
                checked={rsvpData.side === 'groom'}
                onChange={() => onUpdateRsvp('side', 'groom')}
              />
              Nhà trai
            </label>
            <label className={rsvpData.side === 'bride' ? 'active' : ''}>
              <input
                type="radio"
                name="side"
                value="bride"
                checked={rsvpData.side === 'bride'}
                onChange={() => onUpdateRsvp('side', 'bride')}
              />
              Nhà gái
            </label>
          </div>
          <button type="submit">Gửi xác nhận</button>
        </form>
      )}
    </section>
  );
}
