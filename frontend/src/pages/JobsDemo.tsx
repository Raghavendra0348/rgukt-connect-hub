import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Building, DollarSign, Search, Filter } from "lucide-react";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";

interface JobPosting {
        id: string;
        title: string;
        company: string;
        location: string;
        job_type: string;
        experience_level: string;
        salary_range?: string;
        description: string;
        requirements: string[];
        application_deadline: string;
        created_at: string;
}

export default function JobsDemo() {
        const { toast } = useToast();
        const { role } = useAuth();
        const [searchTerm, setSearchTerm] = useState("");
        const [locationFilter, setLocationFilter] = useState("");
        const [jobTypeFilter, setJobTypeFilter] = useState("");

        // Mock data for demonstration
        const jobs: JobPosting[] = [
                {
                        id: "1",
                        title: "Senior Software Engineer",
                        company: "Tech Innovators Inc.",
                        location: "Hyderabad, India",
                        job_type: "full-time",
                        experience_level: "senior",
                        salary_range: "₹15-20 LPA",
                        description: "Join our dynamic team to build cutting-edge software solutions using modern technologies.",
                        requirements: [
                                "5+ years of experience in software development",
                                "Proficiency in React, Node.js, and databases",
                                "Strong problem-solving skills",
                                "Experience with cloud platforms (AWS/Azure)"
                        ],
                        application_deadline: "2025-12-01T23:59:59Z",
                        created_at: "2025-10-15T10:00:00Z"
                },
                {
                        id: "2",
                        title: "Data Scientist",
                        company: "Analytics Pro Ltd.",
                        location: "Bangalore, India",
                        job_type: "full-time",
                        experience_level: "mid",
                        salary_range: "₹12-16 LPA",
                        description: "Analyze complex datasets and build machine learning models to drive business insights.",
                        requirements: [
                                "3+ years of experience in data science",
                                "Proficiency in Python, R, and SQL",
                                "Experience with ML frameworks (TensorFlow, PyTorch)",
                                "Strong statistical and analytical skills"
                        ],
                        application_deadline: "2025-11-25T23:59:59Z",
                        created_at: "2025-10-20T14:30:00Z"
                },
                {
                        id: "3",
                        title: "Frontend Developer Intern",
                        company: "StartupXYZ",
                        location: "Remote",
                        job_type: "internship",
                        experience_level: "entry",
                        salary_range: "₹25,000/month",
                        description: "Learn and contribute to building beautiful user interfaces for web applications.",
                        requirements: [
                                "Knowledge of HTML, CSS, JavaScript",
                                "Familiarity with React or Vue.js",
                                "Good communication skills",
                                "Eagerness to learn and grow"
                        ],
                        application_deadline: "2025-11-15T23:59:59Z",
                        created_at: "2025-10-25T09:15:00Z"
                }
        ];

        const filteredJobs = jobs.filter(job => {
                const matchesSearch = !searchTerm ||
                        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesLocation = !locationFilter ||
                        job.location.toLowerCase().includes(locationFilter.toLowerCase());

                const matchesJobType = !jobTypeFilter || job.job_type === jobTypeFilter;

                return matchesSearch && matchesLocation && matchesJobType;
        });

        const handleApply = async (jobId: string) => {
                toast({
                        title: "Application Submitted",
                        description: "Your application has been submitted successfully!",
                });
        };

        const getJobTypeColor = (type: string) => {
                switch (type.toLowerCase()) {
                        case "full-time":
                                return "bg-green-100 text-green-800";
                        case "part-time":
                                return "bg-blue-100 text-blue-800";
                        case "contract":
                                return "bg-orange-100 text-orange-800";
                        case "internship":
                                return "bg-purple-100 text-purple-800";
                        default:
                                return "bg-gray-100 text-gray-800";
                }
        };

        const getExperienceColor = (level: string) => {
                switch (level.toLowerCase()) {
                        case "entry":
                                return "bg-blue-100 text-blue-800";
                        case "mid":
                                return "bg-yellow-100 text-yellow-800";
                        case "senior":
                                return "bg-red-100 text-red-800";
                        default:
                                return "bg-gray-100 text-gray-800";
                }
        };

        return (
                <ResponsiveLayout role={(role as "admin" | "alumni" | "student") || "student"}>
                        <div className="space-y-6">
                                <div className="text-center mb-12">
                                        <h1 className="text-4xl font-bold mb-4">Career Opportunities</h1>
                                        <p className="text-xl text-muted-foreground">
                                                Discover exciting career opportunities posted by alumni and partner companies
                                        </p>
                                </div>

                                {/* Filters */}
                                <div className="mb-8 p-6 bg-card rounded-lg border">
                                        <div className="flex items-center gap-4 mb-4">
                                                <Filter className="h-5 w-5 text-muted-foreground" />
                                                <h3 className="text-lg font-semibold">Filter Jobs</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                                placeholder="Search jobs, companies..."
                                                                value={searchTerm}
                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                className="pl-9"
                                                        />
                                                </div>
                                                <Input
                                                        placeholder="Location"
                                                        value={locationFilter}
                                                        onChange={(e) => setLocationFilter(e.target.value)}
                                                />
                                                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                                                        <SelectTrigger>
                                                                <SelectValue placeholder="Job Type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                                <SelectItem value="all">All Types</SelectItem>
                                                                <SelectItem value="full-time">Full-time</SelectItem>
                                                                <SelectItem value="part-time">Part-time</SelectItem>
                                                                <SelectItem value="contract">Contract</SelectItem>
                                                                <SelectItem value="internship">Internship</SelectItem>
                                                        </SelectContent>
                                                </Select>
                                        </div>
                                </div>

                                {filteredJobs.length === 0 ? (
                                        <div className="text-center py-12">
                                                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                                <h3 className="text-xl font-semibold mb-2">No Jobs Found</h3>
                                                <p className="text-muted-foreground">
                                                        Try adjusting your search filters to find more opportunities.
                                                </p>
                                        </div>
                                ) : (
                                        <div className="space-y-6">
                                                {filteredJobs.map((job) => (
                                                        <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                                                <CardHeader>
                                                                        <div className="flex items-start justify-between">
                                                                                <div className="flex-1">
                                                                                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                                                                                        <div className="flex items-center gap-4 text-muted-foreground mb-2">
                                                                                                <div className="flex items-center gap-1">
                                                                                                        <Building className="h-4 w-4" />
                                                                                                        {job.company}
                                                                                                </div>
                                                                                                <div className="flex items-center gap-1">
                                                                                                        <MapPin className="h-4 w-4" />
                                                                                                        {job.location}
                                                                                                </div>
                                                                                                {job.salary_range && (
                                                                                                        <div className="flex items-center gap-1">
                                                                                                                <DollarSign className="h-4 w-4" />
                                                                                                                {job.salary_range}
                                                                                                        </div>
                                                                                                )}
                                                                                        </div>
                                                                                        <div className="flex gap-2 mb-3">
                                                                                                <Badge className={getJobTypeColor(job.job_type)}>
                                                                                                        {job.job_type}
                                                                                                </Badge>
                                                                                                <Badge className={getExperienceColor(job.experience_level)}>
                                                                                                        {job.experience_level} Level
                                                                                                </Badge>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="text-sm text-muted-foreground">
                                                                                        Posted {format(new Date(job.created_at), "PPP")}
                                                                                </div>
                                                                        </div>
                                                                        <CardDescription>
                                                                                {job.description}
                                                                        </CardDescription>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        {job.requirements.length > 0 && (
                                                                                <div className="mb-4">
                                                                                        <h4 className="font-semibold mb-2">Requirements:</h4>
                                                                                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                                                                {job.requirements.map((req, index) => (
                                                                                                        <li key={index}>{req}</li>
                                                                                                ))}
                                                                                        </ul>
                                                                                </div>
                                                                        )}
                                                                        <div className="flex items-center justify-between">
                                                                                <div className="text-sm text-muted-foreground">
                                                                                        Apply by: {format(new Date(job.application_deadline), "PPP")}
                                                                                </div>
                                                                                <Button onClick={() => handleApply(job.id)}>
                                                                                        Apply Now
                                                                                </Button>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                ))}
                                        </div>
                                )}
                        </div>
                </ResponsiveLayout>
        );
}
