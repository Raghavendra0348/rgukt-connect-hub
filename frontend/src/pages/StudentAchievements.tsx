import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
        Award,
        Trophy,
        Star,
        Calendar,
        CheckCircle,
        Target,
        BookOpen,
        Users,
        TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function StudentAchievements() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

        const [achievements, setAchievements] = useState([
                {
                        id: 1,
                        title: "First Job Application",
                        description: "Applied for your first job through the platform",
                        date: "Oct 15, 2024",
                        type: "milestone",
                        points: 50,
                        icon: "briefcase"
                },
                {
                        id: 2,
                        title: "Profile Perfectionist",
                        description: "Completed 100% of your profile",
                        date: "Oct 20, 2024",
                        type: "profile",
                        points: 100,
                        icon: "user"
                },
                {
                        id: 3,
                        title: "Networking Starter",
                        description: "Connected with 5 alumni mentors",
                        date: "Nov 1, 2024",
                        type: "networking",
                        points: 75,
                        icon: "users"
                },
                {
                        id: 4,
                        title: "Course Completion",
                        description: "Completed 'Cloud Computing with AWS' course",
                        date: "Nov 10, 2024",
                        type: "learning",
                        points: 200,
                        icon: "book"
                },
                {
                        id: 5,
                        title: "Event Attendee",
                        description: "Attended 5 alumni events",
                        date: "Nov 15, 2024",
                        type: "participation",
                        points: 125,
                        icon: "calendar"
                }
        ]);

        const [stats, setStats] = useState({
                totalPoints: 550,
                rank: 42,
                totalStudents: 1500,
                coursesCompleted: 1,
                eventsAttended: 5,
                connectionsEarned: 8
        });

        const [badges, setBadges] = useState([
                { id: 1, name: "Early Adopter", description: "One of the first 100 users", earned: true },
                { id: 2, name: "Mentor Magnet", description: "Connected with 10+ mentors", earned: false, progress: 8 },
                { id: 3, name: "Learning Machine", description: "Completed 5 courses", earned: false, progress: 1 },
                { id: 4, name: "Event Enthusiast", description: "Attended 10 events", earned: false, progress: 5 },
                { id: 5, name: "Job Hunter", description: "Applied to 20 jobs", earned: false, progress: 15 }
        ]);

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

                setLoading(false);
        };

        const getIcon = (iconName: string) => {
                const icons = {
                        briefcase: Trophy,
                        user: Award,
                        users: Users,
                        book: BookOpen,
                        calendar: Calendar
                };
                return icons[iconName as keyof typeof icons] || Award;
        };

        const getTypeColor = (type: string) => {
                const colors = {
                        milestone: "bg-blue-500",
                        profile: "bg-green-500",
                        networking: "bg-purple-500",
                        learning: "bg-orange-500",
                        participation: "bg-pink-500"
                };
                return colors[type as keyof typeof colors] || "bg-gray-500";
        };

        if (loading) {
                return (
                        <div className="min-h-screen bg-background">
                                <Navbar />
                                <div className="pt-24 container mx-auto px-4">
                                        <div className="flex items-center justify-center py-12">
                                                <div className="text-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                                        <p className="mt-4 text-muted-foreground">Loading achievements...</p>
                                                </div>
                                        </div>
                                </div>
                        </div>
                );
        }

        return (
                <div className="min-h-screen bg-background">
                        <Navbar />
                        <Sidebar
                                role="student"
                                collapsed={sidebarCollapsed}
                                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                        />

                        <div className={`pt-24 pb-12 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"
                                }`}>
                                <div className="container mx-auto px-6">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-8">
                                                <div>
                                                        <h1 className="text-4xl font-bold mb-2">Achievements</h1>
                                                        <p className="text-xl text-muted-foreground">
                                                                Track your progress and celebrate your milestones
                                                        </p>
                                                </div>
                                                <div className="text-right">
                                                        <div className="text-2xl font-bold text-primary">{stats.totalPoints} Points</div>
                                                        <p className="text-sm text-muted-foreground">
                                                                Rank #{stats.rank} of {stats.totalStudents}
                                                        </p>
                                                </div>
                                        </div>

                                        {/* Stats Overview */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Trophy className="h-8 w-8 text-yellow-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">{stats.totalPoints}</p>
                                                                                <p className="text-sm text-muted-foreground">Total Points</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <TrendingUp className="h-8 w-8 text-green-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">#{stats.rank}</p>
                                                                                <p className="text-sm text-muted-foreground">Current Rank</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <BookOpen className="h-8 w-8 text-blue-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">{stats.coursesCompleted}</p>
                                                                                <p className="text-sm text-muted-foreground">Courses Completed</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Users className="h-8 w-8 text-purple-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">{stats.connectionsEarned}</p>
                                                                                <p className="text-sm text-muted-foreground">Connections Made</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                {/* Recent Achievements */}
                                                <div className="lg:col-span-2">
                                                        <Card>
                                                                <CardHeader>
                                                                        <CardTitle className="flex items-center gap-2">
                                                                                <Award className="h-5 w-5" />
                                                                                Recent Achievements
                                                                        </CardTitle>
                                                                        <CardDescription>Your latest accomplishments and milestones</CardDescription>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <div className="space-y-4">
                                                                                {achievements.map((achievement) => {
                                                                                        const IconComponent = getIcon(achievement.icon);
                                                                                        return (
                                                                                                <div key={achievement.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                                                                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(achievement.type)}`}>
                                                                                                                <IconComponent className="h-6 w-6 text-white" />
                                                                                                        </div>
                                                                                                        <div className="flex-1">
                                                                                                                <h3 className="font-medium">{achievement.title}</h3>
                                                                                                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                                                                                                <p className="text-xs text-muted-foreground">{achievement.date}</p>
                                                                                                        </div>
                                                                                                        <div className="text-right">
                                                                                                                <Badge variant="secondary">+{achievement.points} pts</Badge>
                                                                                                        </div>
                                                                                                </div>
                                                                                        );
                                                                                })}
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                {/* Badges Progress */}
                                                <div>
                                                        <Card>
                                                                <CardHeader>
                                                                        <CardTitle className="flex items-center gap-2">
                                                                                <Star className="h-5 w-5" />
                                                                                Badges
                                                                        </CardTitle>
                                                                        <CardDescription>Unlock badges by reaching milestones</CardDescription>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <div className="space-y-4">
                                                                                {badges.map((badge) => (
                                                                                        <div key={badge.id} className="space-y-2">
                                                                                                <div className="flex items-center justify-between">
                                                                                                        <div className="flex items-center gap-2">
                                                                                                                {badge.earned ? (
                                                                                                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                                                                                                ) : (
                                                                                                                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
                                                                                                                )}
                                                                                                                <div>
                                                                                                                        <p className={`font-medium ${badge.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                                                                                                                                {badge.name}
                                                                                                                        </p>
                                                                                                                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                                {!badge.earned && badge.progress && (
                                                                                                        <div className="ml-7 space-y-1">
                                                                                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                                                                                        <span>Progress</span>
                                                                                                                        <span>{badge.progress}/10</span>
                                                                                                                </div>
                                                                                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                                                                                        <div
                                                                                                                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                                                                                                                style={{ width: `${(badge.progress / 10) * 100}%` }}
                                                                                                                        ></div>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                )}
                                                                                        </div>
                                                                                ))}
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
