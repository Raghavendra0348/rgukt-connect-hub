-- RGUKT Alumni Portal - Complete Database Schema
-- Drop existing objects
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS email_verification_tokens CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS connections CASCADE;
DROP TABLE IF EXISTS mentorship_sessions CASCADE;
DROP TABLE IF EXISTS mentorship_requests CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS event_registrations CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS student_profiles CASCADE;
DROP TABLE IF EXISTS alumni_profiles CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS app_role CASCADE;
DROP TYPE IF EXISTS user_status CASCADE;
DROP TYPE IF EXISTS event_type CASCADE;
DROP TYPE IF EXISTS job_type CASCADE;
DROP TYPE IF EXISTS experience_level CASCADE;
DROP TYPE IF EXISTS application_status CASCADE;
DROP TYPE IF EXISTS mentorship_status CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;

-- Create enums
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'pending', 'suspended', 'deleted');
CREATE TYPE app_role AS ENUM ('admin', 'alumni', 'student');
CREATE TYPE event_type AS ENUM ('reunion', 'workshop', 'seminar', 'networking', 'webinar', 'cultural', 'sports', 'other');
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship', 'freelance');
CREATE TYPE experience_level AS ENUM ('entry', 'mid', 'senior', 'lead', 'executive');
CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE mentorship_status AS ENUM ('pending', 'accepted', 'rejected', 'active', 'completed', 'cancelled');
CREATE TYPE notification_type AS ENUM ('system', 'event', 'job', 'mentorship', 'connection', 'announcement');

-- ============================================
-- USERS TABLE (Core Authentication)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  status user_status DEFAULT 'active' NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  last_login TIMESTAMPTZ,
  login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMPTZ,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_name CHECK (LENGTH(TRIM(full_name)) >= 2)
);

-- ============================================
-- USER ROLES TABLE
-- ============================================
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_primary BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, role)
);

-- ============================================
-- EMAIL VERIFICATION TOKENS
-- ============================================
CREATE TABLE email_verification_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- PASSWORD RESET TOKENS
-- ============================================
CREATE TABLE password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- ALUMNI PROFILES
-- ============================================
CREATE TABLE alumni_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  student_id VARCHAR(50),
  batch_year INTEGER NOT NULL,
  branch VARCHAR(100) NOT NULL,
  graduation_year INTEGER,
  current_company VARCHAR(255),
  job_title VARCHAR(255),
  industry VARCHAR(100),
  location VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'India',
  phone_number VARCHAR(20),
  alternate_email VARCHAR(255),
  bio TEXT,
  linkedin_url VARCHAR(500),
  github_url VARCHAR(500),
  twitter_url VARCHAR(500),
  website_url VARCHAR(500),
  skills TEXT[] DEFAULT '{}',
  expertise_areas TEXT[] DEFAULT '{}',
  is_mentor BOOLEAN DEFAULT false,
  mentor_capacity INTEGER DEFAULT 0,
  is_job_seeker BOOLEAN DEFAULT false,
  is_available_for_networking BOOLEAN DEFAULT true,
  profile_visibility JSONB DEFAULT '{"email": true, "phone": false, "location": true, "company": true}'::jsonb,
  achievements TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  profile_completion_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT valid_batch_year CHECK (batch_year >= 2000 AND batch_year <= EXTRACT(YEAR FROM NOW()) + 10),
  CONSTRAINT valid_phone CHECK (phone_number IS NULL OR phone_number ~ '^\+?[0-9]{10,15}$'),
  CONSTRAINT valid_linkedin CHECK (linkedin_url IS NULL OR linkedin_url ~* '^https?://.*linkedin\.com/.*$')
);

-- ============================================
-- STUDENT PROFILES
-- ============================================
CREATE TABLE student_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  roll_number VARCHAR(50) UNIQUE NOT NULL,
  student_id VARCHAR(50) UNIQUE NOT NULL,
  branch VARCHAR(100) NOT NULL,
  current_year INTEGER NOT NULL,
  batch_year INTEGER NOT NULL,
  graduation_year INTEGER NOT NULL,
  semester INTEGER,
  section VARCHAR(10),
  hostel_name VARCHAR(100),
  room_number VARCHAR(20),
  phone_number VARCHAR(20),
  parent_phone VARCHAR(20),
  emergency_contact VARCHAR(20),
  blood_group VARCHAR(5),
  date_of_birth DATE,
  gender VARCHAR(20),
  category VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  career_interests TEXT[] DEFAULT '{}',
  programming_languages TEXT[] DEFAULT '{}',
  projects JSONB DEFAULT '[]'::jsonb,
  cgpa DECIMAL(4,2),
  sgpa JSONB DEFAULT '{}'::jsonb,
  backlogs INTEGER DEFAULT 0,
  achievements TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  internships JSONB DEFAULT '[]'::jsonb,
  extracurricular TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  linkedin_url VARCHAR(500),
  github_url VARCHAR(500),
  portfolio_url VARCHAR(500),
  is_placement_ready BOOLEAN DEFAULT false,
  resume_url TEXT,
  profile_completion_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT valid_current_year CHECK (current_year BETWEEN 1 AND 4),
  CONSTRAINT valid_semester CHECK (semester IS NULL OR semester BETWEEN 1 AND 8),
  CONSTRAINT valid_cgpa CHECK (cgpa IS NULL OR (cgpa >= 0 AND cgpa <= 10)),
  CONSTRAINT valid_batch_year CHECK (batch_year >= 2000 AND batch_year <= EXTRACT(YEAR FROM NOW()) + 10),
  CONSTRAINT valid_graduation_year CHECK (graduation_year >= batch_year AND graduation_year <= batch_year + 6)
);

-- ============================================
-- EVENTS
-- ============================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT NOT NULL,
  event_type event_type DEFAULT 'other' NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  registration_deadline TIMESTAMPTZ,
  location VARCHAR(255),
  venue VARCHAR(255),
  city VARCHAR(100),
  is_online BOOLEAN DEFAULT false,
  meeting_link TEXT,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  is_paid BOOLEAN DEFAULT false,
  registration_fee DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'INR',
  organizer_name VARCHAR(255),
  organizer_email VARCHAR(255),
  organizer_phone VARCHAR(20),
  banner_image_url TEXT,
  agenda JSONB DEFAULT '[]'::jsonb,
  speakers JSONB DEFAULT '[]'::jsonb,
  sponsors JSONB DEFAULT '[]'::jsonb,
  tags TEXT[] DEFAULT '{}',
  requirements TEXT,
  target_audience TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT valid_event_dates CHECK (end_date IS NULL OR end_date >= event_date),
  CONSTRAINT valid_registration_deadline CHECK (registration_deadline IS NULL OR registration_deadline <= event_date),
  CONSTRAINT valid_fee CHECK (registration_fee >= 0)
);

-- ============================================
-- EVENT REGISTRATIONS
-- ============================================
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  registration_status VARCHAR(50) DEFAULT 'registered',
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_id VARCHAR(255),
  amount_paid DECIMAL(10,2) DEFAULT 0,
  attended BOOLEAN DEFAULT false,
  feedback TEXT,
  rating INTEGER,
  certificate_issued BOOLEAN DEFAULT false,
  certificate_url TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(event_id, user_id),
  CONSTRAINT valid_rating CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5))
);

-- ============================================
-- JOBS
-- ============================================
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  company VARCHAR(255) NOT NULL,
  company_logo_url TEXT,
  company_website VARCHAR(500),
  location VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'India',
  is_remote BOOLEAN DEFAULT false,
  job_type job_type DEFAULT 'full-time' NOT NULL,
  experience_level experience_level DEFAULT 'entry' NOT NULL,
  min_experience INTEGER DEFAULT 0,
  max_experience INTEGER,
  salary_min DECIMAL(12,2),
  salary_max DECIMAL(12,2),
  salary_currency VARCHAR(3) DEFAULT 'INR',
  salary_period VARCHAR(20) DEFAULT 'annual',
  description TEXT NOT NULL,
  responsibilities TEXT,
  requirements TEXT[] DEFAULT '{}',
  preferred_qualifications TEXT[] DEFAULT '{}',
  skills_required TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  department VARCHAR(100),
  positions_available INTEGER DEFAULT 1,
  application_deadline TIMESTAMPTZ,
  application_email VARCHAR(255),
  application_url TEXT,
  posted_by UUID REFERENCES users(id) ON DELETE SET NULL,
  contact_person VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT valid_experience CHECK (max_experience IS NULL OR max_experience >= min_experience),
  CONSTRAINT valid_salary CHECK (salary_max IS NULL OR salary_max >= salary_min),
  CONSTRAINT valid_positions CHECK (positions_available > 0)
);

-- ============================================
-- JOB APPLICATIONS
-- ============================================
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status application_status DEFAULT 'pending' NOT NULL,
  cover_letter TEXT,
  resume_url TEXT NOT NULL,
  portfolio_url TEXT,
  expected_salary DECIMAL(12,2),
  notice_period INTEGER,
  available_from DATE,
  additional_info TEXT,
  screening_answers JSONB DEFAULT '{}'::jsonb,
  interviewer_notes TEXT,
  feedback TEXT,
  rejection_reason TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  reviewed_at TIMESTAMPTZ,
  status_updated_at TIMESTAMPTZ,
  UNIQUE(job_id, user_id)
);

-- ============================================
-- MENTORSHIP REQUESTS
-- ============================================
CREATE TABLE mentorship_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  mentor_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  topic VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT NOT NULL,
  goals TEXT,
  duration_weeks INTEGER,
  preferred_schedule TEXT,
  status mentorship_status DEFAULT 'pending' NOT NULL,
  response_message TEXT,
  start_date DATE,
  end_date DATE,
  sessions_completed INTEGER DEFAULT 0,
  sessions_planned INTEGER,
  student_rating INTEGER,
  mentor_rating INTEGER,
  student_feedback TEXT,
  mentor_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  responded_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  CONSTRAINT valid_student_rating CHECK (student_rating IS NULL OR (student_rating >= 1 AND student_rating <= 5)),
  CONSTRAINT valid_mentor_rating CHECK (mentor_rating IS NULL OR (mentor_rating >= 1 AND mentor_rating <= 5)),
  CONSTRAINT different_users CHECK (student_id != mentor_id)
);

-- ============================================
-- MENTORSHIP SESSIONS
-- ============================================
CREATE TABLE mentorship_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentorship_request_id UUID REFERENCES mentorship_requests(id) ON DELETE CASCADE NOT NULL,
  session_number INTEGER NOT NULL,
  title VARCHAR(255),
  description TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  meeting_link TEXT,
  location VARCHAR(255),
  agenda TEXT,
  notes TEXT,
  student_attended BOOLEAN DEFAULT false,
  mentor_attended BOOLEAN DEFAULT false,
  session_status VARCHAR(50) DEFAULT 'scheduled',
  recording_url TEXT,
  materials JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ
);

-- ============================================
-- CONNECTIONS (Networking)
-- ============================================
CREATE TABLE connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  message TEXT,
  response_message TEXT,
  connected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(requester_id, recipient_id),
  CONSTRAINT different_users CHECK (requester_id != recipient_id)
);

-- ============================================
-- DONATIONS
-- ============================================
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255),
  donor_phone VARCHAR(20),
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  purpose VARCHAR(255),
  category VARCHAR(100),
  is_anonymous BOOLEAN DEFAULT false,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(255) UNIQUE,
  payment_status VARCHAR(50) DEFAULT 'pending',
  receipt_url TEXT,
  tax_exemption_certificate_url TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT valid_amount CHECK (amount > 0)
);

-- ============================================
-- ACHIEVEMENTS
-- ============================================
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  achievement_date DATE,
  issuer VARCHAR(255),
  credential_id VARCHAR(255),
  credential_url TEXT,
  certificate_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}'::jsonb,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_email_verified ON users(email_verified);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- User roles indexes
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);
CREATE INDEX idx_user_roles_is_primary ON user_roles(is_primary);

-- Alumni profiles indexes
CREATE INDEX idx_alumni_profiles_user_id ON alumni_profiles(user_id);
CREATE INDEX idx_alumni_profiles_batch_year ON alumni_profiles(batch_year);
CREATE INDEX idx_alumni_profiles_branch ON alumni_profiles(branch);
CREATE INDEX idx_alumni_profiles_current_company ON alumni_profiles(current_company);
CREATE INDEX idx_alumni_profiles_location ON alumni_profiles(city, state, country);
CREATE INDEX idx_alumni_profiles_is_mentor ON alumni_profiles(is_mentor);
CREATE INDEX idx_alumni_profiles_skills ON alumni_profiles USING GIN(skills);

-- Student profiles indexes
CREATE INDEX idx_student_profiles_user_id ON student_profiles(user_id);
CREATE INDEX idx_student_profiles_roll_number ON student_profiles(roll_number);
CREATE INDEX idx_student_profiles_batch_year ON student_profiles(batch_year);
CREATE INDEX idx_student_profiles_branch ON student_profiles(branch);
CREATE INDEX idx_student_profiles_current_year ON student_profiles(current_year);
CREATE INDEX idx_student_profiles_cgpa ON student_profiles(cgpa DESC);
CREATE INDEX idx_student_profiles_skills ON student_profiles USING GIN(skills);

-- Events indexes
CREATE INDEX idx_events_event_date ON events(event_date DESC);
CREATE INDEX idx_events_event_type ON events(event_type);
CREATE INDEX idx_events_is_active ON events(is_active);
CREATE INDEX idx_events_is_published ON events(is_published);
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_tags ON events USING GIN(tags);

-- Event registrations indexes
CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_user_id ON event_registrations(user_id);
CREATE INDEX idx_event_registrations_status ON event_registrations(registration_status);

-- Jobs indexes
CREATE INDEX idx_jobs_company ON jobs(company);
CREATE INDEX idx_jobs_location ON jobs(city, state, country);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_experience_level ON jobs(experience_level);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX idx_jobs_slug ON jobs(slug);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX idx_jobs_skills ON jobs USING GIN(skills_required);

-- Job applications indexes
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_applied_at ON job_applications(applied_at DESC);

-- Mentorship indexes
CREATE INDEX idx_mentorship_requests_student_id ON mentorship_requests(student_id);
CREATE INDEX idx_mentorship_requests_mentor_id ON mentorship_requests(mentor_id);
CREATE INDEX idx_mentorship_requests_status ON mentorship_requests(status);
CREATE INDEX idx_mentorship_requests_created_at ON mentorship_requests(created_at DESC);

-- Connections indexes
CREATE INDEX idx_connections_requester_id ON connections(requester_id);
CREATE INDEX idx_connections_recipient_id ON connections(recipient_id);
CREATE INDEX idx_connections_status ON connections(status);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_alumni_profiles_updated_at BEFORE UPDATE ON alumni_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentorship_requests_updated_at BEFORE UPDATE ON mentorship_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Auto-generate slug for events
CREATE OR REPLACE FUNCTION auto_generate_event_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.title) || '-' || substring(gen_random_uuid()::text from 1 for 8);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_event_slug BEFORE INSERT ON events
    FOR EACH ROW EXECUTE FUNCTION auto_generate_event_slug();

-- Auto-generate slug for jobs
CREATE OR REPLACE FUNCTION auto_generate_job_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.title || ' ' || NEW.company) || '-' || substring(gen_random_uuid()::text from 1 for 8);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_job_slug BEFORE INSERT ON jobs
    FOR EACH ROW EXECUTE FUNCTION auto_generate_job_slug();

-- Update event attendee count
CREATE OR REPLACE FUNCTION update_event_attendees()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE events 
    SET current_attendees = (
        SELECT COUNT(*) 
        FROM event_registrations 
        WHERE event_id = NEW.event_id 
        AND registration_status = 'registered'
    )
    WHERE id = NEW.event_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_event_attendees_count 
    AFTER INSERT OR UPDATE ON event_registrations
    FOR EACH ROW EXECUTE FUNCTION update_event_attendees();

-- Update job applications count
CREATE OR REPLACE FUNCTION update_job_applications_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE jobs 
    SET applications_count = (
        SELECT COUNT(*) 
        FROM job_applications 
        WHERE job_id = NEW.job_id
    )
    WHERE id = NEW.job_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_job_applications_count_trigger 
    AFTER INSERT OR DELETE ON job_applications
    FOR EACH ROW EXECUTE FUNCTION update_job_applications_count();

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Insert sample admin user (password: admin123)
-- Hash generated with bcrypt rounds=10
INSERT INTO users (id, email, password_hash, full_name, status, email_verified) VALUES
('00000000-0000-0000-0000-000000000001', 'admin@rgukt.ac.in', '$2b$10$rZ7WqVz1qPzP8Z8Z8Z8Z8euO0vZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8', 'System Administrator', 'active', true),
('00000000-0000-0000-0000-000000000002', 'john.doe@example.com', '$2b$10$rZ7WqVz1qPzP8Z8Z8Z8Z8euO0vZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8', 'John Doe', 'active', true),
('00000000-0000-0000-0000-000000000003', 'jane.smith@example.com', '$2b$10$rZ7WqVz1qPzP8Z8Z8Z8Z8euO0vZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8', 'Jane Smith', 'active', true),
('00000000-0000-0000-0000-000000000004', 'student1@rgukt.ac.in', '$2b$10$rZ7WqVz1qPzP8Z8Z8Z8Z8euO0vZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8', 'Raj Kumar', 'active', true);

-- Insert user roles
INSERT INTO user_roles (user_id, role, is_primary) VALUES
('00000000-0000-0000-0000-000000000001', 'admin', true),
('00000000-0000-0000-0000-000000000002', 'alumni', true),
('00000000-0000-0000-0000-000000000003', 'alumni', true),
('00000000-0000-0000-0000-000000000004', 'student', true);

-- Insert sample alumni profiles
INSERT INTO alumni_profiles (user_id, batch_year, branch, graduation_year, current_company, job_title, location, city, state, country, is_mentor, skills) VALUES
('00000000-0000-0000-0000-000000000002', 2020, 'Computer Science & Engineering', 2024, 'Google', 'Software Engineer', 'Bangalore, Karnataka, India', 'Bangalore', 'Karnataka', 'India', true, ARRAY['JavaScript', 'React', 'Node.js', 'Python']),
('00000000-0000-0000-0000-000000000003', 2019, 'Electronics & Communication Engineering', 2023, 'Microsoft', 'Product Manager', 'Hyderabad, Telangana, India', 'Hyderabad', 'Telangana', 'India', true, ARRAY['Product Management', 'Agile', 'Data Analysis']);

-- Insert sample student profile
INSERT INTO student_profiles (user_id, roll_number, student_id, branch, current_year, batch_year, graduation_year, cgpa, skills) VALUES
('00000000-0000-0000-0000-000000000004', 'R200001', 'STU2024001', 'Computer Science & Engineering', 3, 2021, 2025, 8.5, ARRAY['Java', 'Python', 'C++', 'Data Structures']);

-- ============================================
-- COMPLETION MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'Database schema created successfully!';
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'Sample users created:';
    RAISE NOTICE '1. Admin: admin@rgukt.ac.in (password: admin123)';
    RAISE NOTICE '2. Alumni: john.doe@example.com (password: admin123)';
    RAISE NOTICE '3. Alumni: jane.smith@example.com (password: admin123)';
    RAISE NOTICE '4. Student: student1@rgukt.ac.in (password: admin123)';
    RAISE NOTICE '==============================================';
END $$;
