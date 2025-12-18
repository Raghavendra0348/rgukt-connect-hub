import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";
import {
        FileText,
        Download,
        Calendar as CalendarIcon,
        Filter,
        BarChart3,
        Users,
        Briefcase,
        Heart,
        Award,
        TrendingUp,
        Eye,
        RefreshCw
} from "lucide-react";

const AdminReports = () => {
        const { user } = useAuth();
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
        const [startDate, setStartDate] = React.useState<Date>();
        const [endDate, setEndDate] = React.useState<Date>();
        const [reportType, setReportType] = React.useState("all");

        const reportCategories = [
                {
                        id: "user-reports",
                        title: "User Reports",
                        description: "Comprehensive user analytics and demographics",
                        icon: Users,
                        color: "text-blue-600",
                        reports: [
                                { name: "User Registration Report", description: "New user registrations by date range", format: "CSV, PDF" },
                                { name: "Alumni Verification Report", description: "Alumni verification status and pending approvals", format: "PDF, Excel" },
                                { name: "User Activity Report", description: "Login frequency and platform engagement", format: "CSV, PDF" },
                                { name: "Batch-wise Distribution", description: "Student and alumni distribution by graduation year", format: "PDF, Excel" }
                        ]
                },
                {
                        id: "job-reports",
                        title: "Job & Career Reports",
                        description: "Job postings, applications, and placement analytics",
                        icon: Briefcase,
                        color: "text-green-600",
                        reports: [
                                { name: "Job Posting Analytics", description: "Job posting trends and company statistics", format: "PDF, Excel" },
                                { name: "Application Success Rate", description: "Job application success rates by company and role", format: "CSV, PDF" },
                                { name: "Placement Report", description: "Student placement statistics by batch and branch", format: "PDF, Excel" },
                                { name: "Company Engagement Report", description: "Top recruiting companies and their activity", format: "PDF, Excel" }
                        ]
                },
                {
                        id: "event-reports",
                        title: "Event Reports",
                        description: "Event participation and engagement metrics",
                        icon: CalendarIcon,
                        color: "text-purple-600",
                        reports: [
                                { name: "Event Participation Report", description: "Event attendance and registration statistics", format: "CSV, PDF" },
                                { name: "Event Success Metrics", description: "Event ratings, feedback, and ROI analysis", format: "PDF, Excel" },
                                { name: "Alumni Contribution Report", description: "Alumni-organized events and participation", format: "PDF, Excel" }
                        ]
                },
                {
                        id: "financial-reports",
                        title: "Financial Reports",
                        description: "Donations, funding, and financial contributions",
                        icon: Heart,
                        color: "text-red-600",
                        reports: [
                                { name: "Donation Summary Report", description: "Total donations received by category and donor", format: "PDF, Excel" },
                                { name: "Fund Utilization Report", description: "How donated funds have been allocated and used", format: "PDF, Excel" },
                                { name: "Scholarship Impact Report", description: "Scholarships awarded and beneficiary outcomes", format: "PDF" }
                        ]
                },
                {
                        id: "engagement-reports",
                        title: "Engagement Reports",
                        description: "Mentorship, networking, and community engagement",
                        icon: Award,
                        color: "text-orange-600",
                        reports: [
                                { name: "Mentorship Program Report", description: "Mentor-mentee matches and program effectiveness", format: "CSV, PDF" },
                                { name: "Network Growth Report", description: "Alumni network expansion and connections", format: "PDF, Excel" },
                                { name: "Communication Analytics", description: "Platform messaging and interaction patterns", format: "CSV, PDF" }
                        ]
                }
        ];

        const quickReports = [
                {
                        name: "Daily Summary",
                        description: "Today's key metrics and activities",
                        lastGenerated: "2 hours ago",
                        size: "2.4 MB",
                        downloads: 156
                },
                {
                        name: "Weekly Overview",
                        description: "Weekly performance summary",
                        lastGenerated: "1 day ago",
                        size: "5.7 MB",
                        downloads: 89
                },
                {
                        name: "Monthly Analytics",
                        description: "Comprehensive monthly report",
                        lastGenerated: "3 days ago",
                        size: "12.3 MB",
                        downloads: 234
                },
                {
                        name: "Alumni Impact Report",
                        description: "Alumni contributions and achievements",
                        lastGenerated: "1 week ago",
                        size: "8.9 MB",
                        downloads: 67
                }
        ];

        const scheduledReports = [
                {
                        name: "Weekly User Activity",
                        schedule: "Every Monday at 9:00 AM",
                        recipients: ["admin@rgukt.ac.in", "dean@rgukt.ac.in"],
                        status: "active",
                        nextRun: "2024-02-05 09:00"
                },
                {
                        name: "Monthly Placement Report",
                        schedule: "1st of every month",
                        recipients: ["placement@rgukt.ac.in", "hod@rgukt.ac.in"],
                        status: "active",
                        nextRun: "2024-03-01 08:00"
                },
                {
                        name: "Quarterly Alumni Survey",
                        schedule: "Every 3 months",
                        recipients: ["alumni@rgukt.ac.in", "director@rgukt.ac.in"],
                        status: "paused",
                        nextRun: "2024-04-01 10:00"
                }
        ];

        const handleGenerateReport = (reportName: string) => {
                console.log("Generating report:", reportName);
                // Implementation for report generation
        };

        const handleDownloadReport = (reportName: string) => {
                console.log("Downloading report:", reportName);
                // Implementation for report download
        };

        const handleScheduleReport = (reportName: string) => {
                console.log("Scheduling report:", reportName);
                // Implementation for report scheduling
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
                                                        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
                                                        <p className="text-muted-foreground">
                                                                Generate comprehensive reports and download analytics data
                                                        </p>
                                                </div>

                                                {/* Quick Actions */}
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <Filter className="h-5 w-5" />
                                                                        Generate Custom Report
                                                                </CardTitle>
                                                                <CardDescription>Create reports with custom date ranges and filters</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="flex flex-col md:flex-row gap-4">
                                                                        <div className="flex-1">
                                                                                <label className="text-sm font-medium mb-2 block">Report Type</label>
                                                                                <Select value={reportType} onValueChange={setReportType}>
                                                                                        <SelectTrigger>
                                                                                                <SelectValue placeholder="Select report type" />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                                <SelectItem value="all">All Data</SelectItem>
                                                                                                <SelectItem value="users">User Analytics</SelectItem>
                                                                                                <SelectItem value="jobs">Job Reports</SelectItem>
                                                                                                <SelectItem value="events">Event Reports</SelectItem>
                                                                                                <SelectItem value="financial">Financial Reports</SelectItem>
                                                                                                <SelectItem value="engagement">Engagement Reports</SelectItem>
                                                                                        </SelectContent>
                                                                                </Select>
                                                                        </div>
                                                                        <div>
                                                                                <label className="text-sm font-medium mb-2 block">Start Date</label>
                                                                                <Popover>
                                                                                        <PopoverTrigger asChild>
                                                                                                <Button variant="outline" className="w-[140px] justify-start text-left font-normal">
                                                                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                                                                        {startDate ? format(startDate, "MMM dd") : "Start date"}
                                                                                                </Button>
                                                                                        </PopoverTrigger>
                                                                                        <PopoverContent className="w-auto p-0">
                                                                                                <Calendar
                                                                                                        mode="single"
                                                                                                        selected={startDate}
                                                                                                        onSelect={setStartDate}
                                                                                                        initialFocus
                                                                                                />
                                                                                        </PopoverContent>
                                                                                </Popover>
                                                                        </div>
                                                                        <div>
                                                                                <label className="text-sm font-medium mb-2 block">End Date</label>
                                                                                <Popover>
                                                                                        <PopoverTrigger asChild>
                                                                                                <Button variant="outline" className="w-[140px] justify-start text-left font-normal">
                                                                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                                                                        {endDate ? format(endDate, "MMM dd") : "End date"}
                                                                                                </Button>
                                                                                        </PopoverTrigger>
                                                                                        <PopoverContent className="w-auto p-0">
                                                                                                <Calendar
                                                                                                        mode="single"
                                                                                                        selected={endDate}
                                                                                                        onSelect={setEndDate}
                                                                                                        initialFocus
                                                                                                />
                                                                                        </PopoverContent>
                                                                                </Popover>
                                                                        </div>
                                                                        <div className="flex items-end">
                                                                                <Button className="flex items-center gap-2">
                                                                                        <BarChart3 className="h-4 w-4" />
                                                                                        Generate Report
                                                                                </Button>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                {/* Quick Reports */}
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <RefreshCw className="h-5 w-5" />
                                                                        Quick Reports
                                                                </CardTitle>
                                                                <CardDescription>Pre-generated reports ready for download</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        {quickReports.map((report, index) => (
                                                                                <div key={index} className="p-4 border rounded-lg">
                                                                                        <div className="flex justify-between items-start mb-2">
                                                                                                <h4 className="font-medium">{report.name}</h4>
                                                                                                <Button size="sm" variant="outline" onClick={() => handleDownloadReport(report.name)}>
                                                                                                        <Download className="h-4 w-4" />
                                                                                                </Button>
                                                                                        </div>
                                                                                        <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                                                                                        <div className="flex justify-between text-xs text-muted-foreground">
                                                                                                <span>Generated: {report.lastGenerated}</span>
                                                                                                <span>{report.size} • {report.downloads} downloads</span>
                                                                                        </div>
                                                                                </div>
                                                                        ))}
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                {/* Report Categories */}
                                                <div className="space-y-6">
                                                        {reportCategories.map((category) => (
                                                                <Card key={category.id}>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <category.icon className={`h-5 w-5 ${category.color}`} />
                                                                                        {category.title}
                                                                                </CardTitle>
                                                                                <CardDescription>{category.description}</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        {category.reports.map((report, index) => (
                                                                                                <div key={index} className="p-4 border rounded-lg">
                                                                                                        <div className="flex justify-between items-start mb-2">
                                                                                                                <h4 className="font-medium">{report.name}</h4>
                                                                                                                <div className="flex gap-1">
                                                                                                                        <Button
                                                                                                                                size="sm"
                                                                                                                                variant="outline"
                                                                                                                                onClick={() => handleGenerateReport(report.name)}
                                                                                                                        >
                                                                                                                                <FileText className="h-4 w-4" />
                                                                                                                        </Button>
                                                                                                                        <Button
                                                                                                                                size="sm"
                                                                                                                                variant="outline"
                                                                                                                                onClick={() => handleDownloadReport(report.name)}
                                                                                                                        >
                                                                                                                                <Download className="h-4 w-4" />
                                                                                                                        </Button>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                                                                                                        <div className="flex flex-wrap gap-1">
                                                                                                                {report.format.split(', ').map((format, fIndex) => (
                                                                                                                        <Badge key={fIndex} variant="secondary" className="text-xs">
                                                                                                                                {format}
                                                                                                                        </Badge>
                                                                                                                ))}
                                                                                                        </div>
                                                                                                </div>
                                                                                        ))}
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        ))}
                                                </div>

                                                {/* Scheduled Reports */}
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <CalendarIcon className="h-5 w-5" />
                                                                        Scheduled Reports
                                                                </CardTitle>
                                                                <CardDescription>Automated report generation and delivery</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="space-y-4">
                                                                        {scheduledReports.map((scheduled, index) => (
                                                                                <div key={index} className="p-4 border rounded-lg">
                                                                                        <div className="flex justify-between items-start mb-3">
                                                                                                <div>
                                                                                                        <h4 className="font-medium">{scheduled.name}</h4>
                                                                                                        <p className="text-sm text-muted-foreground">{scheduled.schedule}</p>
                                                                                                </div>
                                                                                                <Badge variant={scheduled.status === 'active' ? 'default' : 'secondary'}>
                                                                                                        {scheduled.status}
                                                                                                </Badge>
                                                                                        </div>
                                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                                                                <div>
                                                                                                        <div className="font-medium text-muted-foreground">Recipients</div>
                                                                                                        <div>{scheduled.recipients.join(', ')}</div>
                                                                                                </div>
                                                                                                <div>
                                                                                                        <div className="font-medium text-muted-foreground">Next Run</div>
                                                                                                        <div>{scheduled.nextRun}</div>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="flex gap-2 mt-3">
                                                                                                <Button size="sm" variant="outline">Edit</Button>
                                                                                                <Button size="sm" variant="outline">
                                                                                                        {scheduled.status === 'active' ? 'Pause' : 'Resume'}
                                                                                                </Button>
                                                                                                <Button size="sm" variant="outline">Run Now</Button>
                                                                                        </div>
                                                                                </div>
                                                                        ))}
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </div>
                                </main>
                        </div>
                </div>
        );
};

export default AdminReports;
