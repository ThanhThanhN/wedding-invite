import { useEffect, useMemo, useState, useCallback } from "react";
import type { FormEvent } from "react";
import "./App.css";

type Photo = {
  id: string;
  title: string;
  src: string;
  uploadedAt: string;
};

type Wish = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
};

const STORAGE_KEYS = {
  photos: "wedding_album_photos",
  wishes: "wedding_wishes",
  weddingDate: "wedding_date",
  bannerImage: "wedding_banner_image",
  groomName: "wedding_groom_name",
  brideName: "wedding_bride_name",
};

const ADMIN_PASSWORD = "wedding2026";

import bannerImg from "./assets/abcd.jpg";
const DEFAULT_BANNER = bannerImg;

const INITIAL_PHOTOS: Photo[] = [
  {
    id: "1",
    title: "Khoảnh khắc hạnh phúc",
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    uploadedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Bên nhau trọn đời",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    uploadedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Ngày về chung một nhà",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    uploadedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Tình yêu vĩnh cửu",
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
    uploadedAt: new Date().toISOString(),
  },
];

const INITIAL_WEDDING_DATE = "2026-12-20T09:30";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function formatCountdown(ms: number) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function CalendarGrid({ weddingDate }: { weddingDate: string }) {
  const d = new Date(weddingDate);
  const year = d.getFullYear();
  const month = d.getMonth();
  const weddingDay = d.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = d.toLocaleString("vi-VN", { month: "long" });

  const cells: (number | null)[] = [];
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++)
    cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  return (
    <div className="calendar">
      <p className="calendar-month">
        Tháng {month + 1} &mdash; {monthName} {year}
      </p>
      <div className="calendar-header">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="calendar-body">
        {cells.map((day, i) => (
          <span
            key={i}
            className={`cal-cell ${day === weddingDay ? "wedding-day" : ""} ${!day ? "empty" : ""}`}
          >
            {day ?? ""}
            {day === weddingDay && <span className="heart-mark">♥</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>(() => {
    try {
      const r = localStorage.getItem(STORAGE_KEYS.photos);
      return r ? JSON.parse(r) : INITIAL_PHOTOS;
    } catch {
      return INITIAL_PHOTOS;
    }
  });
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const r = localStorage.getItem(STORAGE_KEYS.wishes);
      return r ? JSON.parse(r) : [];
    } catch {
      return [];
    }
  });
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [weddingDate, setWeddingDate] = useState(
    () =>
      localStorage.getItem(STORAGE_KEYS.weddingDate) ?? INITIAL_WEDDING_DATE,
  );
  const [bannerImage, setBannerImage] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEYS.bannerImage) ?? DEFAULT_BANNER,
  );
  const [groomName, setGroomName] = useState(
    () => localStorage.getItem(STORAGE_KEYS.groomName) ?? "Thanh Thành",
  );
  const [brideName, setBrideName] = useState(
    () => localStorage.getItem(STORAGE_KEYS.brideName) ?? "Thu Nga",
  );
  const [adminPw, setAdminPw] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState("");
  const [now, setNow] = useState(Date.now);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpAttend, setRsvpAttend] = useState<"yes" | "no" | "">("");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpSide, setRsvpSide] = useState<"groom" | "bride" | "">("");
  const [rsvpSent, setRsvpSent] = useState(false);

  const countdown = useMemo(
    () => formatCountdown(new Date(weddingDate).getTime() - now),
    [weddingDate, now],
  );
  const sortedWishes = useMemo(
    () =>
      [...wishes].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [wishes],
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.photos, JSON.stringify(photos));
  }, [photos]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.wishes, JSON.stringify(wishes));
  }, [wishes]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.weddingDate, weddingDate);
  }, [weddingDate]);
  useEffect(() => {
    bannerImage
      ? localStorage.setItem(STORAGE_KEYS.bannerImage, bannerImage)
      : localStorage.removeItem(STORAGE_KEYS.bannerImage);
  }, [bannerImage]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.groomName, groomName);
  }, [groomName]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.brideName, brideName);
  }, [brideName]);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const readAsDataUrl = useCallback(
    (file: File) =>
      new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result));
        r.onerror = () => rej(new Error("Cannot read file"));
        r.readAsDataURL(file);
      }),
    [],
  );

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    if (adminPw === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAuthError("");
      setAdminPw("");
    } else setAuthError("Sai mật khẩu.");
  };

  const handleAddWish = (e: FormEvent) => {
    e.preventDefault();
    const a = author.trim(),
      m = message.trim();
    if (!a || !m) return;
    setWishes((p) => [
      {
        id: createId("w"),
        author: a,
        message: m,
        createdAt: new Date().toISOString(),
      },
      ...p,
    ]);
    setAuthor("");
    setMessage("");
  };

  const handleUploadPhotos = async (e: FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files?.length) return;
    const imgs = await Promise.all(Array.from(files).map(readAsDataUrl));
    const t = new Date().toISOString();
    setPhotos((p) => [
      ...imgs.map((src, i) => ({
        id: createId("p"),
        title: `Ảnh cưới ${p.length + i + 1}`,
        src,
        uploadedAt: t,
      })),
      ...p,
    ]);
    e.currentTarget.value = "";
  };

  const handleUploadBanner = async (e: FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files?.length) return;
    setBannerImage(await readAsDataUrl(files[0]));
    e.currentTarget.value = "";
  };

  const handleRsvp = (e: FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpAttend || !rsvpSide) return;
    setRsvpSent(true);
  };

  const weddingDateObj = new Date(weddingDate);
  const dateStr = `${weddingDateObj.getDate()}.${weddingDateObj.getMonth() + 1}.${weddingDateObj.getFullYear()}`;
  const timeStr = weddingDateObj.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="invite-page">
      {/* ===== SECTION 1: COVER ===== */}
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
              <span className="amp">&amp;</span>
              <span className="script">{brideName}</span>
            </h1>
            <div className="cover-divider" />
            <p className="cover-date">{dateStr}</p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: NHÀ CÓ HỶ ===== */}
      <section className="section nha-co-hy">
        <div className="hy-deco">♥</div>
        <h2 className="hy-title script">Nhà Có Hỷ</h2>
        <p className="hy-sub">Trân trọng báo tin lễ thành hôn của</p>
        <div className="couple-names-block">
          <h3 className="script groom-n">{groomName}</h3>
          <span className="amp-fancy">&amp;</span>
          <h3 className="script bride-n">{brideName}</h3>
        </div>
      </section>

      {/* ===== SECTION 3: GIA ĐÌNH ===== */}
      <section className="section family-section">
        <div className="family-card">
          <h4>NHÀ TRAI</h4>
          <p>
            Ông: Nguyễn Văn A<br />
            Bà: Trần Thị B
          </p>
          <p className="address">Thôn X, Xã Y, Huyện Z</p>
        </div>
        <div className="family-divider">♥</div>
        <div className="family-card">
          <h4>NHÀ GÁI</h4>
          <p>
            Ông: Lê Văn C<br />
            Bà: Phạm Thị D
          </p>
          <p className="address">Số 1, Đường E, Quận F</p>
        </div>
      </section>

      {/* ===== SECTION 4: SỰ KIỆN ===== */}
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

      {/* ===== SECTION 5: LỊCH ===== */}
      <section className="section calendar-section">
        <CalendarGrid weddingDate={weddingDate} />
      </section>

      {/* ===== SECTION 6: LOVE QUOTE ===== */}
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

      {/* ===== SECTION 7: COUNTDOWN ===== */}
      <section className="section countdown-section">
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

      {/* ===== SECTION 8: ALBUM ===== */}
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
                    setPhotos((prev) => prev.filter((x) => x.id !== p.id));
                  }}
                >
                  ✕
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
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
                i !== null && i > 0 ? i - 1 : photos.length - 1,
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
                i !== null && i < photos.length - 1 ? i + 1 : 0,
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

      {/* ===== SECTION 9: LỜI CHÚC ===== */}
      <section className="section wishes-section">
        <h2 className="section-title script">Lời Chúc</h2>
        <div className="wish-scroll">
          {sortedWishes.length === 0 ? (
            <p className="section-sub">
              Hãy là người đầu tiên gửi lời chúc đến cô dâu chú rể!
            </p>
          ) : (
            sortedWishes.map((w) => (
              <div key={w.id} className="wish-bubble">
                <strong>{w.author}:</strong> {w.message}
              </div>
            ))
          )}
        </div>
        <form className="wish-form" onSubmit={handleAddWish}>
          <input
            type="text"
            placeholder="Tên của bạn..."
            maxLength={50}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Gửi lời chúc..."
            maxLength={250}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Gửi</button>
        </form>
      </section>

      {/* ===== SECTION 10: XÁC NHẬN THAM DỰ ===== */}
      <section className="section rsvp-section">
        <h2 className="section-title script">Xác Nhận Tham Dự</h2>
        {rsvpSent ? (
          <div className="rsvp-thanks">
            <p>Cảm ơn bạn đã xác nhận! ♥</p>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleRsvp}>
            <input
              type="text"
              placeholder="Họ và tên"
              value={rsvpName}
              onChange={(e) => setRsvpName(e.target.value)}
            />
            <div className="rsvp-options">
              <label className={rsvpAttend === "yes" ? "active" : ""}>
                <input
                  type="radio"
                  name="attend"
                  value="yes"
                  checked={rsvpAttend === "yes"}
                  onChange={() => setRsvpAttend("yes")}
                />
                Có, tôi sẽ tham dự
              </label>
              <label className={rsvpAttend === "no" ? "active" : ""}>
                <input
                  type="radio"
                  name="attend"
                  value="no"
                  checked={rsvpAttend === "no"}
                  onChange={() => setRsvpAttend("no")}
                />
                Rất tiếc không thể tham dự
              </label>
            </div>
            <input
              type="number"
              min="1"
              max="10"
              placeholder="Số lượng người tham dự"
              value={rsvpGuests}
              onChange={(e) => setRsvpGuests(e.target.value)}
            />
            <div className="rsvp-options">
              <label className={rsvpSide === "groom" ? "active" : ""}>
                <input
                  type="radio"
                  name="side"
                  value="groom"
                  checked={rsvpSide === "groom"}
                  onChange={() => setRsvpSide("groom")}
                />
                Nhà trai
              </label>
              <label className={rsvpSide === "bride" ? "active" : ""}>
                <input
                  type="radio"
                  name="side"
                  value="bride"
                  checked={rsvpSide === "bride"}
                  onChange={() => setRsvpSide("bride")}
                />
                Nhà gái
              </label>
            </div>
            <button type="submit">Gửi xác nhận</button>
          </form>
        )}
      </section>

      {/* ===== ADMIN PANEL ===== */}
      <section className="section admin-section">
        <details>
          <summary>⚙ Quản trị (Cô dâu &amp; Chú rể)</summary>
          {!isAdmin ? (
            <form className="admin-form" onSubmit={handleAdminLogin}>
              <input
                type="password"
                placeholder="Mật khẩu admin"
                value={adminPw}
                onChange={(e) => setAdminPw(e.target.value)}
              />
              <button type="submit">Đăng nhập</button>
              {authError && <p className="err">{authError}</p>}
              <p className="hint">
                Mật khẩu demo: <b>{ADMIN_PASSWORD}</b>
              </p>
            </form>
          ) : (
            <div className="admin-form">
              <p className="ok">✓ Đã đăng nhập admin</p>
              <label>
                Tên chú rể{" "}
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                />
              </label>
              <label>
                Tên cô dâu{" "}
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                />
              </label>
              <label>
                Ngày giờ cưới{" "}
                <input
                  type="datetime-local"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                />
              </label>
              <label>
                Ảnh bìa{" "}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadBanner}
                />
              </label>
              <label>
                Thêm ảnh album{" "}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUploadPhotos}
                />
              </label>
              <button
                type="button"
                onClick={() => setBannerImage(DEFAULT_BANNER)}
              >
                Reset ảnh bìa mặc định
              </button>
              <button type="button" onClick={() => setIsAdmin(false)}>
                Đăng xuất
              </button>
            </div>
          )}
        </details>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Made with ♥</p>
      </footer>
    </div>
  );
}

export default App;
