import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Mock Edge Config data - cập nhật khi cần
const mockData = {
  comments: [
    { "Hùng": "Hello" },
    { "Thành": "Xin chào" },
    { "Minh": "test 1234" }
  ],
  groomName: "Thanh Thành",
  brideName: "Thu Nga",
  weddingDate: "10/05/2026",
  bannerImage: null,
  photos: [],
  wishes: [],
  rsvps: []
};

// API endpoints
app.get('/api/comments', (req, res) => {
  res.json({
    success: true,
    data: { comments: mockData.comments }
  });
});

app.get('/api/wedding', (req, res) => {
  res.json({
    success: true,
    data: {
      groomName: mockData.groomName,
      brideName: mockData.brideName,
      weddingDate: mockData.weddingDate,
      bannerImage: mockData.bannerImage
    }
  });
});

app.post('/api/wedding', (req, res) => {
  const { groomName, brideName, weddingDate, bannerImage } = req.body;
  if (groomName) mockData.groomName = groomName;
  if (brideName) mockData.brideName = brideName;
  if (weddingDate) mockData.weddingDate = weddingDate;
  if (bannerImage !== undefined) mockData.bannerImage = bannerImage;
  
  res.json({ success: true, message: 'Saved' });
});

app.get('/api/photos', (req, res) => {
  res.json({
    success: true,
    data: { photos: mockData.photos }
  });
});

app.post('/api/photos', (req, res) => {
  mockData.photos = req.body.photos;
  res.json({ success: true, message: 'Saved' });
});

app.get('/api/wishes', (req, res) => {
  res.json({
    success: true,
    data: { wishes: mockData.wishes }
  });
});

app.post('/api/wishes', (req, res) => {
  mockData.wishes = req.body.wishes;
  res.json({ success: true, message: 'Saved' });
});

app.post('/api/rsvp', (req, res) => {
  mockData.rsvps.push({
    ...req.body,
    submittedAt: new Date().toISOString()
  });
  res.json({ success: true, message: 'Saved' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
  console.log('This mirrors your Edge Config data for local development');
});
