-- RGUKT Alumni Portal PostgreSQL Schema
-- Drop existing tables if they exist
DROP TABLE IF EXISTS mentorship_requests CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS event_registrations CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS student_profiles CASCADE;
DROP TABLE IF EXISTS alumni_profiles CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS app_role CASCADE;
DROP TYPE IF EXISTS user_status CASCADE;

-- Create user status enum
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'pending', 'suspended');

-- Create app role enum
CREATE TYPE app_role AS ENUM ('admin', 'alumni', 'student');

-- Create users table (replaces Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  status user_status DEFAULT 'active',
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create alumni_profiles table
CREATE TABLE alumni_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  batch_year INTEGER NOT NULL,
  branch VARCHAR(100) NOT NULL,
  current_company VARCHAR(255),
  job_title VARCHAR(255),
  location VARCHAR(255),
  phone_number VARCHAR(20),
  bio TEXT,
  linkedin_url VARCHAR(500),
  is_mentor BOOLEAN DEFAULT false,
  profile_visibility JSONB DEFAULT '{"email": true, "phone": false}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create student_profiles table
CREATE TABLE student_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  roll_number VARCHAR(50) UNIQUE NOT NULL,
  branch VARCHAR(100) NOT NULL,
  current_year INTEGER NOT NULL CHECK (current_year BETWEEN 1 AND 4),
  graduation_year INTEGER NOT NULL,
  phone_number VARCHAR(20),
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  cgpa DECIMAL(3,2) CHECK (cgpa >= 0 AND cgpa <= 10),
  achievements TEXT[] DEFAULT '{}',
  career_interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location VARCHAR(255),
  event_type VARCHAR(50) DEFAULT 'other' CHECK (event_type IN ('reunion', 'workshop', 'seminar', 'networking', 'other')),
  max_attendees INTEGER,
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create event_registrations table
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Create jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  job_type VARCHAR(50) DEFAULT 'full-time' CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship')),
  experience_level VARCHAR(50) DEFAULT 'entry' CHECK (experience_level IN ('entry', 'mid', 'senior')),
  salary_range VARCHAR(100),
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  application_deadline TIMESTAMPTZ,
  posted_by UUID REFERENCES users(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create job_applications table
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  cover_letter TEXT,
  resume_url VARCHAR(500),
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- Create mentorship_requests table
CREATE TABLE mentorship_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic VARCHAR(255) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);
CREATE INDEX idx_alumni_profiles_batch_year ON alumni_profiles(batch_year);
CREATE INDEX idx_alumni_profiles_branch ON alumni_profiles(branch);
CREATE INDEX idx_student_profiles_graduation_year ON student_profiles(graduation_year);
CREATE INDEX idx_student_profiles_branch ON student_profiles(branch);
CREATE INDEX idx_events_event_date ON events(event_date);
CREATE INDEX idx_events_is_active ON events(is_active);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX idx_mentorship_requests_status ON mentorship_requests(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_alumni_profiles_updated_at BEFORE UPDATE ON alumni_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentorship_requests_updated_at BEFORE UPDATE ON mentorship_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (password: admin123)
INSERT INTO users (email, password_hash, full_name, status, email_verified) 
VALUES ('admin@rgukt.ac.in', '$2b$10$8K1p/tCLDvr9B8V8F8V8F8V8F8V8F8V8F8V8F8V8F8V8F8V8F8V8Fu', 'System Administrator', 'active', true);

-- Get the admin user ID and insert admin role
INSERT INTO user_roles (user_id, role) 
SELECT id, 'admin' FROM users WHERE email = 'admin@rgukt.ac.in';

-- Insert sample data for testing
INSERT INTO users (email, password_hash, full_name, status, email_verified) VALUES
('john.doe@example.com', '$2b$10$8K1p/tCLDvr9B8V8F8V8F8V8F8V8F8V8F8V8F8V8F8V8F8V8F8V8Fu', 'John Doe', 'active', true),
('jane.smith@example.com', '$2b$10$8K1p/tCLDvr9B8V8F8V8F8V8F8V8F8V8F8V8F8V8F8V8F8V8F8V8Fu', 'Jane Smith', 'active', true);

-- Insert roles for sample users
INSERT INTO user_roles (user_id, role) 
SELECT id, 'alumni' FROM users WHERE email IN ('john.doe@example.com', 'jane.smith@example.com');

-- Insert sample alumni profiles
INSERT INTO alumni_profiles (user_id, batch_year, branch, current_company, job_title, location, is_mentor)
SELECT u.id, 2020, 'Computer Science', 'Tech Corp', 'Software Engineer', 'Hyderabad', true
FROM users u WHERE u.email = 'john.doe@example.com';

INSERT INTO alumni_profiles (user_id, batch_year, branch, current_company, job_title, location, is_mentor)
SELECT u.id, 2019, 'Electronics', 'Innovation Labs', 'Product Manager', 'Bangalore', true
FROM users u WHERE u.email = 'jane.smith@example.com';
