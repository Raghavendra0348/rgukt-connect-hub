import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
        Users,
        Search,
        Building,
        MapPin,
        Calendar,
        MessageCircle,
        Filter,
        Mail,
        Phone,
        Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function FindAlumni() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
        const [searchTerm, setSearchTerm] = useState("");

        const [alumni, setAlumni] = useState([
                {
                        id: 1,
                        name: "Rajesh Kumar",
                        email: "rajesh.kumar@gmail.com",
                        batch: "2015",
                        branch: "Computer Science",
                        company: "Google",
                        position: "Senior Software Engineer",
                        location: "Bangalore",
                        experience: "8 years",
                        skills: ["React", "Node.js", "Python", "AWS"],
                        mentoring: true,
                        bio: "Passionate software engineer with expertise in full-stack development and cloud technologies."
                },
                {
                        id: 2,
                        name: "Priya Sharma",
                        email: "priya.sharma@microsoft.com",
                        batch: "2017",
                        branch: "Electronics",
                        company: "Microsoft",
                        position: "Product Manager",
                        location: "Hyderabad",
                        experience: "6 years",
                        skills: ["Product Strategy", "Analytics", "Leadership", "Azure"],
                        mentoring: true,
                        bio: "Product leader focused on building innovative solutions and scaling tech products."
                },
                {
                        id: 3,
                        name: "Amit Patel",
                        email: "amit.patel@amazon.com",
                        batch: "2018",
                        branch: "Computer Science",
                        company: "Amazon",
                        position: "Data Scientist",
                        location: "Seattle",
                        experience: "5 years",
                        skills: ["Machine Learning", "Python", "TensorFlow", "SQL"],
                        mentoring: false,
                        bio: "Data scientist specializing in machine learning and predictive analytics."
                },
                {
                        id: 4,
                        name: "Sneha Reddy",
                        email: "sneha.reddy@meta.com",
                        batch: "2016",
                        branch: "Information Technology",
                        company: "Meta",
                        position: "Engineering Manager",
                        location: "California",
                        experience: "7 years",
                        skills: ["Leadership", "React", "GraphQL", "Team Management"],
                        mentoring: true,
                        bio: "Engineering leader passionate about building scalable systems and mentoring junior developers."
                },
                {
                        id: 5,
                        name: "Kiran Singh",
                        email: "kiran.singh@netflix.com",
                        batch: "2019",
                        branch: "Computer Science",
                        company: "Netflix",
                        position: "DevOps Engineer",
                        location: "Remote",
                        experience: "4 years",
                        skills: ["Kubernetes", "Docker", "CI/CD", "Monitoring"],
                        mentoring: true,
                        bio: "DevOps engineer focused on building reliable and scalable infrastructure."
                },
                {
                        id: 6,
                        name: "Divya Agarwal",
                        email: "divya.agarwal@salesforce.com",
                        batch: "2020",
                        branch: "Electronics",
                        company: "Salesforce",
                        position: "UX Designer",
                        location: "San Francisco",
                        experience: "3 years",
                        skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
                        mentoring: true,
                        bio: "UX designer passionate about creating intuitive and accessible user experiences."
                }
        ]);

        const [filteredAlumni, setFilteredAlumni] = useState(alumni);

        useEffect(() => {
                checkAuth();
        }, []);

        useEffect(() => {
                const filtered = alumni.filter(alum =>
                        alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        alum.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        alum.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                setFilteredAlumni(filtered);
        }, [searchTerm, alumni]);

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
                                                        <p className="mt-4 text-muted-foreground">Loading alumni...</p>
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
                                                        <h1 className="text-4xl font-bold mb-2">Find Alumni</h1>
                                                        <p className="text-xl text-muted-foreground">
                                                                Connect with RGUKT alumni from various industries and batches
                                                        </p>
                                                </div>
                                                <Badge variant="outline" className="text-sm">
                                                        {filteredAlumni.length} Alumni Found
                                                </Badge>
                                        </div>

                                        {/* Search and Filters */}
                                        <Card className="mb-8">
                                                <CardContent className="pt-6">
                                                        <div className="flex flex-col md:flex-row gap-4">
                                                                <div className="flex-1 relative">
                                                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                                        <Input
                                                                                placeholder="Search by name, company, branch, or skills..."
                                                                                value={searchTerm}
                                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                                className="pl-10"
                                                                        />
                                                                </div>
                                                                <Button variant="outline" className="md:w-auto">
                                                                        <Filter className="h-4 w-4 mr-2" />
                                                                        Filters
                                                                </Button>
                                                        </div>
                                                </CardContent>
                                        </Card>

                                        {/* Alumni Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {filteredAlumni.map((alum) => (
                                                        <Card key={alum.id} className="hover:shadow-lg transition-shadow">
                                                                <CardHeader>
                                                                        <div className="flex items-start gap-4">
                                                                                <Avatar className="h-12 w-12">
                                                                                        <AvatarFallback className="text-lg">
                                                                                                {alum.name.split(' ').map(n => n[0]).join('')}
                                                                                        </AvatarFallback>
                                                                                </Avatar>
                                                                                <div className="flex-1">
                                                                                        <CardTitle className="text-lg">{alum.name}</CardTitle>
                                                                                        <CardDescription>{alum.position}</CardDescription>
                                                                                </div>
                                                                                {alum.mentoring && (
                                                                                        <Badge variant="secondary" className="text-xs">
                                                                                                Mentoring
                                                                                        </Badge>
                                                                                )}
                                                                        </div>
                                                                </CardHeader>
                                                                <CardContent className="space-y-4">
                                                                        <div className="space-y-2">
                                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                        <Building className="h-4 w-4" />
                                                                                        <span>{alum.company}</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                        <MapPin className="h-4 w-4" />
                                                                                        <span>{alum.location}</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                        <Calendar className="h-4 w-4" />
                                                                                        <span>Batch {alum.batch} • {alum.branch}</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                        <Briefcase className="h-4 w-4" />
                                                                                        <span>{alum.experience} experience</span>
                                                                                </div>
                                                                        </div>

                                                                        <div>
                                                                                <p className="text-sm text-muted-foreground mb-2">Bio:</p>
                                                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                                                        {alum.bio}
                                                                                </p>
                                                                        </div>

                                                                        <div>
                                                                                <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                                                                                <div className="flex flex-wrap gap-1">
                                                                                        {alum.skills.slice(0, 3).map((skill, index) => (
                                                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                                                        {skill}
                                                                                                </Badge>
                                                                                        ))}
                                                                                        {alum.skills.length > 3 && (
                                                                                                <Badge variant="outline" className="text-xs">
                                                                                                        +{alum.skills.length - 3}
                                                                                                </Badge>
                                                                                        )}
                                                                                </div>
                                                                        </div>

                                                                        <div className="flex gap-2 pt-2">
                                                                                <Button size="sm" className="flex-1">
                                                                                        <MessageCircle className="h-4 w-4 mr-2" />
                                                                                        Connect
                                                                                </Button>
                                                                                <Button variant="outline" size="sm">
                                                                                        <Mail className="h-4 w-4" />
                                                                                </Button>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                ))}
                                        </div>

                                        {filteredAlumni.length === 0 && (
                                                <Card>
                                                        <CardContent className="text-center py-12">
                                                                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                                                <h3 className="text-lg font-semibold mb-2">No Alumni Found</h3>
                                                                <p className="text-muted-foreground">
                                                                        Try adjusting your search terms or filters to find more alumni.
                                                                </p>
                                                        </CardContent>
                                                </Card>
                                        )}
                                </div>
                        </div>
                </div>
        );
}
