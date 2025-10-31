import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
        Calendar,
        MapPin,
        Users,
        Clock,
        Plus,
        Edit,
        Trash2,
        Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function AlumniCreateEvent() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

        const [myEvents, setMyEvents] = useState([
                {
                        id: 1,
                        title: "React Workshop for Beginners",
                        description: "Learn React fundamentals with hands-on projects",
                        date: "Dec 15, 2024",
                        time: "2:00 PM - 5:00 PM",
                        location: "Online",
                        type: "Workshop",
                        maxAttendees: 50,
                        currentAttendees: 32,
                        status: "published",
                        createdDate: "Nov 1, 2024"
                },
                {
                        id: 2,
                        title: "Career Guidance Session",
                        description: "Tips for transitioning from student to professional",
                        date: "Nov 25, 2024",
                        time: "6:00 PM - 7:30 PM",
                        location: "RGUKT RK Valley",
                        type: "Seminar",
                        maxAttendees: 100,
                        currentAttendees: 67,
                        status: "published",
                        createdDate: "Oct 20, 2024"
                }
        ]);

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
                                        <div className="flex items-center justify-between mb-8">
                                                <div>
                                                        <h1 className="text-4xl font-bold mb-2">Create Event</h1>
                                                        <p className="text-xl text-muted-foreground">
                                                                Organize events and workshops for RGUKT students
                                                        </p>
                                                </div>
                                                <Button>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        New Event
                                                </Button>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                <div className="lg:col-span-2">
                                                        <Card>
                                                                <CardHeader>
                                                                        <CardTitle>Event Creation Form</CardTitle>
                                                                        <CardDescription>
                                                                                Fill out the form to create a new event
                                                                        </CardDescription>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <div className="text-center py-8 text-muted-foreground">
                                                                                Event creation form will be implemented here
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <div>
                                                        <Card>
                                                                <CardHeader>
                                                                        <CardTitle>My Events</CardTitle>
                                                                        <CardDescription>Events you've created</CardDescription>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <div className="space-y-4">
                                                                                {myEvents.map((event) => (
                                                                                        <div key={event.id} className="p-4 border rounded-lg">
                                                                                                <div className="flex items-start justify-between mb-2">
                                                                                                        <h4 className="font-medium text-sm">{event.title}</h4>
                                                                                                        <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                                                                                                                {event.status}
                                                                                                        </Badge>
                                                                                                </div>

                                                                                                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                                                                                                        <div className="flex items-center gap-1">
                                                                                                                <Calendar className="h-3 w-3" />
                                                                                                                <span>{event.date}</span>
                                                                                                        </div>
                                                                                                        <div className="flex items-center gap-1">
                                                                                                                <Clock className="h-3 w-3" />
                                                                                                                <span>{event.time}</span>
                                                                                                        </div>
                                                                                                        <div className="flex items-center gap-1">
                                                                                                                <MapPin className="h-3 w-3" />
                                                                                                                <span>{event.location}</span>
                                                                                                        </div>
                                                                                                        <div className="flex items-center gap-1">
                                                                                                                <Users className="h-3 w-3" />
                                                                                                                <span>{event.currentAttendees}/{event.maxAttendees} attendees</span>
                                                                                                        </div>
                                                                                                </div>

                                                                                                <div className="flex items-center gap-1">
                                                                                                        <Button variant="outline" size="sm" className="flex-1 text-xs h-7">
                                                                                                                <Eye className="h-3 w-3 mr-1" />
                                                                                                                View
                                                                                                        </Button>
                                                                                                        <Button variant="outline" size="sm" className="text-xs h-7">
                                                                                                                <Edit className="h-3 w-3" />
                                                                                                        </Button>
                                                                                                        <Button variant="outline" size="sm" className="text-xs h-7">
                                                                                                                <Trash2 className="h-3 w-3" />
                                                                                                        </Button>
                                                                                                </div>
                                                                                        </div>
                                                                                ))}
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
