import type { FormEvent } from 'react';
import { useFileToDataUrl } from '../hooks/useUtils';

type WeddingData = {
  groomName: string;
  brideName: string;
  weddingDate: string;
  bannerImage: string | null;
};

type AdminSectionProps = {
  isAdmin: boolean;
  adminPw: string;
  authError: string;
  weddingData: WeddingData;
  onAdminLogin: (e: FormEvent) => void;
  onAdminPwChange: (value: string) => void;
  onUpdateWedding: (updates: Partial<WeddingData>) => void;
};

export function AdminSection({
  isAdmin,
  adminPw,
  authError,
  weddingData,
  onAdminLogin,
  onAdminPwChange,
  onUpdateWedding,
}: AdminSectionProps) {
  const readAsDataUrl = useFileToDataUrl();

  const handleBannerChange = async (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const dataUrl = await readAsDataUrl(file);
    onUpdateWedding({ bannerImage: dataUrl });
    e.currentTarget.value = '';
  };

  return (
    <section className="section admin-section">
      <details>
        <summary>⚙ Quản trị (Cô dâu &amp; Chú rể)</summary>
        {!isAdmin ? (
          <form className="admin-form" onSubmit={onAdminLogin}>
            <input
              type="password"
              placeholder="Mật khẩu admin"
              value={adminPw}
              onChange={(e) => onAdminPwChange(e.target.value)}
            />
            <button type="submit">Đăng nhập</button>
            {authError && <p className="err">{authError}</p>}
            <p className="hint">
              Mật khẩu demo: <b>wedding2026</b>
            </p>
          </form>
        ) : (
          <div className="admin-form">
            <p className="ok">✓ Đã đăng nhập admin</p>
            <label>
              Tên chú rể
              <input
                type="text"
                value={weddingData.groomName}
                onChange={(e) =>
                  onUpdateWedding({ groomName: e.target.value })
                }
              />
            </label>
            <label>
              Tên cô dâu
              <input
                type="text"
                value={weddingData.brideName}
                onChange={(e) =>
                  onUpdateWedding({ brideName: e.target.value })
                }
              />
            </label>
            <label>
              Ngày giờ cưới
              <input
                type="datetime-local"
                value={weddingData.weddingDate}
                onChange={(e) =>
                  onUpdateWedding({ weddingDate: e.target.value })
                }
              />
            </label>
            <label>
              Ảnh bìa
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
              />
            </label>
          </div>
        )}
      </details>
    </section>
  );
}
