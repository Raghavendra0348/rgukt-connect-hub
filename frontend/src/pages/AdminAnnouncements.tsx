import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
        Bell,
        Send,
        Users,
        Calendar,
        Megaphone,
        Eye,
        Edit,
        Trash2,
        Plus,
        AlertTriangle,
        CheckCircle,
        Clock
} from "lucide-react";

const AdminAnnouncements = () => {
        const { user } = useAuth();
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
        const [newAnnouncement, setNewAnnouncement] = React.useState({
                title: "",
                content: "",
                type: "general",
                priority: "medium",
                targetAudience: "all",
                scheduledFor: "",
                enableNotifications: true
        });

        const announcements = [
                {
                        id: 1,
                        title: "System Maintenance Scheduled",
                        content: "The platform will undergo maintenance on February 15, 2024, from 2:00 AM to 4:00 AM IST. During this time, some features may be temporarily unavailable.",
                        type: "system",
                        priority: "high",
                        targetAudience: "all",
                        author: "System Admin",
                        createdAt: "2024-01-10",
                        scheduledFor: "2024-02-15",
                        status: "scheduled",
                        views: 0,
                        reactions: 0
                },
                {
                        id: 2,
                        title: "Alumni Career Fair 2024 Registration Open",
                        content: "We're excited to announce that registration for the Alumni Career Fair 2024 is now open! Join us on February 20th for networking opportunities with leading companies.",
                        type: "event",
                        priority: "high",
                        targetAudience: "students",
                        author: "Career Services",
                        createdAt: "2024-01-08",
                        scheduledFor: null,
                        status: "published",
                        views: 245,
                        reactions: 67
                },
                {
                        id: 3,
                        title: "New Mentorship Program Launch",
                        content: "We're launching a comprehensive mentorship program connecting experienced alumni with current students. Applications are now being accepted.",
                        type: "program",
                        priority: "medium",
                        targetAudience: "all",
                        author: "Alumni Relations",
                        createdAt: "2024-01-05",
                        scheduledFor: null,
                        status: "published",
                        views: 189,
                        reactions: 43
                },
                {
                        id: 4,
                        title: "Updated Privacy Policy",
                        content: "We've updated our privacy policy to provide more transparency about how we handle your data. Please review the changes at your earliest convenience.",
                        type: "policy",
                        priority: "medium",
                        targetAudience: "all",
                        author: "Legal Team",
                        createdAt: "2024-01-03",
                        scheduledFor: null,
                        status: "published",
                        views: 134,
                        reactions: 12
                },
                {
                        id: 5,
                        title: "Emergency Contact Update Required",
                        content: "All users are requested to update their emergency contact information in their profiles by January 31, 2024.",
                        type: "urgent",
                        priority: "high",
                        targetAudience: "all",
                        author: "Admin Team",
                        createdAt: "2024-01-01",
                        scheduledFor: null,
                        status: "published",
                        views: 567,
                        reactions: 23
                },
                {
                        id: 6,
                        title: "Draft: Upcoming Changes to Job Portal",
                        content: "We're planning to introduce new features to the job portal including AI-powered job matching and enhanced application tracking.",
                        type: "feature",
                        priority: "low",
                        targetAudience: "all",
                        author: "Product Team",
                        createdAt: "2024-01-12",
                        scheduledFor: null,
                        status: "draft",
                        views: 0,
                        reactions: 0
                }
        ];

        const stats = [
                {
                        title: "Total Announcements",
                        value: announcements.length,
                        icon: Megaphone,
                        color: "text-blue-600"
                },
                {
                        title: "Published",
                        value: announcements.filter(a => a.status === "published").length,
                        icon: CheckCircle,
                        color: "text-green-600"
                },
                {
                        title: "Scheduled",
                        value: announcements.filter(a => a.status === "scheduled").length,
                        icon: Clock,
                        color: "text-yellow-600"
                },
                {
                        title: "Total Views",
                        value: announcements.reduce((sum, a) => sum + a.views, 0),
                        icon: Eye,
                        color: "text-purple-600"
                }
        ];

        const getStatusBadge = (status: string) => {
                switch (status) {
                        case "published":
                                return <Badge className="bg-green-100 text-green-800">Published</Badge>;
                        case "scheduled":
                                return <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>;
                        case "draft":
                                return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
                        default:
                                return <Badge variant="secondary">{status}</Badge>;
                }
        };

        const getPriorityBadge = (priority: string) => {
                switch (priority) {
                        case "high":
                                return <Badge variant="destructive">High</Badge>;
                        case "medium":
                                return <Badge variant="secondary">Medium</Badge>;
                        case "low":
                                return <Badge variant="outline">Low</Badge>;
                        default:
                                return <Badge variant="secondary">{priority}</Badge>;
                }
        };

        const getTypeBadge = (type: string) => {
                const typeConfig = {
                        system: { label: "System", color: "bg-blue-100 text-blue-800" },
                        event: { label: "Event", color: "bg-purple-100 text-purple-800" },
                        program: { label: "Program", color: "bg-green-100 text-green-800" },
                        policy: { label: "Policy", color: "bg-orange-100 text-orange-800" },
                        urgent: { label: "Urgent", color: "bg-red-100 text-red-800" },
                        feature: { label: "Feature", color: "bg-indigo-100 text-indigo-800" },
                        general: { label: "General", color: "bg-gray-100 text-gray-800" }
                };

                const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.general;
                return <Badge className={config.color}>{config.label}</Badge>;
        };

        const handleCreateAnnouncement = () => {
                console.log("Creating announcement:", newAnnouncement);
                // Implementation for creating announcement
        };

        const handlePublishAnnouncement = (id: number) => {
                console.log("Publishing announcement:", id);
                // Implementation for publishing announcement
        };

        const handleEditAnnouncement = (id: number) => {
                console.log("Editing announcement:", id);
                // Implementation for editing announcement
        };

        const handleDeleteAnnouncement = (id: number) => {
                console.log("Deleting announcement:", id);
                // Implementation for deleting announcement
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
                                                        <h1 className="text-3xl font-bold">Announcements</h1>
                                                        <p className="text-muted-foreground">
                                                                Create and manage platform-wide announcements and notifications
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

                                                <Tabs defaultValue="create" className="w-full">
                                                        <TabsList className="grid w-full grid-cols-2">
                                                                <TabsTrigger value="create">Create Announcement</TabsTrigger>
                                                                <TabsTrigger value="manage">Manage Announcements</TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="create" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <Plus className="h-5 w-5" />
                                                                                        Create New Announcement
                                                                                </CardTitle>
                                                                                <CardDescription>Compose and schedule announcements for your audience</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div>
                                                                                        <label className="text-sm font-medium mb-2 block">Title</label>
                                                                                        <Input
                                                                                                placeholder="Enter announcement title..."
                                                                                                value={newAnnouncement.title}
                                                                                                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                                                                        />
                                                                                </div>

                                                                                <div>
                                                                                        <label className="text-sm font-medium mb-2 block">Content</label>
                                                                                        <Textarea
                                                                                                placeholder="Write your announcement content..."
                                                                                                rows={6}
                                                                                                value={newAnnouncement.content}
                                                                                                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                                                                                        />
                                                                                </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Type</label>
                                                                                                <Select value={newAnnouncement.type} onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, type: value })}>
                                                                                                        <SelectTrigger>
                                                                                                                <SelectValue />
                                                                                                        </SelectTrigger>
                                                                                                        <SelectContent>
                                                                                                                <SelectItem value="general">General</SelectItem>
                                                                                                                <SelectItem value="system">System</SelectItem>
                                                                                                                <SelectItem value="event">Event</SelectItem>
                                                                                                                <SelectItem value="program">Program</SelectItem>
                                                                                                                <SelectItem value="policy">Policy</SelectItem>
                                                                                                                <SelectItem value="urgent">Urgent</SelectItem>
                                                                                                                <SelectItem value="feature">Feature</SelectItem>
                                                                                                        </SelectContent>
                                                                                                </Select>
                                                                                        </div>

                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Priority</label>
                                                                                                <Select value={newAnnouncement.priority} onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, priority: value })}>
                                                                                                        <SelectTrigger>
                                                                                                                <SelectValue />
                                                                                                        </SelectTrigger>
                                                                                                        <SelectContent>
                                                                                                                <SelectItem value="low">Low</SelectItem>
                                                                                                                <SelectItem value="medium">Medium</SelectItem>
                                                                                                                <SelectItem value="high">High</SelectItem>
                                                                                                        </SelectContent>
                                                                                                </Select>
                                                                                        </div>

                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Target Audience</label>
                                                                                                <Select value={newAnnouncement.targetAudience} onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, targetAudience: value })}>
                                                                                                        <SelectTrigger>
                                                                                                                <SelectValue />
                                                                                                        </SelectTrigger>
                                                                                                        <SelectContent>
                                                                                                                <SelectItem value="all">All Users</SelectItem>
                                                                                                                <SelectItem value="students">Students Only</SelectItem>
                                                                                                                <SelectItem value="alumni">Alumni Only</SelectItem>
                                                                                                                <SelectItem value="admins">Admins Only</SelectItem>
                                                                                                        </SelectContent>
                                                                                                </Select>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex items-center justify-between">
                                                                                        <div className="flex items-center space-x-2">
                                                                                                <Switch
                                                                                                        checked={newAnnouncement.enableNotifications}
                                                                                                        onCheckedChange={(checked) => setNewAnnouncement({ ...newAnnouncement, enableNotifications: checked })}
                                                                                                />
                                                                                                <label className="text-sm font-medium">Send push notifications</label>
                                                                                        </div>
                                                                                        <div className="flex gap-2">
                                                                                                <Button variant="outline">Save as Draft</Button>
                                                                                                <Button onClick={handleCreateAnnouncement} className="flex items-center gap-2">
                                                                                                        <Send className="h-4 w-4" />
                                                                                                        Publish Now
                                                                                                </Button>
                                                                                        </div>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="manage" className="space-y-6">
                                                                <div className="space-y-4">
                                                                        {announcements.map((announcement) => (
                                                                                <Card key={announcement.id}>
                                                                                        <CardHeader>
                                                                                                <div className="flex items-start justify-between">
                                                                                                        <div>
                                                                                                                <CardTitle className="text-lg">{announcement.title}</CardTitle>
                                                                                                                <CardDescription className="mt-1">
                                                                                                                        By {announcement.author} • {announcement.createdAt}
                                                                                                                        {announcement.scheduledFor && ` • Scheduled for ${announcement.scheduledFor}`}
                                                                                                                </CardDescription>
                                                                                                        </div>
                                                                                                        <div className="flex items-center gap-2">
                                                                                                                {getStatusBadge(announcement.status)}
                                                                                                                {getPriorityBadge(announcement.priority)}
                                                                                                                {getTypeBadge(announcement.type)}
                                                                                                        </div>
                                                                                                </div>
                                                                                        </CardHeader>
                                                                                        <CardContent>
                                                                                                <p className="text-sm text-muted-foreground mb-4">
                                                                                                        {announcement.content}
                                                                                                </p>

                                                                                                <div className="flex items-center justify-between">
                                                                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <Eye className="h-4 w-4" />
                                                                                                                        {announcement.views} views
                                                                                                                </span>
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <Bell className="h-4 w-4" />
                                                                                                                        {announcement.reactions} reactions
                                                                                                                </span>
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <Users className="h-4 w-4" />
                                                                                                                        {announcement.targetAudience}
                                                                                                                </span>
                                                                                                        </div>

                                                                                                        <div className="flex gap-2">
                                                                                                                <Button variant="outline" size="sm" onClick={() => handleEditAnnouncement(announcement.id)}>
                                                                                                                        <Edit className="h-4 w-4" />
                                                                                                                </Button>
                                                                                                                {announcement.status === "draft" && (
                                                                                                                        <Button size="sm" onClick={() => handlePublishAnnouncement(announcement.id)}>
                                                                                                                                <Send className="h-4 w-4" />
                                                                                                                        </Button>
                                                                                                                )}
                                                                                                                <Button variant="destructive" size="sm" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                                                                                                                        <Trash2 className="h-4 w-4" />
                                                                                                                </Button>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </CardContent>
                                                                                </Card>
                                                                        ))}
                                                                </div>
                                                        </TabsContent>
                                                </Tabs>
                                        </div>
                                </main>
                        </div>
                </div>
        );
};

export default AdminAnnouncements;
