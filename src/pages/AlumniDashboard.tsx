import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Calendar, Heart, LogOut, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AlumniDashboard() {
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

    if (!role || role.role !== "alumni") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    const { data: alumniProfile } = await supabase
      .from("alumni_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    setProfile(alumniProfile);
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
              <h1 className="text-xl font-bold">Alumni Portal</h1>
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
          <h2 className="text-3xl font-bold mb-2">Welcome Back, Alumni!</h2>
          <p className="text-muted-foreground">
            {profile && `${profile.branch} • Batch ${profile.batch_year}`}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-card transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Network</CardTitle>
              <CardDescription>
                Connect with fellow alumni
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-card transition-shadow cursor-pointer">
            <CardHeader>
              <Briefcase className="h-8 w-8 text-accent mb-2" />
              <CardTitle className="text-lg">Post Job</CardTitle>
              <CardDescription>
                Share opportunities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-card transition-shadow cursor-pointer">
            <CardHeader>
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Events</CardTitle>
              <CardDescription>
                View upcoming events
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-card transition-shadow cursor-pointer">
            <CardHeader>
              <Heart className="h-8 w-8 text-accent mb-2" />
              <CardTitle className="text-lg">Give Back</CardTitle>
              <CardDescription>
                Support the university
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Profile Status */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Help fellow alumni and students find and connect with you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Completion</span>
                <span className="text-sm font-semibold text-primary">30%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <Button variant="outline" className="w-full">
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
