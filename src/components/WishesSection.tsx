import type { FormEvent } from 'react';

type Wish = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
};

type WishesSectionProps = {
  wishes: Wish[];
  isLoading: boolean;
  author: string;
  message: string;
  onAuthorChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onAddWish: (e: FormEvent) => void;
};

export function WishesSection({
  wishes,
  isLoading,
  author,
  message,
  onAuthorChange,
  onMessageChange,
  onAddWish,
}: WishesSectionProps) {
  return (
    <section className="section wishes-section">
      <h2 className="section-title script">Lời Chúc</h2>
      <div className="wish-scroll">
        {isLoading && <p className="section-sub">Đang tải comments...</p>}
        {wishes.length === 0 && !isLoading && (
          <p className="section-sub">
            Hãy là người đầu tiên gửi lời chúc đến cô dâu chú rể!
          </p>
        )}
        {wishes.map((w) => (
          <div key={w.id} className="wish-bubble">
            <strong>{w.author}:</strong> {w.message}
          </div>
        ))}
      </div>
      <form className="wish-form" onSubmit={onAddWish}>
        <input
          type="text"
          placeholder="Tên của bạn..."
          maxLength={50}
          value={author}
          onChange={(e) => onAuthorChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gửi lời chúc..."
          maxLength={250}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
    </section>
  );
}
