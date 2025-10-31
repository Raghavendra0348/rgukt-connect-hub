import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Briefcase,
  Users,
  Calendar,
  BookOpen,
  User,
  Edit,
  TrendingUp,
  MessageCircle,
  Award,
  Building,
  MapPin,
  Mail,
  Star,
  Target,
  Activity,
  Clock,
  CheckCircle,
  GraduationCap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{
    id: string;
    full_name: string;
    email: string;
    batch_year?: number;
    branch?: string;
    current_year?: string;
    skills?: string[];
    interests?: string[];
  } | null>(null);
  const [stats, setStats] = useState({
    appliedJobs: 0,
    mentorConnections: 0,
    eventsAttended: 0,
    skillsCompleted: 0,
    profileCompletion: 70,
    cgpa: 8.5
  });

  const [recommendedJobs, setRecommendedJobs] = useState([
    { id: 1, title: "Software Engineer Intern", company: "TechCorp", location: "Remote", type: "Internship", match: 92 },
    { id: 2, title: "Data Analyst", company: "DataCo", location: "Bangalore", type: "Full-time", match: 88 },
    { id: 3, title: "Frontend Developer", company: "WebTech", location: "Hyderabad", type: "Part-time", match: 85 },
  ]);

  const [mentorSuggestions, setMentorSuggestions] = useState([
    { id: 1, name: "Rajesh Kumar", company: "Google", experience: "8 years", specialization: "Software Engineering", batch: "2015" },
    { id: 2, name: "Priya Sharma", company: "Microsoft", experience: "6 years", specialization: "Product Management", batch: "2017" },
    { id: 3, name: "Amit Patel", company: "Amazon", experience: "5 years", specialization: "Data Science", batch: "2018" },
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: "Campus Placement Drive", date: "Nov 18, 2025", type: "Career", spots: 50 },
    { id: 2, title: "Tech Workshop: React.js", date: "Nov 25, 2025", type: "Skill", spots: 30 },
    { id: 3, title: "Alumni Success Stories", date: "Dec 2, 2025", type: "Networking", spots: 100 },
  ]);

  const [learningPaths, setLearningPaths] = useState([
    { id: 1, title: "Full Stack Development", progress: 65, modules: 12, completed: 8 },
    { id: 2, title: "Data Science Fundamentals", progress: 40, modules: 10, completed: 4 },
    { id: 3, title: "Digital Marketing", progress: 25, modules: 8, completed: 2 },
  ]);

  const checkAuth = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!role || role.role !== "student") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    // Mock profile data
    setProfile({
      name: user.email?.split('@')[0] || 'Student',
      email: user.email,
      roll_number: "2021A7PS1234G",
      branch: "Computer Science",
      graduation_year: 2025,
      current_year: 4,
      cgpa: 8.5,
      location: "RGUKT R.K. Valley",
      bio: "Enthusiastic computer science student passionate about technology and innovation.",
      interests: ["Web Development", "Machine Learning", "Data Science"],
      phone: "+91 9876543210"
    });

    // Mock stats
    setStats({
      appliedJobs: 15,
      mentorConnections: 3,
      eventsAttended: 8,
      skillsCompleted: 12,
      profileCompletion: 70,
      cgpa: 8.5
    });

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-base md:text-xl text-muted-foreground">
              Welcome {profile?.name}! Explore opportunities and connect with alumni.
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <Badge variant="outline">Student</Badge>
            <Badge variant="secondary">Year {profile?.current_year}</Badge>
          </div>
        </div>

        {/* Profile Completion Alert */}
        {stats.profileCompletion < 100 && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <User className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">Complete Your Profile</h3>
                  <p className="text-sm text-blue-700 mb-2">
                    Your profile is {stats.profileCompletion}% complete. Complete it to get better job recommendations.
                  </p>
                  <Progress value={stats.profileCompletion} className="w-full h-2" />
                </div>
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="border-blue-300">
                    Complete Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.appliedJobs}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3 this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mentor Connections</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.mentorConnections}</div>
              <p className="text-xs text-muted-foreground">
                Active mentors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.eventsAttended}</div>
              <p className="text-xs text-muted-foreground">
                This academic year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.cgpa}</div>
              <p className="text-xs text-muted-foreground">
                Out of 10.0
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Overview
              </CardTitle>
              <CardDescription>Your academic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">{profile?.name}</h3>
                <p className="text-sm text-muted-foreground">{profile?.roll_number}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>{profile?.branch}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Graduating {profile?.graduation_year}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile?.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile?.email}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">CGPA:</span>
                  <Badge variant="outline">{profile?.cgpa}/10.0</Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Year:</span>
                  <Badge variant="secondary">{profile?.current_year}/4</Badge>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Link to="/profile">
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Learning Progress & Upcoming Events */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Your skill development journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPaths.map((path) => (
                    <div key={path.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{path.title}</h4>
                        <span className="text-sm text-muted-foreground">
                          {path.completed}/{path.modules} modules
                        </span>
                      </div>
                      <Progress value={path.progress} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {path.progress}% complete
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link to="/student/resources">
                    <Button variant="ghost" className="w-full">
                      Explore More Courses
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Events relevant to your academic journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date} • {event.spots} spots available
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Register
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link to="/events">
                    <Button variant="ghost" className="w-full">
                      View All Events
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Job Recommendations & Mentor Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Recommended Jobs
              </CardTitle>
              <CardDescription>Opportunities matching your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.company} • {job.location}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{job.type}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">
                            {job.match}% match
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link to="/jobs">
                  <Button variant="ghost" className="w-full">
                    Browse All Jobs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Mentor Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Suggested Mentors
              </CardTitle>
              <CardDescription>Alumni who can guide your career</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentorSuggestions.map((mentor) => (
                  <div key={mentor.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{mentor.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {mentor.company} • {mentor.experience}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {mentor.specialization} • Batch {mentor.batch}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link to="/student/mentorship">
                  <Button variant="ghost" className="w-full">
                    Find More Mentors
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
