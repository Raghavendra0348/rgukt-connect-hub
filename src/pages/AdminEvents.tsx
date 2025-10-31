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
        Calendar,
        MapPin,
        Users,
        Clock,
        CheckCircle,
        XCircle,
        AlertTriangle,
        Star
} from "lucide-react";

const AdminEvents = () => {
        const { user } = useAuth();
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
        const [searchQuery, setSearchQuery] = React.useState("");
        const [selectedFilter, setSelectedFilter] = React.useState("all");

        const events = [
                {
                        id: 1,
                        title: "Tech Talk: Future of AI",
                        description: "Join us for an insightful discussion on the future of artificial intelligence and its impact on society.",
                        date: "2024-02-15",
                        time: "18:00",
                        location: "Virtual Event",
                        type: "Workshop",
                        organizer: "Rajesh Kumar",
                        organizerBatch: "2018-2022",
                        registrations: 150,
                        capacity: 200,
                        status: "active",
                        featured: true,
                        tags: ["AI", "Technology", "Workshop"],
                        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400"
                },
                {
                        id: 2,
                        title: "Alumni Career Fair 2024",
                        description: "Connect with leading companies and explore career opportunities in this exclusive alumni career fair.",
                        date: "2024-02-20",
                        time: "10:00",
                        location: "RGUKT Campus, Basar",
                        type: "Career Fair",
                        organizer: "Priya Sharma",
                        organizerBatch: "2017-2021",
                        registrations: 89,
                        capacity: 150,
                        status: "pending_review",
                        featured: true,
                        tags: ["Career", "Networking", "Jobs"],
                        image: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=400"
                },
                {
                        id: 3,
                        title: "Entrepreneurship Bootcamp",
                        description: "Learn the fundamentals of starting your own business from successful alumni entrepreneurs.",
                        date: "2024-02-25",
                        time: "14:00",
                        location: "Virtual Event",
                        type: "Bootcamp",
                        organizer: "Arun Singh",
                        organizerBatch: "2019-2023",
                        registrations: 67,
                        capacity: 100,
                        status: "active",
                        featured: false,
                        tags: ["Entrepreneurship", "Business", "Startup"],
                        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400"
                },
                {
                        id: 4,
                        title: "Alumni Reunion 2024",
                        description: "Come together with your batchmates and relive the golden days at RGUKT.",
                        date: "2024-03-15",
                        time: "11:00",
                        location: "RGUKT Campus, Basar",
                        type: "Reunion",
                        organizer: "Sita Reddy",
                        organizerBatch: "2016-2020",
                        registrations: 234,
                        capacity: 300,
                        status: "active",
                        featured: true,
                        tags: ["Reunion", "Networking", "Social"],
                        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400"
                },
                {
                        id: 5,
                        title: "Coding Competition",
                        description: "Test your coding skills in this competitive programming event with exciting prizes.",
                        date: "2024-02-10",
                        time: "15:00",
                        location: "Virtual Event",
                        type: "Competition",
                        organizer: "Kiran Patel",
                        organizerBatch: "2015-2019",
                        registrations: 45,
                        capacity: 50,
                        status: "closed",
                        featured: false,
                        tags: ["Programming", "Competition", "Coding"],
                        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400"
                },
                {
                        id: 6,
                        title: "Inappropriate Content Event",
                        description: "This event has been flagged for review due to inappropriate content.",
                        date: "2024-02-28",
                        time: "12:00",
                        location: "Unknown",
                        type: "Other",
                        organizer: "Test User",
                        organizerBatch: "2020-2024",
                        registrations: 3,
                        capacity: 10,
                        status: "flagged",
                        featured: false,
                        tags: ["Flagged"],
                        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400"
                }
        ];

        const stats = [
                {
                        title: "Total Events",
                        value: events.length,
                        icon: Calendar,
                        color: "text-blue-600"
                },
                {
                        title: "Active Events",
                        value: events.filter(e => e.status === "active").length,
                        icon: CheckCircle,
                        color: "text-green-600"
                },
                {
                        title: "Pending Review",
                        value: events.filter(e => e.status === "pending_review").length,
                        icon: Clock,
                        color: "text-yellow-600"
                },
                {
                        title: "Total Registrations",
                        value: events.reduce((sum, event) => sum + event.registrations, 0),
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

        const filteredEvents = events.filter(event => {
                const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.location.toLowerCase().includes(searchQuery.toLowerCase());

                if (selectedFilter === "all") return matchesSearch;
                return matchesSearch && event.status === selectedFilter;
        });

        const handleApprove = (id: number) => {
                console.log("Approving event with ID:", id);
        };

        const handleReject = (id: number) => {
                console.log("Rejecting event with ID:", id);
        };

        const handleFlag = (id: number) => {
                console.log("Flagging event with ID:", id);
        };

        const handleEdit = (id: number) => {
                console.log("Editing event with ID:", id);
        };

        const handleDelete = (id: number) => {
                console.log("Deleting event with ID:", id);
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
                                                                <h1 className="text-3xl font-bold">Event Management</h1>
                                                                <p className="text-muted-foreground">
                                                                        Manage events and registrations
                                                                </p>
                                                        </div>
                                                        <Button className="flex items-center gap-2">
                                                                <Plus className="h-4 w-4" />
                                                                Add Event
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
                                                                                                placeholder="Search by title, organizer, or location..."
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

                                                {/* Events List */}
                                                <div className="space-y-4">
                                                        {filteredEvents.map((event) => (
                                                                <Card key={event.id}>
                                                                        <CardHeader>
                                                                                <div className="flex items-start justify-between">
                                                                                        <div className="flex items-center gap-4">
                                                                                                <img
                                                                                                        src={event.image}
                                                                                                        alt={event.title}
                                                                                                        className="w-16 h-16 object-cover rounded-lg"
                                                                                                />
                                                                                                <div>
                                                                                                        <div className="flex items-center gap-2">
                                                                                                                <CardTitle className="text-lg">{event.title}</CardTitle>
                                                                                                                {event.featured && (
                                                                                                                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                                                                                                                <Star className="h-3 w-3 mr-1" />
                                                                                                                                Featured
                                                                                                                        </Badge>
                                                                                                                )}
                                                                                                        </div>
                                                                                                        <CardDescription className="flex items-center gap-4 mt-1">
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <Calendar className="h-4 w-4" />
                                                                                                                        {event.date} at {event.time}
                                                                                                                </span>
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <MapPin className="h-4 w-4" />
                                                                                                                        {event.location}
                                                                                                                </span>
                                                                                                                <span className="flex items-center gap-1">
                                                                                                                        <Users className="h-4 w-4" />
                                                                                                                        {event.registrations}/{event.capacity}
                                                                                                                </span>
                                                                                                        </CardDescription>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2">
                                                                                                {getStatusBadge(event.status)}
                                                                                        </div>
                                                                                </div>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                                                                        <div>
                                                                                                <div className="text-sm font-medium text-muted-foreground">Type</div>
                                                                                                <div className="text-sm">{event.type}</div>
                                                                                        </div>
                                                                                        <div>
                                                                                                <div className="text-sm font-medium text-muted-foreground">Organizer</div>
                                                                                                <div className="text-sm">{event.organizer}</div>
                                                                                                <div className="text-xs text-muted-foreground">{event.organizerBatch}</div>
                                                                                        </div>
                                                                                        <div>
                                                                                                <div className="text-sm font-medium text-muted-foreground">Capacity</div>
                                                                                                <div className="text-sm">
                                                                                                        {event.registrations}/{event.capacity} registered
                                                                                                        <span className={`ml-2 ${event.registrations === event.capacity ? 'text-red-600' : 'text-green-600'}`}>
                                                                                                                ({event.registrations === event.capacity ? 'Full' : `${event.capacity - event.registrations} spots left`})
                                                                                                        </span>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="mb-4">
                                                                                        <div className="text-sm font-medium text-muted-foreground mb-1">Description</div>
                                                                                        <p className="text-sm text-muted-foreground">{event.description}</p>
                                                                                </div>

                                                                                <div className="mb-4">
                                                                                        <div className="text-sm font-medium text-muted-foreground mb-2">Tags</div>
                                                                                        <div className="flex flex-wrap gap-2">
                                                                                                {event.tags.map((tag, index) => (
                                                                                                        <Badge key={index} variant="outline">{tag}</Badge>
                                                                                                ))}
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex justify-between items-center">
                                                                                        <div className="text-xs text-muted-foreground">
                                                                                                Registration progress: {Math.round((event.registrations / event.capacity) * 100)}%
                                                                                        </div>
                                                                                        <div className="flex gap-2">
                                                                                                <Button variant="outline" size="sm" onClick={() => handleEdit(event.id)}>
                                                                                                        <Edit className="h-4 w-4" />
                                                                                                </Button>
                                                                                                <Button variant="outline" size="sm">
                                                                                                        <Eye className="h-4 w-4" />
                                                                                                </Button>
                                                                                                {event.status === "pending_review" && (
                                                                                                        <>
                                                                                                                <Button variant="default" size="sm" onClick={() => handleApprove(event.id)}>
                                                                                                                        <CheckCircle className="h-4 w-4" />
                                                                                                                </Button>
                                                                                                                <Button variant="destructive" size="sm" onClick={() => handleReject(event.id)}>
                                                                                                                        <XCircle className="h-4 w-4" />
                                                                                                                </Button>
                                                                                                        </>
                                                                                                )}
                                                                                                {event.status === "active" && (
                                                                                                        <Button variant="outline" size="sm" onClick={() => handleFlag(event.id)}>
                                                                                                                <AlertTriangle className="h-4 w-4" />
                                                                                                        </Button>
                                                                                                )}
                                                                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>
                                                                                                        <Trash2 className="h-4 w-4" />
                                                                                                </Button>
                                                                                        </div>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        ))}
                                                </div>

                                                {filteredEvents.length === 0 && (
                                                        <Card>
                                                                <CardContent className="py-12 text-center">
                                                                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                                                        <h3 className="text-lg font-semibold mb-2">No events found</h3>
                                                                        <p className="text-muted-foreground">
                                                                                {searchQuery ?
                                                                                        "Try adjusting your search criteria" :
                                                                                        "No events match the selected filter"
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

export default AdminEvents;
