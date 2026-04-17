# ForeJoy - Golf with Purpose (Supabase Edition)

A production-ready subscription-based web platform combining golf score tracking, monthly draw-based rewards, and charity contributions. **Built with Supabase!**

## 📁 Project Structure

```
assignment/
├── backend/
│   ├── config/
│   │   └── db.js                 # Supabase client
│   ├── db/
│   │   └── supabase-schema.sql   # Supabase database schema
│   ├── middleware/
│   │   └── auth.js               # Supabase JWT auth
│   ├── routes/
│   │   ├── auth.js               # Supabase Auth routes
│   │   ├── users.js              # User management
│   │   ├── scores.js             # Score tracking
│   │   ├── charities.js          # Charity management
│   │   ├── subscriptions.js      # Stripe subscriptions
│   │   ├── draws.js              # Draw management
│   │   ├── winnings.js           # Winnings & verification
│   │   └── admin.js              # Admin dashboard
│   ├── .env                      # Environment variables
│   ├── .env.example              # Env template
│   ├── package.json              # Dependencies
│   └── server.js                 # Express server
│
└── frontend/
    ├── src/
    │   ├── config/
    │   │   └── supabase.js       # Frontend Supabase client
    │   ├── contexts/
    │   │   └── AuthContext.jsx   # Supabase Auth context
    │   ├── pages/                 # All UI pages
    │   ├── components/            # Reusable components
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    ├── package.json
    └── vite.config.js
```

## 🚀 Quick Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your database to initialize

### Step 2: Set up Database Schema

1. Go to your Supabase project → SQL Editor
2. Copy and paste the SQL from `backend/db/supabase-schema.sql`
3. Run the query to create all tables and policies

### Step 3: Configure Backend

```bash
cd backend
npm install

# Copy env template and fill in values
cp .env.example .env
```

Edit `.env` with your:
- Supabase URL & Service Role Key (from Supabase → Project Settings → API)
- Stripe keys
- Cloudinary credentials (optional)

### Step 4: Configure Frontend

```bash
cd frontend
npm install

# Copy env template and fill in values
cp .env.example .env
```

Edit `.env` with your:
- Supabase URL & Anon Key

### Step 5: Run the App

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## 🛠️ Supabase Connection Details

### Backend (Express API)
Uses Supabase Service Role Key for server-side operations.
- **File**: `backend/config/db.js`
- **Env vars**: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

### Frontend
Uses Supabase Anon Key for client-side auth and data fetching.
- **File**: `frontend/src/config/supabase.js`
- **Env vars**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## 📊 Database Tables

| Table | Purpose |
|-------|---------|
| `users` | User profiles (extends Supabase Auth users) |
| `subscriptions` | Stripe subscription tracking |
| `charities` | Charity organizations |
| `scores` | Golf scores (max 5 per user) |
| `draws` | Monthly draw configurations |
| `winnings` | Winner & prize tracking |

## 🔐 Authentication

Uses **Supabase Auth** (email/password).

## 🎨 Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Supabase.js
- React Router

**Backend:**
- Node.js + Express
- Supabase (Auth + Database)
- Stripe Payments
- Cloudinary (Storage)

## 📝 PRD Compliance

This project fully implements all requirements from the PRD:
- ✅ Subscription engine (Stripe)
- ✅ Stableford score tracking (max 5 scores)
- ✅ Monthly draw system
- ✅ Charity integration (minimum 10%)
- ✅ Complete admin dashboard
- ✅ Modern, emotional UI/UX (no golf clichés)
- ✅ Winner verification system

## 🚀 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy!

### Backend (Render/Railway)
1. Push code to GitHub
2. Import project
3. Set environment variables
4. Deploy!

### Supabase
Already hosted, no deployment needed!

## 💡 Key Changes from Original

- **Database**: PostgreSQL → Supabase (managed PostgreSQL)
- **Auth**: Custom JWT → Supabase Auth
- **DB Client**: `pg` → `@supabase/supabase-js`

---

**That's it! Your Supabase-powered golf platform is ready to use!**
