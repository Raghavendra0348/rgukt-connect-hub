import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Briefcase, Calendar, Heart, LogOut, User, Edit, MessageCircle, Award, Building, MapPin, Target, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";

export default function AlumniDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalEvents: 15,
    totalJobs: 8,
    totalConnections: 124,
    mentorshipRequests: 6,
    profileCompletion: 85,
    networkGrowth: 12
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('alumni_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <ResponsiveLayout role="alumni">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout role="alumni">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!
              </h1>
              <p className="text-blue-100 mt-2">
                Connect, mentor, and grow with the RGUKT alumni network
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link to="/profile">
                <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalConnections}</p>
                  <p className="text-xs text-muted-foreground">Connections</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalEvents}</p>
                  <p className="text-xs text-muted-foreground">Events</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalJobs}</p>
                  <p className="text-xs text-muted-foreground">Jobs Posted</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.mentorshipRequests}</p>
                  <p className="text-xs text-muted-foreground">Mentoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <Link to="/alumni/post-job">
                <Button variant="outline" className="w-full h-auto flex-col items-center p-4 gap-2">
                  <Briefcase className="h-6 w-6" />
                  <span className="text-sm">Post Job</span>
                </Button>
              </Link>
              <Link to="/alumni/create-event">
                <Button variant="outline" className="w-full h-auto flex-col items-center p-4 gap-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Create Event</span>
                </Button>
              </Link>
              <Link to="/alumni/network">
                <Button variant="outline" className="w-full h-auto flex-col items-center p-4 gap-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Find Alumni</span>
                </Button>
              </Link>
              <Link to="/alumni/mentorship">
                <Button variant="outline" className="w-full h-auto flex-col items-center p-4 gap-2">
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-sm">Mentoring</span>
                </Button>
              </Link>
              <Link to="/alumni/donations">
                <Button variant="outline" className="w-full h-auto flex-col items-center p-4 gap-2">
                  <Heart className="h-6 w-6" />
                  <span className="text-sm">Donate</span>
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="w-full h-auto flex-col items-center p-4 gap-2">
                  <User className="h-6 w-6" />
                  <span className="text-sm">Profile</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}
