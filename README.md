# MakerspaceOS: Technical Architecture & Backend Blueprint

MakerspaceOS is a high-performance, single-page React application designed for library staff. It follows a "Bento-Box" UI philosophy, where modular components handle specific data domains (Stats, Finance, Projects, Tasks).

## 1. Current Architecture (The Prototype)

Currently, the app operates as a **Stateful Frontend**.

*   **View Layer**: React + Tailwind CSS.
*   **State Management**: Centralized in `App.tsx` using React Hooks (`useState`). Data flows down to components via props.
*   **Simulated Backend (`api.ts`)**: We use a `CloudService` abstraction. While it currently saves to the browser's `localStorage`, it is designed with `async/await` and artificial delays to mimic real network latency. This makes swapping it for a real API trivial.

## 2. Transitioning to a Real Backend

To move this from a local prototype to a multi-user hosted system, you would replace the logic in `api.ts` with real server calls.

### A. Recommended Technology Stack
*   **Database**: 
    *   *Option 1 (NoSQL)*: **MongoDB** or **Firestore**. Great for the "Activator" and "Inspiration" objects which may have varying structures.
    *   *Option 2 (Relational)*: **PostgreSQL**. Better for the "Finance" and "Stats" modules where data integrity and complex reporting (SQL queries) are needed.
*   **Server**: **Node.js with Express** or **Supabase** (PostgREST).
*   **Authentication**: **Lucide-React** icons represent users like "Alex" or "Jordan." A real backend would use **Auth0** or **Firebase Auth** to secure these sessions.

### B. API Endpoint Blueprint
A real backend would expose the following RESTful routes:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Fetch all initial state (Tasks, Supplies, Upcoming) |
| `POST` | `/api/tasks` | Create a new staff task |
| `PATCH` | `/api/tasks/:id` | Toggle task completion |
| `POST` | `/api/supplies` | Add item to the shopping list |
| `GET` | `/api/stats` | Retrieve engagement data for Recharts |
| `POST` | `/api/activator` | Update the monthly featured project |

## 3. Gemini AI Integration (The "Daily Spark")

The **AI Daily Spark** (`components/AISpark.tsx`) currently calls the Gemini API directly from the browser. 

**For Production:**
1.  **Server-Side Proxy**: You should move the Gemini API call to your backend. The frontend sends a request to `/api/generate-idea`, and the server uses the `process.env.API_KEY` to talk to Google. This keeps your API key hidden from users.
2.  **Structured Output**: We use `responseMimeType: "application/json"` and a defined `responseSchema`. This ensures the AI always returns data that matches our `AIProject` TypeScript interface, preventing UI crashes.

## 4. Database Schema Example (PostgreSQL)

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE shopping_list (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item TEXT NOT NULL,
  quantity TEXT DEFAULT '1',
  added_by TEXT
);

CREATE TABLE stats (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE,
  visitors INTEGER DEFAULT 0,
  engagements INTEGER DEFAULT 0,
  participants INTEGER DEFAULT 0
);
```

## 5. Development & Hosting

### Local Development
The project uses **ESM (ECMAScript Modules)** via `esm.sh`. No complex build step is required for local experimentation; simply serve the directory using a tool like `Live Server` or `npx serve .`.

### Production Deployment
To host on **GitHub Pages**, **Vercel**, or **Netlify**:
1.  **Build Step**: While this app is written in `.tsx`, the `index.html` uses an `importmap` and `babel/typescript` conversion or a build tool (like Vite) is recommended for production optimization.
2.  **Environment Variables**: Ensure `API_KEY` is set in your hosting provider's dashboard, not hardcoded in the script.

---
*Created by the Senior Engineering Team for Makerspace Operations.*