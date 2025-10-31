import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        Briefcase,
        GraduationCap,
        Network
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";

export default function AlumniNetwork() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);

        const [searchTerm, setSearchTerm] = useState("");
        const [selectedBatch, setSelectedBatch] = useState("All");

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
                        connections: 45,
                        bio: "Passionate software engineer with expertise in full-stack development and cloud technologies.",
                        joinedDate: "Jan 2020",
                        lastActive: "2 days ago"
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
                        connections: 38,
                        bio: "Product leader focused on building innovative solutions and scaling tech products.",
                        joinedDate: "Mar 2021",
                        lastActive: "1 day ago"
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
                        connections: 29,
                        bio: "Data scientist specializing in machine learning and predictive analytics.",
                        joinedDate: "Jun 2022",
                        lastActive: "1 week ago"
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
                        connections: 52,
                        bio: "Engineering leader passionate about building scalable systems and mentoring junior developers.",
                        joinedDate: "Sep 2020",
                        lastActive: "3 days ago"
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
                        connections: 33,
                        bio: "DevOps engineer focused on building reliable and scalable infrastructure.",
                        joinedDate: "Dec 2022",
                        lastActive: "Online now"
                }
        ]);

        const [filteredAlumni, setFilteredAlumni] = useState(alumni);
        const [myConnections, setMyConnections] = useState([
                alumni[0], alumni[1], alumni[3]
        ]);

        const batches = ["All", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];

        useEffect(() => {
                checkAuth();
        }, []);

        useEffect(() => {
                let filtered = alumni;

                if (searchTerm) {
                        filtered = filtered.filter(alum =>
                                alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                alum.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                alum.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
                        );
                }

                if (selectedBatch !== "All") {
                        filtered = filtered.filter(alum => alum.batch === selectedBatch);
                }

                setFilteredAlumni(filtered);
        }, [searchTerm, selectedBatch, alumni]);

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

        if (loading) {
                return (
                        <ResponsiveLayout role="alumni">
                                <div className="flex items-center justify-center py-12">
                                        <div className="text-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                                <p className="mt-4 text-muted-foreground">Loading network...</p>
                                        </div>
                                </div>
                        </ResponsiveLayout>
                );
        }

        return (
                <ResponsiveLayout role="alumni">
                        <div className="space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                        <div>
                                                <h1 className="text-4xl font-bold mb-2">Alumni Network</h1>
                                                <p className="text-xl text-muted-foreground">
                                                        Connect and collaborate with RGUKT alumni worldwide
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
                                                                        <p className="text-2xl font-bold">{alumni.length}</p>
                                                                        <p className="text-sm text-muted-foreground">Total Alumni</p>
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>
                                        <Card>
                                                <CardContent className="pt-6">
                                                        <div className="flex items-center gap-2">
                                                                <Network className="h-8 w-8 text-green-600" />
                                                                <div>
                                                                        <p className="text-2xl font-bold">{myConnections.length}</p>
                                                                        <p className="text-sm text-muted-foreground">My Connections</p>
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>
                                        <Card>
                                                <CardContent className="pt-6">
                                                        <div className="flex items-center gap-2">
                                                                <MessageCircle className="h-8 w-8 text-purple-600" />
                                                                <div>
                                                                        <p className="text-2xl font-bold">{alumni.filter(a => a.mentoring).length}</p>
                                                                        <p className="text-sm text-muted-foreground">Available Mentors</p>
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>
                                        <Card>
                                                <CardContent className="pt-6">
                                                        <div className="flex items-center gap-2">
                                                                <Building className="h-8 w-8 text-yellow-600" />
                                                                <div>
                                                                        <p className="text-2xl font-bold">{new Set(alumni.map(a => a.company)).size}</p>
                                                                        <p className="text-sm text-muted-foreground">Companies</p>
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>
                                </div>

                                <Tabs defaultValue="discover" className="space-y-6">
                                        <TabsList className="grid w-full grid-cols-3">
                                                <TabsTrigger value="discover">Discover Alumni</TabsTrigger>
                                                <TabsTrigger value="connections">My Connections</TabsTrigger>
                                                <TabsTrigger value="directory">Directory</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="discover" className="space-y-6">
                                                {/* Search and Filters */}
                                                <Card>
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
                                                                        <div className="flex gap-2">
                                                                                {batches.slice(0, 5).map((batch) => (
                                                                                        <Button
                                                                                                key={batch}
                                                                                                variant={selectedBatch === batch ? "default" : "outline"}
                                                                                                size="sm"
                                                                                                onClick={() => setSelectedBatch(batch)}
                                                                                        >
                                                                                                {batch}
                                                                                        </Button>
                                                                                ))}
                                                                        </div>
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
                                                                                                <div className="flex items-center gap-2 mt-2">
                                                                                                        {alum.mentoring && (
                                                                                                                <Badge variant="secondary" className="text-xs">
                                                                                                                        Mentoring
                                                                                                                </Badge>
                                                                                                        )}
                                                                                                        <Badge variant="outline" className="text-xs">
                                                                                                                Batch {alum.batch}
                                                                                                        </Badge>
                                                                                                </div>
                                                                                        </div>
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
                                                                                                <GraduationCap className="h-4 w-4" />
                                                                                                <span>{alum.branch}</span>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                                <Users className="h-4 w-4" />
                                                                                                <span>{alum.connections} connections</span>
                                                                                        </div>
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

                                                                                <div>
                                                                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                                                                                {alum.bio}
                                                                                        </p>
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
                                        </TabsContent>

                                        <TabsContent value="connections" className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {myConnections.map((connection) => (
                                                                <Card key={connection.id} className="hover:shadow-lg transition-shadow">
                                                                        <CardHeader>
                                                                                <div className="flex items-start gap-4">
                                                                                        <Avatar className="h-12 w-12">
                                                                                                <AvatarFallback className="text-lg">
                                                                                                        {connection.name.split(' ').map(n => n[0]).join('')}
                                                                                                </AvatarFallback>
                                                                                        </Avatar>
                                                                                        <div className="flex-1">
                                                                                                <CardTitle className="text-lg">{connection.name}</CardTitle>
                                                                                                <CardDescription>{connection.position} at {connection.company}</CardDescription>
                                                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                                                        Connected since {connection.joinedDate} • {connection.lastActive}
                                                                                                </p>
                                                                                        </div>
                                                                                </div>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div className="space-y-2">
                                                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                                <Building className="h-4 w-4" />
                                                                                                <span>{connection.company}</span>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                                <MapPin className="h-4 w-4" />
                                                                                                <span>{connection.location}</span>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                                <Briefcase className="h-4 w-4" />
                                                                                                <span>{connection.experience} experience</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex gap-2">
                                                                                        <Button size="sm" className="flex-1">
                                                                                                <MessageCircle className="h-4 w-4 mr-2" />
                                                                                                Message
                                                                                        </Button>
                                                                                        <Button variant="outline" size="sm">
                                                                                                <Mail className="h-4 w-4" />
                                                                                        </Button>
                                                                                        <Button variant="outline" size="sm">
                                                                                                <Phone className="h-4 w-4" />
                                                                                        </Button>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        ))}
                                                </div>
                                        </TabsContent>

                                        <TabsContent value="directory" className="space-y-6">
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle>Alumni Directory</CardTitle>
                                                                <CardDescription>Browse alumni by batch and branch</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="space-y-4">
                                                                        {batches.slice(1).map((batch) => {
                                                                                const batchAlumni = alumni.filter(a => a.batch === batch);
                                                                                const branches = [...new Set(batchAlumni.map(a => a.branch))];

                                                                                return (
                                                                                        <div key={batch} className="p-4 bg-muted/50 rounded-lg">
                                                                                                <h3 className="font-semibold mb-2">Batch {batch} ({batchAlumni.length} alumni)</h3>
                                                                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                                                                        {branches.map((branch) => {
                                                                                                                const branchCount = batchAlumni.filter(a => a.branch === branch).length;
                                                                                                                return (
                                                                                                                        <div key={branch} className="text-sm">
                                                                                                                                <span className="font-medium">{branch}:</span>
                                                                                                                                <span className="text-muted-foreground ml-1">{branchCount}</span>
                                                                                                                        </div>
                                                                                                                );
                                                                                                        })}
                                                                                                </div>
                                                                                        </div>
                                                                                );
                                                                        })}
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </TabsContent>
                                </Tabs>
                        </div>
                </ResponsiveLayout>
        );
}
