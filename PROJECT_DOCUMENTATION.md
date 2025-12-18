# 🎓 RGUKT Alumni Portal - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Frontend Details](#frontend-details)
5. [Backend Details](#backend-details)
6. [Database Details](#database-details)
7. [How to Run](#how-to-run)
8. [API Documentation](#api-documentation)
9. [Features](#features)

---

## 🎯 Project Overview

**RGUKT Alumni Portal** is a full-stack web application designed to connect RGUKT (Rajiv Gandhi University of Knowledge Technologies) alumni, students, and administrators. The platform facilitates networking, mentorship, job postings, events, and donations.

### Key Objectives:
- Connect alumni with current students for mentorship
- Enable job postings and applications
- Manage alumni events and reunions
- Facilitate donations to the institution
- Provide a networking platform for the RGUKT community

---

## 🛠️ Technology Stack

### 📱 FRONTEND
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI Framework |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Vite** | 5.x | Build tool & Dev server |
| **TailwindCSS** | 3.x | Utility-first CSS framework |
| **shadcn/ui** | Latest | UI component library |
| **React Router DOM** | 6.x | Client-side routing |
| **Lucide React** | Latest | Icon library |

### 🖥️ BACKEND
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 4.x | Web framework |
| **bcryptjs** | 2.x | Password hashing |
| **jsonwebtoken** | 9.x | JWT authentication |
| **pg (node-postgres)** | 8.x | PostgreSQL client |
| **cors** | 2.x | CORS middleware |

### 🗄️ DATABASE
| Technology | Version | Purpose |
|------------|---------|---------|
| **PostgreSQL** | 14+ | Relational database |
| **UUID** | Built-in | Primary key generation |

---

## 📁 Project Structure

```
rgukt-connect-hub/
│
├── 📂 FRONTEND (React + TypeScript + Vite)
│   ├── index.html                    # Entry HTML file
│   ├── vite.config.ts               # Vite configuration
│   ├── tailwind.config.ts           # TailwindCSS config
│   ├── tsconfig.json                # TypeScript config
│   ├── components.json              # shadcn/ui config
│   ├── postcss.config.js            # PostCSS config
│   │
│   ├── 📂 src/                      # Source code
│   │   ├── main.tsx                 # React entry point
│   │   ├── App.tsx                  # Main App component
│   │   ├── App.css                  # App-specific styles
│   │   ├── index.css                # Global styles + Tailwind
│   │   │
│   │   ├── 📂 pages/                # Page components (routes)
│   │   │   ├── Auth.tsx             # Login/Register page
│   │   │   ├── Profile.tsx          # User profile management
│   │   │   ├── Index.tsx            # Landing page
│   │   │   ├── AlumniDashboard.tsx  # Alumni dashboard
│   │   │   ├── StudentDashboard.tsx # Student dashboard
│   │   │   ├── AdminDashboard.tsx   # Admin dashboard
│   │   │   ├── Events.tsx           # Events listing
│   │   │   ├── Jobs.tsx             # Jobs listing
│   │   │   ├── FindAlumni.tsx       # Alumni search
│   │   │   └── ...                  # Other pages
│   │   │
│   │   ├── 📂 components/           # Reusable components
│   │   │   ├── Navbar.tsx           # Navigation bar
│   │   │   ├── Sidebar.tsx          # Side navigation
│   │   │   ├── DashboardLayout.tsx  # Dashboard wrapper
│   │   │   ├── ProtectedRoute.tsx   # Auth guard
│   │   │   ├── ResponsiveLayout.tsx # Responsive wrapper
│   │   │   └── 📂 ui/               # shadcn/ui components
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── input.tsx
│   │   │       └── ...
│   │   │
│   │   ├── 📂 hooks/                # Custom React hooks
│   │   │   ├── use-auth.ts          # Authentication hook
│   │   │   ├── use-toast.ts         # Toast notifications
│   │   │   └── use-mobile.tsx       # Mobile detection
│   │   │
│   │   ├── 📂 lib/                  # Utility libraries
│   │   │   ├── api-client.ts        # API client (replaces Supabase)
│   │   │   ├── auth.ts              # Auth utilities
│   │   │   ├── database.ts          # Database helpers
│   │   │   └── utils.ts             # Common utilities
│   │   │
│   │   └── 📂 assets/               # Static assets
│   │       └── hero-bg.jpg          # Hero background
│   │
│   └── 📂 public/                   # Public static files
│       ├── favicon.svg
│       ├── placeholder.svg
│       └── robots.txt
│
├── 📂 BACKEND (Node.js + Express)
│   ├── server-fixed.cjs             # ⭐ Main backend server
│   ├── server.cjs                   # Alternative server
│   ├── server.ts                    # TypeScript server (unused)
│   ├── debug-server.cjs             # Debug version
│   ├── test-server.js               # Server tests
│   └── test-system.cjs              # System tests
│
├── 📂 DATABASE (PostgreSQL)
│   ├── database-complete.sql        # ⭐ Complete schema + sample data
│   ├── database-schema-production.sql # Production schema
│   ├── database-setup.sql           # Basic setup
│   ├── postgresql-schema.sql        # Alternative schema
│   ├── setup-database.sql           # Setup script
│   ├── setup-production-db.cjs      # Production DB setup
│   └── setup-production-db.js       # JS version
│
├── 📂 SCRIPTS (Shell & Utilities)
│   ├── start-app.sh                 # Start both frontend & backend
│   ├── stop-app.sh                  # Stop running services
│   ├── check-system.sh              # Health check script
│   ├── quick-fix.sh                 # Quick fixes
│   ├── fix-everything.sh            # Full fix script
│   ├── setup.sh                     # Initial setup
│   └── deploy-to-github.sh          # GitHub deployment
│
├── 📂 DOCUMENTATION
│   ├── README.md                    # Main readme
│   ├── PROJECT_SUMMARY.md           # Project summary
│   ├── ARCHITECTURE.md              # Architecture details
│   ├── SETUP_GUIDE.md               # Setup instructions
│   ├── DEPLOYMENT_GUIDE.md          # Deployment guide
│   ├── QUICK_START.md               # Quick start guide
│   ├── FIXES_APPLIED.md             # Fixes documentation
│   └── ...                          # Other docs
│
├── 📂 CONFIG FILES
│   ├── package.json                 # NPM dependencies
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Env template
│   ├── .gitignore                   # Git ignore rules
│   ├── vercel.json                  # Vercel deployment
│   └── eslint.config.js             # ESLint config
│
└── 📂 BUILD OUTPUT
    └── dist/                        # Production build
```

---

## 📱 FRONTEND Details

### Entry Point
```
src/main.tsx → App.tsx → React Router → Pages
```

### Routing Structure
| Route | Component | Access |
|-------|-----------|--------|
| `/` | Index.tsx | Public |
| `/auth` | Auth.tsx | Public |
| `/profile` | Profile.tsx | Authenticated |
| `/alumni-dashboard` | AlumniDashboard.tsx | Alumni only |
| `/student-dashboard` | StudentDashboard.tsx | Student only |
| `/admin-dashboard` | AdminDashboard.tsx | Admin only |
| `/events` | Events.tsx | Authenticated |
| `/jobs` | Jobs.tsx | Authenticated |
| `/find-alumni` | FindAlumni.tsx | Authenticated |

### Key Frontend Files

#### `src/lib/api-client.ts`
Custom API client that replaces Supabase. Handles all API calls to the backend.

```typescript
// Key methods:
- auth.signUp()           // User registration
- auth.signInWithPassword() // User login
- auth.getUser()          // Get current user
- auth.signOut()          // Logout
- profiles.getAlumniProfile()
- profiles.updateAlumniProfile()
- profiles.getStudentProfile()
- profiles.updateStudentProfile()
```

#### `src/hooks/use-auth.ts`
Authentication context and hook for managing user state.

#### `src/pages/Auth.tsx`
Login and registration page with form validation.

#### `src/pages/Profile.tsx`
Profile management for alumni and students.

---

## 🖥️ BACKEND Details

### Main Server File: `server-fixed.cjs`

### Server Configuration
```javascript
Port: 3001
CORS Origins: localhost:5173, 8080, 8081, 3000, 4173
JWT Secret: 'your-super-secret-jwt-key-change-this-in-production'
JWT Expiry: 7 days
```

### Database Connection
```javascript
{
  user: 'rgukt_user',
  host: 'localhost',
  database: 'rgukt_alumni_portal',
  password: 'rgukt_password',
  port: 5432
}
```

### API Endpoints

#### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout |

#### Profiles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profiles/alumni/:userId` | Get alumni profile |
| POST | `/api/profiles/alumni` | Create alumni profile |
| PUT | `/api/profiles/alumni/:userId` | Update alumni profile |
| GET | `/api/profiles/student/:userId` | Get student profile |
| POST | `/api/profiles/student` | Create student profile |
| PUT | `/api/profiles/student/:userId` | Update student profile |

#### System
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/user-roles/:userId` | Get user role |

---

## 🗄️ DATABASE Details

### Database: PostgreSQL
- **Database Name:** `rgukt_alumni_portal`
- **User:** `rgukt_user`
- **Password:** `rgukt_password`
- **Port:** `5432`

### Tables Overview

| Table | Description | Key Fields |
|-------|-------------|------------|
| `users` | Core user accounts | id, email, password_hash, full_name, status |
| `user_roles` | User role assignments | user_id, role (admin/alumni/student) |
| `alumni_profiles` | Alumni information | user_id, batch_year, branch, company, job_title |
| `student_profiles` | Student information | user_id, roll_number, branch, current_year |
| `events` | Events/reunions | title, event_date, location, organizer |
| `event_registrations` | Event signups | event_id, user_id, status |
| `jobs` | Job postings | title, company, location, job_type |
| `job_applications` | Job applications | job_id, user_id, status, resume_url |
| `mentorship_requests` | Mentorship | student_id, mentor_id, topic, status |
| `mentorship_sessions` | Mentorship sessions | request_id, scheduled_at, notes |
| `connections` | Networking | requester_id, recipient_id, status |
| `donations` | Donations | user_id, amount, purpose |
| `achievements` | User achievements | user_id, title, description |
| `notifications` | User notifications | user_id, type, message, is_read |

### Entity Relationship

```
users (1) ─────────┬──────────── (1) alumni_profiles
                   │
                   ├──────────── (1) student_profiles
                   │
                   ├──────────── (*) user_roles
                   │
                   ├──────────── (*) events (created_by)
                   │
                   ├──────────── (*) event_registrations
                   │
                   ├──────────── (*) jobs (posted_by)
                   │
                   ├──────────── (*) job_applications
                   │
                   ├──────────── (*) mentorship_requests (as student/mentor)
                   │
                   ├──────────── (*) connections
                   │
                   ├──────────── (*) donations
                   │
                   ├──────────── (*) achievements
                   │
                   └──────────── (*) notifications
```

### Sample Users (from database-complete.sql)
| Email | Role | Password |
|-------|------|----------|
| admin@rgukt.ac.in | admin | admin123 |
| john.doe@example.com | alumni | admin123 |
| jane.smith@example.com | alumni | admin123 |
| student1@rgukt.ac.in | student | admin123 |

---

## 🚀 How to Run

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Step 1: Setup Database
```bash
# Start PostgreSQL
sudo systemctl start postgresql

# Create database and user
sudo -u postgres psql
CREATE USER rgukt_user WITH PASSWORD 'rgukt_password';
CREATE DATABASE rgukt_alumni_portal OWNER rgukt_user;
GRANT ALL PRIVILEGES ON DATABASE rgukt_alumni_portal TO rgukt_user;
\q

# Import schema
psql -U rgukt_user -d rgukt_alumni_portal -f database-complete.sql
```

### Step 2: Install Dependencies
```bash
cd rgukt-connect-hub
npm install
```

### Step 3: Start Backend Server
```bash
node server-fixed.cjs
# Server runs at http://localhost:3001
```

### Step 4: Start Frontend (new terminal)
```bash
npm run dev
# Frontend runs at http://localhost:5173 (or 8080)
```

### Step 5: Access Application
- Frontend: http://localhost:5173 or http://localhost:8080
- Backend API: http://localhost:3001/api
- Health Check: http://localhost:3001/api/health

---

## ✨ Features

### For Alumni
- ✅ Profile management (company, job title, skills)
- ✅ Post job opportunities
- ✅ Mentor students
- ✅ View and register for events
- ✅ Network with other alumni
- ✅ Make donations

### For Students
- ✅ Profile management (roll number, branch, CGPA)
- ✅ Search and apply for jobs
- ✅ Request mentorship from alumni
- ✅ View events
- ✅ Track achievements

### For Admins
- ✅ User management
- ✅ Approve alumni registrations
- ✅ Create and manage events
- ✅ Analytics dashboard
- ✅ System settings

---

## 📊 Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| Database | ✅ Running | PostgreSQL with 8 users |
| Backend | ✅ Running | Port 3001 |
| Frontend | ✅ Ready | Vite dev server |
| Authentication | ✅ Working | JWT-based |
| Registration | ✅ Working | All roles supported |
| Login | ✅ Working | With role detection |
| Alumni Profile | ✅ Working | CRUD operations |
| Student Profile | ✅ Working | CRUD operations |
| CORS | ✅ Fixed | Multiple ports supported |

---

## 📝 Environment Variables

Create a `.env` file:
```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# Database (for backend)
DB_USER=rgukt_user
DB_HOST=localhost
DB_NAME=rgukt_alumni_portal
DB_PASSWORD=rgukt_password
DB_PORT=5432

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRY=7d
```

---

## 🔧 Development Commands

```bash
# Frontend development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
node server-fixed.cjs    # Start backend server

# Database
psql -U rgukt_user -d rgukt_alumni_portal   # Connect to DB
```

---

## 📞 Support

For issues or questions, refer to:
- `SETUP_GUIDE.md` - Installation help
- `FIXES_APPLIED.md` - Known issues and fixes
- `ARCHITECTURE.md` - Technical architecture

---

**Last Updated:** December 18, 2025
**Version:** 1.0.0
