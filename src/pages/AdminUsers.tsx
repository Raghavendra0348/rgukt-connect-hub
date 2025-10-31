import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
        Users,
        Search,
        Filter,
        MoreHorizontal,
        Shield,
        UserCheck,
        UserX,
        Mail,
        Calendar,
        Building,
        GraduationCap,
        MapPin,
        Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function AdminUsers() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
        const [searchTerm, setSearchTerm] = useState("");

        const [users, setUsers] = useState([
                {
                        id: 1,
                        name: "Rajesh Kumar",
                        email: "rajesh.kumar@gmail.com",
                        role: "alumni",
                        status: "active",
                        joinedDate: "Jan 15, 2023",
                        lastActive: "2 hours ago",
                        batch: "2015",
                        branch: "Computer Science",
                        company: "Google",
                        position: "Senior Software Engineer",
                        location: "Bangalore",
                        verified: true
                },
                {
                        id: 2,
                        name: "Arjun Reddy",
                        email: "arjun.reddy@student.rgukt.ac.in",
                        role: "student",
                        status: "active",
                        joinedDate: "Aug 20, 2024",
                        lastActive: "1 day ago",
                        batch: "2021",
                        branch: "Computer Science",
                        year: 4,
                        cgpa: 8.5,
                        location: "RGUKT RK Valley",
                        verified: true
                },
                {
                        id: 3,
                        name: "Priya Sharma",
                        email: "priya.sharma@microsoft.com",
                        role: "alumni",
                        status: "active",
                        joinedDate: "Mar 10, 2023",
                        lastActive: "5 hours ago",
                        batch: "2017",
                        branch: "Electronics",
                        company: "Microsoft",
                        position: "Product Manager",
                        location: "Hyderabad",
                        verified: true
                },
                {
                        id: 4,
                        name: "Kavya Singh",
                        email: "kavya.singh@student.rgukt.ac.in",
                        role: "student",
                        status: "pending",
                        joinedDate: "Nov 1, 2024",
                        lastActive: "3 days ago",
                        batch: "2022",
                        branch: "Information Technology",
                        year: 3,
                        cgpa: 9.1,
                        location: "RGUKT Nuzvidu",
                        verified: false
                },
                {
                        id: 5,
                        name: "Admin User",
                        email: "admin@rgukt.ac.in",
                        role: "admin",
                        status: "active",
                        joinedDate: "Jan 1, 2023",
                        lastActive: "Online now",
                        department: "IT Administration",
                        location: "RGUKT RK Valley",
                        verified: true
                }
        ]);

        const [stats, setStats] = useState({
                totalUsers: 1250,
                activeUsers: 1180,
                alumni: 458,
                students: 785,
                admins: 7,
                pendingVerification: 23,
                newThisMonth: 45
        });

        const [filteredUsers, setFilteredUsers] = useState(users);
        const [selectedRole, setSelectedRole] = useState("all");
        const [selectedStatus, setSelectedStatus] = useState("all");

        useEffect(() => {
                checkAuth();
        }, []);

        useEffect(() => {
                let filtered = users;

                if (searchTerm) {
                        filtered = filtered.filter(user =>
                                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                user.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                user.branch?.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                }

                if (selectedRole !== "all") {
                        filtered = filtered.filter(user => user.role === selectedRole);
                }

                if (selectedStatus !== "all") {
                        filtered = filtered.filter(user => user.status === selectedStatus);
                }

                setFilteredUsers(filtered);
        }, [searchTerm, selectedRole, selectedStatus, users]);

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

                if (!role || role.role !== "admin") {
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

        const handleUserAction = (userId: number, action: string) => {
                const user = users.find(u => u.id === userId);
                if (!user) return;

                switch (action) {
                        case "activate":
                                setUsers(users.map(u => u.id === userId ? { ...u, status: "active" } : u));
                                toast({
                                        title: "User Activated",
                                        description: `${user.name} has been activated.`,
                                });
                                break;
                        case "deactivate":
                                setUsers(users.map(u => u.id === userId ? { ...u, status: "inactive" } : u));
                                toast({
                                        title: "User Deactivated",
                                        description: `${user.name} has been deactivated.`,
                                });
                                break;
                        case "verify":
                                setUsers(users.map(u => u.id === userId ? { ...u, verified: true } : u));
                                toast({
                                        title: "User Verified",
                                        description: `${user.name} has been verified.`,
                                });
                                break;
                        case "delete":
                                setUsers(users.filter(u => u.id !== userId));
                                toast({
                                        title: "User Deleted",
                                        description: `${user.name} has been deleted.`,
                                });
                                break;
                }
        };

        if (loading) {
                return (
                        <div className="min-h-screen bg-background">
                                <Navbar />
                                <div className="pt-24 container mx-auto px-4">
                                        <div className="flex items-center justify-center py-12">
                                                <div className="text-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                                        <p className="mt-4 text-muted-foreground">Loading users...</p>
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
                                role="admin"
                                collapsed={sidebarCollapsed}
                                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                        />

                        <div className={`pt-24 pb-12 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"
                                }`}>
                                <div className="container mx-auto px-6">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-8">
                                                <div>
                                                        <h1 className="text-4xl font-bold mb-2">User Management</h1>
                                                        <p className="text-xl text-muted-foreground">
                                                                Manage and monitor all platform users
                                                        </p>
                                                </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                                                                        <p className="text-xl font-bold">{stats.totalUsers}</p>
                                                                        <p className="text-xs text-muted-foreground">Total Users</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <UserCheck className="h-6 w-6 mx-auto mb-2 text-green-600" />
                                                                        <p className="text-xl font-bold">{stats.activeUsers}</p>
                                                                        <p className="text-xs text-muted-foreground">Active</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <GraduationCap className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                                                                        <p className="text-xl font-bold">{stats.alumni}</p>
                                                                        <p className="text-xs text-muted-foreground">Alumni</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <Users className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                                                                        <p className="text-xl font-bold">{stats.students}</p>
                                                                        <p className="text-xs text-muted-foreground">Students</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <Shield className="h-6 w-6 mx-auto mb-2 text-red-600" />
                                                                        <p className="text-xl font-bold">{stats.admins}</p>
                                                                        <p className="text-xs text-muted-foreground">Admins</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <UserX className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                                                                        <p className="text-xl font-bold">{stats.pendingVerification}</p>
                                                                        <p className="text-xs text-muted-foreground">Pending</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="text-center">
                                                                        <Calendar className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
                                                                        <p className="text-xl font-bold">{stats.newThisMonth}</p>
                                                                        <p className="text-xs text-muted-foreground">New This Month</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </div>

                                        <Tabs defaultValue="all" className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                        <TabsList>
                                                                <TabsTrigger value="all">All Users</TabsTrigger>
                                                                <TabsTrigger value="alumni">Alumni</TabsTrigger>
                                                                <TabsTrigger value="student">Students</TabsTrigger>
                                                                <TabsTrigger value="admin">Admins</TabsTrigger>
                                                                <TabsTrigger value="pending">Pending</TabsTrigger>
                                                        </TabsList>

                                                        {/* Search and Filters */}
                                                        <div className="flex items-center gap-4">
                                                                <div className="relative">
                                                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                                        <Input
                                                                                placeholder="Search users..."
                                                                                value={searchTerm}
                                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                                className="pl-10 w-64"
                                                                        />
                                                                </div>
                                                                <Button variant="outline" size="sm">
                                                                        <Filter className="h-4 w-4 mr-2" />
                                                                        Filters
                                                                </Button>
                                                        </div>
                                                </div>

                                                <TabsContent value="all" className="space-y-4">
                                                        <div className="space-y-4">
                                                                {filteredUsers.map((user) => (
                                                                        <Card key={user.id} className="hover:shadow-md transition-shadow">
                                                                                <CardContent className="pt-6">
                                                                                        <div className="flex items-start gap-4">
                                                                                                <Avatar className="h-12 w-12">
                                                                                                        <AvatarFallback className="text-lg">
                                                                                                                {user.name.split(' ').map(n => n[0]).join('')}
                                                                                                        </AvatarFallback>
                                                                                                </Avatar>

                                                                                                <div className="flex-1">
                                                                                                        <div className="flex items-center justify-between mb-2">
                                                                                                                <div>
                                                                                                                        <h3 className="font-semibold text-lg">{user.name}</h3>
                                                                                                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                                                                                                </div>
                                                                                                                <div className="flex items-center gap-2">
                                                                                                                        <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'alumni' ? 'default' : 'secondary'}>
                                                                                                                                {user.role}
                                                                                                                        </Badge>
                                                                                                                        <Badge variant={user.status === 'active' ? 'default' : user.status === 'pending' ? 'secondary' : 'destructive'}>
                                                                                                                                {user.status}
                                                                                                                        </Badge>
                                                                                                                        {!user.verified && (
                                                                                                                                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                                                                                                                        Unverified
                                                                                                                                </Badge>
                                                                                                                        )}
                                                                                                                </div>
                                                                                                        </div>

                                                                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                                                                                                                {user.role === 'alumni' && (
                                                                                                                        <>
                                                                                                                                <div className="flex items-center gap-1">
                                                                                                                                        <Building className="h-4 w-4" />
                                                                                                                                        <span>{user.company}</span>
                                                                                                                                </div>
                                                                                                                                <div className="flex items-center gap-1">
                                                                                                                                        <GraduationCap className="h-4 w-4" />
                                                                                                                                        <span>Batch {user.batch}</span>
                                                                                                                                </div>
                                                                                                                        </>
                                                                                                                )}
                                                                                                                {user.role === 'student' && (
                                                                                                                        <>
                                                                                                                                <div className="flex items-center gap-1">
                                                                                                                                        <GraduationCap className="h-4 w-4" />
                                                                                                                                        <span>Year {user.year}</span>
                                                                                                                                </div>
                                                                                                                                <div className="flex items-center gap-1">
                                                                                                                                        <span>CGPA: {user.cgpa}</span>
                                                                                                                                </div>
                                                                                                                        </>
                                                                                                                )}
                                                                                                                <div className="flex items-center gap-1">
                                                                                                                        <MapPin className="h-4 w-4" />
                                                                                                                        <span>{user.location}</span>
                                                                                                                </div>
                                                                                                                <div className="flex items-center gap-1">
                                                                                                                        <Calendar className="h-4 w-4" />
                                                                                                                        <span>Joined {user.joinedDate}</span>
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                        <span>Last active: {user.lastActive}</span>
                                                                                                                </div>
                                                                                                        </div>

                                                                                                        <div className="flex items-center gap-2">
                                                                                                                {user.status === 'pending' && (
                                                                                                                        <Button size="sm" onClick={() => handleUserAction(user.id, 'activate')}>
                                                                                                                                <UserCheck className="h-4 w-4 mr-2" />
                                                                                                                                Activate
                                                                                                                        </Button>
                                                                                                                )}
                                                                                                                {user.status === 'active' && (
                                                                                                                        <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'deactivate')}>
                                                                                                                                <UserX className="h-4 w-4 mr-2" />
                                                                                                                                Deactivate
                                                                                                                        </Button>
                                                                                                                )}
                                                                                                                {!user.verified && (
                                                                                                                        <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'verify')}>
                                                                                                                                <Shield className="h-4 w-4 mr-2" />
                                                                                                                                Verify
                                                                                                                        </Button>
                                                                                                                )}
                                                                                                                <Button variant="outline" size="sm">
                                                                                                                        <Mail className="h-4 w-4 mr-2" />
                                                                                                                        Contact
                                                                                                                </Button>
                                                                                                                <Button variant="ghost" size="sm">
                                                                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                                                                </Button>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                ))}
                                                        </div>
                                                </TabsContent>

                                                {/* Other tab contents can be similar filtered views */}
                                                <TabsContent value="alumni">
                                                        <div className="text-center py-8 text-muted-foreground">
                                                                Alumni-specific view would be implemented here
                                                        </div>
                                                </TabsContent>

                                                <TabsContent value="student">
                                                        <div className="text-center py-8 text-muted-foreground">
                                                                Student-specific view would be implemented here
                                                        </div>
                                                </TabsContent>

                                                <TabsContent value="admin">
                                                        <div className="text-center py-8 text-muted-foreground">
                                                                Admin-specific view would be implemented here
                                                        </div>
                                                </TabsContent>

                                                <TabsContent value="pending">
                                                        <div className="text-center py-8 text-muted-foreground">
                                                                Pending users view would be implemented here
                                                        </div>
                                                </TabsContent>
                                        </Tabs>
                                </div>
                        </div>
                </div>
        );
}
