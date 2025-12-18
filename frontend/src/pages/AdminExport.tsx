import React from "react";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import {
        Database,
        Download,
        FileText,
        Users,
        Briefcase,
        Calendar,
        Heart,
        Shield,
        Settings,
        RefreshCw,
        CheckCircle,
        AlertTriangle,
        Clock
} from "lucide-react";

const AdminExport = () => {
        const { user } = useAuth();
        const isMobile = useIsMobile();
        const [selectedFormat, setSelectedFormat] = React.useState("csv");
        const [selectedDateRange, setSelectedDateRange] = React.useState("all");

        const exportCategories = [
                {
                        id: "users",
                        title: "User Data",
                        description: "Export user profiles, demographics, and account information",
                        icon: Users,
                        color: "text-blue-600",
                        recordCount: 2456,
                        lastExported: "2024-01-10",
                        exports: [
                                { name: "Complete User Profiles", description: "All user data including personal info, education, and work history" },
                                { name: "Alumni Directory", description: "Alumni contact information and current positions" },
                                { name: "Student Records", description: "Current student data and academic information" },
                                { name: "User Activity Logs", description: "Login history and platform engagement data" }
                        ]
                },
                {
                        id: "jobs",
                        title: "Job Data",
                        description: "Export job postings, applications, and career-related information",
                        icon: Briefcase,
                        color: "text-green-600",
                        recordCount: 156,
                        lastExported: "2024-01-08",
                        exports: [
                                { name: "Job Postings", description: "All job listings with requirements and company details" },
                                { name: "Job Applications", description: "Application data and candidate information" },
                                { name: "Company Directory", description: "Recruiting companies and their posted positions" },
                                { name: "Placement Statistics", description: "Success rates and placement analytics" }
                        ]
                },
                {
                        id: "events",
                        title: "Event Data",
                        description: "Export events, registrations, and attendance information",
                        icon: Calendar,
                        color: "text-purple-600",
                        recordCount: 89,
                        lastExported: "2024-01-05",
                        exports: [
                                { name: "Event Listings", description: "All events with details, dates, and organizers" },
                                { name: "Event Registrations", description: "Registration data and attendee information" },
                                { name: "Event Feedback", description: "Post-event surveys and ratings" },
                                { name: "Event Analytics", description: "Attendance patterns and engagement metrics" }
                        ]
                },
                {
                        id: "financial",
                        title: "Financial Data",
                        description: "Export donation records and financial transactions",
                        icon: Heart,
                        color: "text-red-600",
                        recordCount: 234,
                        lastExported: "2024-01-03",
                        exports: [
                                { name: "Donation Records", description: "All donation transactions and donor information" },
                                { name: "Fund Allocations", description: "How funds have been distributed and used" },
                                { name: "Scholarship Data", description: "Scholarship recipients and award amounts" },
                                { name: "Financial Reports", description: "Summary reports and audit trails" }
                        ]
                },
                {
                        id: "system",
                        title: "System Data",
                        description: "Export system logs, audit trails, and technical data",
                        icon: Shield,
                        color: "text-orange-600",
                        recordCount: 15000,
                        lastExported: "2024-01-12",
                        exports: [
                                { name: "Audit Logs", description: "System access logs and administrative actions" },
                                { name: "Error Logs", description: "Application errors and system issues" },
                                { name: "Performance Metrics", description: "System performance and usage statistics" },
                                { name: "Security Events", description: "Login attempts and security-related activities" }
                        ]
                }
        ];

        const recentExports = [
                {
                        id: 1,
                        name: "Alumni Directory - CSV",
                        type: "users",
                        initiatedBy: "Admin User",
                        startTime: "2024-01-12 14:30",
                        status: "completed",
                        fileSize: "2.4 MB",
                        recordCount: 1823,
                        downloadUrl: "#"
                },
                {
                        id: 2,
                        name: "Job Applications - Excel",
                        type: "jobs",
                        initiatedBy: "HR Manager",
                        startTime: "2024-01-11 09:15",
                        status: "completed",
                        fileSize: "1.8 MB",
                        recordCount: 567,
                        downloadUrl: "#"
                },
                {
                        id: 3,
                        name: "Financial Report - PDF",
                        type: "financial",
                        initiatedBy: "Finance Team",
                        startTime: "2024-01-10 16:45",
                        status: "completed",
                        fileSize: "890 KB",
                        recordCount: 234,
                        downloadUrl: "#"
                },
                {
                        id: 4,
                        name: "Event Analytics - JSON",
                        type: "events",
                        initiatedBy: "Event Manager",
                        startTime: "2024-01-12 10:20",
                        status: "processing",
                        progress: 75,
                        recordCount: 89
                },
                {
                        id: 5,
                        name: "System Audit Logs - CSV",
                        type: "system",
                        initiatedBy: "System Admin",
                        startTime: "2024-01-12 08:00",
                        status: "failed",
                        error: "Database connection timeout",
                        recordCount: 0
                }
        ];

        const exportFormats = [
                { value: "csv", label: "CSV (Comma Separated Values)", description: "Best for spreadsheet applications" },
                { value: "excel", label: "Excel (XLSX)", description: "Microsoft Excel format with formatting" },
                { value: "json", label: "JSON", description: "JavaScript Object Notation for developers" },
                { value: "pdf", label: "PDF", description: "Formatted reports for sharing and printing" },
                { value: "xml", label: "XML", description: "Structured data format for integration" }
        ];

        const dateRanges = [
                { value: "all", label: "All Time" },
                { value: "last_7_days", label: "Last 7 Days" },
                { value: "last_30_days", label: "Last 30 Days" },
                { value: "last_3_months", label: "Last 3 Months" },
                { value: "last_6_months", label: "Last 6 Months" },
                { value: "last_year", label: "Last Year" },
                { value: "current_year", label: "Current Year" },
                { value: "custom", label: "Custom Range" }
        ];

        const getStatusBadge = (status: string) => {
                switch (status) {
                        case "completed":
                                return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
                        case "processing":
                                return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Processing</Badge>;
                        case "failed":
                                return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Failed</Badge>;
                        default:
                                return <Badge variant="secondary">{status}</Badge>;
                }
        };

        const handleStartExport = (categoryId: string, exportName: string) => {
                console.log("Starting export:", categoryId, exportName, selectedFormat, selectedDateRange);
                // Implementation for starting export
        };

        const handleDownload = (exportId: number) => {
                console.log("Downloading export:", exportId);
                // Implementation for downloading export
        };

        const handleRetryExport = (exportId: number) => {
                console.log("Retrying export:", exportId);
                // Implementation for retrying failed export
        };

        return (
                <ResponsiveLayout role="admin">
                        <div className="space-y-6">
                                <div>
                                        <h1 className="text-2xl md:text-3xl font-bold">Data Export</h1>
                                        <p className="text-muted-foreground">
                                                Export platform data in various formats for backup, analysis, or migration
                                        </p>
                                </div>

                                {/* Export Settings */}
                                <Card>
                                        <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                        <Settings className="h-5 w-5" />
                                                        Export Settings
                                                </CardTitle>
                                                <CardDescription>Configure export format and date range for all exports</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                                <label className="text-sm font-medium mb-2 block">Export Format</label>
                                                                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                                                                        <SelectTrigger>
                                                                                <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                                {exportFormats.map((format) => (
                                                                                        <SelectItem key={format.value} value={format.value}>
                                                                                                <div>
                                                                                                        <div className="font-medium">{format.label}</div>
                                                                                                        <div className="text-xs text-muted-foreground">{format.description}</div>
                                                                                                </div>
                                                                                        </SelectItem>
                                                                                ))}
                                                                        </SelectContent>
                                                                </Select>
                                                        </div>
                                                        <div>
                                                                <label className="text-sm font-medium mb-2 block">Date Range</label>
                                                                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                                                                        <SelectTrigger>
                                                                                <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                                {dateRanges.map((range) => (
                                                                                        <SelectItem key={range.value} value={range.value}>
                                                                                                {range.label}
                                                                                        </SelectItem>
                                                                                ))}
                                                                        </SelectContent>
                                                                </Select>
                                                        </div>
                                                </div>
                                        </CardContent>
                                </Card>

                                {/* Export Categories */}
                                <div className="space-y-6">
                                        {exportCategories.map((category) => (
                                                <Card key={category.id}>
                                                        <CardHeader>
                                                                <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-3">
                                                                                <category.icon className={`h-6 w-6 ${category.color}`} />
                                                                                <div>
                                                                                        <CardTitle>{category.title}</CardTitle>
                                                                                        <CardDescription>{category.description}</CardDescription>
                                                                                </div>
                                                                        </div>
                                                                        <div className="text-right text-sm text-muted-foreground">
                                                                                <div>{category.recordCount.toLocaleString()} records</div>
                                                                                <div>Last exported: {category.lastExported}</div>
                                                                        </div>
                                                                </div>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        {category.exports.map((exportItem, index) => (
                                                                                <div key={index} className="p-4 border rounded-lg">
                                                                                        <div className="flex justify-between items-start mb-2">
                                                                                                <h4 className="font-medium">{exportItem.name}</h4>
                                                                                                <Button
                                                                                                        size="sm"
                                                                                                        onClick={() => handleStartExport(category.id, exportItem.name)}
                                                                                                        className="flex items-center gap-2"
                                                                                                >
                                                                                                        <Download className="h-4 w-4" />
                                                                                                        Export
                                                                                                </Button>
                                                                                        </div>
                                                                                        <p className="text-sm text-muted-foreground">{exportItem.description}</p>
                                                                                </div>
                                                                        ))}
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        ))}
                                </div>

                                {/* Recent Exports */}
                                <Card>
                                        <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                        <RefreshCw className="h-5 w-5" />
                                                        Recent Exports
                                                </CardTitle>
                                                <CardDescription>Track the status of your recent data exports</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                                <div className="space-y-4">
                                                        {recentExports.map((exportItem) => (
                                                                <div key={exportItem.id} className="p-4 border rounded-lg">
                                                                        <div className="flex items-center justify-between mb-3">
                                                                                <div>
                                                                                        <h4 className="font-medium">{exportItem.name}</h4>
                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                Initiated by {exportItem.initiatedBy} on {exportItem.startTime}
                                                                                        </p>
                                                                                </div>
                                                                                {getStatusBadge(exportItem.status)}
                                                                        </div>

                                                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                                                                                <div>
                                                                                        <div className="text-sm font-medium text-muted-foreground">Records</div>
                                                                                        <div className="text-sm">{exportItem.recordCount.toLocaleString()}</div>
                                                                                </div>
                                                                                {exportItem.fileSize && (
                                                                                        <div>
                                                                                                <div className="text-sm font-medium text-muted-foreground">File Size</div>
                                                                                                <div className="text-sm">{exportItem.fileSize}</div>
                                                                                        </div>
                                                                                )}
                                                                                {exportItem.status === "processing" && exportItem.progress && (
                                                                                        <div className="md:col-span-2">
                                                                                                <div className="text-sm font-medium text-muted-foreground mb-1">Progress</div>
                                                                                                <Progress value={exportItem.progress} className="h-2" />
                                                                                                <div className="text-xs text-muted-foreground mt-1">{exportItem.progress}% complete</div>
                                                                                        </div>
                                                                                )}
                                                                                {exportItem.error && (
                                                                                        <div className="md:col-span-2">
                                                                                                <div className="text-sm font-medium text-muted-foreground">Error</div>
                                                                                                <div className="text-sm text-red-600">{exportItem.error}</div>
                                                                                        </div>
                                                                                )}
                                                                        </div>

                                                                        <div className="flex gap-2">
                                                                                {exportItem.status === "completed" && exportItem.downloadUrl && (
                                                                                        <Button
                                                                                                size="sm"
                                                                                                variant="outline"
                                                                                                onClick={() => handleDownload(exportItem.id)}
                                                                                                className="flex items-center gap-2"
                                                                                        >
                                                                                                <Download className="h-4 w-4" />
                                                                                                Download
                                                                                        </Button>
                                                                                )}
                                                                                {exportItem.status === "failed" && (
                                                                                        <Button
                                                                                                size="sm"
                                                                                                variant="outline"
                                                                                                onClick={() => handleRetryExport(exportItem.id)}
                                                                                                className="flex items-center gap-2"
                                                                                        >
                                                                                                <RefreshCw className="h-4 w-4" />
                                                                                                Retry
                                                                                        </Button>
                                                                                )}
                                                                                <Button size="sm" variant="outline">
                                                                                        <FileText className="h-4 w-4" />
                                                                                </Button>
                                                                        </div>
                                                                </div>
                                                        ))}
                                                </div>
                                        </CardContent>
                                </Card>
                        </div>
                </ResponsiveLayout>
        );
};

export default AdminExport;
