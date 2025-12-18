import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/api-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
        Heart,
        DollarSign,
        TrendingUp,
        Users,
        Gift,
        Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function AlumniDonations() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
                                                        <h1 className="text-4xl font-bold mb-2">Donations</h1>
                                                        <p className="text-xl text-muted-foreground">
                                                                Support RGUKT students and infrastructure development
                                                        </p>
                                                </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Heart className="h-8 w-8 text-red-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">₹2,50,000</p>
                                                                                <p className="text-sm text-muted-foreground">Total Donated</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Users className="h-8 w-8 text-blue-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">45</p>
                                                                                <p className="text-sm text-muted-foreground">Students Helped</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Gift className="h-8 w-8 text-green-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">12</p>
                                                                                <p className="text-sm text-muted-foreground">Donations Made</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                                <Card>
                                                        <CardContent className="pt-6">
                                                                <div className="flex items-center gap-2">
                                                                        <Building className="h-8 w-8 text-purple-600" />
                                                                        <div>
                                                                                <p className="text-2xl font-bold">3</p>
                                                                                <p className="text-sm text-muted-foreground">Projects Funded</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle>Active Campaigns</CardTitle>
                                                                <CardDescription>Current fundraising initiatives</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="text-center py-8 text-muted-foreground">
                                                                        Active donation campaigns will be displayed here
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle>My Donation History</CardTitle>
                                                                <CardDescription>Your past contributions</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="text-center py-8 text-muted-foreground">
                                                                        Your donation history will be displayed here
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
