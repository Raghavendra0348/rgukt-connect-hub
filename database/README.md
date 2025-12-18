# 🗄️ RGUKT Alumni Portal - Database

## Overview
PostgreSQL database schema for the RGUKT Alumni Portal application.

## Technology
- **Database:** PostgreSQL 14+
- **Primary Keys:** UUID (gen_random_uuid())
- **Timestamps:** TIMESTAMPTZ with automatic triggers

## Connection Details

```
Host:     localhost
Port:     5432
Database: rgukt_alumni_portal
User:     rgukt_user
Password: rgukt_password
```

## Files

| File | Description |
|------|-------------|
| `database-complete.sql` | ⭐ **Complete schema + sample data** |
| `database-schema-production.sql` | Production-ready schema |
| `database-setup.sql` | Basic setup script |
| `postgresql-schema.sql` | Alternative schema |
| `setup-database.sql` | Initial setup |
| `setup-production-db.cjs` | Node.js DB setup script |
| `setup-production-db.js` | Alternative JS setup |

## Database Schema

### Core Tables

#### 1. `users` - User Accounts
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  status user_status DEFAULT 'active',  -- active/inactive/pending/suspended
  email_verified BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

#### 2. `user_roles` - Role Assignments
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  role app_role NOT NULL,  -- admin/alumni/student
  is_primary BOOLEAN DEFAULT true,
  assigned_at TIMESTAMPTZ
);
```

#### 3. `alumni_profiles` - Alumni Information
```sql
CREATE TABLE alumni_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) UNIQUE,
  batch_year INTEGER NOT NULL,
  branch VARCHAR(100) NOT NULL,
  graduation_year INTEGER,
  current_company VARCHAR(255),
  job_title VARCHAR(255),
  location VARCHAR(255),
  phone_number VARCHAR(20),
  linkedin_url VARCHAR(500),
  bio TEXT,
  skills TEXT[],
  is_mentor BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

#### 4. `student_profiles` - Student Information
```sql
CREATE TABLE student_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) UNIQUE,
  roll_number VARCHAR(50) UNIQUE NOT NULL,
  student_id VARCHAR(50) UNIQUE NOT NULL,
  branch VARCHAR(100) NOT NULL,
  current_year INTEGER NOT NULL,  -- 1 to 4
  batch_year INTEGER NOT NULL,
  graduation_year INTEGER NOT NULL,
  cgpa DECIMAL(4,2),
  phone_number VARCHAR(20),
  skills TEXT[],
  bio TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

### Feature Tables

#### 5. `events` - Events & Reunions
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  event_type event_type,  -- reunion/workshop/seminar/etc
  event_date TIMESTAMPTZ NOT NULL,
  location VARCHAR(255),
  is_online BOOLEAN DEFAULT false,
  max_attendees INTEGER,
  created_by UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true
);
```

#### 6. `jobs` - Job Postings
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  job_type job_type,  -- full-time/part-time/internship/etc
  experience_level experience_level,
  description TEXT NOT NULL,
  skills_required TEXT[],
  posted_by UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true
);
```

#### 7. `mentorship_requests` - Mentorship
```sql
CREATE TABLE mentorship_requests (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  mentor_id UUID REFERENCES users(id),
  topic VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status mentorship_status,  -- pending/accepted/active/completed
  created_at TIMESTAMPTZ
);
```

## Entity Relationship Diagram

```
┌─────────────┐
│   users     │
└──────┬──────┘
       │
       ├──────────────┬──────────────┬──────────────┬──────────────┐
       │              │              │              │              │
       ▼              ▼              ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ user_roles  │ │alumni_prof  │ │student_prof │ │   events    │ │    jobs     │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
                                                       │              │
                                                       ▼              ▼
                                                ┌─────────────┐ ┌─────────────┐
                                                │ event_regs  │ │ job_apps    │
                                                └─────────────┘ └─────────────┘
```

## Enums (Custom Types)

```sql
-- User status
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'pending', 'suspended', 'deleted');

-- User roles
CREATE TYPE app_role AS ENUM ('admin', 'alumni', 'student');

-- Event types
CREATE TYPE event_type AS ENUM ('reunion', 'workshop', 'seminar', 'networking', 'webinar', 'cultural', 'sports', 'other');

-- Job types
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship', 'freelance');

-- Experience levels
CREATE TYPE experience_level AS ENUM ('entry', 'mid', 'senior', 'lead', 'executive');

-- Application status
CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn');

-- Mentorship status
CREATE TYPE mentorship_status AS ENUM ('pending', 'accepted', 'rejected', 'active', 'completed', 'cancelled');
```

## Indexes

Key indexes for performance:
```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);

-- Profiles
CREATE INDEX idx_alumni_profiles_batch_year ON alumni_profiles(batch_year);
CREATE INDEX idx_alumni_profiles_branch ON alumni_profiles(branch);
CREATE INDEX idx_alumni_profiles_skills ON alumni_profiles USING GIN(skills);

CREATE INDEX idx_student_profiles_roll_number ON student_profiles(roll_number);
CREATE INDEX idx_student_profiles_branch ON student_profiles(branch);

-- Jobs
CREATE INDEX idx_jobs_company ON jobs(company);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_jobs_skills ON jobs USING GIN(skills_required);

-- Events
CREATE INDEX idx_events_event_date ON events(event_date DESC);
CREATE INDEX idx_events_is_active ON events(is_active);
```

## Triggers

### Auto-update `updated_at`
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Applied to all tables with updated_at column
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Sample Data

### Default Users
| Email | Role | Password |
|-------|------|----------|
| admin@rgukt.ac.in | admin | admin123 |
| john.doe@example.com | alumni | admin123 |
| jane.smith@example.com | alumni | admin123 |
| student1@rgukt.ac.in | student | admin123 |

## Setup Instructions

### 1. Create Database
```bash
sudo -u postgres psql

CREATE USER rgukt_user WITH PASSWORD 'rgukt_password';
CREATE DATABASE rgukt_alumni_portal OWNER rgukt_user;
GRANT ALL PRIVILEGES ON DATABASE rgukt_alumni_portal TO rgukt_user;
\q
```

### 2. Import Schema
```bash
psql -U rgukt_user -d rgukt_alumni_portal -f database-complete.sql
```

### 3. Verify
```bash
psql -U rgukt_user -d rgukt_alumni_portal -c "SELECT COUNT(*) FROM users;"
# Should return 4 (sample users)
```

## Common Queries

### Get user with role
```sql
SELECT u.*, ur.role 
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
WHERE u.email = 'admin@rgukt.ac.in';
```

### Get alumni profile
```sql
SELECT ap.*, u.full_name, u.email
FROM alumni_profiles ap
JOIN users u ON ap.user_id = u.id
WHERE ap.batch_year = 2020;
```

### Get mentors
```sql
SELECT u.full_name, ap.current_company, ap.job_title, ap.skills
FROM alumni_profiles ap
JOIN users u ON ap.user_id = u.id
WHERE ap.is_mentor = true;
```
