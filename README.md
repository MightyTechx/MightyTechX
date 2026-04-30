# MightyTechX

Corporate website for **MightyTechX** — a technology company offering UI/UX design, web & mobile development, motion graphics, business strategy, and HR solutions. Built as a full-stack monorepo with a React frontend and an Express API backend.

---

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite, MUI, Redux Toolkit  |
| Backend   | Node.js, Express, TypeScript                    |
| Database  | Supabase (PostgreSQL)                           |
| Email     | Nodemailer (Gmail SMTP)                         |
| Deploy    | Vercel (client) · Render (server) · Docker      |

---

## Project Structure

```
MightyTechX/
├── client/               # React + Vite frontend (deployed to Vercel)
│   └── src/
│       ├── components/   # UI sections: Hero, About, Services, Products, Contact
│       ├── data/         # Static data for services, products, stats
│       ├── store/        # Redux slices
│       └── types/        # Shared TypeScript types
├── server/               # Express API backend (deployed to Render)
│   └── src/
│       ├── routes/       # contact.ts — POST /api/contact
│       └── utils/        # mailer.ts, db.ts
├── Dockerfile            # Docker image for server
├── docker-compose.yml    # Local development container
├── render.yaml           # Render deployment config (Docker runtime)
└── vercel.json           # Vercel deployment config (client)
```

---

## Features

- **Services** — UI/UX Design, Motion & Animation, Web Development, Business Strategy, Mobile Apps, HR Solutions
- **Products** — ServiceOps, GoGaadi, FarmiX, PocketPay, ClapX, Illuminate
- **Contact Form** — submissions saved to Supabase and emailed via Gmail SMTP
- **Rate Limiting** — 20 requests / 15 min on the contact endpoint
- **Health Check** — `GET /api/health`

---

## Local Development

### Prerequisites

- Node.js 20+
- npm

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:<password>@db.<project>.supabase.co:5432/postgres?sslmode=require
SMTP_USER=mightyproitsolutions@gmail.com
SMTP_PASS=your-gmail-app-password
RECIPIENT_EMAIL=mightyproitsolutions@gmail.com
CLIENT_ORIGIN=http://localhost:5173
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Run dev servers

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## Docker

### Build and run

```bash
docker compose up --build
```

The server runs on `http://localhost:5000`. Environment variables are loaded from `server/.env`.

---

## Deployment

### Frontend → Vercel

Configured via `vercel.json`. Push to main or connect the repo in the Vercel dashboard. Builds from `client/` using `npm run build`.

### Backend → Render

Configured via `render.yaml` using Docker runtime. Set the following secrets in the Render dashboard (marked `sync: false`):

| Variable        | Description                                                     |
|-----------------|-----------------------------------------------------------------|
| `SMTP_PASS`     | Gmail App Password                                              |
| `CLIENT_ORIGIN` | Vercel frontend URL (e.g. `https://mightytechx.vercel.app`)    |

All other environment variables (including `DATABASE_URL`) are defined directly in `render.yaml`.

---

## API Reference

### `POST /api/contact`

Submit a contact form. Saves to the database and sends an email notification.

**Request body:**

```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (required)",
  "company": "string (required)",
  "service": "string (optional)",
  "message": "string (required)"
}
```

**Responses:**

| Status | Body                                                           |
|--------|----------------------------------------------------------------|
| 200    | `{ "message": "Message sent successfully!" }`                  |
| 400    | `{ "message": "Please fill in all required fields." }`         |
| 429    | `{ "message": "Too many requests. Please try again later." }`  |
| 500    | `{ "message": "Failed to submit. Please try again later." }`   |

### `GET /api/health`

```json
{ "status": "ok", "env": "prod" }
```

---

## Scripts

| Command               | Description                              |
|-----------------------|------------------------------------------|
| `npm run dev`         | Run client + server in development       |
| `npm run dev:client`  | Run Vite dev server only                 |
| `npm run dev:server`  | Run Express server with nodemon only     |
| `npm run build`       | Build client for production              |
| `npm run install:all` | Install dependencies for all workspaces  |
