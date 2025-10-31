import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import {
        Search,
        Filter,
        Eye,
        Edit,
        Trash2,
        Plus,
        MapPin,
        Building,
        DollarSign,
        Clock,
        Users,
        CheckCircle,
        XCircle,
        AlertTriangle
} from "lucide-react";

const AdminJobs = () => {
        const { user } = useAuth();
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
        const [searchQuery, setSearchQuery] = React.useState("");
        const [selectedFilter, setSelectedFilter] = React.useState("all");

        const jobs = [
                {
                        id: 1,
                        title: "Senior Software Engineer",
                        company: "Google",
                        location: "Bangalore, India",
                        type: "Full-time",
                        salary: "₹25-35 LPA",
                        experience: "3-5 years",
                        skills: ["React", "Node.js", "Python", "AWS"],
                        postedBy: "Rajesh Kumar",
                        postedDate: "2024-01-15",
                        applications: 45,
                        status: "active",
                        featured: true,
                        description: "We are looking for a Senior Software Engineer to join our team...",
                        requirements: ["Bachelor's degree in CS", "3+ years experience", "Strong problem-solving skills"]
                },
                {
                        id: 2,
                        title: "Product Manager",
                        company: "Microsoft",
                        location: "Hyderabad, India",
                        type: "Full-time",
                        salary: "₹30-40 LPA",
                        experience: "4-6 years",
                        skills: ["Product Strategy", "Analytics", "Leadership"],
                        postedBy: "Priya Sharma",
                        postedDate: "2024-01-14",
                        applications: 32,
                        status: "active",
                        featured: false,
                        description: "Join our product team to drive innovation...",
                        requirements: ["MBA preferred", "4+ years PM experience", "Excellent communication"]
                },
                {
                        id: 3,
                        title: "Data Scientist",
                        company: "Amazon",
                        location: "Remote",
                        type: "Full-time",
                        salary: "₹20-30 LPA",
                        experience: "2-4 years",
                        skills: ["Python", "Machine Learning", "SQL", "Statistics"],
                        postedBy: "Arun Singh",
                        postedDate: "2024-01-13",
                        applications: 67,
                        status: "pending_review",
                        featured: false,
                        description: "Work on cutting-edge ML projects...",
                        requirements: ["Masters in Data Science", "2+ years experience", "Strong statistical background"]
                },
                {
                        id: 4,
                        title: "DevOps Engineer",
                        company: "Netflix",
                        location: "USA",
                        type: "Full-time",
                        salary: "$80-120k",
                        experience: "2-5 years",
                        skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
                        postedBy: "Sita Reddy",
                        postedDate: "2024-01-12",
                        applications: 28,
                        status: "closed",
                        featured: false,
                        description: "Help scale our infrastructure...",
                        requirements: ["Bachelors in Engineering", "Experience with cloud platforms", "DevOps tools expertise"]
                },
                {
                        id: 5,
                        title: "Frontend Developer",
                        company: "Spotify",
                        location: "Berlin, Germany",
                        type: "Contract",
                        salary: "€50-70k",
                        experience: "1-3 years",
                        skills: ["React", "TypeScript", "CSS", "JavaScript"],
                        postedBy: "Kiran Patel",
                        postedDate: "2024-01-11",
                        applications: 89,
                        status: "flagged",
                        featured: false,
                        description: "Build amazing user experiences...",
                        requirements: ["Strong frontend skills", "Experience with React", "Design sense"]
                }
        ];

        const stats = [
                {
                        title: "Total Jobs",
                        value: jobs.length,
                        icon: Building,
                        color: "text-blue-600"
                },
                {
                        title: "Active Jobs",
                        value: jobs.filter(j => j.status === "active").length,
                        icon: CheckCircle,
                        color: "text-green-600"
                },
                {
                        title: "Pending Review",
                        value: jobs.filter(j => j.status === "pending_review").length,
                        icon: Clock,
                        color: "text-yellow-600"
                },
                {
                        title: "Total Applications",
                        value: jobs.reduce((sum, job) => sum + job.applications, 0),
                        icon: Users,
                        color: "text-purple-600"
                }
        ];

        const getStatusBadge = (status: string) => {
                switch (status) {
                        case "active":
                                return <Badge className="bg-green-100 text-green-800">Active</Badge>;
                        case "pending_review":
                                return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
                        case "closed":
                                return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
                        case "flagged":
                                return <Badge className="bg-red-100 text-red-800">Flagged</Badge>;
                        default:
                                return <Badge variant="secondary">{status}</Badge>;
                }
        };

        const filteredJobs = jobs.filter(job => {
                const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchQuery.toLowerCase());

                if (selectedFilter === "all") return matchesSearch;
                return matchesSearch && job.status === selectedFilter;
        });

        const handleApprove = (id: number) => {
                console.log("Approving job with ID:", id);
        };

        const handleReject = (id: number) => {
                console.log("Rejecting job with ID:", id);
        };

        const handleFlag = (id: number) => {
                console.log("Flagging job with ID:", id);
        };

        const handleEdit = (id: number) => {
                console.log("Editing job with ID:", id);
        };

        const handleDelete = (id: number) => {
                console.log("Deleting job with ID:", id);
        };

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
                                                <div className="flex justify-between items-center">
                                                        <div>
                                                                <h1 className="text-3xl font-bold">Job Management</h1>
                                                                <p className="text-muted-foreground">
                                                                        Manage job postings and applications
                                                                </p>
                                                        </div>
                                                        <Button className="flex items-center gap-2">
                                                                <Plus className="h-4 w-4" />
                                                                Add Job
                                                        </Button>
                                                </div>

                                                {/* Stats */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                        {stats.map((stat, index) => (
                                                                <Card key={index}>
                                                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                                                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="text-2xl font-bold">{stat.value}</div>
                                                                        </CardContent>
                                                                </Card>
                                                        ))}
                                                </div>

                                                {/* Search and Filter */}
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle>Search & Filter</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="flex flex-col md:flex-row gap-4">
                                                                        <div className="flex-1">
                                                                                <div className="relative">
                                                                                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                                                        <Input
                                                                                                placeholder="Search by title, company, or location..."
                                                                                                value={searchQuery}
                                                                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                                                                className="pl-10"
                                                                                        />
                                                                                </div>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                                <Button
                                                                                        variant={selectedFilter === "all" ? "default" : "outline"}
                                                                                        onClick={() => setSelectedFilter("all")}
                                                                                >
                                                                                        All
                                                                                </Button>
                                                                                <Button
                                                                                        variant={selectedFilter === "active" ? "default" : "outline"}
                                                                                        onClick={() => setSelectedFilter("active")}
                                                                                        className="flex items-center gap-2"
                                                                                >
                                                                                        <CheckCircle className="h-4 w-4" />
                                                                                        Active
                                                                                </Button>
                                                                                <Button
                                                                                        variant={selectedFilter === "pending_review" ? "default" : "outline"}
                                                                                        onClick={() => setSelectedFilter("pending_review")}
                                                                                        className="flex items-center gap-2"
                                                                                >
                                                                                        <Clock className="h-4 w-4" />
                                                                                        Pending
                                                                                </Button>
                                                                                <Button
                                                                                        variant={selectedFilter === "flagged" ? "default" : "outline"}
                                                                                        onClick={() => setSelectedFilter("flagged")}
                                                                                        className="flex items-center gap-2"
                                                                                >
                                                                                        <AlertTriangle className="h-4 w-4" />
                                                                                        Flagged
                                                                                </Button>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                {/* Jobs List */}
                                                <div className="space-y-4">
                                                        {filteredJobs.map((job) => (
                                                                <Card key={job.id}>
                                                                        <CardHeader>
                                                                                <div className="flex items-start justify-between">
                                                                                        <div className="flex items-center gap-4">
                                                                                                <Avatar className="h-12 w-12">
                                                                                                        <AvatarImage src={`https://logo.clearbit.com/${job.company.toLowerCase()}.com`} />
                                                                                                        <AvatarFallback>
                                                                                                                <Building className="h-6 w-6" />
                                                                                                        </AvatarFallback>
                                                                                                </Avatar>
                                                                                                <div>
                                                                                                        <div className="flex items-center gap-2">
                                                                                                                <CardTitle className="text-lg">{job.title}</CardTitle>
                                                                                                                {job.featured && (
                                                                                                                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                                                                                                                Featured
                                                                                                                        </Badge>
                                                                                                                )}
                                                                                                        </div>
                                                                                                        <CardDescription className="flex items-center gap-4 mt-1">
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <Building className="h-4 w-4" />
                                                                                                                        {job.company}
                                                                                                                </span>
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <MapPin className="h-4 w-4" />
                                                                                                                        {job.location}
                                                                                                                </span>
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <DollarSign className="h-4 w-4" />
                                                                                                                        {job.salary}
                                                                                                                </span>
                                                                                                        </CardDescription>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2">
                                                                                                {getStatusBadge(job.status)}
                                                                                        </div>
                                                                                </div>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                                                                        <div>
                                                                                                <div className="text-sm font-medium text-muted-foreground">Type</div>
                                                                                                <div className="text-sm">{job.type}</div>
                                                                                        </div>
                                                                                        <div>
                                                                                                <div className="text-sm font-medium text-muted-foreground">Experience</div>
                                                                                                <div className="text-sm">{job.experience}</div>
                                                                                        </div>
                                                                                        <div>
                                                                                                <div className="text-sm font-medium text-muted-foreground">Applications</div>
                                                                                                <div className="text-sm font-semibold">{job.applications}</div>
                                                                                        </div>
                                                                                        <div>
                                                                                                <div className="text-sm font-medium text-muted-foreground">Posted By</div>
                                                                                                <div className="text-sm">{job.postedBy}</div>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="mb-4">
                                                                                        <div className="text-sm font-medium text-muted-foreground mb-2">Skills Required</div>
                                                                                        <div className="flex flex-wrap gap-2">
                                                                                                {job.skills.map((skill, index) => (
                                                                                                        <Badge key={index} variant="outline">{skill}</Badge>
                                                                                                ))}
                                                                                        </div>
                                                                                </div>

                                                                                <div className="mb-4">
                                                                                        <div className="text-sm font-medium text-muted-foreground mb-1">Description</div>
                                                                                        <p className="text-sm text-muted-foreground">{job.description}</p>
                                                                                </div>

                                                                                <div className="flex justify-between items-center">
                                                                                        <div className="text-xs text-muted-foreground">
                                                                                                Posted on {job.postedDate}
                                                                                        </div>
                                                                                        <div className="flex gap-2">
                                                                                                <Button variant="outline" size="sm" onClick={() => handleEdit(job.id)}>
                                                                                                        <Edit className="h-4 w-4" />
                                                                                                </Button>
                                                                                                <Button variant="outline" size="sm">
                                                                                                        <Eye className="h-4 w-4" />
                                                                                                </Button>
                                                                                                {job.status === "pending_review" && (
                                                                                                        <>
                                                                                                                <Button variant="default" size="sm" onClick={() => handleApprove(job.id)}>
                                                                                                                        <CheckCircle className="h-4 w-4" />
                                                                                                                </Button>
                                                                                                                <Button variant="destructive" size="sm" onClick={() => handleReject(job.id)}>
                                                                                                                        <XCircle className="h-4 w-4" />
                                                                                                                </Button>
                                                                                                        </>
                                                                                                )}
                                                                                                {job.status === "active" && (
                                                                                                        <Button variant="outline" size="sm" onClick={() => handleFlag(job.id)}>
                                                                                                                <AlertTriangle className="h-4 w-4" />
                                                                                                        </Button>
                                                                                                )}
                                                                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(job.id)}>
                                                                                                        <Trash2 className="h-4 w-4" />
                                                                                                </Button>
                                                                                        </div>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        ))}
                                                </div>

                                                {filteredJobs.length === 0 && (
                                                        <Card>
                                                                <CardContent className="py-12 text-center">
                                                                        <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                                                        <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                                                                        <p className="text-muted-foreground">
                                                                                {searchQuery ?
                                                                                        "Try adjusting your search criteria" :
                                                                                        "No jobs match the selected filter"
                                                                                }
                                                                        </p>
                                                                </CardContent>
                                                        </Card>
                                                )}
                                        </div>
                                </main>
                        </div>
                </div>
        );
};

export default AdminJobs;
