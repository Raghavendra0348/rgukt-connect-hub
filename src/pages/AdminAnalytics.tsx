import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import {
        BarChart3,
        TrendingUp,
        TrendingDown,
        Users,
        Briefcase,
        Calendar,
        Heart,
        DollarSign,
        Eye,
        UserCheck,
        MapPin,
        Building,
        GraduationCap,
        Award
} from "lucide-react";

const AdminAnalytics = () => {
        const { user } = useAuth();
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

        const overviewStats = [
                {
                        title: "Total Users",
                        value: 2456,
                        change: "+12%",
                        trend: "up",
                        icon: Users,
                        color: "text-blue-600"
                },
                {
                        title: "Active Alumni",
                        value: 1823,
                        change: "+8%",
                        trend: "up",
                        icon: UserCheck,
                        color: "text-green-600"
                },
                {
                        title: "Job Postings",
                        value: 89,
                        change: "+23%",
                        trend: "up",
                        icon: Briefcase,
                        color: "text-purple-600"
                },
                {
                        title: "Events Hosted",
                        value: 34,
                        change: "-5%",
                        trend: "down",
                        icon: Calendar,
                        color: "text-orange-600"
                },
                {
                        title: "Total Donations",
                        value: "₹2.4M",
                        change: "+15%",
                        trend: "up",
                        icon: Heart,
                        color: "text-red-600"
                },
                {
                        title: "Mentorship Sessions",
                        value: 156,
                        change: "+31%",
                        trend: "up",
                        icon: Award,
                        color: "text-indigo-600"
                }
        ];

        const userGrowth = [
                { month: "Jan", students: 89, alumni: 45, total: 134 },
                { month: "Feb", students: 123, alumni: 67, total: 190 },
                { month: "Mar", students: 156, alumni: 89, total: 245 },
                { month: "Apr", students: 178, alumni: 102, total: 280 },
                { month: "May", students: 201, alumni: 134, total: 335 },
                { month: "Jun", students: 234, alumni: 167, total: 401 }
        ];

        const topCompanies = [
                { name: "Google", alumni: 89, jobs: 12 },
                { name: "Microsoft", alumni: 76, jobs: 8 },
                { name: "Amazon", alumni: 65, jobs: 15 },
                { name: "Meta", alumni: 54, jobs: 6 },
                { name: "Apple", alumni: 43, jobs: 4 },
                { name: "Netflix", alumni: 32, jobs: 7 },
                { name: "Tesla", alumni: 28, jobs: 3 },
                { name: "Adobe", alumni: 25, jobs: 5 }
        ];

        const batchAnalytics = [
                { batch: "2020-2024", students: 456, alumni: 23, placement: 85 },
                { batch: "2019-2023", students: 234, alumni: 189, placement: 92 },
                { batch: "2018-2022", students: 178, alumni: 234, placement: 88 },
                { batch: "2017-2021", students: 123, alumni: 287, placement: 94 },
                { batch: "2016-2020", students: 89, alumni: 334, placement: 89 },
                { batch: "2015-2019", students: 67, alumni: 298, placement: 91 },
        ];

        const locationDistribution = [
                { location: "Bangalore", count: 234, percentage: 28 },
                { location: "Hyderabad", count: 189, percentage: 23 },
                { location: "Chennai", count: 156, percentage: 19 },
                { location: "Pune", count: 123, percentage: 15 },
                { location: "Mumbai", count: 89, percentage: 11 },
                { location: "Delhi", count: 67, percentage: 8 },
                { location: "International", count: 45, percentage: 5 }
        ];

        const engagementMetrics = [
                { metric: "Job Applications", value: 1234, target: 1500, percentage: 82 },
                { metric: "Event Registrations", value: 567, target: 600, percentage: 95 },
                { metric: "Mentorship Matches", value: 89, target: 100, percentage: 89 },
                { metric: "Alumni Donations", value: 234, target: 300, percentage: 78 },
                { metric: "Profile Completeness", value: 1456, target: 2000, percentage: 73 }
        ];

        const recentActivities = [
                { type: "user", message: "45 new alumni registrations this week", time: "2 hours ago" },
                { type: "job", message: "12 new job postings from top companies", time: "4 hours ago" },
                { type: "event", message: "Tech Workshop reached full capacity", time: "6 hours ago" },
                { type: "donation", message: "₹50,000 donated to infrastructure fund", time: "1 day ago" },
                { type: "mentorship", message: "23 new mentorship connections made", time: "2 days ago" }
        ];

        return (
                <div className="min-h-screen bg-background">
                        <Navbar />
                        <div className="flex">
                                <Sidebar
                                        role="admin"
                                        collapsed={sidebarCollapsed}
                                        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                                />
                                <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} mt-16 p-6`}>
                                        <div className="space-y-6">
                                                <div>
                                                        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                                                        <p className="text-muted-foreground">
                                                                Comprehensive insights into platform performance and user engagement
                                                        </p>
                                                </div>

                                                {/* Overview Stats */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                                                        {overviewStats.map((stat, index) => (
                                                                <Card key={index}>
                                                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                                                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="text-2xl font-bold">{stat.value}</div>
                                                                                <div className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                                                                        }`}>
                                                                                        {stat.trend === 'up' ? (
                                                                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                                                        ) : (
                                                                                                <TrendingDown className="h-3 w-3 mr-1" />
                                                                                        )}
                                                                                        {stat.change} from last month
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        ))}
                                                </div>

                                                <Tabs defaultValue="overview" className="w-full">
                                                        <TabsList className="grid w-full grid-cols-5">
                                                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                                                <TabsTrigger value="users">Users</TabsTrigger>
                                                                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                                                                <TabsTrigger value="companies">Companies</TabsTrigger>
                                                                <TabsTrigger value="geography">Geography</TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="overview" className="space-y-6">
                                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                                        <Card>
                                                                                <CardHeader>
                                                                                        <CardTitle className="flex items-center gap-2">
                                                                                                <BarChart3 className="h-5 w-5" />
                                                                                                User Growth Trend
                                                                                        </CardTitle>
                                                                                        <CardDescription>Monthly user registration trends</CardDescription>
                                                                                </CardHeader>
                                                                                <CardContent>
                                                                                        <div className="space-y-4">
                                                                                                {userGrowth.map((month, index) => (
                                                                                                        <div key={index} className="flex items-center justify-between">
                                                                                                                <span className="text-sm font-medium">{month.month} 2024</span>
                                                                                                                <div className="flex items-center gap-4">
                                                                                                                        <div className="text-right">
                                                                                                                                <div className="text-sm">Students: {month.students}</div>
                                                                                                                                <div className="text-sm text-muted-foreground">Alumni: {month.alumni}</div>
                                                                                                                        </div>
                                                                                                                        <div className="text-lg font-bold text-blue-600">{month.total}</div>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                ))}
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>

                                                                        <Card>
                                                                                <CardHeader>
                                                                                        <CardTitle className="flex items-center gap-2">
                                                                                                <Eye className="h-5 w-5" />
                                                                                                Recent Activities
                                                                                        </CardTitle>
                                                                                        <CardDescription>Latest platform activities</CardDescription>
                                                                                </CardHeader>
                                                                                <CardContent>
                                                                                        <div className="space-y-4">
                                                                                                {recentActivities.map((activity, index) => (
                                                                                                        <div key={index} className="flex items-start gap-3">
                                                                                                                <div className={`p-2 rounded-lg ${activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                                                                                                                                activity.type === 'job' ? 'bg-green-100 text-green-600' :
                                                                                                                                        activity.type === 'event' ? 'bg-purple-100 text-purple-600' :
                                                                                                                                                activity.type === 'donation' ? 'bg-red-100 text-red-600' :
                                                                                                                                                        'bg-orange-100 text-orange-600'
                                                                                                                        }`}>
                                                                                                                        {activity.type === 'user' && <Users className="h-4 w-4" />}
                                                                                                                        {activity.type === 'job' && <Briefcase className="h-4 w-4" />}
                                                                                                                        {activity.type === 'event' && <Calendar className="h-4 w-4" />}
                                                                                                                        {activity.type === 'donation' && <Heart className="h-4 w-4" />}
                                                                                                                        {activity.type === 'mentorship' && <Award className="h-4 w-4" />}
                                                                                                                </div>
                                                                                                                <div className="flex-1">
                                                                                                                        <p className="text-sm">{activity.message}</p>
                                                                                                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                ))}
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                </div>
                                                        </TabsContent>

                                                        <TabsContent value="users" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <GraduationCap className="h-5 w-5" />
                                                                                        Batch-wise Analytics
                                                                                </CardTitle>
                                                                                <CardDescription>Student and alumni distribution by batch</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="space-y-4">
                                                                                        {batchAnalytics.map((batch, index) => (
                                                                                                <div key={index} className="p-4 border rounded-lg">
                                                                                                        <div className="flex items-center justify-between mb-2">
                                                                                                                <h4 className="font-medium">{batch.batch}</h4>
                                                                                                                <Badge variant="outline">{batch.placement}% placement</Badge>
                                                                                                        </div>
                                                                                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                                                                                                <div>
                                                                                                                        <div className="text-muted-foreground">Students</div>
                                                                                                                        <div className="font-semibold text-blue-600">{batch.students}</div>
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                        <div className="text-muted-foreground">Alumni</div>
                                                                                                                        <div className="font-semibold text-green-600">{batch.alumni}</div>
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                        <div className="text-muted-foreground">Total</div>
                                                                                                                        <div className="font-semibold">{batch.students + batch.alumni}</div>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        ))}
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="engagement" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <TrendingUp className="h-5 w-5" />
                                                                                        Engagement Metrics
                                                                                </CardTitle>
                                                                                <CardDescription>Key performance indicators and targets</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="space-y-6">
                                                                                        {engagementMetrics.map((metric, index) => (
                                                                                                <div key={index} className="space-y-2">
                                                                                                        <div className="flex justify-between items-center">
                                                                                                                <span className="text-sm font-medium">{metric.metric}</span>
                                                                                                                <span className="text-sm text-muted-foreground">
                                                                                                                        {metric.value} / {metric.target}
                                                                                                                </span>
                                                                                                        </div>
                                                                                                        <Progress value={metric.percentage} className="h-2" />
                                                                                                        <div className="text-xs text-muted-foreground">
                                                                                                                {metric.percentage}% of target achieved
                                                                                                        </div>
                                                                                                </div>
                                                                                        ))}
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="companies" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <Building className="h-5 w-5" />
                                                                                        Top Companies
                                                                                </CardTitle>
                                                                                <CardDescription>Companies with most alumni and job postings</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="space-y-4">
                                                                                        {topCompanies.map((company, index) => (
                                                                                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                                                                        <div className="flex items-center gap-3">
                                                                                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                                                                                                        {company.name[0]}
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                        <div className="font-medium">{company.name}</div>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                        <div className="text-right">
                                                                                                                <div className="text-sm">
                                                                                                                        <span className="font-semibold text-blue-600">{company.alumni}</span> alumni
                                                                                                                </div>
                                                                                                                <div className="text-sm text-muted-foreground">
                                                                                                                        {company.jobs} job postings
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        ))}
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="geography" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <MapPin className="h-5 w-5" />
                                                                                        Geographic Distribution
                                                                                </CardTitle>
                                                                                <CardDescription>Alumni distribution by location</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="space-y-4">
                                                                                        {locationDistribution.map((location, index) => (
                                                                                                <div key={index} className="space-y-2">
                                                                                                        <div className="flex justify-between items-center">
                                                                                                                <span className="text-sm font-medium">{location.location}</span>
                                                                                                                <span className="text-sm text-muted-foreground">
                                                                                                                        {location.count} alumni ({location.percentage}%)
                                                                                                                </span>
                                                                                                        </div>
                                                                                                        <Progress value={location.percentage} className="h-2" />
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

export default AdminAnalytics;
