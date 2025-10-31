import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
        BookOpen,
        Play,
        Clock,
        Users,
        Award,
        CheckCircle,
        Star,
        Download,
        Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function StudentResources() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

        const [courses, setCourses] = useState([
                {
                        id: 1,
                        title: "Full Stack Web Development",
                        description: "Learn modern web development with React, Node.js, and databases",
                        instructor: "Rajesh Kumar (Google)",
                        duration: "12 weeks",
                        level: "Intermediate",
                        enrolled: 245,
                        rating: 4.8,
                        progress: 65,
                        category: "Programming",
                        topics: ["React", "Node.js", "MongoDB", "Express"],
                        status: "in-progress"
                },
                {
                        id: 2,
                        title: "Data Science Fundamentals",
                        description: "Introduction to data analysis, machine learning, and Python",
                        instructor: "Priya Sharma (Microsoft)",
                        duration: "10 weeks",
                        level: "Beginner",
                        enrolled: 189,
                        rating: 4.6,
                        progress: 40,
                        category: "Data Science",
                        topics: ["Python", "Pandas", "Scikit-learn", "Visualization"],
                        status: "in-progress"
                },
                {
                        id: 3,
                        title: "Digital Marketing Strategies",
                        description: "Learn effective digital marketing techniques and tools",
                        instructor: "Amit Patel (Amazon)",
                        duration: "8 weeks",
                        level: "Beginner",
                        enrolled: 156,
                        rating: 4.4,
                        progress: 25,
                        category: "Marketing",
                        topics: ["SEO", "Social Media", "Analytics", "Content Marketing"],
                        status: "in-progress"
                },
                {
                        id: 4,
                        title: "Mobile App Development",
                        description: "Build native and cross-platform mobile applications",
                        instructor: "Sneha Reddy (Meta)",
                        duration: "14 weeks",
                        level: "Advanced",
                        enrolled: 134,
                        rating: 4.9,
                        progress: 0,
                        category: "Mobile Development",
                        topics: ["React Native", "Flutter", "iOS", "Android"],
                        status: "not-started"
                },
                {
                        id: 5,
                        title: "Cloud Computing with AWS",
                        description: "Master cloud services and infrastructure management",
                        instructor: "Kiran Singh (Netflix)",
                        duration: "16 weeks",
                        level: "Intermediate",
                        enrolled: 98,
                        rating: 4.7,
                        progress: 100,
                        category: "Cloud Computing",
                        topics: ["AWS", "EC2", "S3", "Lambda", "DevOps"],
                        status: "completed"
                }
        ]);

        const [resources, setResources] = useState([
                {
                        id: 1,
                        title: "Interview Preparation Guide",
                        type: "PDF",
                        size: "2.5 MB",
                        downloads: 1245,
                        category: "Career",
                        description: "Comprehensive guide to technical and HR interviews"
                },
                {
                        id: 2,
                        title: "Resume Templates",
                        type: "ZIP",
                        size: "1.8 MB",
                        downloads: 892,
                        category: "Career",
                        description: "Professional resume templates for various industries"
                },
                {
                        id: 3,
                        title: "Coding Practice Problems",
                        type: "PDF",
                        size: "3.2 MB",
                        downloads: 2156,
                        category: "Programming",
                        description: "Collection of coding problems with solutions"
                },
                {
                        id: 4,
                        title: "Industry Trends Report 2024",
                        type: "PDF",
                        size: "4.1 MB",
                        downloads: 567,
                        category: "Industry",
                        description: "Latest trends in technology and job market"
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

        const getStatusColor = (status: string) => {
                switch (status) {
                        case "completed":
                                return "bg-green-500";
                        case "in-progress":
                                return "bg-blue-500";
                        default:
                                return "bg-gray-500";
                }
        };

        const getStatusText = (status: string) => {
                switch (status) {
                        case "completed":
                                return "Completed";
                        case "in-progress":
                                return "In Progress";
                        default:
                                return "Not Started";
                }
        };

        if (loading) {
                return (
                        <div className="min-h-screen bg-background">
                                <Navbar />
                                <div className="pt-24 container mx-auto px-4">
                                        <div className="flex items-center justify-center py-12">
                                                <div className="text-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                                        <p className="mt-4 text-muted-foreground">Loading resources...</p>
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
                                                        <h1 className="text-4xl font-bold mb-2">Learning Resources</h1>
                                                        <p className="text-xl text-muted-foreground">
                                                                Enhance your skills with courses and materials from RGUKT alumni
                                                        </p>
                                                </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <BookOpen className="h-8 w-8 text-blue-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">12</p>
                                                                                <p className="text-sm text-muted-foreground">Courses Available</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">3</p>
                                                                                <p className="text-sm text-muted-foreground">Courses In Progress</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Award className="h-8 w-8 text-yellow-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">1</p>
                                                                                <p className="text-sm text-muted-foreground">Completed</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Download className="h-8 w-8 text-purple-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">15</p>
                                                                                <p className="text-sm text-muted-foreground">Resources Downloaded</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </div>

                                        {/* Courses Section */}
                                        <div className="mb-8">
                                                <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                        {courses.map((course) => (
                                                                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                                                                        <CardHeader>
                                                                                <div className="flex items-start justify-between">
                                                                                        <div className="flex-1">
                                                                                                <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                                                                                                <CardDescription className="mb-3">{course.description}</CardDescription>
                                                                                                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                                                                                        </div>
                                                                                        <Badge
                                                                                                variant="outline"
                                                                                                className={`${getStatusColor(course.status)} text-white border-none`}
                                                                                        >
                                                                                                {getStatusText(course.status)}
                                                                                        </Badge>
                                                                                </div>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                                                        <div className="flex items-center gap-1">
                                                                                                <Clock className="h-4 w-4" />
                                                                                                <span>{course.duration}</span>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-1">
                                                                                                <Users className="h-4 w-4" />
                                                                                                <span>{course.enrolled} enrolled</span>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-1">
                                                                                                <Star className="h-4 w-4 text-yellow-500" />
                                                                                                <span>{course.rating}</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex items-center gap-2">
                                                                                        <Badge variant="secondary">{course.level}</Badge>
                                                                                        <Badge variant="outline">{course.category}</Badge>
                                                                                </div>

                                                                                <div className="space-y-2">
                                                                                        <div className="flex flex-wrap gap-1">
                                                                                                {course.topics.map((topic, index) => (
                                                                                                        <Badge key={index} variant="outline" className="text-xs">
                                                                                                                {topic}
                                                                                                        </Badge>
                                                                                                ))}
                                                                                        </div>
                                                                                </div>

                                                                                {course.status === "in-progress" && (
                                                                                        <div className="space-y-2">
                                                                                                <div className="flex items-center justify-between text-sm">
                                                                                                        <span>Progress</span>
                                                                                                        <span>{course.progress}%</span>
                                                                                                </div>
                                                                                                <Progress value={course.progress} className="h-2" />
                                                                                        </div>
                                                                                )}

                                                                                <div className="flex gap-2 pt-2">
                                                                                        {course.status === "not-started" ? (
                                                                                                <Button className="flex-1">
                                                                                                        <Play className="h-4 w-4 mr-2" />
                                                                                                        Start Course
                                                                                                </Button>
                                                                                        ) : course.status === "in-progress" ? (
                                                                                                <Button className="flex-1">
                                                                                                        Continue Learning
                                                                                                </Button>
                                                                                        ) : (
                                                                                                <Button variant="outline" className="flex-1">
                                                                                                        <Award className="h-4 w-4 mr-2" />
                                                                                                        View Certificate
                                                                                                </Button>
                                                                                        )}
                                                                                        <Button variant="outline" size="icon">
                                                                                                <Eye className="h-4 w-4" />
                                                                                        </Button>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        ))}
                                                </div>
                                        </div>

                                        {/* Resources Section */}
                                        <div>
                                                <h2 className="text-2xl font-bold mb-6">Downloadable Resources</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {resources.map((resource) => (
                                                                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                                                                        <CardContent className="pt-6">
                                                                                <div className="flex items-start gap-4">
                                                                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                                                <Download className="h-6 w-6 text-blue-600" />
                                                                                        </div>
                                                                                        <div className="flex-1">
                                                                                                <h3 className="font-semibold mb-1">{resource.title}</h3>
                                                                                                <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                                                                                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                                                                        <span>{resource.type} • {resource.size}</span>
                                                                                                        <span>{resource.downloads} downloads</span>
                                                                                                        <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                                                                                                </div>
                                                                                        </div>
                                                                                        <Button variant="outline" size="sm">
                                                                                                <Download className="h-4 w-4 mr-2" />
                                                                                                Download
                                                                                        </Button>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        ))}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
