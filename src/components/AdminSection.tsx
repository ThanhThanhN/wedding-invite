import type { FormEvent } from 'react';
import { useState } from 'react';
import { useFileToDataUrl } from '../hooks/useUtils';

type WeddingData = {
  groomName: string;
  brideName: string;
  weddingDate: string;
  bannerImage: string | null;
};

type Photo = {
  id: string;
  title: string;
  src: string;
  uploadedAt: string;
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
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleBannerChange = async (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const dataUrl = await readAsDataUrl(file);
    onUpdateWedding({ bannerImage: dataUrl });
    e.currentTarget.value = '';
  };

  const handleAddPhoto = async (e: FormEvent) => {
    e.preventDefault();
    if (!photoTitle || !photoUrl) {
      alert('Vui lòng nhập tiêu đề và URL ảnh');
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const newPhoto: Photo = {
        id: `photo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        title: photoTitle,
        src: photoUrl,
        uploadedAt: new Date().toISOString(),
      };

      const res = await fetch('/api/photos');
      const data = await res.json();
      const existingPhotos = data.data?.photos || [];

      await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: [newPhoto, ...existingPhotos] }),
      });

      alert('✓ Thêm ảnh thành công!');
      setPhotoTitle('');
      setPhotoUrl('');
    } catch (error) {
      alert('❌ Lỗi khi thêm ảnh');
      console.error(error);
    } finally {
      setIsUploadingPhoto(false);
    }
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
            <hr style={{ margin: '20px 0', opacity: 0.3 }} />
            <h3>Thêm Ảnh Album</h3>
            <form onSubmit={handleAddPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Tiêu đề ảnh"
                value={photoTitle}
                onChange={(e) => setPhotoTitle(e.target.value)}
              />
              <input
                type="url"
                placeholder="URL ảnh (ví dụ: https://...)"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <button
                type="submit"
                disabled={isUploadingPhoto}
                style={{ opacity: isUploadingPhoto ? 0.5 : 1 }}
              >
                {isUploadingPhoto ? 'Đang thêm...' : '+ Thêm ảnh'}
              </button>
            </form>
          </div>
        )}
      </details>
    </section>
  );
}
