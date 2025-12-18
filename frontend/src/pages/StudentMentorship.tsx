import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
        MessageCircle,
        Users,
        Calendar,
        Star,
        Clock,
        CheckCircle,
        AlertCircle,
        BookOpen,
        Target,
        Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function StudentMentorship() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

        const [activeMentors, setActiveMentors] = useState([
                {
                        id: 1,
                        name: "Rajesh Kumar",
                        company: "Google",
                        position: "Senior Software Engineer",
                        expertise: ["Full Stack Development", "System Design", "Career Guidance"],
                        rating: 4.9,
                        sessions: 12,
                        nextSession: "Nov 20, 2024 at 3:00 PM",
                        status: "active",
                        joinedDate: "Sep 2024",
                        totalHours: 18
                },
                {
                        id: 2,
                        name: "Priya Sharma",
                        company: "Microsoft",
                        position: "Product Manager",
                        expertise: ["Product Strategy", "Leadership", "Analytics"],
                        rating: 4.8,
                        sessions: 8,
                        nextSession: "Nov 22, 2024 at 2:00 PM",
                        status: "active",
                        joinedDate: "Oct 2024",
                        totalHours: 12
                }
        ]);

        const [suggestedMentors, setSuggestedMentors] = useState([
                {
                        id: 3,
                        name: "Amit Patel",
                        company: "Amazon",
                        position: "Data Scientist",
                        expertise: ["Data Science", "Machine Learning", "Python"],
                        rating: 4.7,
                        batch: "2018",
                        availability: "Available",
                        languages: ["English", "Hindi"],
                        mentees: 15
                },
                {
                        id: 4,
                        name: "Sneha Reddy",
                        company: "Meta",
                        position: "Engineering Manager",
                        expertise: ["Leadership", "Engineering Management", "React"],
                        rating: 4.9,
                        batch: "2016",
                        availability: "Limited",
                        languages: ["English", "Telugu"],
                        mentees: 8
                },
                {
                        id: 5,
                        name: "Kiran Singh",
                        company: "Netflix",
                        position: "DevOps Engineer",
                        expertise: ["DevOps", "Cloud Computing", "Infrastructure"],
                        rating: 4.6,
                        batch: "2019",
                        availability: "Available",
                        languages: ["English", "Hindi"],
                        mentees: 12
                }
        ]);

        const [sessionHistory, setSessionHistory] = useState([
                {
                        id: 1,
                        mentorName: "Rajesh Kumar",
                        date: "Nov 15, 2024",
                        duration: "45 min",
                        topic: "System Design Interview Prep",
                        status: "completed",
                        rating: 5,
                        notes: "Excellent session on system design fundamentals. Got clear understanding of scalability concepts."
                },
                {
                        id: 2,
                        mentorName: "Priya Sharma",
                        date: "Nov 10, 2024",
                        duration: "30 min",
                        topic: "Career Path Discussion",
                        status: "completed",
                        rating: 5,
                        notes: "Great insights into product management career path and skill requirements."
                },
                {
                        id: 3,
                        mentorName: "Rajesh Kumar",
                        date: "Nov 5, 2024",
                        duration: "60 min",
                        topic: "React Best Practices",
                        status: "completed",
                        rating: 4,
                        notes: "Learned about advanced React patterns and performance optimization techniques."
                }
        ]);

        const [goals, setGoals] = useState([
                {
                        id: 1,
                        title: "Master System Design",
                        description: "Learn system design principles for tech interviews",
                        progress: 65,
                        mentor: "Rajesh Kumar",
                        targetDate: "Dec 2024",
                        status: "in-progress"
                },
                {
                        id: 2,
                        title: "Build Portfolio Projects",
                        description: "Complete 3 full-stack projects for portfolio",
                        progress: 40,
                        mentor: "Rajesh Kumar",
                        targetDate: "Jan 2025",
                        status: "in-progress"
                },
                {
                        id: 3,
                        title: "Interview Preparation",
                        description: "Prepare for technical and behavioral interviews",
                        progress: 80,
                        mentor: "Priya Sharma",
                        targetDate: "Nov 2024",
                        status: "in-progress"
                }
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

        if (loading) {
                return (
                        <div className="min-h-screen bg-background">
                                <Navbar />
                                <div className="pt-24 container mx-auto px-4">
                                        <div className="flex items-center justify-center py-12">
                                                <div className="text-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                                        <p className="mt-4 text-muted-foreground">Loading mentorship...</p>
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
                                                        <h1 className="text-4xl font-bold mb-2">Mentorship</h1>
                                                        <p className="text-xl text-muted-foreground">
                                                                Connect with alumni mentors to accelerate your career growth
                                                        </p>
                                                </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Users className="h-8 w-8 text-blue-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">{activeMentors.length}</p>
                                                                                <p className="text-sm text-muted-foreground">Active Mentors</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <MessageCircle className="h-8 w-8 text-green-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">{sessionHistory.length}</p>
                                                                                <p className="text-sm text-muted-foreground">Total Sessions</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Clock className="h-8 w-8 text-yellow-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">30</p>
                                                                                <p className="text-sm text-muted-foreground">Hours Mentored</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Target className="h-8 w-8 text-purple-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">{goals.length}</p>
                                                                                <p className="text-sm text-muted-foreground">Active Goals</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </div>

                                        <Tabs defaultValue="current" className="space-y-6">
                                                <TabsList className="grid w-full grid-cols-4">
                                                        <TabsTrigger value="current">Current Mentors</TabsTrigger>
                                                        <TabsTrigger value="discover">Discover Mentors</TabsTrigger>
                                                        <TabsTrigger value="sessions">Session History</TabsTrigger>
                                                        <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="current" className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                {activeMentors.map((mentor) => (
                                                                        <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                                                                                <CardHeader>
                                                                                        <div className="flex items-start gap-4">
                                                                                                <Avatar className="h-12 w-12">
                                                                                                        <AvatarFallback className="text-lg">
                                                                                                                {mentor.name.split(' ').map(n => n[0]).join('')}
                                                                                                        </AvatarFallback>
                                                                                                </Avatar>
                                                                                                <div className="flex-1">
                                                                                                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                                                                                                        <CardDescription>{mentor.position} at {mentor.company}</CardDescription>
                                                                                                        <div className="flex items-center gap-1 mt-2">
                                                                                                                <Star className="h-4 w-4 text-yellow-500" />
                                                                                                                <span className="text-sm font-medium">{mentor.rating}</span>
                                                                                                                <span className="text-xs text-muted-foreground">
                                                                                                                        ({mentor.sessions} sessions)
                                                                                                                </span>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <Badge variant="secondary">Active</Badge>
                                                                                        </div>
                                                                                </CardHeader>
                                                                                <CardContent className="space-y-4">
                                                                                        <div>
                                                                                                <p className="text-sm font-medium mb-2">Expertise:</p>
                                                                                                <div className="flex flex-wrap gap-1">
                                                                                                        {mentor.expertise.map((skill, index) => (
                                                                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                                                                        {skill}
                                                                                                                </Badge>
                                                                                                        ))}
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="space-y-2 text-sm text-muted-foreground">
                                                                                                <div className="flex items-center gap-2">
                                                                                                        <Calendar className="h-4 w-4" />
                                                                                                        <span>Next session: {mentor.nextSession}</span>
                                                                                                </div>
                                                                                                <div className="flex items-center gap-2">
                                                                                                        <Clock className="h-4 w-4" />
                                                                                                        <span>Total hours: {mentor.totalHours}</span>
                                                                                                </div>
                                                                                                <div className="flex items-center gap-2">
                                                                                                        <CheckCircle className="h-4 w-4" />
                                                                                                        <span>Mentoring since {mentor.joinedDate}</span>
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="flex gap-2 pt-2">
                                                                                                <Button size="sm" className="flex-1">
                                                                                                        <MessageCircle className="h-4 w-4 mr-2" />
                                                                                                        Schedule Session
                                                                                                </Button>
                                                                                                <Button variant="outline" size="sm">
                                                                                                        View Profile
                                                                                                </Button>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                ))}
                                                        </div>
                                                </TabsContent>

                                                <TabsContent value="discover" className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                                {suggestedMentors.map((mentor) => (
                                                                        <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                                                                                <CardHeader>
                                                                                        <div className="flex items-start gap-4">
                                                                                                <Avatar className="h-12 w-12">
                                                                                                        <AvatarFallback className="text-lg">
                                                                                                                {mentor.name.split(' ').map(n => n[0]).join('')}
                                                                                                        </AvatarFallback>
                                                                                                </Avatar>
                                                                                                <div className="flex-1">
                                                                                                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                                                                                                        <CardDescription>{mentor.position} at {mentor.company}</CardDescription>
                                                                                                        <p className="text-xs text-muted-foreground mt-1">Batch {mentor.batch}</p>
                                                                                                </div>
                                                                                                <Badge
                                                                                                        variant={mentor.availability === "Available" ? "secondary" : "outline"}
                                                                                                >
                                                                                                        {mentor.availability}
                                                                                                </Badge>
                                                                                        </div>
                                                                                </CardHeader>
                                                                                <CardContent className="space-y-4">
                                                                                        <div>
                                                                                                <p className="text-sm font-medium mb-2">Expertise:</p>
                                                                                                <div className="flex flex-wrap gap-1">
                                                                                                        {mentor.expertise.map((skill, index) => (
                                                                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                                                                        {skill}
                                                                                                                </Badge>
                                                                                                        ))}
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="space-y-2 text-sm text-muted-foreground">
                                                                                                <div className="flex items-center justify-between">
                                                                                                        <span>Rating:</span>
                                                                                                        <div className="flex items-center gap-1">
                                                                                                                <Star className="h-4 w-4 text-yellow-500" />
                                                                                                                <span>{mentor.rating}</span>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className="flex items-center justify-between">
                                                                                                        <span>Mentees:</span>
                                                                                                        <span>{mentor.mentees}</span>
                                                                                                </div>
                                                                                                <div className="flex items-center justify-between">
                                                                                                        <span>Languages:</span>
                                                                                                        <span>{mentor.languages.join(", ")}</span>
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="flex gap-2 pt-2">
                                                                                                <Button size="sm" className="flex-1">
                                                                                                        <Users className="h-4 w-4 mr-2" />
                                                                                                        Connect
                                                                                                </Button>
                                                                                                <Button variant="outline" size="sm">
                                                                                                        View Profile
                                                                                                </Button>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                ))}
                                                        </div>
                                                </TabsContent>

                                                <TabsContent value="sessions" className="space-y-6">
                                                        <div className="space-y-4">
                                                                {sessionHistory.map((session) => (
                                                                        <Card key={session.id}>
                                                                                <CardContent className="pt-6">
                                                                                        <div className="flex items-start gap-4">
                                                                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                                                        <MessageCircle className="h-6 w-6 text-blue-600" />
                                                                                                </div>
                                                                                                <div className="flex-1">
                                                                                                        <div className="flex items-center justify-between mb-2">
                                                                                                                <h3 className="font-medium">{session.topic}</h3>
                                                                                                                <div className="flex items-center gap-1">
                                                                                                                        {[...Array(5)].map((_, i) => (
                                                                                                                                <Star
                                                                                                                                        key={i}
                                                                                                                                        className={`h-4 w-4 ${i < session.rating
                                                                                                                                                        ? "text-yellow-500 fill-current"
                                                                                                                                                        : "text-gray-300"
                                                                                                                                                }`}
                                                                                                                                />
                                                                                                                        ))}
                                                                                                                </div>
                                                                                                        </div>
                                                                                                        <p className="text-sm text-muted-foreground mb-2">
                                                                                                                with {session.mentorName} • {session.date} • {session.duration}
                                                                                                        </p>
                                                                                                        <p className="text-sm">{session.notes}</p>
                                                                                                </div>
                                                                                                <Badge variant="outline" className="text-xs">
                                                                                                        Completed
                                                                                                </Badge>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                ))}
                                                        </div>
                                                </TabsContent>

                                                <TabsContent value="goals" className="space-y-6">
                                                        <div className="space-y-4">
                                                                {goals.map((goal) => (
                                                                        <Card key={goal.id}>
                                                                                <CardContent className="pt-6">
                                                                                        <div className="flex items-start gap-4">
                                                                                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                                                                                        <Target className="h-6 w-6 text-purple-600" />
                                                                                                </div>
                                                                                                <div className="flex-1 space-y-3">
                                                                                                        <div>
                                                                                                                <h3 className="font-medium mb-1">{goal.title}</h3>
                                                                                                                <p className="text-sm text-muted-foreground">{goal.description}</p>
                                                                                                        </div>

                                                                                                        <div className="space-y-2">
                                                                                                                <div className="flex items-center justify-between text-sm">
                                                                                                                        <span>Progress</span>
                                                                                                                        <span>{goal.progress}%</span>
                                                                                                                </div>
                                                                                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                                                                                        <div
                                                                                                                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                                                                                                                style={{ width: `${goal.progress}%` }}
                                                                                                                        ></div>
                                                                                                                </div>
                                                                                                        </div>

                                                                                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                                                                                <span>Mentor: {goal.mentor}</span>
                                                                                                                <span>Target: {goal.targetDate}</span>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <Badge variant="outline">
                                                                                                        In Progress
                                                                                                </Badge>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                ))}
                                                        </div>
                                                </TabsContent>
                                        </Tabs>
                                </div>
                        </div>
                </div>
        );
}
