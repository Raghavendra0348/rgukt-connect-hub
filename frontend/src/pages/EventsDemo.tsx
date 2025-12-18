import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";

interface Event {
        id: string;
        title: string;
        description: string;
        event_date: string;
        location: string;
        event_type: string;
        max_attendees?: number;
        current_attendees: number;
}

export default function Events() {
        const { toast } = useToast();
        const { role } = useAuth();

        // Mock data for demonstration
        const [events] = useState<Event[]>([
                {
                        id: "1",
                        title: "Annual Alumni Reunion 2025",
                        description: "Join us for our annual reunion celebration with networking, cultural programs, and memories.",
                        event_date: "2025-12-15T18:00:00Z",
                        location: "RGUKT R.K. Valley Campus",
                        event_type: "reunion",
                        max_attendees: 500,
                        current_attendees: 234
                },
                {
                        id: "2",
                        title: "Tech Career Workshop",
                        description: "Learn about latest technologies and career opportunities in the tech industry.",
                        event_date: "2025-11-20T14:00:00Z",
                        location: "Online (Zoom)",
                        event_type: "workshop",
                        max_attendees: 100,
                        current_attendees: 67
                },
                {
                        id: "3",
                        title: "Entrepreneurship Seminar",
                        description: "Inspiring stories and practical advice from successful alumni entrepreneurs.",
                        event_date: "2025-11-25T16:00:00Z",
                        location: "Innovation Hub, Hyderabad",
                        event_type: "seminar",
                        max_attendees: 150,
                        current_attendees: 89
                }
        ]);

        const handleRegister = async (eventId: string) => {
                // Mock registration logic
                toast({
                        title: "Registration Successful",
                        description: "You have been registered for the event!",
                });
        };

        const getEventTypeColor = (type: string) => {
                switch (type.toLowerCase()) {
                        case "reunion":
                                return "bg-blue-100 text-blue-800";
                        case "workshop":
                                return "bg-green-100 text-green-800";
                        case "seminar":
                                return "bg-purple-100 text-purple-800";
                        case "networking":
                                return "bg-orange-100 text-orange-800";
                        default:
                                return "bg-gray-100 text-gray-800";
                }
        };

        return (
                <ResponsiveLayout role={(role as "admin" | "alumni" | "student") || "student"}>
                        <div className="space-y-6">
                                <div className="text-center mb-12">
                                        <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
                                        <p className="text-xl text-muted-foreground">
                                                Stay connected with your alma mater through exciting events and gatherings
                                        </p>
                                </div>

                                {events.length === 0 ? (
                                        <div className="text-center py-12">
                                                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                                <h3 className="text-xl font-semibold mb-2">No Events Available</h3>
                                                <p className="text-muted-foreground">
                                                        Check back soon for upcoming events and reunions.
                                                </p>
                                        </div>
                                ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {events.map((event) => (
                                                        <Card key={event.id} className="hover:shadow-lg transition-shadow">
                                                                <CardHeader>
                                                                        <div className="flex items-start justify-between">
                                                                                <div className="flex-1">
                                                                                        <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                                                                                        <Badge className={getEventTypeColor(event.event_type)}>
                                                                                                {event.event_type}
                                                                                        </Badge>
                                                                                </div>
                                                                        </div>
                                                                        <CardDescription className="mt-2">
                                                                                {event.description}
                                                                        </CardDescription>
                                                                </CardHeader>
                                                                <CardContent className="space-y-4">
                                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                <Calendar className="h-4 w-4" />
                                                                                {format(new Date(event.event_date), "PPP")}
                                                                        </div>
                                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                <Clock className="h-4 w-4" />
                                                                                {format(new Date(event.event_date), "p")}
                                                                        </div>
                                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                <MapPin className="h-4 w-4" />
                                                                                {event.location}
                                                                        </div>
                                                                        {event.max_attendees && (
                                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                        <Users className="h-4 w-4" />
                                                                                        {event.current_attendees}/{event.max_attendees} attendees
                                                                                </div>
                                                                        )}
                                                                        <Button
                                                                                onClick={() => handleRegister(event.id)}
                                                                                className="w-full"
                                                                                disabled={
                                                                                        event.max_attendees ?
                                                                                                event.current_attendees >= event.max_attendees :
                                                                                                false
                                                                                }
                                                                        >
                                                                                {event.max_attendees && event.current_attendees >= event.max_attendees
                                                                                        ? "Event Full"
                                                                                        : "Register"}
                                                                        </Button>
                                                                </CardContent>
                                                        </Card>
                                                ))}
                                        </div>
                                )}
                        </div>
                </ResponsiveLayout>
        );
}
