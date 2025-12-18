import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
        Calendar,
        Briefcase,
        Users,
        MessageCircle,
        Heart,
        Award,
        TrendingUp,
        Eye,
        Clock,
        CheckCircle
} from "lucide-react";

const AlumniActivity = () => {
        const { user } = useAuth();
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

        const activityStats = [
                {
                        title: "Jobs Posted",
                        value: 12,
                        icon: Briefcase,
                        change: "+3 this month",
                        color: "text-blue-600"
                },
                {
                        title: "Events Created",
                        value: 8,
                        icon: Calendar,
                        change: "+2 this month",
                        color: "text-green-600"
                },
                {
                        title: "Students Mentored",
                        value: 25,
                        icon: Users,
                        change: "+5 this month",
                        color: "text-purple-600"
                },
                {
                        title: "Donations Made",
                        value: 5,
                        icon: Heart,
                        change: "+1 this month",
                        color: "text-red-600"
                }
        ];

        const recentActivities = [
                {
                        type: "job",
                        title: "Posted Software Engineer position at TechCorp",
                        date: "2 days ago",
                        status: "active",
                        views: 45,
                        applications: 12
                },
                {
                        type: "event",
                        title: "Created Tech Workshop: React Best Practices",
                        date: "1 week ago",
                        status: "upcoming",
                        registrations: 67
                },
                {
                        type: "mentorship",
                        title: "Started mentoring session with 3 students",
                        date: "2 weeks ago",
                        status: "ongoing"
                },
                {
                        type: "donation",
                        title: "Donated ₹10,000 to RGUKT Infrastructure Fund",
                        date: "1 month ago",
                        status: "completed"
                }
        ];

        const mentorshipProgress = [
                {
                        student: "Rajesh Kumar",
                        batch: "2024",
                        progress: 75,
                        sessions: 8,
                        status: "active"
                },
                {
                        student: "Priya Sharma",
                        batch: "2023",
                        progress: 90,
                        sessions: 12,
                        status: "active"
                },
                {
                        student: "Arun Singh",
                        batch: "2024",
                        progress: 100,
                        sessions: 10,
                        status: "completed"
                }
        ];

        const monthlyEngagement = [
                { month: "Jan", jobs: 2, events: 1, mentorship: 3, donations: 1 },
                { month: "Feb", jobs: 3, events: 2, mentorship: 4, donations: 0 },
                { month: "Mar", jobs: 1, events: 1, mentorship: 5, donations: 2 },
                { month: "Apr", jobs: 4, events: 2, mentorship: 6, donations: 1 },
                { month: "May", jobs: 2, events: 2, mentorship: 7, donations: 1 }
        ];

        return (
                <div className="min-h-screen bg-background">
                        <Navbar />
                        <div className="flex">
                                <Sidebar
                                        role="alumni"
                                        collapsed={sidebarCollapsed}
                                        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                                />
                                <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} mt-16 p-6`}>
                                        <div className="space-y-6">
                                                <div>
                                                        <h1 className="text-3xl font-bold">My Activity</h1>
                                                        <p className="text-muted-foreground">
                                                                Track your contributions and engagement with the RGUKT community
                                                        </p>
                                                </div>

                                                {/* Activity Stats */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                        {activityStats.map((stat, index) => (
                                                                <Card key={index}>
                                                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                                                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="text-2xl font-bold">{stat.value}</div>
                                                                                <p className="text-xs text-muted-foreground">{stat.change}</p>
                                                                        </CardContent>
                                                                </Card>
                                                        ))}
                                                </div>

                                                <Tabs defaultValue="overview" className="w-full">
                                                        <TabsList className="grid w-full grid-cols-4">
                                                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                                                <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                                                                <TabsTrigger value="contributions">Contributions</TabsTrigger>
                                                                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="overview" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <Clock className="h-5 w-5" />
                                                                                        Recent Activities
                                                                                </CardTitle>
                                                                                <CardDescription>Your latest contributions to the community</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="space-y-4">
                                                                                        {recentActivities.map((activity, index) => (
                                                                                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                                                                                        <div className="flex items-start gap-3">
                                                                                                                <div className={`p-2 rounded-lg ${activity.type === 'job' ? 'bg-blue-100 text-blue-600' :
                                                                                                                                activity.type === 'event' ? 'bg-green-100 text-green-600' :
                                                                                                                                        activity.type === 'mentorship' ? 'bg-purple-100 text-purple-600' :
                                                                                                                                                'bg-red-100 text-red-600'
                                                                                                                        }`}>
                                                                                                                        {activity.type === 'job' && <Briefcase className="h-4 w-4" />}
                                                                                                                        {activity.type === 'event' && <Calendar className="h-4 w-4" />}
                                                                                                                        {activity.type === 'mentorship' && <MessageCircle className="h-4 w-4" />}
                                                                                                                        {activity.type === 'donation' && <Heart className="h-4 w-4" />}
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                        <h4 className="font-medium">{activity.title}</h4>
                                                                                                                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                                                                                                                        {activity.views && (
                                                                                                                                <div className="flex items-center gap-2 mt-1">
                                                                                                                                        <Eye className="h-3 w-3" />
                                                                                                                                        <span className="text-xs">{activity.views} views</span>
                                                                                                                                        {activity.applications && (
                                                                                                                                                <>
                                                                                                                                                        <span className="text-xs">•</span>
                                                                                                                                                        <span className="text-xs">{activity.applications} applications</span>
                                                                                                                                                </>
                                                                                                                                        )}
                                                                                                                                </div>
                                                                                                                        )}
                                                                                                                        {activity.registrations && (
                                                                                                                                <div className="flex items-center gap-2 mt-1">
                                                                                                                                        <Users className="h-3 w-3" />
                                                                                                                                        <span className="text-xs">{activity.registrations} registrations</span>
                                                                                                                                </div>
                                                                                                                        )}
                                                                                                                </div>
                                                                                                        </div>
                                                                                                        <Badge variant={
                                                                                                                activity.status === 'active' ? 'default' :
                                                                                                                        activity.status === 'upcoming' ? 'secondary' :
                                                                                                                                activity.status === 'ongoing' ? 'outline' :
                                                                                                                                        'default'
                                                                                                        }>
                                                                                                                {activity.status}
                                                                                                        </Badge>
                                                                                                </div>
                                                                                        ))}
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="mentorship" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <MessageCircle className="h-5 w-5" />
                                                                                        Mentorship Progress
                                                                                </CardTitle>
                                                                                <CardDescription>Track your mentoring sessions and student progress</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="space-y-4">
                                                                                        {mentorshipProgress.map((mentor, index) => (
                                                                                                <div key={index} className="p-4 border rounded-lg">
                                                                                                        <div className="flex items-center justify-between mb-3">
                                                                                                                <div>
                                                                                                                        <h4 className="font-medium">{mentor.student}</h4>
                                                                                                                        <p className="text-sm text-muted-foreground">Batch: {mentor.batch}</p>
                                                                                                                </div>
                                                                                                                <Badge variant={mentor.status === 'completed' ? 'default' : 'outline'}>
                                                                                                                        {mentor.status}
                                                                                                                </Badge>
                                                                                                        </div>
                                                                                                        <div className="space-y-2">
                                                                                                                <div className="flex justify-between text-sm">
                                                                                                                        <span>Progress</span>
                                                                                                                        <span>{mentor.progress}%</span>
                                                                                                                </div>
                                                                                                                <Progress value={mentor.progress} className="h-2" />
                                                                                                                <p className="text-xs text-muted-foreground">
                                                                                                                        {mentor.sessions} sessions completed
                                                                                                                </p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        ))}
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="contributions" className="space-y-6">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                        <Card>
                                                                                <CardHeader>
                                                                                        <CardTitle className="flex items-center gap-2">
                                                                                                <Briefcase className="h-5 w-5" />
                                                                                                Job Postings Impact
                                                                                        </CardTitle>
                                                                                </CardHeader>
                                                                                <CardContent>
                                                                                        <div className="space-y-4">
                                                                                                <div className="flex justify-between">
                                                                                                        <span>Total Jobs Posted</span>
                                                                                                        <span className="font-semibold">12</span>
                                                                                                </div>
                                                                                                <div className="flex justify-between">
                                                                                                        <span>Total Applications</span>
                                                                                                        <span className="font-semibold">156</span>
                                                                                                </div>
                                                                                                <div className="flex justify-between">
                                                                                                        <span>Students Hired</span>
                                                                                                        <span className="font-semibold text-green-600">23</span>
                                                                                                </div>
                                                                                                <div className="flex justify-between">
                                                                                                        <span>Success Rate</span>
                                                                                                        <span className="font-semibold">14.7%</span>
                                                                                                </div>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>

                                                                        <Card>
                                                                                <CardHeader>
                                                                                        <CardTitle className="flex items-center gap-2">
                                                                                                <Heart className="h-5 w-5" />
                                                                                                Donation Impact
                                                                                        </CardTitle>
                                                                                </CardHeader>
                                                                                <CardContent>
                                                                                        <div className="space-y-4">
                                                                                                <div className="flex justify-between">
                                                                                                        <span>Total Donated</span>
                                                                                                        <span className="font-semibold">₹45,000</span>
                                                                                                </div>
                                                                                                <div className="flex justify-between">
                                                                                                        <span>Donations Count</span>
                                                                                                        <span className="font-semibold">5</span>
                                                                                                </div>
                                                                                                <div className="flex justify-between">
                                                                                                        <span>Students Benefited</span>
                                                                                                        <span className="font-semibold text-green-600">35</span>
                                                                                                </div>
                                                                                                <div className="flex justify-between">
                                                                                                        <span>Impact Score</span>
                                                                                                        <span className="font-semibold">A+</span>
                                                                                                </div>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                </div>
                                                        </TabsContent>

                                                        <TabsContent value="engagement" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <TrendingUp className="h-5 w-5" />
                                                                                        Monthly Engagement Trends
                                                                                </CardTitle>
                                                                                <CardDescription>Your activity across different categories</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="space-y-4">
                                                                                        {monthlyEngagement.map((month, index) => (
                                                                                                <div key={index} className="p-4 border rounded-lg">
                                                                                                        <h4 className="font-medium mb-3">{month.month} 2024</h4>
                                                                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                                                                <div className="text-center">
                                                                                                                        <div className="text-lg font-semibold text-blue-600">{month.jobs}</div>
                                                                                                                        <div className="text-xs text-muted-foreground">Jobs</div>
                                                                                                                </div>
                                                                                                                <div className="text-center">
                                                                                                                        <div className="text-lg font-semibold text-green-600">{month.events}</div>
                                                                                                                        <div className="text-xs text-muted-foreground">Events</div>
                                                                                                                </div>
                                                                                                                <div className="text-center">
                                                                                                                        <div className="text-lg font-semibold text-purple-600">{month.mentorship}</div>
                                                                                                                        <div className="text-xs text-muted-foreground">Mentorship</div>
                                                                                                                </div>
                                                                                                                <div className="text-center">
                                                                                                                        <div className="text-lg font-semibold text-red-600">{month.donations}</div>
                                                                                                                        <div className="text-xs text-muted-foreground">Donations</div>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        ))}
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>
                                                </Tabs>
                                        </div>
                                </main>
                        </div>
                </div>
        );
};

export default AlumniActivity;
