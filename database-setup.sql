-- RGUKT Alumni Portal Database Setup
-- Run this script in your Supabase SQL Editor

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

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

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

-- Create student_profiles table
CREATE TABLE public.student_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  roll_number text UNIQUE NOT NULL,
  branch text NOT NULL,
  graduation_year integer NOT NULL,
  career_interests text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on student_profiles
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for alumni_profiles
CREATE POLICY "Alumni can view their own profile"
  ON public.alumni_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Alumni can update their own profile"
  ON public.alumni_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "All authenticated users can view alumni profiles"
  ON public.alumni_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage all alumni profiles"
  ON public.alumni_profiles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for student_profiles
CREATE POLICY "Students can view their own profile"
  ON public.student_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can update their own profile"
  ON public.student_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "All authenticated users can view student profiles"
  ON public.student_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage all student profiles"
  ON public.student_profiles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create events table
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date timestamptz NOT NULL,
  location text,
  max_attendees integer,
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text,
  job_type text,
  description text,
  requirements text,
  salary_range text,
  posted_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create mentorship_requests table
CREATE TABLE public.mentorship_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  topic text NOT NULL,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert a default admin user role (you'll need to replace the UUID with your actual user ID)
-- To get your user ID, first create an account through the app, then check the auth.users table
-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('your-user-id-here', 'admin');
