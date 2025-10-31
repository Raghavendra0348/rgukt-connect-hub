import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
        Award,
        Plus,
        Video,
        Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function AlumniMentorship() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

        const [myMentees, setMyMentees] = useState([
                {
                        id: 1,
                        name: "Arjun Reddy",
                        rollNumber: "2021A7PS1234G",
                        branch: "Computer Science",
                        year: 4,
                        cgpa: 8.5,
                        interests: ["Web Development", "Machine Learning"],
                        joinedDate: "Sep 2024",
                        totalSessions: 8,
                        nextSession: "Nov 20, 2024 at 3:00 PM",
                        status: "active",
                        progress: 75,
                        goals: ["Master System Design", "Build Portfolio", "Interview Prep"]
                },
                {
                        id: 2,
                        name: "Kavya Sharma",
                        rollNumber: "2022A7PS5678G",
                        branch: "Electronics",
                        year: 3,
                        cgpa: 9.1,
                        interests: ["IoT", "Embedded Systems", "Product Management"],
                        joinedDate: "Oct 2024",
                        totalSessions: 4,
                        nextSession: "Nov 22, 2024 at 2:00 PM",
                        status: "active",
                        progress: 40,
                        goals: ["Career Path Clarity", "Skill Development", "Industry Insights"]
                },
                {
                        id: 3,
                        name: "Rohit Kumar",
                        rollNumber: "2020A7PS9012G",
                        branch: "Computer Science",
                        year: 4,
                        cgpa: 7.8,
                        interests: ["Data Science", "Analytics"],
                        joinedDate: "Aug 2024",
                        totalSessions: 12,
                        nextSession: null,
                        status: "completed",
                        progress: 100,
                        goals: ["Data Science Career", "Portfolio Building", "Job Preparation"]
                }
        ]);

        const [menteeRequests, setMenteeRequests] = useState([
                {
                        id: 4,
                        name: "Priya Patel",
                        rollNumber: "2023A7PS3456G",
                        branch: "Information Technology",
                        year: 2,
                        cgpa: 8.9,
                        interests: ["Frontend Development", "UI/UX Design"],
                        requestDate: "Nov 15, 2024",
                        message: "Hi! I'm interested in frontend development and would love guidance on building modern web applications. I've been following your work at Google and would appreciate your mentorship.",
                        matchScore: 92
                },
                {
                        id: 5,
                        name: "Kiran Singh",
                        rollNumber: "2021A7PS7890G",
                        branch: "Computer Science",
                        year: 4,
                        cgpa: 8.2,
                        interests: ["Cloud Computing", "DevOps"],
                        requestDate: "Nov 12, 2024",
                        message: "Hello! I'm looking for guidance in cloud technologies and DevOps practices. Your expertise in scalable systems would be invaluable for my career growth.",
                        matchScore: 88
                }
        ]);

        const [sessionHistory, setSessionHistory] = useState([
                {
                        id: 1,
                        menteeName: "Arjun Reddy",
                        date: "Nov 15, 2024",
                        duration: "45 min",
                        topic: "System Design Fundamentals",
                        type: "video",
                        rating: 5,
                        notes: "Discussed scalability concepts, database design, and load balancing. Student showed great understanding.",
                        followUp: "Practice designing a URL shortener service"
                },
                {
                        id: 2,
                        menteeName: "Kavya Sharma",
                        date: "Nov 10, 2024",
                        duration: "30 min",
                        topic: "Career Path Discussion",
                        type: "call",
                        rating: 5,
                        notes: "Explored different career options in electronics. Discussed product management transition path.",
                        followUp: "Research product management roles in tech companies"
                },
                {
                        id: 3,
                        menteeName: "Rohit Kumar",
                        date: "Nov 5, 2024",
                        duration: "60 min",
                        topic: "Final Interview Preparation",
                        type: "video",
                        rating: 4,
                        notes: "Mock interview session for data science role. Covered technical and behavioral questions.",
                        followUp: "Practice SQL queries and case studies"
                }
        ]);

        const [stats, setStats] = useState({
                totalMentees: 15,
                activeMentees: 8,
                completedSessions: 45,
                averageRating: 4.8,
                totalHours: 68,
                successfulPlacements: 5
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

                setLoading(false);
        };

        const handleAcceptRequest = (requestId: number) => {
                const request = menteeRequests.find(r => r.id === requestId);
                if (request) {
                        const newMentee = {
                                ...request,
                                joinedDate: new Date().toLocaleDateString(),
                                totalSessions: 0,
                                nextSession: null,
                                status: "active" as const,
                                progress: 0,
                                goals: []
                        };
                        setMyMentees([...myMentees, newMentee]);
                        setMenteeRequests(menteeRequests.filter(r => r.id !== requestId));
                        toast({
                                title: "Request Accepted",
                                description: `${request.name} has been added to your mentees.`,
                        });
                }
        };

        const handleRejectRequest = (requestId: number) => {
                setMenteeRequests(menteeRequests.filter(r => r.id !== requestId));
                toast({
                        title: "Request Declined",
                        description: "The mentorship request has been declined.",
                });
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
                                role="alumni"
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
                                                                Guide and support the next generation of RGUKT students
                                                        </p>
                                                </div>
                                                <Button>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Update Availability
                                                </Button>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                                                                        <p className="text-2xl font-bold">{stats.totalMentees}</p>
                                                                        <p className="text-xs text-muted-foreground">Total Mentees</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                                                                        <p className="text-2xl font-bold">{stats.activeMentees}</p>
                                                                        <p className="text-xs text-muted-foreground">Active Mentees</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                                                                        <p className="text-2xl font-bold">{stats.totalHours}</p>
                                                                        <p className="text-xs text-muted-foreground">Hours Mentored</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                                                                        <p className="text-2xl font-bold">{stats.completedSessions}</p>
                                                                        <p className="text-xs text-muted-foreground">Sessions Completed</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <Star className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                                                                        <p className="text-2xl font-bold">{stats.averageRating}</p>
                                                                        <p className="text-xs text-muted-foreground">Average Rating</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <Award className="h-8 w-8 mx-auto mb-2 text-red-600" />
                                                                        <p className="text-2xl font-bold">{stats.successfulPlacements}</p>
                                                                        <p className="text-xs text-muted-foreground">Successful Placements</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </div>

                                        <Tabs defaultValue="mentees" className="space-y-6">
                                                <TabsList className="grid w-full grid-cols-4">
                                                        <TabsTrigger value="mentees">My Mentees</TabsTrigger>
                                                        <TabsTrigger value="requests">
                                                                Requests {menteeRequests.length > 0 && (
                                                                        <Badge className="ml-2 bg-red-500">{menteeRequests.length}</Badge>
                                                                )}
                                                        </TabsTrigger>
                                                        <TabsTrigger value="sessions">Session History</TabsTrigger>
                                                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="mentees" className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                {myMentees.map((mentee) => (
                                                                        <Card key={mentee.id} className="hover:shadow-lg transition-shadow">
                                                                                <CardHeader>
                                                                                        <div className="flex items-start gap-4">
                                                                                                <Avatar className="h-12 w-12">
                                                                                                        <AvatarFallback className="text-lg">
                                                                                                                {mentee.name.split(' ').map(n => n[0]).join('')}
                                                                                                        </AvatarFallback>
                                                                                                </Avatar>
                                                                                                <div className="flex-1">
                                                                                                        <CardTitle className="text-lg">{mentee.name}</CardTitle>
                                                                                                        <CardDescription>{mentee.rollNumber}</CardDescription>
                                                                                                        <div className="flex items-center gap-2 mt-2">
                                                                                                                <Badge variant={mentee.status === 'active' ? 'default' : 'secondary'}>
                                                                                                                        {mentee.status}
                                                                                                                </Badge>
                                                                                                                <Badge variant="outline">
                                                                                                                        Year {mentee.year} • CGPA {mentee.cgpa}
                                                                                                                </Badge>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </CardHeader>
                                                                                <CardContent className="space-y-4">
                                                                                        <div className="space-y-2 text-sm">
                                                                                                <div className="flex items-center justify-between">
                                                                                                        <span>Branch:</span>
                                                                                                        <span className="font-medium">{mentee.branch}</span>
                                                                                                </div>
                                                                                                <div className="flex items-center justify-between">
                                                                                                        <span>Sessions:</span>
                                                                                                        <span className="font-medium">{mentee.totalSessions}</span>
                                                                                                </div>
                                                                                                <div className="flex items-center justify-between">
                                                                                                        <span>Progress:</span>
                                                                                                        <span className="font-medium">{mentee.progress}%</span>
                                                                                                </div>
                                                                                                {mentee.nextSession && (
                                                                                                        <div className="flex items-center justify-between">
                                                                                                                <span>Next Session:</span>
                                                                                                                <span className="font-medium text-blue-600">{mentee.nextSession}</span>
                                                                                                        </div>
                                                                                                )}
                                                                                        </div>

                                                                                        <div>
                                                                                                <p className="text-sm font-medium mb-2">Interests:</p>
                                                                                                <div className="flex flex-wrap gap-1">
                                                                                                        {mentee.interests.map((interest, index) => (
                                                                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                                                                        {interest}
                                                                                                                </Badge>
                                                                                                        ))}
                                                                                                </div>
                                                                                        </div>

                                                                                        {mentee.goals.length > 0 && (
                                                                                                <div>
                                                                                                        <p className="text-sm font-medium mb-2">Goals:</p>
                                                                                                        <div className="space-y-1">
                                                                                                                {mentee.goals.slice(0, 2).map((goal, index) => (
                                                                                                                        <p key={index} className="text-xs text-muted-foreground">
                                                                                                                                • {goal}
                                                                                                                        </p>
                                                                                                                ))}
                                                                                                        </div>
                                                                                                </div>
                                                                                        )}

                                                                                        <div className="flex gap-2 pt-2">
                                                                                                {mentee.status === 'active' ? (
                                                                                                        <>
                                                                                                                <Button size="sm" className="flex-1">
                                                                                                                        <Video className="h-4 w-4 mr-2" />
                                                                                                                        Schedule Session
                                                                                                                </Button>
                                                                                                                <Button variant="outline" size="sm">
                                                                                                                        <MessageCircle className="h-4 w-4 mr-2" />
                                                                                                                        Message
                                                                                                                </Button>
                                                                                                        </>
                                                                                                ) : (
                                                                                                        <Button variant="outline" size="sm" className="flex-1">
                                                                                                                View Progress Report
                                                                                                        </Button>
                                                                                                )}
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                ))}
                                                        </div>
                                                </TabsContent>

                                                <TabsContent value="requests" className="space-y-6">
                                                        <div className="space-y-4">
                                                                {menteeRequests.map((request) => (
                                                                        <Card key={request.id} className="hover:shadow-lg transition-shadow">
                                                                                <CardHeader>
                                                                                        <div className="flex items-start gap-4">
                                                                                                <Avatar className="h-12 w-12">
                                                                                                        <AvatarFallback className="text-lg">
                                                                                                                {request.name.split(' ').map(n => n[0]).join('')}
                                                                                                        </AvatarFallback>
                                                                                                </Avatar>
                                                                                                <div className="flex-1">
                                                                                                        <div className="flex items-center justify-between mb-2">
                                                                                                                <CardTitle className="text-lg">{request.name}</CardTitle>
                                                                                                                <div className="flex items-center gap-2">
                                                                                                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                                                                                                {request.matchScore}% match
                                                                                                                        </Badge>
                                                                                                                        <Badge variant="outline" className="text-xs">
                                                                                                                                {request.requestDate}
                                                                                                                        </Badge>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                        <CardDescription>{request.rollNumber} • {request.branch}</CardDescription>
                                                                                                        <div className="flex items-center gap-2 mt-2">
                                                                                                                <Badge variant="outline">
                                                                                                                        Year {request.year} • CGPA {request.cgpa}
                                                                                                                </Badge>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </CardHeader>
                                                                                <CardContent className="space-y-4">
                                                                                        <div>
                                                                                                <p className="text-sm font-medium mb-2">Message:</p>
                                                                                                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                                                                                        {request.message}
                                                                                                </p>
                                                                                        </div>

                                                                                        <div>
                                                                                                <p className="text-sm font-medium mb-2">Interests:</p>
                                                                                                <div className="flex flex-wrap gap-1">
                                                                                                        {request.interests.map((interest, index) => (
                                                                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                                                                        {interest}
                                                                                                                </Badge>
                                                                                                        ))}
                                                                                                </div>
                                                                                        </div>

                                                                                        <div className="flex gap-2 pt-2">
                                                                                                <Button
                                                                                                        size="sm"
                                                                                                        className="flex-1"
                                                                                                        onClick={() => handleAcceptRequest(request.id)}
                                                                                                >
                                                                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                                                                        Accept Request
                                                                                                </Button>
                                                                                                <Button
                                                                                                        variant="outline"
                                                                                                        size="sm"
                                                                                                        onClick={() => handleRejectRequest(request.id)}
                                                                                                >
                                                                                                        <AlertCircle className="h-4 w-4 mr-2" />
                                                                                                        Decline
                                                                                                </Button>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                ))}
                                                        </div>

                                                        {menteeRequests.length === 0 && (
                                                                <Card>
                                                                        <CardContent className="text-center py-12">
                                                                                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                                                                <h3 className="text-lg font-semibold mb-2">No Pending Requests</h3>
                                                                                <p className="text-muted-foreground">
                                                                                        You have no pending mentorship requests at the moment.
                                                                                </p>
                                                                        </CardContent>
                                                                </Card>
                                                        )}
                                                </TabsContent>

                                                <TabsContent value="sessions" className="space-y-6">
                                                        <div className="space-y-4">
                                                                {sessionHistory.map((session) => (
                                                                        <Card key={session.id}>
                                                                                <CardContent className="pt-6">
                                                                                        <div className="flex items-start gap-4">
                                                                                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${session.type === 'video' ? 'bg-blue-100' : 'bg-green-100'
                                                                                                        }`}>
                                                                                                        {session.type === 'video' ? (
                                                                                                                <Video className="h-6 w-6 text-blue-600" />
                                                                                                        ) : (
                                                                                                                <Phone className="h-6 w-6 text-green-600" />
                                                                                                        )}
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
                                                                                                                with {session.menteeName} • {session.date} • {session.duration}
                                                                                                        </p>
                                                                                                        <p className="text-sm mb-2">{session.notes}</p>
                                                                                                        {session.followUp && (
                                                                                                                <div className="bg-blue-50 p-2 rounded-lg">
                                                                                                                        <p className="text-xs font-medium text-blue-800">Follow-up:</p>
                                                                                                                        <p className="text-xs text-blue-700">{session.followUp}</p>
                                                                                                                </div>
                                                                                                        )}
                                                                                                </div>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                ))}
                                                        </div>
                                                </TabsContent>

                                                <TabsContent value="analytics" className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle>Mentorship Impact</CardTitle>
                                                                                <CardDescription>Your contribution to student success</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div className="space-y-2">
                                                                                        <div className="flex items-center justify-between text-sm">
                                                                                                <span>Successful Job Placements:</span>
                                                                                                <span className="font-medium">{stats.successfulPlacements}</span>
                                                                                        </div>
                                                                                        <div className="flex items-center justify-between text-sm">
                                                                                                <span>Average Session Rating:</span>
                                                                                                <span className="font-medium">{stats.averageRating}/5.0</span>
                                                                                        </div>
                                                                                        <div className="flex items-center justify-between text-sm">
                                                                                                <span>Total Mentoring Hours:</span>
                                                                                                <span className="font-medium">{stats.totalHours} hours</span>
                                                                                        </div>
                                                                                        <div className="flex items-center justify-between text-sm">
                                                                                                <span>Completion Rate:</span>
                                                                                                <span className="font-medium">85%</span>
                                                                                        </div>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>

                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle>Popular Topics</CardTitle>
                                                                                <CardDescription>Most discussed topics in your sessions</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="space-y-3">
                                                                                        {[
                                                                                                { topic: "Career Guidance", sessions: 18 },
                                                                                                { topic: "Technical Skills", sessions: 15 },
                                                                                                { topic: "Interview Preparation", sessions: 12 },
                                                                                                { topic: "System Design", sessions: 8 },
                                                                                                { topic: "Industry Insights", sessions: 6 }
                                                                                        ].map((item, index) => (
                                                                                                <div key={index} className="flex items-center justify-between text-sm">
                                                                                                        <span>{item.topic}</span>
                                                                                                        <Badge variant="outline">{item.sessions} sessions</Badge>
                                                                                                </div>
                                                                                        ))}
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </div>
                                                </TabsContent>
                                        </Tabs>
                                </div>
                        </div>
                </div>
        );
}
