# 🔧 RGUKT Alumni Portal - Terminal Fix Guide

## ✅ Complete System Fix & Troubleshooting

This document provides step-by-step instructions to fix all issues and get the RGUKT Alumni Portal running perfectly.

---

## 🚀 Quick Fix (One Command)

```bash
chmod +x check-system.sh && ./check-system.sh
```

This single command will:
- ✅ Install all dependencies
- ✅ Setup PostgreSQL database
- ✅ Create sample users with proper password hashes
- ✅ Start backend server on port 3001
- ✅ Test all authentication endpoints
- ✅ Start frontend on port 5173
- ✅ Verify everything is working

---

## 🐛 Common Issues Fixed

### Issue 1: "New users not being created"
**Root Cause:** Incorrect password hashing or missing database tables
**Fix Applied:**
- ✅ Proper bcrypt password hashing (10 rounds)
- ✅ Complete database schema with all constraints
- ✅ User registration endpoint with validation
- ✅ Sample users with working credentials

### Issue 2: "Login not working"
**Root Cause:** Password hash mismatch or missing JWT configuration
**Fix Applied:**
- ✅ Correct password comparison using bcrypt
- ✅ JWT token generation and verification
- ✅ Proper error handling for invalid credentials
- ✅ Session management in frontend

### Issue 3: "Database connection failed"
**Root Cause:** PostgreSQL not running or incorrect configuration
**Fix Applied:**
- ✅ PostgreSQL service startup
- ✅ User and database creation with proper permissions
- ✅ Connection pooling and error handling
- ✅ Environment variable configuration

### Issue 4: "Frontend not connecting to backend"
**Root Cause:** CORS issues or incorrect API endpoints
**Fix Applied:**
- ✅ CORS configuration for development
- ✅ Custom API client replacing Supabase
- ✅ Proper error handling in requests
- ✅ Token storage and management

---

## 🧪 Manual Testing Commands

### Test Database Connection
```bash
sudo -u postgres psql -d rgukt_alumni_portal -c "SELECT COUNT(*) FROM users;"
```
**Expected:** `4` (admin + 2 alumni + 1 student)

### Test Backend Health
```bash
curl http://localhost:3001/api/health
```
**Expected:** `{"status":"OK","database":"connected","users":4}`

### Test Admin Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rgukt.ac.in","password":"admin123"}'
```
**Expected:** Response with `token` field

### Test User Registration
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"test123","fullName":"New User","role":"alumni"}'
```
**Expected:** Response with `token` and `user` fields

---

## 🔑 Working Login Credentials

### Admin Account
```
Email: admin@rgukt.ac.in
Password: admin123
Role: admin
Features: Full system access, user management, analytics
```

### Alumni Accounts
```
Email: john.doe@example.com
Password: user123
Role: alumni
Profile: Google Software Engineer, Bangalore

Email: jane.smith@example.com
Password: user123
Role: alumni
Profile: Microsoft Product Manager, Hyderabad
```

### Student Account
```
Email: student1@rgukt.ac.in
Password: user123
Role: student
Profile: CSE 3rd Year, Roll R200001, CGPA 8.5
```

---

## 🛠️ Manual Fix Steps (if script fails)

### Step 1: Install Dependencies
```bash
cd "/home/a-raghavendra/Desktop/Alumini Portal/rgukt-connect-hub"
npm install
```

### Step 2: Start PostgreSQL
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Step 3: Create Database User
```bash
sudo -u postgres psql -c "CREATE USER rgukt_user WITH PASSWORD 'rgukt_password';"
sudo -u postgres psql -c "ALTER USER rgukt_user CREATEDB;"
```

### Step 4: Create Database
```bash
sudo -u postgres psql -c "CREATE DATABASE rgukt_alumni_portal OWNER rgukt_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE rgukt_alumni_portal TO rgukt_user;"
```

### Step 5: Setup Schema and Data
```bash
node setup-production-db.cjs
```

### Step 6: Start Backend
```bash
node server.cjs > server.log 2>&1 &
echo $! > server.pid
```

### Step 7: Start Frontend
```bash
npm run client > frontend.log 2>&1 &
echo $! > frontend.pid
```

### Step 8: Test Everything
```bash
node test-system.cjs
```

---

## 📊 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   PostgreSQL    │
│   React + Vite  │◄──►│   Express.js    │◄──►│   Database      │
│   Port 5173     │    │   Port 3001     │    │   Port 5432     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌─────────┐            ┌─────────────┐        ┌─────────────┐
    │ shadcn  │            │ JWT + bcrypt│        │ 15+ Tables  │
    │ Tailwind│            │ CORS + Helmet│       │ Constraints │
    │ TypeScript│          │ Validation  │        │ Indexes     │
    └─────────┘            └─────────────┘        └─────────────┘
```

---

## 🔄 Process Management

### Check Running Processes
```bash
lsof -i :3001  # Backend
lsof -i :5173  # Frontend
```

### Stop All Processes
```bash
kill $(cat server.pid)     # Stop backend
kill $(cat frontend.pid)   # Stop frontend
pkill -f "node.*server"    # Kill all node servers
pkill -f "vite"            # Kill vite
```

### View Logs
```bash
tail -f server.log     # Backend logs
tail -f frontend.log   # Frontend logs
```

---

## 🧩 File Structure

```
rgukt-connect-hub/
├── check-system.sh              # 🆕 Complete system fix script
├── setup-production-db.cjs      # Database setup with proper hashes
├── server.cjs                   # Express backend server
├── test-system.cjs              # Comprehensive test suite
├── package.json                 # Updated dependencies & scripts
├── .env                         # Environment configuration
├── database-schema-production.sql # Clean production schema
├── src/
│   ├── lib/
│   │   ├── api-client.ts        # Custom API client (replaces Supabase)
│   │   ├── auth.ts              # Authentication utilities
│   │   └── database.ts          # Database connection
│   ├── pages/                   # React pages
│   ├── components/              # React components
│   └── hooks/                   # React hooks
├── server.log                   # Backend server logs
├── frontend.log                 # Frontend development logs
├── server.pid                   # Backend process ID
└── frontend.pid                 # Frontend process ID
```

---

## 🎯 Success Indicators

When everything is working correctly, you should see:

1. **Database**: 4 users created with proper roles
2. **Backend**: Health endpoint returns `{"status":"OK","users":4}`
3. **Authentication**: All test logins return JWT tokens
4. **Frontend**: Loads at http://localhost:5173 without console errors
5. **Login**: All provided credentials work in the UI

---

## 📞 If You Still Have Issues

1. **Check Logs**: `tail -f server.log` and `tail -f frontend.log`
2. **Verify Ports**: Make sure 3001 and 5173 are not used by other apps
3. **PostgreSQL**: Ensure it's running with `sudo systemctl status postgresql`
4. **Permissions**: Database user has correct permissions
5. **Dependencies**: All npm packages are installed correctly

---

## ✅ Final Verification Checklist

- [ ] PostgreSQL is running
- [ ] Database `rgukt_alumni_portal` exists with 4 users
- [ ] Backend server responds to health check
- [ ] All login credentials work via API
- [ ] New user registration works
- [ ] Frontend loads without errors
- [ ] Login works in the browser UI
- [ ] User can navigate between pages

---

**Status**: ✅ All systems operational and tested
**Last Updated**: November 7, 2025
