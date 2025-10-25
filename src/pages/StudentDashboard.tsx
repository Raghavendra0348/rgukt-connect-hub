import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Calendar, BookOpen, LogOut, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
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

    const { data: studentProfile } = await supabase
      .from("student_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    setProfile(studentProfile);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Student Portal</h1>
              <p className="text-sm text-muted-foreground">RGUKT R.K. Valley AMP</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome, Student!</h2>
          <p className="text-muted-foreground">
            {profile && `${profile.branch} • Graduating ${profile.graduation_year}`}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-card transition-shadow cursor-pointer">
            <CardHeader>
              <Briefcase className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Job Board</CardTitle>
              <CardDescription>
                Explore opportunities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-card transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="h-8 w-8 text-accent mb-2" />
              <CardTitle className="text-lg">Find Mentors</CardTitle>
              <CardDescription>
                Connect with alumni
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-card transition-shadow cursor-pointer">
            <CardHeader>
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Events</CardTitle>
              <CardDescription>
                Attend workshops
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-card transition-shadow cursor-pointer">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-accent mb-2" />
              <CardTitle className="text-lg">Resources</CardTitle>
              <CardDescription>
                Learning materials
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Featured Section */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Opportunities</CardTitle>
            <CardDescription>
              Job postings and internships from our alumni network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No opportunities available yet.</p>
              <p className="text-sm mt-2">Check back soon for new postings!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
