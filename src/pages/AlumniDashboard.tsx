import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Users,
  Briefcase,
  Calendar,
  Heart,
  TrendingUp,
  MessageCircle,
  Activity,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AlumniDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    jobsPosted: 0,
    eventsCreated: 0,
    menteeConnections: 0,
    totalDonations: 0,
    networkSize: 0,
    eventsAttended: 0
  });

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

    // Mock data for demonstration
    setStats({
      jobsPosted: 5,
      eventsCreated: 3,
      menteeConnections: 8,
      totalDonations: 25000,
      networkSize: 156,
      eventsAttended: 12
    });

    setLoading(false);
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Alumni Dashboard</h1>
            <p className="text-base md:text-xl text-muted-foreground">
              Give back to the community and mentor students
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Badge variant="secondary">Alumni</Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jobs Posted</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.jobsPosted}</div>
              <p className="text-xs text-muted-foreground">Active job postings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Created</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.eventsCreated}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mentee Connections</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.menteeConnections}</div>
              <p className="text-xs text-muted-foreground">Active mentorships</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalDonations.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Contributed to RGUKT</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.networkSize}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12 this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.eventsAttended}</div>
              <p className="text-xs text-muted-foreground">Alumni meetups</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks for alumni</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto flex-col items-center p-4 gap-2"
                onClick={() => navigate("/alumni/post-job")}
              >
                <Briefcase className="h-6 w-6" />
                <span className="text-sm">Post Job</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col items-center p-4 gap-2"
                onClick={() => navigate("/alumni/create-event")}
              >
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Create Event</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col items-center p-4 gap-2"
                onClick={() => navigate("/alumni/mentorship")}
              >
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm">Mentorship</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col items-center p-4 gap-2"
                onClick={() => navigate("/alumni/donations")}
              >
                <Heart className="h-6 w-6" />
                <span className="text-sm">Donate</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}
