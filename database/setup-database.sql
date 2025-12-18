-- RGUKT Alumni Portal Database Setup
-- Run this SQL in your Supabase SQL editor

-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'alumni', 'student');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles" ON public.user_roles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create alumni_profiles table
CREATE TABLE public.alumni_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  batch_year integer NOT NULL,
  branch text NOT NULL,
  current_company text,
  job_title text,
  location text,
  phone_number text,
  bio text,
  linkedin_url text,
  is_mentor boolean DEFAULT false,
  profile_visibility jsonb DEFAULT '{"email": true, "phone": false}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on alumni_profiles
ALTER TABLE public.alumni_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for alumni_profiles
CREATE POLICY "Alumni can view all profiles" ON public.alumni_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role IN ('alumni', 'admin')
    )
  );

CREATE POLICY "Alumni can update their own profile" ON public.alumni_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Alumni can insert their own profile" ON public.alumni_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create student_profiles table
CREATE TABLE public.student_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id text NOT NULL UNIQUE,
  batch_year integer NOT NULL,
  branch text NOT NULL,
  current_year integer NOT NULL CHECK (current_year BETWEEN 1 AND 4),
  phone_number text,
  bio text,
  skills text[] DEFAULT '{}',
  interests text[] DEFAULT '{}',
  cgpa decimal(3,2) CHECK (cgpa >= 0 AND cgpa <= 10),
  achievements text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on student_profiles
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for student_profiles
CREATE POLICY "Students and alumni can view profiles" ON public.student_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role IN ('student', 'alumni', 'admin')
    )
  );

CREATE POLICY "Students can update their own profile" ON public.student_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Students can insert their own profile" ON public.student_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert some sample data (optional - for testing)
-- First, you'll need to create users through the Auth interface
-- Then you can run these inserts with actual user IDs

-- Example: Insert admin role for the first user (replace with actual user ID)
-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('your-user-id-here', 'admin');