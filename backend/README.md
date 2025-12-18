# 🖥️ RGUKT Alumni Portal - Backend

## Overview
Node.js + Express.js REST API server for the RGUKT Alumni Portal.

## Technology Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.x
- **Database Client:** pg (node-postgres)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **CORS:** cors middleware

## Files

| File | Description |
|------|-------------|
| `server-fixed.cjs` | ⭐ **Main production server** |
| `server.cjs` | Alternative server (older version) |
| `server.ts` | TypeScript version (not in use) |
| `debug-server.cjs` | Debug version with extra logging |
| `test-server.js` | Server testing utilities |
| `test-system.cjs` | System integration tests |

## Configuration

### Server Settings
```javascript
const PORT = 3001;
const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRY = '7d';
```

### Database Connection
```javascript
const pool = new Pool({
  user: 'rgukt_user',
  host: 'localhost',
  database: 'rgukt_alumni_portal',
  password: 'rgukt_password',
  port: 5432,
});
```

### CORS Configuration
```javascript
origin: [
  'http://localhost:5173',  // Vite default
  'http://localhost:8080',  // Alternative port
  'http://localhost:8081',  // Alternative port
  'http://localhost:3000',  // CRA default
  'http://localhost:4173'   // Vite preview
]
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/logout` | Logout | Yes |

### Alumni Profiles
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/profiles/alumni/:userId` | Get alumni profile | Yes |
| POST | `/api/profiles/alumni` | Create alumni profile | Yes |
| PUT | `/api/profiles/alumni/:userId` | Update alumni profile | Yes |

### Student Profiles
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/profiles/student/:userId` | Get student profile | Yes |
| POST | `/api/profiles/student` | Create student profile | Yes |
| PUT | `/api/profiles/student/:userId` | Update student profile | Yes |

### System
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Health check | No |
| GET | `/api/user-roles/:userId` | Get user role | Yes |

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "role": "alumni"  // or "student"
}

# Response
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "alumni"
  },
  "token": "jwt_token_here"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

# Response
{
  "user": { ... },
  "token": "jwt_token_here"
}
```

### Get Profile (with Auth)
```bash
GET /api/profiles/alumni/user-uuid-here
Authorization: Bearer jwt_token_here

# Response
{
  "id": "profile-uuid",
  "user_id": "user-uuid",
  "batch_year": 2020,
  "branch": "Computer Science",
  "current_company": "Google",
  "job_title": "Software Engineer",
  ...
}
```

## Running the Server

```bash
# Start the server
node server-fixed.cjs

# Expected output:
# 🚀 Starting RGUKT Alumni Portal API Server...
# ✅ Connected to PostgreSQL database
# ✅ Server running on http://localhost:3001
```

## Testing

```bash
# Health check
curl http://localhost:3001/api/health

# Response:
{
  "status": "OK",
  "timestamp": "2025-12-18T...",
  "database": "connected",
  "users": 8,
  "version": "1.0.0"
}
```

## Error Handling

All errors return JSON:
```json
{
  "error": "Error message here",
  "details": "Optional additional details"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
