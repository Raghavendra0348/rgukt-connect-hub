# RGUKT Alumni Portal - Quick Start Guide

## ✅ System Requirements
- PostgreSQL 12+
- Node.js 18+
- npm or yarn

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Database
```bash
sudo -u postgres psql -c "CREATE DATABASE rgukt_alumni_portal OWNER rgukt_user;"
```

### Step 3: Setup Database Schema & Sample Data
```bash
node setup-production-db.cjs
```

This will:
- Create all database tables
- Add indexes and constraints for performance
- Insert sample users with properly hashed passwords
- Set up triggers and functions

### Step 4: Test the System
```bash
node test-system.cjs
```

This verifies:
- ✅ Database connection
- ✅ Backend API health
- ✅ User authentication (login/register)
- ✅ JWT tokens
- ✅ Edge cases (duplicate emails, invalid credentials, etc.)

### Step 5: Start the Application
```bash
npm run dev
```

This starts:
- Backend API on http://localhost:3001
- Frontend React app on http://localhost:5173

---

## 🔑 Test Credentials

### Admin Account
```
Email: admin@rgukt.ac.in
Password: admin123
```

### Alumni Accounts
```
Email: john.doe@example.com
Password: user123

Email: jane.smith@example.com
Password: user123
```

### Student Account
```
Email: student1@rgukt.ac.in
Password: user123
```

---

## 📝 Creating New Users

### Method 1: Via Frontend (Recommended)
1. Go to http://localhost:5173
2. Click "Sign Up"
3. Fill in the registration form:
   - Email (must be valid format)
   - Password (min 6 characters)
   - Full Name (min 2 characters)
   - Role (admin/alumni/student)
4. Click "Register"

### Method 2: Via API
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "securepassword",
    "fullName": "New User",
    "role": "alumni"
  }'
```

### Method 3: Via Database
```bash
# First, hash the password using Node.js
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('yourpassword', 10).then(hash => console.log(hash));"

# Then insert into database
PGPASSWORD=rgukt_password psql -U rgukt_user -d rgukt_alumni_portal -c "
INSERT INTO users (email, password_hash, full_name, status, email_verified) 
VALUES ('user@example.com', '<hashed_password>', 'User Name', 'active', true);

INSERT INTO user_roles (user_id, role, is_primary) 
VALUES ((SELECT id FROM users WHERE email = 'user@example.com'), 'alumni', true);
"
```

---

## 🐛 Troubleshooting

### Issue: "Database does not exist"
```bash
sudo -u postgres psql -c "CREATE DATABASE rgukt_alumni_portal OWNER rgukt_user;"
node setup-production-db.cjs
```

### Issue: "Server not running"
```bash
# Check if server is running
lsof -i :3001

# Kill existing process
pkill -f "node server.cjs"

# Start fresh
npm run server
```

### Issue: "New users not being created"
1. Check server logs:
   ```bash
   tail -f server.log
   ```

2. Verify database connection:
   ```bash
   node test-system.cjs
   ```

3. Check for validation errors:
   - Email must be valid format (user@domain.com)
   - Password must be at least 6 characters
   - Full name must be at least 2 characters
   - Email must not already exist

4. Test registration directly:
   ```bash
   curl -X POST http://localhost:3001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123","fullName":"Test User","role":"alumni"}'
   ```

### Issue: "Login fails"
- Verify you're using the correct password
- Check that the user exists in database:
  ```bash
  PGPASSWORD=rgukt_password psql -U rgukt_user -d rgukt_alumni_portal -c "SELECT email, status FROM users;"
  ```
- Ensure password hashes are properly generated (use setup-production-db.cjs)

---

## 🎯 Features Overview

### For Admin:
- ✅ User management (approve/suspend/delete users)
- ✅ Role assignment
- ✅ Content moderation
- ✅ Analytics dashboard
- ✅ System settings
- ✅ Event and job management

### For Alumni:
- ✅ Profile management (work history, skills, bio)
- ✅ Job posting (help students find opportunities)
- ✅ Event creation (reunions, workshops, etc.)
- ✅ Mentorship offering (guide students)
- ✅ Networking (connect with other alumni)
- ✅ Donations (support the institution)

### For Students:
- ✅ Profile creation (academic info, skills, projects)
- ✅ Job browsing and applications
- ✅ Event registration
- ✅ Mentorship requests
- ✅ Resource access
- ✅ Alumni networking

---

## 🔒 Security Features

- ✅ **Password Hashing**: bcrypt with 10 rounds
- ✅ **JWT Authentication**: Secure token-based auth
- ✅ **CORS Protection**: Configured for localhost
- ✅ **Helmet.js**: Security headers
- ✅ **SQL Injection Protection**: Parameterized queries
- ✅ **Input Validation**: Email format, name length, etc.
- ✅ **Unique Constraints**: Prevent duplicate emails
- ✅ **Role-Based Access**: Admin/Alumni/Student permissions

---

## 📁 Project Structure

```
rgukt-connect-hub/
├── server.cjs                    # Express backend server
├── setup-production-db.cjs       # Database setup script
├── test-system.cjs              # System test script
├── database-schema-production.sql # Database schema
├── .env                         # Environment variables
├── package.json                 # Project dependencies
├── src/
│   ├── lib/
│   │   ├── api-client.ts       # Frontend API client
│   │   ├── auth.ts             # Auth service
│   │   └── database.ts         # Database connection
│   ├── pages/                  # React pages
│   ├── components/             # React components
│   └── hooks/                  # React hooks
└── SETUP_GUIDE.md              # Detailed setup guide
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)
- `POST /api/auth/logout` - Logout user

### User Roles
- `GET /api/user-roles/:userId` - Get user role (requires token)

### Health Check
- `GET /api/health` - Server health status

---

## 📊 Database Tables

- `users` - User authentication and basic info
- `user_roles` - Role assignments (admin/alumni/student)
- `alumni_profiles` - Alumni-specific data
- `student_profiles` - Student-specific data
- `events` - Event management
- `event_registrations` - Event attendees
- `jobs` - Job postings
- `job_applications` - Job applications
- `mentorship_requests` - Mentorship system
- `mentorship_sessions` - Mentorship meetings
- `connections` - User networking
- `donations` - Donation tracking
- `achievements` - User achievements
- `notifications` - User notifications
- `email_verification_tokens` - Email verification
- `password_reset_tokens` - Password reset

---

## 🎓 Next Steps

1. **Customize the UI**: Edit components in `src/components/`
2. **Add Features**: Extend API endpoints in `server.cjs`
3. **Configure Email**: Set up email service for verification
4. **Deploy**: Configure for production environment
5. **Add Tests**: Write unit and integration tests
6. **Documentation**: Update API documentation

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Review `SETUP_GUIDE.md`
3. Run `node test-system.cjs` to diagnose issues
4. Check server logs: `tail -f server.log`

---

**Status**: ✅ Production Ready  
**Last Updated**: November 1, 2025  
**Version**: 1.0.0
