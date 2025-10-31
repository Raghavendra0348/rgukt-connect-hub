import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
        Briefcase,
        MapPin,
        DollarSign,
        Calendar,
        Building,
        Users,
        Clock,
        Plus,
        Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function AlumniPostJob() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
        const [isSubmitting, setIsSubmitting] = useState(false);

        const [jobForm, setJobForm] = useState({
                title: "",
                company: "",
                location: "",
                type: "",
                experience: "",
                salary: "",
                description: "",
                requirements: "",
                benefits: "",
                applicationDeadline: "",
                applicationUrl: "",
                contactEmail: "",
                skills: [] as string[],
                department: ""
        });

        const [myPostedJobs, setMyPostedJobs] = useState([
                {
                        id: 1,
                        title: "Senior Software Engineer",
                        company: "Google",
                        location: "Bangalore",
                        type: "Full-time",
                        salary: "₹25-35 LPA",
                        postedDate: "Oct 25, 2024",
                        deadline: "Nov 30, 2024",
                        applications: 45,
                        views: 234,
                        status: "active"
                },
                {
                        id: 2,
                        title: "Product Manager Intern",
                        company: "Google",
                        location: "Remote",
                        type: "Internship",
                        salary: "₹50,000/month",
                        postedDate: "Oct 15, 2024",
                        deadline: "Nov 15, 2024",
                        applications: 28,
                        views: 156,
                        status: "closed"
                }
        ]);

        const jobTypes = ["Full-time", "Part-time", "Internship", "Contract", "Freelance"];
        const experienceLevels = ["Entry Level", "1-2 years", "3-5 years", "5-7 years", "7+ years"];
        const departments = ["Engineering", "Product", "Design", "Marketing", "Sales", "Operations", "HR", "Finance"];

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

        const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                setIsSubmitting(true);

                try {
                        // Simulate API call
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        const newJob = {
                                id: Date.now(),
                                ...jobForm,
                                postedDate: new Date().toLocaleDateString(),
                                applications: 0,
                                views: 0,
                                status: "active" as const
                        };

                        setMyPostedJobs([newJob, ...myPostedJobs]);

                        // Reset form
                        setJobForm({
                                title: "",
                                company: "",
                                location: "",
                                type: "",
                                experience: "",
                                salary: "",
                                description: "",
                                requirements: "",
                                benefits: "",
                                applicationDeadline: "",
                                applicationUrl: "",
                                contactEmail: "",
                                skills: [],
                                department: ""
                        });

                        toast({
                                title: "Job Posted Successfully",
                                description: "Your job posting is now live and visible to students.",
                        });
                } catch (error) {
                        toast({
                                title: "Error",
                                description: "Failed to post the job. Please try again.",
                                variant: "destructive",
                        });
                } finally {
                        setIsSubmitting(false);
                }
        };

        const handleInputChange = (field: string, value: string) => {
                setJobForm(prev => ({ ...prev, [field]: value }));
        };

        if (loading) {
                return (
                        <div className="min-h-screen bg-background">
                                <Navbar />
                                <div className="pt-24 container mx-auto px-4">
                                        <div className="flex items-center justify-center py-12">
                                                <div className="text-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                                        <p className="mt-4 text-muted-foreground">Loading...</p>
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
                                                        <h1 className="text-4xl font-bold mb-2">Post a Job</h1>
                                                        <p className="text-xl text-muted-foreground">
                                                                Share opportunities and help RGUKT students find their dream jobs
                                                        </p>
                                                </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                {/* Job Posting Form */}
                                                <div className="lg:col-span-2">
                                                        <Card>
                                                                <CardHeader>
                                                                        <CardTitle className="flex items-center gap-2">
                                                                                <Plus className="h-5 w-5" />
                                                                                Create Job Posting
                                                                        </CardTitle>
                                                                        <CardDescription>
                                                                                Fill in the details to post a new job opportunity
                                                                        </CardDescription>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <form onSubmit={handleSubmit} className="space-y-6">
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div className="space-y-2">
                                                                                                <Label htmlFor="title">Job Title *</Label>
                                                                                                <Input
                                                                                                        id="title"
                                                                                                        value={jobForm.title}
                                                                                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                                                                                        placeholder="e.g. Senior Software Engineer"
                                                                                                        required
                                                                                                />
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                                <Label htmlFor="company">Company *</Label>
                                                                                                <Input
                                                                                                        id="company"
                                                                                                        value={jobForm.company}
                                                                                                        onChange={(e) => handleInputChange("company", e.target.value)}
                                                                                                        placeholder="e.g. Google"
                                                                                                        required
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                                        <div className="space-y-2">
                                                                                                <Label htmlFor="location">Location *</Label>
                                                                                                <Input
                                                                                                        id="location"
                                                                                                        value={jobForm.location}
                                                                                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                                                                                        placeholder="e.g. Bangalore / Remote"
                                                                                                        required
                                                                                                />
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                                <Label htmlFor="type">Job Type *</Label>
                                                                                                <Select onValueChange={(value) => handleInputChange("type", value)}>
                                                                                                        <SelectTrigger>
                                                                                                                <SelectValue placeholder="Select type" />
                                                                                                        </SelectTrigger>
                                                                                                        <SelectContent>
                                                                                                                {jobTypes.map((type) => (
                                                                                                                        <SelectItem key={type} value={type}>
                                                                                                                                {type}
                                                                                                                        </SelectItem>
                                                                                                                ))}
                                                                                                        </SelectContent>
                                                                                                </Select>
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                                <Label htmlFor="experience">Experience Level *</Label>
                                                                                                <Select onValueChange={(value) => handleInputChange("experience", value)}>
                                                                                                        <SelectTrigger>
                                                                                                                <SelectValue placeholder="Select level" />
                                                                                                        </SelectTrigger>
                                                                                                        <SelectContent>
                                                                                                                {experienceLevels.map((level) => (
                                                                                                                        <SelectItem key={level} value={level}>
                                                                                                                                {level}
                                                                                                                        </SelectItem>
                                                                                                                ))}
                                                                                                        </SelectContent>
                                                                                                </Select>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div className="space-y-2">
                                                                                                <Label htmlFor="salary">Salary Range</Label>
                                                                                                <Input
                                                                                                        id="salary"
                                                                                                        value={jobForm.salary}
                                                                                                        onChange={(e) => handleInputChange("salary", e.target.value)}
                                                                                                        placeholder="e.g. ₹15-25 LPA"
                                                                                                />
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                                <Label htmlFor="department">Department</Label>
                                                                                                <Select onValueChange={(value) => handleInputChange("department", value)}>
                                                                                                        <SelectTrigger>
                                                                                                                <SelectValue placeholder="Select department" />
                                                                                                        </SelectTrigger>
                                                                                                        <SelectContent>
                                                                                                                {departments.map((dept) => (
                                                                                                                        <SelectItem key={dept} value={dept}>
                                                                                                                                {dept}
                                                                                                                        </SelectItem>
                                                                                                                ))}
                                                                                                        </SelectContent>
                                                                                                </Select>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="space-y-2">
                                                                                        <Label htmlFor="description">Job Description *</Label>
                                                                                        <Textarea
                                                                                                id="description"
                                                                                                value={jobForm.description}
                                                                                                onChange={(e) => handleInputChange("description", e.target.value)}
                                                                                                placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
                                                                                                rows={4}
                                                                                                required
                                                                                        />
                                                                                </div>

                                                                                <div className="space-y-2">
                                                                                        <Label htmlFor="requirements">Requirements *</Label>
                                                                                        <Textarea
                                                                                                id="requirements"
                                                                                                value={jobForm.requirements}
                                                                                                onChange={(e) => handleInputChange("requirements", e.target.value)}
                                                                                                placeholder="List the required skills, qualifications, and experience..."
                                                                                                rows={4}
                                                                                                required
                                                                                        />
                                                                                </div>

                                                                                <div className="space-y-2">
                                                                                        <Label htmlFor="benefits">Benefits & Perks</Label>
                                                                                        <Textarea
                                                                                                id="benefits"
                                                                                                value={jobForm.benefits}
                                                                                                onChange={(e) => handleInputChange("benefits", e.target.value)}
                                                                                                placeholder="Describe the benefits, perks, and company culture..."
                                                                                                rows={3}
                                                                                        />
                                                                                </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div className="space-y-2">
                                                                                                <Label htmlFor="deadline">Application Deadline</Label>
                                                                                                <Input
                                                                                                        id="deadline"
                                                                                                        type="date"
                                                                                                        value={jobForm.applicationDeadline}
                                                                                                        onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                                                                                                />
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                                <Label htmlFor="applicationUrl">Application URL</Label>
                                                                                                <Input
                                                                                                        id="applicationUrl"
                                                                                                        type="url"
                                                                                                        value={jobForm.applicationUrl}
                                                                                                        onChange={(e) => handleInputChange("applicationUrl", e.target.value)}
                                                                                                        placeholder="https://company.com/apply"
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div className="space-y-2">
                                                                                        <Label htmlFor="contactEmail">Contact Email</Label>
                                                                                        <Input
                                                                                                id="contactEmail"
                                                                                                type="email"
                                                                                                value={jobForm.contactEmail}
                                                                                                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                                                                                                placeholder="hr@company.com"
                                                                                        />
                                                                                </div>

                                                                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                                                                        {isSubmitting ? (
                                                                                                <div className="flex items-center gap-2">
                                                                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                                                                        Posting...
                                                                                                </div>
                                                                                        ) : (
                                                                                                <>
                                                                                                        <Send className="h-4 w-4 mr-2" />
                                                                                                        Post Job
                                                                                                </>
                                                                                        )}
                                                                                </Button>
                                                                        </form>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                {/* My Posted Jobs */}
                                                <div className="lg:col-span-1">
                                                        <Card>
                                                                <CardHeader>
                                                                        <CardTitle className="flex items-center gap-2">
                                                                                <Briefcase className="h-5 w-5" />
                                                                                My Posted Jobs
                                                                        </CardTitle>
                                                                        <CardDescription>
                                                                                Jobs you've posted recently
                                                                        </CardDescription>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <div className="space-y-4">
                                                                                {myPostedJobs.map((job) => (
                                                                                        <div key={job.id} className={`p-4 rounded-lg border ${job.status === 'active' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                                                                                                }`}>
                                                                                                <div className="flex items-start justify-between mb-2">
                                                                                                        <h4 className="font-medium text-sm">{job.title}</h4>
                                                                                                        <Badge variant={job.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                                                                                                                {job.status}
                                                                                                        </Badge>
                                                                                                </div>

                                                                                                <div className="space-y-1 text-xs text-muted-foreground">
                                                                                                        <div className="flex items-center gap-1">
                                                                                                                <Building className="h-3 w-3" />
                                                                                                                <span>{job.company}</span>
                                                                                                        </div>
                                                                                                        <div className="flex items-center gap-1">
                                                                                                                <MapPin className="h-3 w-3" />
                                                                                                                <span>{job.location}</span>
                                                                                                        </div>
                                                                                                        <div className="flex items-center gap-1">
                                                                                                                <Calendar className="h-3 w-3" />
                                                                                                                <span>Posted {job.postedDate}</span>
                                                                                                        </div>
                                                                                                </div>

                                                                                                <div className="flex items-center justify-between mt-3 pt-2 border-t">
                                                                                                        <div className="flex items-center gap-3 text-xs">
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <Users className="h-3 w-3" />
                                                                                                                        {job.applications}
                                                                                                                </span>
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <Clock className="h-3 w-3" />
                                                                                                                        {job.views}
                                                                                                                </span>
                                                                                                        </div>
                                                                                                        <Button variant="outline" size="sm" className="text-xs h-6">
                                                                                                                View
                                                                                                        </Button>
                                                                                                </div>
                                                                                        </div>
                                                                                ))}
                                                                        </div>

                                                                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                                                                <h4 className="font-medium text-sm mb-2">💡 Tips for Better Job Posts</h4>
                                                                                <ul className="text-xs text-muted-foreground space-y-1">
                                                                                        <li>• Be specific about requirements</li>
                                                                                        <li>• Include salary range when possible</li>
                                                                                        <li>• Mention growth opportunities</li>
                                                                                        <li>• Highlight company culture</li>
                                                                                </ul>
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
