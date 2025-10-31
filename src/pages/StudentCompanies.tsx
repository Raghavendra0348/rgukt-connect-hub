import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
        Building,
        MapPin,
        Users,
        Star,
        Search,
        Filter,
        Briefcase,
        TrendingUp,
        Award,
        Eye,
        ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function StudentCompanies() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
        const [searchTerm, setSearchTerm] = useState("");

        const [companies, setCompanies] = useState([
                {
                        id: 1,
                        name: "Google",
                        logo: "/api/placeholder/60/60",
                        industry: "Technology",
                        location: "Multiple Locations",
                        employees: "150,000+",
                        founded: 1998,
                        description: "Multinational technology company specializing in Internet-related services and products.",
                        rguktalumni: 45,
                        openPositions: 12,
                        rating: 4.8,
                        website: "https://google.com",
                        benefits: ["Health Insurance", "Stock Options", "Remote Work", "Learning Budget"],
                        techStack: ["JavaScript", "Python", "Go", "Java", "Kubernetes"],
                        hiring: true
                },
                {
                        id: 2,
                        name: "Microsoft",
                        logo: "/api/placeholder/60/60",
                        industry: "Technology",
                        location: "Redmond, WA",
                        employees: "220,000+",
                        founded: 1975,
                        description: "American multinational technology corporation producing computer software and services.",
                        rguktalumni: 38,
                        openPositions: 8,
                        rating: 4.7,
                        website: "https://microsoft.com",
                        benefits: ["Health Insurance", "401k", "Flexible Hours", "Training Programs"],
                        techStack: [".NET", "Azure", "C#", "TypeScript", "React"],
                        hiring: true
                },
                {
                        id: 3,
                        name: "Amazon",
                        logo: "/api/placeholder/60/60",
                        industry: "E-commerce",
                        location: "Seattle, WA",
                        employees: "1,500,000+",
                        founded: 1994,
                        description: "American multinational technology company focusing on e-commerce and cloud computing.",
                        rguktalumni: 52,
                        openPositions: 15,
                        rating: 4.5,
                        website: "https://amazon.com",
                        benefits: ["Health Insurance", "Stock Options", "Career Development", "Relocation Support"],
                        techStack: ["AWS", "Java", "Python", "React", "Docker"],
                        hiring: true
                },
                {
                        id: 4,
                        name: "Meta",
                        logo: "/api/placeholder/60/60",
                        industry: "Social Media",
                        location: "Menlo Park, CA",
                        employees: "87,000+",
                        founded: 2004,
                        description: "Technology company focused on connecting people through social media platforms.",
                        rguktalumni: 23,
                        openPositions: 6,
                        rating: 4.6,
                        website: "https://meta.com",
                        benefits: ["Health Insurance", "Stock Options", "Free Meals", "Gym Membership"],
                        techStack: ["React", "GraphQL", "Python", "PHP", "React Native"],
                        hiring: false
                },
                {
                        id: 5,
                        name: "Netflix",
                        logo: "/api/placeholder/60/60",
                        industry: "Entertainment",
                        location: "Los Gatos, CA",
                        employees: "12,000+",
                        founded: 1997,
                        description: "American streaming entertainment service with TV series and films.",
                        rguktalumni: 15,
                        openPositions: 4,
                        rating: 4.9,
                        website: "https://netflix.com",
                        benefits: ["Unlimited PTO", "Stock Options", "Health Insurance", "Learning Budget"],
                        techStack: ["Java", "Python", "JavaScript", "Kubernetes", "AWS"],
                        hiring: true
                },
                {
                        id: 6,
                        name: "Salesforce",
                        logo: "/api/placeholder/60/60",
                        industry: "SaaS",
                        location: "San Francisco, CA",
                        employees: "79,000+",
                        founded: 1999,
                        description: "American cloud-based software company providing customer relationship management service.",
                        rguktalumni: 19,
                        openPositions: 7,
                        rating: 4.4,
                        website: "https://salesforce.com",
                        benefits: ["Health Insurance", "Volunteer Time Off", "Career Development", "Wellness Programs"],
                        techStack: ["Salesforce", "Java", "JavaScript", "Apex", "Lightning"],
                        hiring: true
                }
        ]);

        const [filteredCompanies, setFilteredCompanies] = useState(companies);
        const [selectedIndustry, setSelectedIndustry] = useState("All");

        const industries = ["All", "Technology", "E-commerce", "Social Media", "Entertainment", "SaaS"];

        useEffect(() => {
                checkAuth();
        }, []);

        useEffect(() => {
                let filtered = companies;

                if (searchTerm) {
                        filtered = filtered.filter(company =>
                                company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                company.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
                        );
                }

                if (selectedIndustry !== "All") {
                        filtered = filtered.filter(company => company.industry === selectedIndustry);
                }

                setFilteredCompanies(filtered);
        }, [searchTerm, selectedIndustry, companies]);

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
                                                        <p className="mt-4 text-muted-foreground">Loading companies...</p>
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
                                                        <h1 className="text-4xl font-bold mb-2">Companies</h1>
                                                        <p className="text-xl text-muted-foreground">
                                                                Explore companies where RGUKT alumni work and find opportunities
                                                        </p>
                                                </div>
                                                <Badge variant="outline" className="text-sm">
                                                        {filteredCompanies.length} Companies
                                                </Badge>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Building className="h-8 w-8 text-blue-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">{companies.length}</p>
                                                                                <p className="text-sm text-muted-foreground">Total Companies</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Users className="h-8 w-8 text-green-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">{companies.reduce((sum, c) => sum + c.rguktalumni, 0)}</p>
                                                                                <p className="text-sm text-muted-foreground">RGUKT Alumni</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Briefcase className="h-8 w-8 text-purple-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">{companies.reduce((sum, c) => sum + c.openPositions, 0)}</p>
                                                                                <p className="text-sm text-muted-foreground">Open Positions</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <TrendingUp className="h-8 w-8 text-yellow-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">{companies.filter(c => c.hiring).length}</p>
                                                                                <p className="text-sm text-muted-foreground">Actively Hiring</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </div>

                                        {/* Search and Filters */}
                                        <Card className="mb-8">
                                                <CardContent className="pt-6">
                                                        <div className="flex flex-col md:flex-row gap-4">
                                                                <div className="flex-1 relative">
                                                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                                        <Input
                                                                                placeholder="Search companies, industries, or technologies..."
                                                                                value={searchTerm}
                                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                                className="pl-10"
                                                                        />
                                                                </div>
                                                                <div className="flex gap-2">
                                                                        {industries.map((industry) => (
                                                                                <Button
                                                                                        key={industry}
                                                                                        variant={selectedIndustry === industry ? "default" : "outline"}
                                                                                        size="sm"
                                                                                        onClick={() => setSelectedIndustry(industry)}
                                                                                >
                                                                                        {industry}
                                                                                </Button>
                                                                        ))}
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>

                                        {/* Companies Grid */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {filteredCompanies.map((company) => (
                                                        <Card key={company.id} className="hover:shadow-lg transition-shadow">
                                                                <CardHeader>
                                                                        <div className="flex items-start gap-4">
                                                                                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                                                                                        <Building className="h-8 w-8 text-muted-foreground" />
                                                                                </div>
                                                                                <div className="flex-1">
                                                                                        <div className="flex items-center justify-between mb-2">
                                                                                                <CardTitle className="text-xl">{company.name}</CardTitle>
                                                                                                {company.hiring && (
                                                                                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                                                                                Hiring
                                                                                                        </Badge>
                                                                                                )}
                                                                                        </div>
                                                                                        <CardDescription>{company.industry}</CardDescription>
                                                                                        <div className="flex items-center gap-1 mt-2">
                                                                                                <Star className="h-4 w-4 text-yellow-500" />
                                                                                                <span className="text-sm font-medium">{company.rating}</span>
                                                                                                <span className="text-xs text-muted-foreground">
                                                                                                        • Founded {company.founded}
                                                                                                </span>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </CardHeader>
                                                                <CardContent className="space-y-4">
                                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                                                {company.description}
                                                                        </p>

                                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                                                <div className="flex items-center gap-2">
                                                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                                                        <span>{company.location}</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-2">
                                                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                                                        <span>{company.employees} employees</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-2">
                                                                                        <Award className="h-4 w-4 text-muted-foreground" />
                                                                                        <span>{company.rguktalumni} RGUKT alumni</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-2">
                                                                                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                                                        <span>{company.openPositions} open positions</span>
                                                                                </div>
                                                                        </div>

                                                                        <div>
                                                                                <p className="text-sm font-medium mb-2">Tech Stack:</p>
                                                                                <div className="flex flex-wrap gap-1">
                                                                                        {company.techStack.slice(0, 4).map((tech, index) => (
                                                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                                                        {tech}
                                                                                                </Badge>
                                                                                        ))}
                                                                                        {company.techStack.length > 4 && (
                                                                                                <Badge variant="outline" className="text-xs">
                                                                                                        +{company.techStack.length - 4}
                                                                                                </Badge>
                                                                                        )}
                                                                                </div>
                                                                        </div>

                                                                        <div>
                                                                                <p className="text-sm font-medium mb-2">Benefits:</p>
                                                                                <div className="flex flex-wrap gap-1">
                                                                                        {company.benefits.slice(0, 3).map((benefit, index) => (
                                                                                                <Badge key={index} variant="secondary" className="text-xs">
                                                                                                        {benefit}
                                                                                                </Badge>
                                                                                        ))}
                                                                                        {company.benefits.length > 3 && (
                                                                                                <Badge variant="secondary" className="text-xs">
                                                                                                        +{company.benefits.length - 3}
                                                                                                </Badge>
                                                                                        )}
                                                                                </div>
                                                                        </div>

                                                                        <div className="flex gap-2 pt-2">
                                                                                <Button size="sm" className="flex-1">
                                                                                        <Eye className="h-4 w-4 mr-2" />
                                                                                        View Jobs
                                                                                </Button>
                                                                                <Button variant="outline" size="sm">
                                                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                                                        Website
                                                                                </Button>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                ))}
                                        </div>

                                        {filteredCompanies.length === 0 && (
                                                <Card>
                                                        <CardContent className="text-center py-12">
                                                                <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                                                <h3 className="text-lg font-semibold mb-2">No Companies Found</h3>
                                                                <p className="text-muted-foreground">
                                                                        Try adjusting your search terms or filters to find more companies.
                                                                </p>
                                                        </CardContent>
                                                </Card>
                                        )}
                                </div>
                        </div>
                </div>
        );
}
