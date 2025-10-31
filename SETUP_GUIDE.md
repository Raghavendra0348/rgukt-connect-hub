# RGUKT Alumni Portal - Setup & Testing Guide

## ✅ What's Been Set Up

### 1. **PostgreSQL Database**
- **Database Name**: `rgukt_alumni_portal`
- **User**: `rgukt_user`
- **Password**: `rgukt_password`
- **Port**: `5432`

### 2. **Database Tables Created**
- `users` - User authentication data
- `user_roles` - User role assignments (admin, alumni, student)
- `alumni_profiles` - Alumni profile information
- `student_profiles` - Student profile information
- `events` - Event management
- `event_registrations` - Event attendee tracking
- `jobs` - Job postings
- `job_applications` - Job applications
- `mentorship_requests` - Mentorship system

### 3. **Backend API Server**
- **File**: `server.cjs`
- **Port**: `3001`
- **Technology**: Express.js + PostgreSQL
- **Authentication**: JWT tokens + bcrypt password hashing

### 4. **Frontend Application**
- **Port**: `5173`
- **Technology**: React + Vite + TypeScript
- **UI**: Tailwind CSS + shadcn/ui components

---

## 🔑 Login Credentials

### Admin Account
- **Email**: `admin@rgukt.ac.in`
- **Password**: `admin123`
- **Role**: admin

### Sample Alumni Accounts
- **Email**: `john.doe@example.com`
- **Password**: `user123`
- **Role**: alumni

- **Email**: `jane.smith@example.com`
- **Password**: `user123`
- **Role**: alumni

### Sample Student Account
- **Email**: `student1@rgukt.ac.in`
- **Password**: `user123`
- **Role**: student

---

## 🚀 How to Run the Application

### Initial Setup (First Time Only)
If this is your first time setting up the project, run:
```bash
node setup-production-db.cjs
```

This will:
- Create all database tables with proper structure
- Add necessary indexes and constraints
- Generate properly hashed passwords
- Insert sample users (admin, alumni, students)
- Verify the database setup

### Start Everything
```bash
npm run dev
```

This will start both:
- Backend API server on http://localhost:3001
- Frontend application on http://localhost:5173

### Start Components Separately

**Backend Only:**
```bash
npm run server
```

**Frontend Only:**
```bash
npm run client
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### User Roles
- `GET /api/user-roles/:userId` - Get user role

### Health Check
- `GET /api/health` - Server health status

---

## 🧪 Testing the Application

### 1. Test Database Connection
```bash
PGPASSWORD=rgukt_password psql -h localhost -U rgukt_user -d rgukt_alumni_portal -c "SELECT COUNT(*) FROM users;"
```

### 2. Test API Server
```bash
curl http://localhost:3001/api/health
```

### 3. Test Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rgukt.ac.in","password":"admin123"}'
```

### 4. Access Frontend
Open your browser and go to:
```
http://localhost:5173
```

---

## 🔧 Common Issues & Solutions

### Issue 1: Server Not Starting
**Solution:**
```bash
# Kill any existing Node processes
pkill -f node

# Start fresh
npm run dev
```

### Issue 2: Database Connection Error
**Solution:**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL if needed
sudo systemctl start postgresql
```

### Issue 3: Port Already in Use
**Solution:**
```bash
# Kill process on port 3001
fuser -k 3001/tcp

# Kill process on port 5173
fuser -k 5173/tcp
```

### Issue 4: Login Not Working
**Solution:**
The password hashes have been updated. Use the correct passwords:
- Admin: `admin@rgukt.ac.in` / `admin123`
- Alumni/Students: see credentials above / `user123`

### Issue 5: New User Registration Not Working
**Solution:**
1. Check server logs for errors:
   ```bash
   tail -f server.log
   ```

2. Verify database connection:
   ```bash
   PGPASSWORD=rgukt_password psql -U rgukt_user -d rgukt_alumni_portal -c "SELECT COUNT(*) FROM users;"
   ```

3. Test registration endpoint directly:
   ```bash
   curl -X POST http://localhost:3001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123","fullName":"Test User","role":"alumni"}'
   ```

4. Common issues:
   - **Duplicate email**: Email already exists in database
   - **Validation error**: Check email format, name length (min 2 chars), password strength
   - **Server not running**: Make sure backend is running on port 3001
   - **Database connection**: Verify PostgreSQL is running

### Issue 6: Cannot Create Database
**Solution:**
If you get permission errors when creating the database, run:
```bash
sudo -u postgres psql -c "CREATE DATABASE rgukt_alumni_portal OWNER rgukt_user;"
```

Then run the setup script:
```bash
node setup-production-db.cjs
```

---

## 📁 Project Structure

```
rgukt-connect-hub/
├── server.cjs                 # Backend Express server
├── postgresql-schema.sql      # Database schema
├── .env                       # Environment variables
├── package.json              # Project dependencies
├── src/
│   ├── lib/
│   │   ├── api-client.ts     # Frontend API client
│   │   ├── auth.ts           # Auth service (backend)
│   │   └── database.ts       # Database connection
│   ├── pages/                # React pages
│   ├── components/           # React components
│   └── hooks/                # React hooks
```

---

## 🎯 Next Steps

1. **Access the application**: http://localhost:5173
2. **Login with admin credentials**
3. **Explore features**:
   - Admin Dashboard
   - Alumni Management
   - Student Management
   - Events & Jobs
   - Mentorship System

---

## 📝 Environment Variables

The `.env` file contains:
```env
# PostgreSQL Database
DATABASE_URL=postgresql://rgukt_user:rgukt_password@localhost:5432/rgukt_alumni_portal
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rgukt_alumni_portal
DB_USER=rgukt_user
DB_PASSWORD=rgukt_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# API Configuration
VITE_API_URL=http://localhost:3001/api
```

---

## ✨ Features Implemented

### For Admin:
- User management
- Role assignment
- Content moderation
- Analytics dashboard
- System settings

### For Alumni:
- Profile management
- Job posting
- Event creation
- Mentorship offering
- Networking

### For Students:
- Profile creation
- Job browsing
- Event registration
- Mentorship requests
- Resource access

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ SQL injection protection (parameterized queries)
- ✅ Input validation

---

## 📊 Database Quick Reference

### Check Users
```sql
SELECT email, full_name, status FROM users;
```

### Check Roles
```sql
SELECT u.email, ur.role 
FROM users u 
LEFT JOIN user_roles ur ON u.id = ur.user_id;
```

### Add New Admin
```sql
-- First create the user through the app, then:
INSERT INTO user_roles (user_id, role) 
VALUES ('user-id-here', 'admin');
```

---

**Project Status**: ✅ Fully Functional
**Last Updated**: November 1, 2025
