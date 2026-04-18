# ForeJoy - Golf with Purpose

A production-ready subscription-based web platform combining golf score tracking, monthly draw-based rewards, and charity contributions.

## 📁 Project Structure

```
assignment/
├── backend/
│   ├── config/
│   │   └── db.js                 # Mock database (for now)
│   ├── db/
│   │   └── supabase-schema.sql   # Supabase database schema (ready for integration)
│   ├── middleware/
│   │   └── auth.js               # JWT auth middleware
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── users.js              # User management
│   │   ├── scores.js             # Score tracking
│   │   ├── charities.js          # Charity management
│   │   ├── subscriptions.js      # Stripe subscriptions integration
│   │   ├── draws.js              # Draw management
│   │   ├── winnings.js           # Winnings & verification
│   │   └── admin.js              # Admin dashboard
│   ├── .env                      # Environment variables (gitignored)
│   ├── .env.example              # Env template
│   ├── package.json              # Dependencies
│   └── server.js                 # Express server
│
└── frontend/
    ├── src/
    │   ├── contexts/
    │   │   ├── AuthContext.jsx   # Auth context
    │   │   └── ThemeContext.jsx  # Theme (dark/light) context
    │   ├── pages/                 # All UI pages
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Pricing.jsx        # Subscription plans with Stripe checkout
    │   │   ├── Charities.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── admin/AdminDashboard.jsx
    │   ├── components/            # Reusable components
    │   │   └── Navbar.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env                      # Environment variables (gitignored)
    ├── .env.example
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## 🚀 Quick Setup

### Step 1: Configure Backend

```bash
cd backend
npm install

# Copy env template and fill in values
cp .env.example .env
```

Edit `.env` with your:
- Supabase URL & Service Role Key (from Supabase → Project Settings → API)
- **Stripe keys** (required for payment integration)
- Cloudinary credentials (optional)
- JWT secret key (generate a strong one)

**Required Environment Variables:**
```env
PORT=5003
NODE_ENV=development

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### Step 2: Configure Frontend

```bash
cd frontend
npm install

# Copy env template and fill in values
cp .env.example .env
```

Edit `.env` with your:
- Supabase URL & Anon Key
- API URL pointing to your backend

**Required Environment Variables:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:5003
```

### Step 3: Run the App

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
- Backend: http://localhost:5003

## 💳 Stripe Payment Integration (Fully Functional!)

This project includes complete Stripe subscription integration:

1. **Checkout Session Creation**: `/api/subscriptions/create-checkout-session`
2. **Subscription Management**: Webhook handler for successful payments
3. **Billing Portal**: `/api/subscriptions/portal` for managing subscriptions

**Testing Payments (Stripe Test Cards):**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router
- Axios
- Lucide React (icons)

**Backend:**
- Node.js + Express
- Stripe Payments (fully integrated)
- JWT Authentication
- CORS enabled
- Mock database (ready for Supabase integration)

## 🎨 UI Features

- **Ethereal Minimalism** design (no golf clichés)
- **Dark/Light theme toggle**
- Responsive design (mobile/tablet/desktop)
- Smooth animations with Framer Motion

## 📝 Features

- ✅ User Registration & Login
- ✅ Subscription plans (Monthly/Yearly) with Stripe checkout
- ✅ Golf score tracking
- ✅ Charity selection and contributions
- ✅ Monthly draw system
- ✅ Admin dashboard
- ✅ Dark/Light theme toggle

## 🚀 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Backend (Render)

1. Push code to GitHub
2. Import project in Render
3. Set environment variables in Render dashboard
4. Deploy!

## How to Connect Supabase (Optional)

The project currently uses a mock database for easy development. To connect to Supabase:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `backend/db/supabase-schema.sql` in Supabase SQL Editor
3. Update `backend/config/db.js` to use Supabase client instead of mock DB

---

**That's it! Your ForeJoy golf platform is ready to use!**
