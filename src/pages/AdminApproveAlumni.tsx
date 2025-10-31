import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import {
        Search,
        Filter,
        CheckCircle,
        XCircle,
        Clock,
        Mail,
        Phone,
        MapPin,
        Briefcase,
        GraduationCap,
        Eye,
        Download,
        MessageSquare
} from "lucide-react";

const AdminApproveAlumni = () => {
        const { user } = useAuth();
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
        const [searchQuery, setSearchQuery] = React.useState("");
        const [selectedFilter, setSelectedFilter] = React.useState("pending");

        const pendingAlumni = [
                {
                        id: 1,
                        name: "Rajesh Kumar",
                        email: "rajesh.kumar@email.com",
                        phone: "+91-9876543210",
                        batch: "2018-2022",
                        branch: "Computer Science",
                        currentCompany: "Google",
                        currentPosition: "Software Engineer",
                        location: "Bangalore, India",
                        linkedIn: "linkedin.com/in/rajeshkumar",
                        submittedAt: "2024-01-15",
                        documents: ["degree.pdf", "id_proof.pdf", "offer_letter.pdf"],
                        status: "pending"
                },
                {
                        id: 2,
                        name: "Priya Sharma",
                        email: "priya.sharma@email.com",
                        phone: "+91-9876543211",
                        batch: "2017-2021",
                        branch: "Electronics",
                        currentCompany: "Microsoft",
                        currentPosition: "Product Manager",
                        location: "Hyderabad, India",
                        linkedIn: "linkedin.com/in/priyasharma",
                        submittedAt: "2024-01-14",
                        documents: ["degree.pdf", "id_proof.pdf"],
                        status: "pending"
                },
                {
                        id: 3,
                        name: "Arun Singh",
                        email: "arun.singh@email.com",
                        phone: "+91-9876543212",
                        batch: "2019-2023",
                        branch: "Mechanical",
                        currentCompany: "Tesla",
                        currentPosition: "Design Engineer",
                        location: "USA",
                        linkedIn: "linkedin.com/in/arunsingh",
                        submittedAt: "2024-01-13",
                        documents: ["degree.pdf", "id_proof.pdf", "visa.pdf"],
                        status: "under_review"
                }
        ];

        const recentlyApproved = [
                {
                        id: 4,
                        name: "Sita Reddy",
                        email: "sita.reddy@email.com",
                        batch: "2016-2020",
                        branch: "Civil Engineering",
                        approvedAt: "2024-01-12",
                        status: "approved"
                },
                {
                        id: 5,
                        name: "Kiran Patel",
                        email: "kiran.patel@email.com",
                        batch: "2015-2019",
                        branch: "Chemical Engineering",
                        approvedAt: "2024-01-11",
                        status: "approved"
                }
        ];

        const rejectedApplications = [
                {
                        id: 6,
                        name: "Test User",
                        email: "test@email.com",
                        batch: "2020-2024",
                        branch: "Computer Science",
                        rejectedAt: "2024-01-10",
                        reason: "Invalid documents provided",
                        status: "rejected"
                }
        ];

        const stats = [
                {
                        title: "Pending Approvals",
                        value: pendingAlumni.filter(a => a.status === "pending").length,
                        icon: Clock,
                        color: "text-yellow-600"
                },
                {
                        title: "Under Review",
                        value: pendingAlumni.filter(a => a.status === "under_review").length,
                        icon: Eye,
                        color: "text-blue-600"
                },
                {
                        title: "Approved Today",
                        value: 3,
                        icon: CheckCircle,
                        color: "text-green-600"
                },
                {
                        title: "Total Alumni",
                        value: 1248,
                        icon: GraduationCap,
                        color: "text-purple-600"
                }
        ];

        const handleApprove = (id: number) => {
                console.log("Approving alumni with ID:", id);
                // Implementation for approval
        };

        const handleReject = (id: number) => {
                console.log("Rejecting alumni with ID:", id);
                // Implementation for rejection
        };

        const handleSendMessage = (id: number) => {
                console.log("Sending message to alumni with ID:", id);
                // Implementation for messaging
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
                                                <div>
                                                        <h1 className="text-3xl font-bold">Alumni Approval</h1>
                                                        <p className="text-muted-foreground">
                                                                Review and approve alumni registration requests
                                                        </p>
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
                                                                                                placeholder="Search by name, email, or batch..."
                                                                                                value={searchQuery}
                                                                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                                                                className="pl-10"
                                                                                        />
                                                                                </div>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                                <Button
                                                                                        variant={selectedFilter === "pending" ? "default" : "outline"}
                                                                                        onClick={() => setSelectedFilter("pending")}
                                                                                        className="flex items-center gap-2"
                                                                                >
                                                                                        <Clock className="h-4 w-4" />
                                                                                        Pending
                                                                                </Button>
                                                                                <Button
                                                                                        variant={selectedFilter === "approved" ? "default" : "outline"}
                                                                                        onClick={() => setSelectedFilter("approved")}
                                                                                        className="flex items-center gap-2"
                                                                                >
                                                                                        <CheckCircle className="h-4 w-4" />
                                                                                        Approved
                                                                                </Button>
                                                                                <Button
                                                                                        variant={selectedFilter === "rejected" ? "default" : "outline"}
                                                                                        onClick={() => setSelectedFilter("rejected")}
                                                                                        className="flex items-center gap-2"
                                                                                >
                                                                                        <XCircle className="h-4 w-4" />
                                                                                        Rejected
                                                                                </Button>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
                                                        <TabsList className="grid w-full grid-cols-3">
                                                                <TabsTrigger value="pending">Pending Applications</TabsTrigger>
                                                                <TabsTrigger value="approved">Recently Approved</TabsTrigger>
                                                                <TabsTrigger value="rejected">Rejected Applications</TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="pending" className="space-y-4">
                                                                {pendingAlumni.map((alumni) => (
                                                                        <Card key={alumni.id}>
                                                                                <CardHeader>
                                                                                        <div className="flex items-start justify-between">
                                                                                                <div className="flex items-center gap-4">
                                                                                                        <Avatar className="h-12 w-12">
                                                                                                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${alumni.name}`} />
                                                                                                                <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                                                                        </Avatar>
                                                                                                        <div>
                                                                                                                <CardTitle className="text-lg">{alumni.name}</CardTitle>
                                                                                                                <CardDescription>{alumni.currentPosition} at {alumni.currentCompany}</CardDescription>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <Badge variant={alumni.status === "pending" ? "secondary" : "default"}>
                                                                                                        {alumni.status.replace('_', ' ')}
                                                                                                </Badge>
                                                                                        </div>
                                                                                </CardHeader>
                                                                                <CardContent>
                                                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                                                                                <div className="space-y-2">
                                                                                                        <div className="flex items-center gap-2 text-sm">
                                                                                                                <Mail className="h-4 w-4" />
                                                                                                                <span>{alumni.email}</span>
                                                                                                        </div>
                                                                                                        <div className="flex items-center gap-2 text-sm">
                                                                                                                <Phone className="h-4 w-4" />
                                                                                                                <span>{alumni.phone}</span>
                                                                                                        </div>
                                                                                                        <div className="flex items-center gap-2 text-sm">
                                                                                                                <MapPin className="h-4 w-4" />
                                                                                                                <span>{alumni.location}</span>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className="space-y-2">
                                                                                                        <div className="flex items-center gap-2 text-sm">
                                                                                                                <GraduationCap className="h-4 w-4" />
                                                                                                                <span>{alumni.batch} - {alumni.branch}</span>
                                                                                                        </div>
                                                                                                        <div className="flex items-center gap-2 text-sm">
                                                                                                                <Briefcase className="h-4 w-4" />
                                                                                                                <span>{alumni.currentCompany}</span>
                                                                                                        </div>
                                                                                                        <div className="text-sm">
                                                                                                                <span className="text-muted-foreground">Submitted: </span>
                                                                                                                <span>{alumni.submittedAt}</span>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className="space-y-2">
                                                                                                        <div className="text-sm font-medium">Documents:</div>
                                                                                                        {alumni.documents.map((doc, index) => (
                                                                                                                <div key={index} className="flex items-center gap-2 text-sm">
                                                                                                                        <Download className="h-3 w-3" />
                                                                                                                        <span className="text-blue-600 cursor-pointer hover:underline">{doc}</span>
                                                                                                                </div>
                                                                                                        ))}
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="flex gap-2">
                                                                                                <Button
                                                                                                        onClick={() => handleApprove(alumni.id)}
                                                                                                        className="flex items-center gap-2"
                                                                                                >
                                                                                                        <CheckCircle className="h-4 w-4" />
                                                                                                        Approve
                                                                                                </Button>
                                                                                                <Button
                                                                                                        variant="destructive"
                                                                                                        onClick={() => handleReject(alumni.id)}
                                                                                                        className="flex items-center gap-2"
                                                                                                >
                                                                                                        <XCircle className="h-4 w-4" />
                                                                                                        Reject
                                                                                                </Button>
                                                                                                <Button
                                                                                                        variant="outline"
                                                                                                        onClick={() => handleSendMessage(alumni.id)}
                                                                                                        className="flex items-center gap-2"
                                                                                                >
                                                                                                        <MessageSquare className="h-4 w-4" />
                                                                                                        Message
                                                                                                </Button>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                ))}
                                                        </TabsContent>

                                                        <TabsContent value="approved" className="space-y-4">
                                                                {recentlyApproved.map((alumni) => (
                                                                        <Card key={alumni.id}>
                                                                                <CardHeader>
                                                                                        <div className="flex items-center justify-between">
                                                                                                <div className="flex items-center gap-4">
                                                                                                        <Avatar className="h-10 w-10">
                                                                                                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${alumni.name}`} />
                                                                                                                <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                                                                        </Avatar>
                                                                                                        <div>
                                                                                                                <CardTitle className="text-base">{alumni.name}</CardTitle>
                                                                                                                <CardDescription>{alumni.batch} - {alumni.branch}</CardDescription>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className="text-right">
                                                                                                        <Badge variant="default">
                                                                                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                                                                                Approved
                                                                                                        </Badge>
                                                                                                        <p className="text-xs text-muted-foreground mt-1">
                                                                                                                {alumni.approvedAt}
                                                                                                        </p>
                                                                                                </div>
                                                                                        </div>
                                                                                </CardHeader>
                                                                        </Card>
                                                                ))}
                                                        </TabsContent>

                                                        <TabsContent value="rejected" className="space-y-4">
                                                                {rejectedApplications.map((alumni) => (
                                                                        <Card key={alumni.id}>
                                                                                <CardHeader>
                                                                                        <div className="flex items-center justify-between">
                                                                                                <div className="flex items-center gap-4">
                                                                                                        <Avatar className="h-10 w-10">
                                                                                                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${alumni.name}`} />
                                                                                                                <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                                                                        </Avatar>
                                                                                                        <div>
                                                                                                                <CardTitle className="text-base">{alumni.name}</CardTitle>
                                                                                                                <CardDescription>{alumni.batch} - {alumni.branch}</CardDescription>
                                                                                                                <p className="text-sm text-red-600 mt-1">Reason: {alumni.reason}</p>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className="text-right">
                                                                                                        <Badge variant="destructive">
                                                                                                                <XCircle className="h-3 w-3 mr-1" />
                                                                                                                Rejected
                                                                                                        </Badge>
                                                                                                        <p className="text-xs text-muted-foreground mt-1">
                                                                                                                {alumni.rejectedAt}
                                                                                                        </p>
                                                                                                </div>
                                                                                        </div>
                                                                                </CardHeader>
                                                                        </Card>
                                                                ))}
                                                        </TabsContent>
                                                </Tabs>
                                        </div>
                                </main>
                        </div>
                </div>
        );
};

export default AdminApproveAlumni;
