-- Create events table
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('reunion', 'workshop', 'seminar', 'networking', 'other')),
  max_attendees integer,
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create event registrations table
CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  registered_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create job postings table
CREATE TABLE public.job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  job_type text NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship')),
  experience_level text NOT NULL CHECK (experience_level IN ('entry', 'mid', 'senior')),
  salary_range text,
  description text NOT NULL,
  requirements text[] DEFAULT '{}',
  application_deadline timestamptz NOT NULL,
  posted_by uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.job_postings(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  cover_letter text,
  resume_url text,
  applied_at timestamptz DEFAULT now(),
  UNIQUE(job_id, user_id)
);

-- Create mentorship requests table
CREATE TABLE public.mentorship_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mentee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  message text,
  field_of_interest text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(mentor_id, mentee_id)
);

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "Everyone can view events"
  ON public.events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Alumni and admins can create events"
  ON public.events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'alumni')
  );

CREATE POLICY "Event creators and admins can update events"
  ON public.events
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = created_by OR 
    public.has_role(auth.uid(), 'admin')
  );

-- Create policies for event registrations
CREATE POLICY "Users can view their own registrations"
  ON public.event_registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events"
  ON public.event_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their registrations"
  ON public.event_registrations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for job postings
CREATE POLICY "Everyone can view active job postings"
  ON public.job_postings
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Alumni and admins can create job postings"
  ON public.job_postings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'alumni')
  );

CREATE POLICY "Job posters and admins can update job postings"
  ON public.job_postings
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = posted_by OR 
    public.has_role(auth.uid(), 'admin')
  );

-- Create policies for job applications
CREATE POLICY "Users can view their own applications"
  ON public.job_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Job posters can view applications for their jobs"
  ON public.job_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.job_postings 
      WHERE id = job_id AND posted_by = auth.uid()
    ) OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Users can apply for jobs"
  ON public.job_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for mentorship requests
CREATE POLICY "Users can view their mentorship requests"
  ON public.mentorship_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Users can create mentorship requests"
  ON public.mentorship_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = mentee_id);

CREATE POLICY "Mentors can update mentorship requests"
  ON public.mentorship_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = mentor_id);

-- Create view for events with attendee count
CREATE VIEW public.events_with_attendee_count AS
SELECT 
  e.*,
  COALESCE(er.attendee_count, 0) as current_attendees
FROM public.events e
LEFT JOIN (
  SELECT 
    event_id, 
    COUNT(*) as attendee_count
  FROM public.event_registrations
  GROUP BY event_id
) er ON e.id = er.event_id;

-- Create indexes for better performance
CREATE INDEX idx_events_date ON public.events(event_date);
CREATE INDEX idx_events_type ON public.events(event_type);
CREATE INDEX idx_job_postings_company ON public.job_postings(company);
CREATE INDEX idx_job_postings_location ON public.job_postings(location);
CREATE INDEX idx_job_postings_type ON public.job_postings(job_type);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);
CREATE INDEX idx_mentorship_requests_status ON public.mentorship_requests(status);
