import type { FormEvent } from "react";
import "./App.css";
import { useAdmin } from "./hooks/useAdmin";
import { usePhotos } from "./hooks/usePhotos";
import { useWishes } from "./hooks/useWishes";
import { useRsvp } from "./hooks/useRsvp";
import { useCountdown } from "./hooks/useUtils";
import { CoverSection } from "./components/CoverSection";
import { NhaCoHySection, QuoteSection } from "./components/SimplesSections";
import { FamilySection } from "./components/FamilySection";
import { EventsSection } from "./components/EventsSection";
import { CalendarGrid } from "./components/CalendarGrid";
import { CountdownSection } from "./components/CountdownSection";
import { AlbumSection } from "./components/AlbumSection";
import { WishesSection } from "./components/WishesSection";
import { RsvpSection } from "./components/RsvpSection";
import { AdminSection } from "./components/AdminSection";

function App() {
  // Load dữ liệu từ hooks
  const {
    weddingData,
    updateWeddingData,
    isAdmin,
    adminPw,
    setAdminPw,
    authError,
    handleLogin,
  } = useAdmin();
  const { photos, removePhoto } = usePhotos();
  const {
    allWishes,
    isLoading: isLoadingWishes,
    author,
    setAuthor,
    message,
    setMessage,
    addWish,
  } = useWishes();
  const { rsvpData, rsvpSent, updateRsvpData, handleRsvp } = useRsvp();
  const countdown = useCountdown(weddingData.weddingDate);

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    handleLogin(adminPw);
  };

  const handleAddWish = (e: FormEvent) => {
    e.preventDefault();
    addWish();
  };

  const handleRsvpSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleRsvp();
  };

  const handleUpdateRsvp = (field: string, value: unknown) => {
    updateRsvpData(field as keyof typeof rsvpData, value);
  };

  return (
    <div className="invite-page">
      {/* SECTION 1: COVER */}
      <CoverSection
        bannerImage={weddingData.bannerImage}
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
        weddingDate={weddingData.weddingDate}
      />

      {/* SECTION 2: NHÀ CÓ HỶ */}
      <NhaCoHySection
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
      />

      {/* SECTION 3: GIA ĐÌNH */}
      <FamilySection />

      {/* SECTION 4: SỰ KIỆN */}
      <EventsSection weddingDate={weddingData.weddingDate} />

      {/* SECTION 5: LỊCH */}
      <section className="section calendar-section">
        <CalendarGrid weddingDate={weddingData.weddingDate} />
      </section>

      {/* SECTION 6: LOVE QUOTE */}
      <QuoteSection />

      {/* SECTION 7: COUNTDOWN */}
      <CountdownSection
        countdown={countdown}
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
      />

      {/* SECTION 8: ALBUM */}
      <AlbumSection
        photos={photos}
        isAdmin={isAdmin}
        onRemovePhoto={removePhoto}
      />

      {/* SECTION 9: LỜI CHÚC */}
      <WishesSection
        wishes={allWishes}
        isLoading={isLoadingWishes}
        author={author}
        message={message}
        onAuthorChange={setAuthor}
        onMessageChange={setMessage}
        onAddWish={handleAddWish}
      />

      {/* SECTION 10: RSVP */}
      <RsvpSection
        rsvpData={rsvpData}
        rsvpSent={rsvpSent}
        onUpdateRsvp={handleUpdateRsvp}
        onHandleRsvp={handleRsvpSubmit}
      />

      {/* ADMIN PANEL */}
      <AdminSection
        isAdmin={isAdmin}
        adminPw={adminPw}
        authError={authError}
        weddingData={weddingData}
        onAdminLogin={handleAdminLogin}
        onAdminPwChange={setAdminPw}
        onUpdateWedding={updateWeddingData}
      />
    </div>
  );
}

export default App;
