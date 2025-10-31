import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
        Settings,
        Bell,
        Shield,
        User,
        Mail,
        Smartphone,
        Eye,
        Download,
        Trash2,
        Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function StudentSettings() {
        const navigate = useNavigate();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

        const [notifications, setNotifications] = useState({
                emailNotifications: true,
                pushNotifications: true,
                jobAlerts: true,
                eventReminders: true,
                mentorshipUpdates: true,
                weeklyDigest: false,
                marketingEmails: false
        });

        const [privacy, setPrivacy] = useState({
                profileVisibility: "public",
                showEmail: false,
                showPhone: false,
                allowMentorContact: true,
                shareWithRecruiters: true
        });

        const [profile, setProfile] = useState({
                name: "John Doe",
                email: "john.doe@student.rgukt.ac.in",
                phone: "+91 9876543210",
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
        });

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

                if (!role || role.role !== "student") {
                        toast({
                                title: "Access Denied",
                                description: "You don't have permission to access this page.",
                                variant: "destructive",
                        });
                        navigate("/");
                        return;
                }

                // Mock user data
                setProfile(prev => ({
                        ...prev,
                        name: user.email?.split('@')[0] || 'Student',
                        email: user.email || ''
                }));

                setLoading(false);
        };

        const handleNotificationChange = (key: string, value: boolean) => {
                setNotifications(prev => ({
                        ...prev,
                        [key]: value
                }));
        };

        const handlePrivacyChange = (key: string, value: boolean | string) => {
                setPrivacy(prev => ({
                        ...prev,
                        [key]: value
                }));
        };

        const handleProfileChange = (key: string, value: string) => {
                setProfile(prev => ({
                        ...prev,
                        [key]: value
                }));
        };

        const handleSaveSettings = () => {
                toast({
                        title: "Settings Saved",
                        description: "Your preferences have been updated successfully.",
                });
        };

        const handleChangePassword = () => {
                if (profile.newPassword !== profile.confirmPassword) {
                        toast({
                                title: "Password Mismatch",
                                description: "New password and confirm password do not match.",
                                variant: "destructive",
                        });
                        return;
                }

                toast({
                        title: "Password Changed",
                        description: "Your password has been updated successfully.",
                });

                setProfile(prev => ({
                        ...prev,
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                }));
        };

        const handleDataExport = () => {
                toast({
                        title: "Data Export Started",
                        description: "Your data export will be sent to your email within 24 hours.",
                });
        };

        const handleAccountDelete = () => {
                toast({
                        title: "Account Deletion",
                        description: "Please contact support to delete your account.",
                        variant: "destructive",
                });
        };

        if (loading) {
                return (
                        <div className="min-h-screen bg-background">
                                <Navbar />
                                <div className="pt-24 container mx-auto px-4">
                                        <div className="flex items-center justify-center py-12">
                                                <div className="text-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                                        <p className="mt-4 text-muted-foreground">Loading settings...</p>
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
                                role="student"
                                collapsed={sidebarCollapsed}
                                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                        />

                        <div className={`pt-24 pb-12 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"
                                }`}>
                                <div className="container mx-auto px-6 max-w-4xl">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-8">
                                                <div>
                                                        <h1 className="text-4xl font-bold mb-2">Settings</h1>
                                                        <p className="text-xl text-muted-foreground">
                                                                Manage your account preferences and privacy settings
                                                        </p>
                                                </div>
                                        </div>

                                        <div className="space-y-8">
                                                {/* Account Information */}
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <User className="h-5 w-5" />
                                                                        Account Information
                                                                </CardTitle>
                                                                <CardDescription>Update your basic account details</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-4">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div className="space-y-2">
                                                                                <Label htmlFor="name">Full Name</Label>
                                                                                <Input
                                                                                        id="name"
                                                                                        value={profile.name}
                                                                                        onChange={(e) => handleProfileChange("name", e.target.value)}
                                                                                />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                                <Label htmlFor="email">Email Address</Label>
                                                                                <Input
                                                                                        id="email"
                                                                                        type="email"
                                                                                        value={profile.email}
                                                                                        onChange={(e) => handleProfileChange("email", e.target.value)}
                                                                                        disabled
                                                                                />
                                                                        </div>
                                                                </div>
                                                                <div className="space-y-2">
                                                                        <Label htmlFor="phone">Phone Number</Label>
                                                                        <Input
                                                                                id="phone"
                                                                                value={profile.phone}
                                                                                onChange={(e) => handleProfileChange("phone", e.target.value)}
                                                                        />
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                {/* Password Change */}
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <Shield className="h-5 w-5" />
                                                                        Password & Security
                                                                </CardTitle>
                                                                <CardDescription>Update your password to keep your account secure</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-4">
                                                                <div className="space-y-2">
                                                                        <Label htmlFor="currentPassword">Current Password</Label>
                                                                        <Input
                                                                                id="currentPassword"
                                                                                type="password"
                                                                                value={profile.currentPassword}
                                                                                onChange={(e) => handleProfileChange("currentPassword", e.target.value)}
                                                                        />
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div className="space-y-2">
                                                                                <Label htmlFor="newPassword">New Password</Label>
                                                                                <Input
                                                                                        id="newPassword"
                                                                                        type="password"
                                                                                        value={profile.newPassword}
                                                                                        onChange={(e) => handleProfileChange("newPassword", e.target.value)}
                                                                                />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                                                                <Input
                                                                                        id="confirmPassword"
                                                                                        type="password"
                                                                                        value={profile.confirmPassword}
                                                                                        onChange={(e) => handleProfileChange("confirmPassword", e.target.value)}
                                                                                />
                                                                        </div>
                                                                </div>
                                                                <Button onClick={handleChangePassword} className="w-full md:w-auto">
                                                                        Change Password
                                                                </Button>
                                                        </CardContent>
                                                </Card>

                                                {/* Notification Preferences */}
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <Bell className="h-5 w-5" />
                                                                        Notification Preferences
                                                                </CardTitle>
                                                                <CardDescription>Choose what notifications you want to receive</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-6">
                                                                <div className="space-y-4">
                                                                        <div className="flex items-center justify-between">
                                                                                <div className="space-y-0.5">
                                                                                        <Label className="text-base">Email Notifications</Label>
                                                                                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                                                                </div>
                                                                                <Switch
                                                                                        checked={notifications.emailNotifications}
                                                                                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                                                                                />
                                                                        </div>

                                                                        <div className="flex items-center justify-between">
                                                                                <div className="space-y-0.5">
                                                                                        <Label className="text-base">Push Notifications</Label>
                                                                                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                                                                                </div>
                                                                                <Switch
                                                                                        checked={notifications.pushNotifications}
                                                                                        onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                                                                                />
                                                                        </div>

                                                                        <Separator />

                                                                        <div className="flex items-center justify-between">
                                                                                <div className="space-y-0.5">
                                                                                        <Label className="text-base">Job Alerts</Label>
                                                                                        <p className="text-sm text-muted-foreground">Get notified about new job opportunities</p>
                                                                                </div>
                                                                                <Switch
                                                                                        checked={notifications.jobAlerts}
                                                                                        onCheckedChange={(checked) => handleNotificationChange("jobAlerts", checked)}
                                                                                />
                                                                        </div>

                                                                        <div className="flex items-center justify-between">
                                                                                <div className="space-y-0.5">
                                                                                        <Label className="text-base">Event Reminders</Label>
                                                                                        <p className="text-sm text-muted-foreground">Reminders for upcoming events</p>
                                                                                </div>
                                                                                <Switch
                                                                                        checked={notifications.eventReminders}
                                                                                        onCheckedChange={(checked) => handleNotificationChange("eventReminders", checked)}
                                                                                />
                                                                        </div>

                                                                        <div className="flex items-center justify-between">
                                                                                <div className="space-y-0.5">
                                                                                        <Label className="text-base">Mentorship Updates</Label>
                                                                                        <p className="text-sm text-muted-foreground">Updates from your mentors</p>
                                                                                </div>
                                                                                <Switch
                                                                                        checked={notifications.mentorshipUpdates}
                                                                                        onCheckedChange={(checked) => handleNotificationChange("mentorshipUpdates", checked)}
                                                                                />
                                                                        </div>

                                                                        <div className="flex items-center justify-between">
                                                                                <div className="space-y-0.5">
                                                                                        <Label className="text-base">Weekly Digest</Label>
                                                                                        <p className="text-sm text-muted-foreground">Weekly summary of activities</p>
                                                                                </div>
                                                                                <Switch
                                                                                        checked={notifications.weeklyDigest}
                                                                                        onCheckedChange={(checked) => handleNotificationChange("weeklyDigest", checked)}
                                                                                />
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                {/* Privacy Settings */}
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <Eye className="h-5 w-5" />
                                                                        Privacy Settings
                                                                </CardTitle>
                                                                <CardDescription>Control who can see your information</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                        <div className="space-y-0.5">
                                                                                <Label className="text-base">Show Email in Profile</Label>
                                                                                <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
                                                                        </div>
                                                                        <Switch
                                                                                checked={privacy.showEmail}
                                                                                onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                                                                        />
                                                                </div>

                                                                <div className="flex items-center justify-between">
                                                                        <div className="space-y-0.5">
                                                                                <Label className="text-base">Show Phone in Profile</Label>
                                                                                <p className="text-sm text-muted-foreground">Allow others to see your phone number</p>
                                                                        </div>
                                                                        <Switch
                                                                                checked={privacy.showPhone}
                                                                                onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                                                                        />
                                                                </div>

                                                                <div className="flex items-center justify-between">
                                                                        <div className="space-y-0.5">
                                                                                <Label className="text-base">Allow Mentor Contact</Label>
                                                                                <p className="text-sm text-muted-foreground">Let mentors contact you directly</p>
                                                                        </div>
                                                                        <Switch
                                                                                checked={privacy.allowMentorContact}
                                                                                onCheckedChange={(checked) => handlePrivacyChange("allowMentorContact", checked)}
                                                                        />
                                                                </div>

                                                                <div className="flex items-center justify-between">
                                                                        <div className="space-y-0.5">
                                                                                <Label className="text-base">Share with Recruiters</Label>
                                                                                <p className="text-sm text-muted-foreground">Allow recruiters to view your profile</p>
                                                                        </div>
                                                                        <Switch
                                                                                checked={privacy.shareWithRecruiters}
                                                                                onCheckedChange={(checked) => handlePrivacyChange("shareWithRecruiters", checked)}
                                                                        />
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                {/* Data Management */}
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <Download className="h-5 w-5" />
                                                                        Data Management
                                                                </CardTitle>
                                                                <CardDescription>Export or delete your account data</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-4">
                                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                                        <div>
                                                                                <h3 className="font-medium">Export Your Data</h3>
                                                                                <p className="text-sm text-muted-foreground">
                                                                                        Download a copy of all your data including profile, applications, and activity
                                                                                </p>
                                                                        </div>
                                                                        <Button variant="outline" onClick={handleDataExport}>
                                                                                <Download className="h-4 w-4 mr-2" />
                                                                                Export Data
                                                                        </Button>
                                                                </div>

                                                                <div className="flex items-center justify-between p-4 border rounded-lg border-red-200">
                                                                        <div>
                                                                                <h3 className="font-medium text-red-700">Delete Account</h3>
                                                                                <p className="text-sm text-muted-foreground">
                                                                                        Permanently delete your account and all associated data
                                                                                </p>
                                                                        </div>
                                                                        <Button variant="destructive" onClick={handleAccountDelete}>
                                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                                Delete Account
                                                                        </Button>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                {/* Save Button */}
                                                <div className="flex justify-end">
                                                        <Button onClick={handleSaveSettings} size="lg">
                                                                <Save className="h-4 w-4 mr-2" />
                                                                Save All Settings
                                                        </Button>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
