# Vercel Edge Config Setup Guide

## ✅ Các bước đã hoàn thành:

1. ✅ Cài đặt `@vercel/edge-config` package
2. ✅ Tạo utility files để sử dụng Edge Config trong React

## ⏳ Các bước còn lại:

### Bước 1: Pull Environment Variables từ Vercel
```bash
npx vercel env pull
```

Hoặc nếu chưa cài Vercel CLI:
```bash
npm install -g vercel
vercel env pull
```

### Bước 2: Cấu hình Environment Variables

Tạo file `.env.local` hoặc thêm vào `.env`:

```env
VITE_EDGE_CONFIG_ID=your_edge_config_id_here
VITE_EDGE_CONFIG_TOKEN=your_edge_config_token_here
```

**Cách lấy ID và Token:**
1. Vào https://vercel.com/dashboard
2. Chọn project của bạn
3. Vào tab **Storage**
4. Chọn **Edge Config** 
5. Copy **Connection String** hoặc **ID** từ đó

### Bước 3: Tạo dữ liệu trong Edge Config

Trên Vercel Dashboard:
1. Vào Storage > Edge Config
2. Click **Add Item**
3. Thêm key-value pairs, ví dụ:
   - Key: `greeting`
   - Value: `Welcome to our wedding!`

### Bước 4: Sử dụng trong React Components

```tsx
import { useEdgeConfig } from './utils/useEdgeConfig';

export function MyComponent() {
  const { value: greeting, isLoading, error } = useEdgeConfig('greeting');
  
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {value && <h1>{value}</h1>}
    </div>
  );
}
```

### Bước 5: Deploy lại

```bash
git add .
git commit -m "Add Vercel Edge Config integration"
git push
```

Dự án sẽ tự động deploy lại trên Vercel.

### Bước 6: Verify (Kiểm tra)

- Truy cập website của bạn trên Vercel
- Mở Chrome DevTools (F12) > Console
- Kiểm tra xem dữ liệu từ Edge Config đã được load

## 🔧 Các file đã tạo:

- `src/utils/edgeConfig.ts` - Utility function để fetch dữ liệu từ Edge Config
- `src/utils/useEdgeConfig.ts` - React hook wrapper
- `src/components/EdgeConfigExample.tsx` - Ví dụ sử dụng

## 📝 Ghi chú:

- Edge Config chỉ hoạt động trên production (Vercel)
- Trên local development, cần cấu hình đúng environment variables
- Nếu không cấu hình biến môi trường, Hook sẽ trả về `null` và warning

## ❓ Cần giúp?

Xem thêm tại: https://vercel.com/docs/edge-config/get-started
