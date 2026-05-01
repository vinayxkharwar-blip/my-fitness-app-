# 🏋️ FitSnap Coach — Full Project Audit Report

> **Date:** May 1, 2026  
> **Repo:** `https://github.com/Radioactivegeek/fitsnap-coach-main.git`  
> **Auditor:** Antigravity AI

---

## 1. Project Overview

FitSnap Coach is an **AI-powered fitness & wellness platform** with meal scanning, AI coaching, sleep tracking, habit management, trainer bookings, and a fitness shop. It uses **Clerk** for authentication and **Google Gemini** for AI features.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript + Vite 6.4 |
| **UI Library** | ShadcnUI (Radix primitives) + TailwindCSS 3.4 |
| **State** | TanStack React Query v5 + React Context |
| **Routing** | React Router DOM v6 |
| **Auth** | Clerk (`@clerk/clerk-react` + `@clerk/clerk-sdk-node`) |
| **Backend** | Express 5.2 (Node.js) |
| **Database** | SQLite3 (file-based, `fitness_app.sqlite`) |
| **AI** | Google Generative AI (`gemini-2.0-flash-exp`) |
| **HTTP Client** | Axios (frontend → backend) |
| **Charts** | Recharts (installed but underused) |

---

## 3. Project Structure

```
fitsnap-coach-main-main/
├── backend/
│   ├── server.js              # Express entry point (port 5000)
│   ├── database/
│   │   ├── db.js              # SQLite connection (used by controllers)
│   │   └── sqlite_db.js       # Older SQLite connection (unused duplicate)
│   ├── controllers/           # 11 controller files
│   ├── routes/                # 12 route files
│   ├── services/
│   │   ├── aiService.js       # Gemini AI (chat, meal scan, body scan)
│   │   └── calorieService.js  # TDEE/macro calculator
│   ├── db_schema.sql          # Full schema (9 tables)
│   ├── setup_db.js            # Schema migration script
│   └── .env                   # Config (PORT, GEMINI_API_KEY, etc.)
│
├── frontend/
│   ├── src/
│   │   ├── pages/             # 22 page components
│   │   ├── components/
│   │   │   ├── common/        # 53 ShadcnUI components
│   │   │   ├── features/      # 8 feature component dirs
│   │   │   └── layout/        # Sidebar, BottomNav, Header
│   │   ├── services/          # 10 API service modules
│   │   ├── hooks/             # 10 React Query hooks
│   │   ├── context/           # AuthContext (Clerk wrapper)
│   │   ├── lib/               # Axios instance + env validation
│   │   ├── types/             # TypeScript interfaces
│   │   └── App.tsx            # Router + Protected/Public routes
│   ├── vite.config.ts         # Dev server on port 8080 + API proxy
│   └── .env                   # VITE_API_URL, VITE_CLERK_PUBLISHABLE_KEY
│
└── fitsnap-coach-main/        # Empty nested directory (artifact)
```

---

## 4. Database Schema (9 Tables)

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `user_profiles` | User fitness profile | clerk_user_id, age, weight, height, goal, activity_level, profile_image |
| `meals` | Meal log entries | name, calories, protein, carbs, fats, meal_type |
| `water_logs` | Hydration tracking | amount_ml, logged_at |
| `habits` | Habit definitions | name, frequency, streak |
| `habit_logs` | Habit completion records | habit_id, completed_at |
| `trainers` | Trainer directory | name, specialty, bio, rating, price |
| `bookings` | Session bookings | trainer_id, session_date, status, notes |
| `chat_messages` | AI chat history | role, content |
| `products` | Shop products | name, description, price, category, image_url, stock |
| `cart_items` | Shopping cart | product_id, quantity |

> [!NOTE]
> There's also a legacy `users` table in `sqlite_db.js` (with email/password auth) that is **NOT used** by the main app — the app uses Clerk for auth exclusively.

---

## 5. Frontend Routes (22 Pages)

| Route | Page | Auth | Status |
|-------|------|------|--------|
| `/` | Landing/Index | Public | ✅ Working |
| `/login` | Clerk Login | Public | ✅ Working (Clerk hosted UI) |
| `/signup` | Clerk Signup | Public | ✅ Working (Clerk hosted UI) |
| `/onboarding/goal` | Goal Selection | Protected | ✅ Working |
| `/onboarding/measurements` | Body Measurements | Protected | ✅ Working |
| `/home` | Dashboard Home | Protected | ⚠️ Partial — uses mock data only |
| `/coach` | AI Coach Chat | Protected | ⚠️ Partial — uses local mock, not backend AI |
| `/scan` | Scan/Log Meal | Protected | ⚠️ Partial — mock results, no real camera/AI |
| `/log-meal` | Manual Meal Log | Protected | ✅ Working — form submits to backend |
| `/shop` | Fitness Shop | Protected | ⚠️ Partial — mock products, not from DB |
| `/habits` | Habit Tracker | Protected | ⚠️ Partial — UI present, limited backend integration |
| `/profile` | User Profile | Protected | ✅ Working — reads/writes from DB |
| `/body` | Body Analysis | Protected | ⚠️ Partial — mock stats, form logs to console only |
| `/plans` | Diet & Workout Plans | Protected | ⚠️ Mock only — hardcoded meals/exercises |
| `/trainers` | Trainer Directory | Protected | ⚠️ Mock only — hardcoded trainer list |
| `/sleep` | Sleep Tracker | Protected | ⚠️ Mock only — no backend persistence |
| `/profile/personal-info` | Personal Info | Protected | ✅ Working |
| `/profile/notifications` | Notification Settings | Protected | ⚠️ UI only — no backend |
| `/profile/settings` | App Settings | Protected | ⚠️ UI only — theme toggle works (localStorage) |
| `*` | 404 Not Found | Public | ✅ Working |

---

## 6. Backend API Endpoints — Test Results

### All GET Endpoints ✅

| Endpoint | Method | Status | Response |
|----------|--------|--------|----------|
| `GET /` | Root | ✅ 200 | `"AI Fitness Backend Running!"` |
| `GET /api/profile` | Get Profile | ✅ 200 | Returns profile JSON |
| `GET /api/meals` | Get Meals | ✅ 200 | Returns array |
| `GET /api/water` | Get Water Logs | ✅ 200 | Returns array |
| `GET /api/habits` | Get Habit Logs | ✅ 200 | Returns array |
| `GET /api/trainers` | Get Trainers | ✅ 200 | Returns array (empty — no seed data) |
| `GET /api/products` | Get Products | ✅ 200 | Returns array (empty — no seed data) |
| `GET /api/cart` | Get Cart | ✅ 200 | Returns array |
| `GET /api/bookings` | Get Bookings | ✅ 200 | Returns array |
| `GET /api/chat` | Get Chat History | ✅ 200 | Returns array |

### All POST Endpoints ✅

| Endpoint | Method | Status | Response |
|----------|--------|--------|----------|
| `POST /api/profile/update` | Update Profile | ✅ 200 | `"Profile updated successfully!"` |
| `POST /api/meals/add` | Add Meal | ✅ 200 | `"Meal added successfully!"` |
| `POST /api/water/add` | Add Water Log | ✅ 200 | `"Water log added successfully!"` |
| `POST /api/habits/add` | Add Habit Log | ✅ 200 | `"Habit log added successfully!"` |
| `POST /api/chat/send` | Save Chat Msg | ✅ 200 | `"Message sent!"` + message_id |
| `POST /api/bookings/create` | Create Booking | ✅ 200 | `"Booking created!"` + booking_id |
| `POST /api/cart/add` | Add to Cart | ✅ 200 | `"Item added to cart!"` |
| `POST /api/nutrition/calculate` | Calc TDEE | ✅ 200 | Returns calories + macros |
| `POST /api/chat` (AI) | AI Coach Chat | ✅ 200 | Returns AI/fallback response |
| `POST /api/analyze` | Meal Scan AI | ⛔ BUG | Double `res.json()` — crashes on success |
| `POST /api/body-analyze` | Body Scan AI | ✅ 200 | Returns analysis JSON |

---

## 7. Identified Bugs & Issues

### 🔴 Critical Bugs

| # | File | Issue |
|---|------|-------|
| 1 | [analyze.js](file:///c:/Users/chadh/Desktop/fitsnap-coach-main-main/backend/routes/analyze.js#L12-L24) | **Double `res.json()` call** — Line 12 sends `result.macros`, then line 18 tries to send again → `ERR_HTTP_HEADERS_SENT` crash |
| 2 | [authController.js](file:///c:/Users/chadh/Desktop/fitsnap-coach-main-main/backend/controllers/authController.js#L2-L3) | **Missing dependencies** — `bcryptjs` and `jsonwebtoken` are imported but NOT in `package.json`. Auth routes would crash if accessed. |
| 3 | [authRoutes.js](file:///c:/Users/chadh/Desktop/fitsnap-coach-main-main/backend/routes/authRoutes.js) | **Auth routes not mounted** in `server.js` — The file exists but `app.use("/auth", ...)` is never called. Dead code. |

### 🟡 Functional Issues

| # | Area | Issue |
|---|------|-------|
| 4 | Coach Page | Uses **local mock AI** (`setTimeout` + static response) instead of calling the backend `/api/chat` endpoint. The `useAIChat` hook exists but is NOT used by `Coach.tsx`. |
| 5 | Home Page | **All data is hardcoded mock** — calories, macros, water, habits, recent meals. Never fetches from backend. |
| 6 | Shop Page | Uses **hardcoded `MOCK_PRODUCTS`** array. Never calls `shopService.getProducts()`. Cart count is local state only. |
| 7 | Trainers Page | Uses **hardcoded `MOCK_TRAINERS`** array. Never calls `trainersService.getTrainers()`. |
| 8 | Trainers DB | `trainers` and `products` tables are **empty** — no seed data exists in the database. |
| 9 | Sleep Tracker | **No backend persistence** — Sleep entries are saved to local state only, no `sleep_logs` table or API exists. |
| 10 | Body Analysis | Weight chart area is a **placeholder** ("Connect a charting library here"). Form `onSubmit` only logs to console. |
| 11 | ScanMeal Page | "Take Photo" and "Upload Image" buttons show **mock hardcoded results** (Grilled Chicken Salad, 450 kcal). No camera integration or AI call. |
| 12 | Duplicate DB files | Two SQLite connection files exist: `database/db.js` (used) and `database/sqlite_db.js` (unused legacy). Also two `.sqlite` files in different locations. |

---

## 8. Feature Status Summary

| Feature | Backend API | Frontend UI | End-to-End |
|---------|:-----------:|:-----------:|:----------:|
| **Authentication (Clerk)** | ✅ | ✅ | ✅ Working |
| **User Profile CRUD** | ✅ | ✅ | ✅ Working |
| **Onboarding Flow** | ✅ | ✅ | ✅ Working |
| **Meal Logging (Manual)** | ✅ | ✅ | ✅ Working |
| **AI Meal Scan** | ⛔ Bug | ⚠️ Mock only | ❌ Broken |
| **AI Coach Chat** | ✅ (Gemini) | ⚠️ Mock only | ❌ Not Connected |
| **AI Body Analysis** | ✅ (Gemini) | ⚠️ Mock only | ❌ Not Connected |
| **Water Tracking** | ✅ | ⚠️ Mock UI | ❌ Not Connected |
| **Habit Tracking** | ✅ | ⚠️ Mock UI | ❌ Not Connected |
| **Nutrition Calculator** | ✅ (TDEE) | ❌ No UI | ❌ Not Used |
| **Trainer Directory** | ✅ (empty DB) | ⚠️ Mock data | ❌ Not Connected |
| **Trainer Booking** | ✅ | ❌ No UI flow | ❌ Not Connected |
| **Shop (Products)** | ✅ (empty DB) | ⚠️ Mock data | ❌ Not Connected |
| **Shopping Cart** | ✅ | ❌ No UI flow | ❌ Not Connected |
| **Sleep Tracking** | ❌ No API | ✅ Beautiful UI | ❌ No Backend |
| **Workout Plans** | ❌ No API | ⚠️ Mock data | ❌ Static Only |
| **Progress/Analytics** | ❌ No API | ⚠️ Mock data | ❌ Static Only |
| **Notifications** | ❌ No API | ⚠️ UI only | ❌ Not Implemented |
| **Dark/Light Theme** | N/A | ✅ localStorage | ✅ Working |
| **Protected Routes** | ✅ (dev bypass) | ✅ | ✅ Working |
| **Responsive Layout** | N/A | ✅ Mobile + Desktop | ✅ Working |

### Score: **5 of 20 features fully working end-to-end**

---

## 9. Code Quality Observations

### ✅ Strengths
- **Premium dark UI** — Excellent glassmorphism design, smooth animations, polished layouts
- **Well-organized structure** — Clean separation of concerns (services, hooks, controllers, routes)
- **TypeScript types** — Full interface definitions for all entities
- **Clerk integration** — Properly wired auth with token interceptors and dev bypass
- **Error boundaries** — Global ErrorBoundary component wraps the app
- **ShadcnUI components** — 53 reusable UI primitives available
- **AI fallback system** — Graceful degradation from Gemini to mock responses
- **SQLite migration** — Smart `ALTER TABLE` with duplicate column checks

### ⚠️ Weaknesses
- **Heavy mock data usage** — Most pages render hardcoded data instead of fetching from APIs
- **Hooks exist but unused** — `useAIChat`, `useBookings`, `useCart`, `useTrainers`, `useWater`, `useHabits`, `useMeals` are defined but pages use local state instead
- **No input validation** — Backend accepts any data without sanitization
- **No pagination** — All queries use `SELECT *` with no limits
- **Verbose console logging** — Every SQL query is logged in production
- **No test suite** — Zero unit, integration, or e2e tests
- **Rate limiting too aggressive** — 100 requests per 15 minutes per IP is low for a real app
- **Hardcoded Gemini API key** in `.env` committed to Git

---

## 10. Future Implementation Roadmap

### Phase 1: Bug Fixes & Wiring (Priority: 🔴 Critical)

- [ ] **Fix `analyze.js` double response** — Remove the first `res.json(result.macros)` on line 12
- [ ] **Connect Coach page to backend AI** — Replace mock `setTimeout` in `Coach.tsx` with actual `chatWithCoach()` API call
- [ ] **Connect Home dashboard to backend** — Use `useMeals`, `useWater`, `useHabits` hooks to fetch real data
- [ ] **Connect Shop to backend** — Use `shopService.getProducts()` + add seed data for products
- [ ] **Connect Trainers to backend** — Use `trainersService.getTrainers()` + add seed data
- [ ] **Wire ScanMeal to AI** — Implement actual camera/file upload → send to `/api/analyze`
- [ ] **Wire Body Analysis to AI** — Connect form to `/api/body-analyze` endpoint
- [ ] **Remove dead code** — Delete unused `sqlite_db.js`, `authRoutes.js`, `authController.js`, empty `fitsnap-coach-main/` dir

### Phase 2: Missing Backend Features (Priority: 🟡 High)

- [ ] **Sleep tracking API** — Create `sleep_logs` table, controller, routes
- [ ] **Workout/Plans API** — Create `workouts`, `exercises`, `workout_logs` tables
- [ ] **Progress/Analytics API** — Aggregate queries for weight trend, streak, calories over time
- [ ] **Notifications system** — Create `notifications` table + push mechanism
- [ ] **Seed data script** — Pre-populate trainers, products with realistic data
- [ ] **Habit CRUD** — Add create/update/delete endpoints for habits (currently only logs exist)
- [ ] **Delete/Edit Meal** — Only add/get exists, no update or delete

### Phase 3: Feature Enhancements (Priority: 🟢 Medium)

- [ ] **Real camera integration** — Use `navigator.mediaDevices.getUserMedia()` for meal scanning
- [ ] **Recharts integration** — Weight tracking chart, calorie trend, sleep quality graph
- [ ] **Checkout/Payment flow** — Stripe or Razorpay integration for shop
- [ ] **Trainer video call** — WebRTC or Zoom SDK integration for booked sessions
- [ ] **Social login** — Google/GitHub OAuth via Clerk (already supported by Clerk)
- [ ] **Profile image upload** — File upload to cloud storage (Cloudinary/S3)
- [ ] **AI-generated meal plans** — Use Gemini to generate personalized weekly meal plans
- [ ] **AI-generated workout plans** — Use Gemini to create custom workout routines

### Phase 4: Production Readiness (Priority: 🔵 Important)

- [ ] **Environment security** — Remove hardcoded API keys from `.env`, use secrets manager
- [ ] **Input validation** — Add Zod/Joi validation on all backend endpoints
- [ ] **Pagination** — Add `LIMIT/OFFSET` to all list queries
- [ ] **Error handling** — Standardize error response format across all controllers
- [ ] **Logging** — Replace `console.log` with structured logger (Winston/Pino)
- [ ] **Testing** — Add Jest unit tests for services, Playwright e2e tests
- [ ] **CI/CD** — GitHub Actions for lint, test, build
- [ ] **Database migration** — Use Knex.js or Drizzle for proper migration management
- [ ] **Move to PostgreSQL** — SQLite is not suitable for production multi-user apps

### Phase 5: Scale & Polish (Priority: ⚪ Nice to Have)

- [ ] **PWA support** — Service worker + manifest for mobile install
- [ ] **Offline mode** — Cache API responses for offline viewing
- [ ] **i18n** — Multi-language support
- [ ] **Admin dashboard** — Manage trainers, products, users
- [ ] **Real-time chat** — WebSocket/SSE for live AI coaching
- [ ] **Leaderboard** — Gamification with points, badges, rankings
- [ ] **Wearable integration** — Apple Health / Google Fit API sync

---

## 11. API Route Map (Quick Reference)

```
Backend: http://localhost:5000
Frontend: http://localhost:8080

POST /api/profile/update      → profileController.updateUserProfile
GET  /api/profile             → profileController.getUserProfile
POST /api/meals/add           → mealController.addMeal
GET  /api/meals               → mealController.getMeals
POST /api/water/add           → waterController.addWaterLog
GET  /api/water               → waterController.getWaterLogs
POST /api/habits/add          → habitController.addHabitLog
GET  /api/habits              → habitController.getHabitLogs
GET  /api/trainers            → trainerController.getAllTrainers
GET  /api/trainers/:id        → trainerController.getTrainerDetails
POST /api/bookings/create     → bookingController.createBooking
GET  /api/bookings            → bookingController.getUserBookings
POST /api/chat/send           → chatController.sendMessage
GET  /api/chat                → chatController.getConversation
GET  /api/products            → productController.getProducts
GET  /api/products/:id        → productController.getProductById
POST /api/cart/add            → cartController.addToCart
GET  /api/cart                → cartController.getCart
DELETE /api/cart/remove/:id   → cartController.removeFromCart
POST /api/nutrition/calculate → nutritionController.calculateNeeds
POST /api/analyze             → AI meal image analysis (⛔ BUG)
POST /api/chat (AI)           → AI coach conversation
POST /api/body-analyze        → AI body physique analysis
```

---

> [!IMPORTANT]
> **Bottom Line:** The app has an excellent UI foundation and a solid backend API layer, but they are largely **disconnected**. Most frontend pages render hardcoded mock data instead of calling the backend. The core priority should be **wiring existing frontend hooks to existing backend endpoints** — most of the plumbing already exists on both sides, it just needs to be connected.
