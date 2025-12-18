# 🎓 RGUKT Alumni Portal

A full-stack web application connecting RGUKT alumni, students, and administrators.

---

## 📊 Project Status: ✅ FULLY FUNCTIONAL

| Component | Status | Port |
|-----------|--------|------|
| 🗄️ Database | ✅ Running | PostgreSQL @ 5432 |
| 🖥️ Backend | ✅ Running | http://localhost:3001 |
| 📱 Frontend | ✅ Ready | http://localhost:5173 |

---

## 🛠️ Technology Stack

### Frontend
- **React 18** + **TypeScript 5** + **Vite 5**
- **TailwindCSS** + **shadcn/ui**
- **React Router 6**

### Backend
- **Node.js 18+** + **Express.js 4**
- **PostgreSQL** + **pg (node-postgres)**
- **JWT** + **bcryptjs**

### Database
- **PostgreSQL 14+**
- UUID primary keys
- Custom ENUM types

---

## 📁 Project Structure

```
rgukt-connect-hub/
│
├── 📂 frontend/                 # FRONTEND (React)
│   ├── src/
│   │   ├── pages/               # Page components
│   │   ├── components/          # Reusable UI
│   │   ├── hooks/               # Custom hooks
│   │   └── lib/api-client.ts    # API client
│   ├── public/                  # Static assets
│   ├── index.html               # Entry HTML
│   ├── vite.config.ts           # Vite config
│   ├── tailwind.config.ts       # Tailwind config
│   └── README.md                # Frontend docs
│
├── 📂 backend/                  # BACKEND (Node.js)
│   ├── server-fixed.cjs         # Main server ⭐
│   └── README.md                # Backend docs
│
├── 📂 database/                 # DATABASE (PostgreSQL)
│   ├── database-complete.sql    # Full schema ⭐
│   └── README.md                # Database docs
│
├── 📂 scripts/                  # Utility scripts
│   ├── start-app.sh
│   ├── stop-app.sh
│   └── check-system.sh
│
├── 📂 docs/                     # Documentation
│
├── server-fixed.cjs             # Backend (root copy)
├── package.json                 # Dependencies
└── PROJECT_DOCUMENTATION.md     # Full docs
```

---

## 🚀 Quick Start

### 1. Start Database
```bash
sudo systemctl start postgresql
```

### 2. Start Backend (Terminal 1)
```bash
node server-fixed.cjs
```

### 3. Start Frontend (Terminal 2)
```bash
npm run dev
```

### 4. Access Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/api/health

---

## 👤 Test Accounts

| Email | Password | Role |
|-------|----------|------|
| `admin@rgukt.ac.in` | `admin123` | Admin |
| `john.doe@example.com` | `admin123` | Alumni |
| `student1@rgukt.ac.in` | `admin123` | Student |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET | `/api/profiles/alumni/:id` | Get alumni profile |
| PUT | `/api/profiles/alumni/:id` | Update alumni profile |
| GET | `/api/profiles/student/:id` | Get student profile |
| PUT | `/api/profiles/student/:id` | Update student profile |
| GET | `/api/health` | Health check |

---

## 📚 Documentation

| File | Description |
|------|-------------|
| `frontend/README.md` | Frontend documentation |
| `backend/README.md` | Backend API documentation |
| `database/README.md` | Database schema documentation |
| `PROJECT_DOCUMENTATION.md` | Complete project docs |

---

## ✨ Features

| Alumni | Students | Admin |
|--------|----------|-------|
| ✅ Profile management | ✅ Profile management | ✅ User management |
| ✅ Post jobs | ✅ Apply for jobs | ✅ Event management |
| ✅ Mentor students | ✅ Request mentorship | ✅ Analytics |
| ✅ Network | ✅ Find alumni | ✅ Approvals |
| ✅ Attend events | ✅ Attend events | ✅ Settings |

---

**Version:** 1.0.0  
**Last Updated:** December 18, 2025
