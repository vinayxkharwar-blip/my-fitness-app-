# FitSnap Coach 🏋️‍♂️

FitSnap Coach is a modern, full-stack AI-powered fitness and nutrition tracking application. It helps users manage their diet, hydration, habits, and workouts while offering personalized insights from a virtual AI coach powered by Google Gemini.

## 🚀 Tech Stack

### Frontend
- **React 18** with **Vite**
- **TypeScript** for strict type safety
- **Tailwind CSS** & **shadcn/ui** for beautiful, responsive design
- **TanStack Query (React Query)** for efficient server state management
- **@clerk/clerk-react** for seamless authentication

### Backend
- **Node.js** & **Express**
- **MySQL** relational database
- **@clerk/clerk-sdk-node** for secure API route protection
- **Google Gemini AI API** for intelligent food macro analysis and chat coaching
- **Security:** Helmet, express-rate-limit, CORS, Morgan logging

## ✨ Features

- **Secure Authentication:** Managed entirely by Clerk.
- **Meal & Macro Logging:** Track your daily calories, protein, carbs, and fats. 
- **AI Food Analysis:** Upload a photo of your meal and let Gemini instantly estimate its nutritional value.
- **Hydration & Habit Tracking:** Log water intake and build consistent streaks for custom habits.
- **AI Coach Chat:** Chat with a personalized virtual fitness instructor to get advice and training tips.
- **Trainer Bookings:** Browse professional trainers and schedule sessions directly through the app.
- **Fitness Shop:** Access an integrated store to browse fitness products and manage your cart.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL Server running locally or remotely

### 1. Database Setup
1. Open MySQL and ensure your service is running.
2. In the `backend/` directory, create a `.env` file based on `.env.example`.
3. Fill in your `DB_HOST`, `DB_USER`, and `DB_PASSWORD`.
4. Run the setup script to initialize the database and tables:
   ```bash
   cd backend
   node setup_db.js
   ```

### 2. Backend Setup
1. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. In your `backend/.env` file, ensure you have added your:
   - `CLERK_SECRET_KEY`
   - `GEMINI_API_KEY`
   - `ALLOWED_ORIGINS` (e.g., `http://localhost:5173`)
3. Start the Express server:
   ```bash
   npm run dev
   ```
   *(Server defaults to port 5000)*

### 3. Frontend Setup
1. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Create a `.env` file based on `.env.example` in the `frontend/` directory.
3. Add your `VITE_CLERK_PUBLISHABLE_KEY` and ensure `VITE_API_URL` points to your backend.
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🔐 Authentication Flow

FitSnap Coach utilizes Clerk for managing users. The frontend wraps the application in `<ClerkProvider>`, automatically handling sign-ins and session tokens. All backend `/api/*` routes are secured using the `ClerkExpressRequireAuth()` middleware, which decodes the Bearer token attached by our Axios interceptors and injects `req.auth.userId` to ensure data privacy across all operations.
