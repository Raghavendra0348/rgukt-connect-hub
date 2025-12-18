import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { useToast } from "@/hooks/use-toast";
import {
  Briefcase,
  MapPin,
  Building,
  Clock,
  DollarSign,
  Search,
  Filter,
  ExternalLink,
  Bookmark,
  Users
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  experience_level: string;
  salary_range?: string;
  description: string;
  skills_required: string[];
  posted_date: string;
  is_remote: boolean;
}

export default function Jobs() {
  const { user, role } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Mock jobs data
    const mockJobs: Job[] = [
      {
        id: "1",
        title: "Software Engineer",
        company: "Google",
        location: "Bangalore, India",
        job_type: "Full-time",
        experience_level: "Mid-level",
        salary_range: "₹15-25 LPA",
        description: "We are looking for a talented Software Engineer to join our team...",
        skills_required: ["JavaScript", "React", "Node.js", "Python"],
        posted_date: "2025-12-15",
        is_remote: false
      },
      {
        id: "2",
        title: "Product Manager",
        company: "Microsoft",
        location: "Hyderabad, India",
        job_type: "Full-time",
        experience_level: "Senior",
        salary_range: "₹25-40 LPA",
        description: "Join our product team to drive innovation...",
        skills_required: ["Product Management", "Agile", "Data Analysis"],
        posted_date: "2025-12-14",
        is_remote: true
      },
      {
        id: "3",
        title: "Data Scientist",
        company: "Amazon",
        location: "Chennai, India",
        job_type: "Full-time",
        experience_level: "Entry-level",
        salary_range: "₹12-18 LPA",
        description: "Exciting opportunity for data enthusiasts...",
        skills_required: ["Python", "Machine Learning", "SQL", "TensorFlow"],
        posted_date: "2025-12-13",
        is_remote: false
      },
      {
        id: "4",
        title: "Frontend Developer",
        company: "Flipkart",
        location: "Bangalore, India",
        job_type: "Full-time",
        experience_level: "Mid-level",
        salary_range: "₹10-18 LPA",
        description: "Build amazing user experiences...",
        skills_required: ["React", "TypeScript", "CSS", "HTML"],
        posted_date: "2025-12-12",
        is_remote: true
      },
      {
        id: "5",
        title: "DevOps Engineer",
        company: "Infosys",
        location: "Pune, India",
        job_type: "Full-time",
        experience_level: "Mid-level",
        salary_range: "₹12-20 LPA",
        description: "Join our DevOps team to streamline deployments...",
        skills_required: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        posted_date: "2025-12-11",
        is_remote: false
      }
    ];

    setJobs(mockJobs);
    setLoading(false);
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills_required.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApply = (jobId: string) => {
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully!",
    });
  };

  const handleSave = (jobId: string) => {
    toast({
      title: "Job Saved",
      description: "Job has been saved to your bookmarks.",
    });
  };

  if (loading) {
    return (
      <ResponsiveLayout role={(role as "admin" | "alumni" | "student") || "student"}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading jobs...</p>
          </div>
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout role={(role as "admin" | "alumni" | "student") || "student"}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Job Opportunities</h1>
            <p className="text-muted-foreground">
              Discover career opportunities posted by alumni and partner companies
            </p>
          </div>
          {role === "alumni" && (
            <Button>
              <Briefcase className="h-4 w-4 mr-2" />
              Post a Job
            </Button>
          )}
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{jobs.length}</p>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{new Set(jobs.map(j => j.company)).size}</p>
                  <p className="text-sm text-muted-foreground">Companies</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{jobs.filter(j => j.is_remote).length}</p>
                  <p className="text-sm text-muted-foreground">Remote Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">50+</p>
                  <p className="text-sm text-muted-foreground">Applicants</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        {job.is_remote && (
                          <Badge variant="secondary">Remote</Badge>
                        )}
                      </div>
                      <CardDescription className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.job_type}
                        </span>
                        {job.salary_range && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary_range}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleSave(job.id)}>
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => handleApply(job.id)}>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills_required.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Posted: {new Date(job.posted_date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                      <Badge>{job.experience_level}</Badge>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
