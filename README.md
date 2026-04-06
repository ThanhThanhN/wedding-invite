# Wedding Invite and Album

React + TypeScript app for a wedding invitation website with album, user blessings, admin upload, and wedding countdown.

## Features

- Wedding invitation hero section with countdown timer
- Wedding album for guests to view photos
- Guest blessing comments (name + message)
- Admin mode for bride and groom:
  - Login with password
  - Upload one or many photos
  - Remove photos
  - Set wedding date/time for countdown
- Data persistence using browser localStorage

## Tech

- React
- TypeScript
- Vite

## Run locally

1. Install dependencies:
   npm install
2. Start development server:
   npm run dev
3. Open:
   http://localhost:5173

## Build

- npm run build
- npm run preview

## Admin login (demo)

- Password: wedding2026

You can change this password in src/App.tsx by editing ADMIN_PASSWORD.

## Notes

- This version is frontend-only, so data is saved per browser by localStorage.
- For production with real users, you should connect to a backend (for example Supabase, Firebase, or Node.js API) for shared photos and comments.
