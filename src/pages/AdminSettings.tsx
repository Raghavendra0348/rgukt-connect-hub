import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import {
        Settings,
        Shield,
        Mail,
        Database,
        Palette,
        Globe,
        Lock,
        Users,
        Bell,
        FileText,
        Server,
        Zap,
        Save
} from "lucide-react";

const AdminSettings = () => {
        const { user } = useAuth();
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

        // General Settings State
        const [generalSettings, setGeneralSettings] = React.useState({
                siteName: "RGUKT Connect Hub",
                siteDescription: "Official alumni portal for RGUKT students and graduates",
                siteUrl: "https://rgukt-connect-hub.com",
                adminEmail: "admin@rgukt.ac.in",
                supportEmail: "support@rgukt.ac.in",
                timezone: "Asia/Kolkata",
                language: "en",
                maintenanceMode: false,
                allowRegistrations: true,
                requireEmailVerification: true
        });

        // Security Settings State
        const [securitySettings, setSecuritySettings] = React.useState({
                passwordMinLength: 8,
                requireSpecialCharacters: true,
                requireNumbers: true,
                requireUppercase: true,
                sessionTimeout: 30,
                maxLoginAttempts: 5,
                lockoutDuration: 15,
                twoFactorAuth: false,
                ipWhitelisting: false,
                auditLogging: true
        });

        // Email Settings State
        const [emailSettings, setEmailSettings] = React.useState({
                smtpHost: "smtp.gmail.com",
                smtpPort: 587,
                smtpUsername: "noreply@rgukt.ac.in",
                smtpPassword: "",
                smtpEncryption: "tls",
                fromName: "RGUKT Connect Hub",
                fromEmail: "noreply@rgukt.ac.in",
                replyToEmail: "support@rgukt.ac.in"
        });

        // Notification Settings State
        const [notificationSettings, setNotificationSettings] = React.useState({
                emailNotifications: true,
                pushNotifications: true,
                smsNotifications: false,
                digestEmails: true,
                jobAlerts: true,
                eventReminders: true,
                mentorshipUpdates: true,
                systemAlerts: true
        });

        // Privacy Settings State
        const [privacySettings, setPrivacySettings] = React.useState({
                publicProfiles: true,
                showEmail: false,
                showPhone: false,
                allowSearchEngineIndexing: true,
                dataRetentionPeriod: 7,
                anonymizeDeletedAccounts: true,
                gdprCompliance: true,
                cookieConsent: true
        });

        // System Settings State
        const [systemSettings, setSystemSettings] = React.useState({
                cacheEnabled: true,
                cacheDuration: 3600,
                compressionEnabled: true,
                logLevel: "info",
                maxFileUploadSize: 10,
                allowedFileTypes: "jpg,jpeg,png,pdf,doc,docx",
                backupFrequency: "daily",
                backupRetention: 30
        });

        const handleSaveGeneralSettings = () => {
                console.log("Saving general settings:", generalSettings);
                // Implementation for saving general settings
        };

        const handleSaveSecuritySettings = () => {
                console.log("Saving security settings:", securitySettings);
                // Implementation for saving security settings
        };

        const handleSaveEmailSettings = () => {
                console.log("Saving email settings:", emailSettings);
                // Implementation for saving email settings
        };

        const handleSaveNotificationSettings = () => {
                console.log("Saving notification settings:", notificationSettings);
                // Implementation for saving notification settings
        };

        const handleSavePrivacySettings = () => {
                console.log("Saving privacy settings:", privacySettings);
                // Implementation for saving privacy settings
        };

        const handleSaveSystemSettings = () => {
                console.log("Saving system settings:", systemSettings);
                // Implementation for saving system settings
        };

        const handleTestEmailSettings = () => {
                console.log("Testing email settings");
                // Implementation for testing email settings
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
                                                        <h1 className="text-3xl font-bold">System Settings</h1>
                                                        <p className="text-muted-foreground">
                                                                Configure platform settings, security, and system preferences
                                                        </p>
                                                </div>

                                                <Tabs defaultValue="general" className="w-full">
                                                        <TabsList className="grid w-full grid-cols-6">
                                                                <TabsTrigger value="general">General</TabsTrigger>
                                                                <TabsTrigger value="security">Security</TabsTrigger>
                                                                <TabsTrigger value="email">Email</TabsTrigger>
                                                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                                                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                                                                <TabsTrigger value="system">System</TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="general" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <Globe className="h-5 w-5" />
                                                                                        General Settings
                                                                                </CardTitle>
                                                                                <CardDescription>Basic platform configuration and site information</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Site Name</label>
                                                                                                <Input
                                                                                                        value={generalSettings.siteName}
                                                                                                        onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                                                                                                />
                                                                                        </div>
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Site URL</label>
                                                                                                <Input
                                                                                                        value={generalSettings.siteUrl}
                                                                                                        onChange={(e) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div>
                                                                                        <label className="text-sm font-medium mb-2 block">Site Description</label>
                                                                                        <Textarea
                                                                                                value={generalSettings.siteDescription}
                                                                                                onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                                                                                                rows={3}
                                                                                        />
                                                                                </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Admin Email</label>
                                                                                                <Input
                                                                                                        type="email"
                                                                                                        value={generalSettings.adminEmail}
                                                                                                        onChange={(e) => setGeneralSettings({ ...generalSettings, adminEmail: e.target.value })}
                                                                                                />
                                                                                        </div>
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Support Email</label>
                                                                                                <Input
                                                                                                        type="email"
                                                                                                        value={generalSettings.supportEmail}
                                                                                                        onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Timezone</label>
                                                                                                <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}>
                                                                                                        <SelectTrigger>
                                                                                                                <SelectValue />
                                                                                                        </SelectTrigger>
                                                                                                        <SelectContent>
                                                                                                                <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                                                                                                                <SelectItem value="UTC">UTC</SelectItem>
                                                                                                                <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                                                                                                                <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                                                                                                        </SelectContent>
                                                                                                </Select>
                                                                                        </div>
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Default Language</label>
                                                                                                <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}>
                                                                                                        <SelectTrigger>
                                                                                                                <SelectValue />
                                                                                                        </SelectTrigger>
                                                                                                        <SelectContent>
                                                                                                                <SelectItem value="en">English</SelectItem>
                                                                                                                <SelectItem value="hi">Hindi</SelectItem>
                                                                                                                <SelectItem value="te">Telugu</SelectItem>
                                                                                                        </SelectContent>
                                                                                                </Select>
                                                                                        </div>
                                                                                </div>

                                                                                <Separator />

                                                                                <div className="space-y-4">
                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Maintenance Mode</label>
                                                                                                        <p className="text-xs text-muted-foreground">Enable to temporarily disable site access</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={generalSettings.maintenanceMode}
                                                                                                        onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, maintenanceMode: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Allow New Registrations</label>
                                                                                                        <p className="text-xs text-muted-foreground">Allow new users to create accounts</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={generalSettings.allowRegistrations}
                                                                                                        onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, allowRegistrations: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Require Email Verification</label>
                                                                                                        <p className="text-xs text-muted-foreground">Users must verify email before accessing platform</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={generalSettings.requireEmailVerification}
                                                                                                        onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, requireEmailVerification: checked })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex justify-end">
                                                                                        <Button onClick={handleSaveGeneralSettings} className="flex items-center gap-2">
                                                                                                <Save className="h-4 w-4" />
                                                                                                Save Changes
                                                                                        </Button>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="security" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <Shield className="h-5 w-5" />
                                                                                        Security Settings
                                                                                </CardTitle>
                                                                                <CardDescription>Configure authentication and security policies</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Minimum Password Length</label>
                                                                                                <Input
                                                                                                        type="number"
                                                                                                        value={securitySettings.passwordMinLength}
                                                                                                        onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: parseInt(e.target.value) })}
                                                                                                />
                                                                                        </div>
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Session Timeout (minutes)</label>
                                                                                                <Input
                                                                                                        type="number"
                                                                                                        value={securitySettings.sessionTimeout}
                                                                                                        onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Max Login Attempts</label>
                                                                                                <Input
                                                                                                        type="number"
                                                                                                        value={securitySettings.maxLoginAttempts}
                                                                                                        onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: parseInt(e.target.value) })}
                                                                                                />
                                                                                        </div>
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Lockout Duration (minutes)</label>
                                                                                                <Input
                                                                                                        type="number"
                                                                                                        value={securitySettings.lockoutDuration}
                                                                                                        onChange={(e) => setSecuritySettings({ ...securitySettings, lockoutDuration: parseInt(e.target.value) })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <Separator />

                                                                                <div className="space-y-4">
                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Require Special Characters</label>
                                                                                                        <p className="text-xs text-muted-foreground">Passwords must contain special characters</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={securitySettings.requireSpecialCharacters}
                                                                                                        onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requireSpecialCharacters: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Require Numbers</label>
                                                                                                        <p className="text-xs text-muted-foreground">Passwords must contain numbers</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={securitySettings.requireNumbers}
                                                                                                        onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requireNumbers: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Require Uppercase Letters</label>
                                                                                                        <p className="text-xs text-muted-foreground">Passwords must contain uppercase letters</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={securitySettings.requireUppercase}
                                                                                                        onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requireUppercase: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Two-Factor Authentication</label>
                                                                                                        <p className="text-xs text-muted-foreground">Enable 2FA for admin accounts</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={securitySettings.twoFactorAuth}
                                                                                                        onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">IP Whitelisting</label>
                                                                                                        <p className="text-xs text-muted-foreground">Restrict access to specific IP addresses</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={securitySettings.ipWhitelisting}
                                                                                                        onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, ipWhitelisting: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Audit Logging</label>
                                                                                                        <p className="text-xs text-muted-foreground">Log all administrative actions</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={securitySettings.auditLogging}
                                                                                                        onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, auditLogging: checked })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex justify-end">
                                                                                        <Button onClick={handleSaveSecuritySettings} className="flex items-center gap-2">
                                                                                                <Save className="h-4 w-4" />
                                                                                                Save Changes
                                                                                        </Button>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="email" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <Mail className="h-5 w-5" />
                                                                                        Email Settings
                                                                                </CardTitle>
                                                                                <CardDescription>Configure SMTP settings and email preferences</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">SMTP Host</label>
                                                                                                <Input
                                                                                                        value={emailSettings.smtpHost}
                                                                                                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                                                                                                />
                                                                                        </div>
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">SMTP Port</label>
                                                                                                <Input
                                                                                                        type="number"
                                                                                                        value={emailSettings.smtpPort}
                                                                                                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: parseInt(e.target.value) })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">SMTP Username</label>
                                                                                                <Input
                                                                                                        value={emailSettings.smtpUsername}
                                                                                                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                                                                                                />
                                                                                        </div>
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">SMTP Password</label>
                                                                                                <Input
                                                                                                        type="password"
                                                                                                        value={emailSettings.smtpPassword}
                                                                                                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div>
                                                                                        <label className="text-sm font-medium mb-2 block">Encryption</label>
                                                                                        <Select value={emailSettings.smtpEncryption} onValueChange={(value) => setEmailSettings({ ...emailSettings, smtpEncryption: value })}>
                                                                                                <SelectTrigger className="w-full">
                                                                                                        <SelectValue />
                                                                                                </SelectTrigger>
                                                                                                <SelectContent>
                                                                                                        <SelectItem value="none">None</SelectItem>
                                                                                                        <SelectItem value="tls">TLS</SelectItem>
                                                                                                        <SelectItem value="ssl">SSL</SelectItem>
                                                                                                </SelectContent>
                                                                                        </Select>
                                                                                </div>

                                                                                <Separator />

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">From Name</label>
                                                                                                <Input
                                                                                                        value={emailSettings.fromName}
                                                                                                        onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                                                                                                />
                                                                                        </div>
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">From Email</label>
                                                                                                <Input
                                                                                                        type="email"
                                                                                                        value={emailSettings.fromEmail}
                                                                                                        onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div>
                                                                                        <label className="text-sm font-medium mb-2 block">Reply-To Email</label>
                                                                                        <Input
                                                                                                type="email"
                                                                                                value={emailSettings.replyToEmail}
                                                                                                onChange={(e) => setEmailSettings({ ...emailSettings, replyToEmail: e.target.value })}
                                                                                        />
                                                                                </div>

                                                                                <div className="flex gap-2 justify-end">
                                                                                        <Button variant="outline" onClick={handleTestEmailSettings}>
                                                                                                Test Configuration
                                                                                        </Button>
                                                                                        <Button onClick={handleSaveEmailSettings} className="flex items-center gap-2">
                                                                                                <Save className="h-4 w-4" />
                                                                                                Save Changes
                                                                                        </Button>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="notifications" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <Bell className="h-5 w-5" />
                                                                                        Notification Settings
                                                                                </CardTitle>
                                                                                <CardDescription>Configure notification preferences and delivery methods</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div className="space-y-4">
                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Email Notifications</label>
                                                                                                        <p className="text-xs text-muted-foreground">Send notifications via email</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={notificationSettings.emailNotifications}
                                                                                                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Push Notifications</label>
                                                                                                        <p className="text-xs text-muted-foreground">Send browser push notifications</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={notificationSettings.pushNotifications}
                                                                                                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, pushNotifications: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">SMS Notifications</label>
                                                                                                        <p className="text-xs text-muted-foreground">Send notifications via SMS</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={notificationSettings.smsNotifications}
                                                                                                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, smsNotifications: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <Separator />

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Digest Emails</label>
                                                                                                        <p className="text-xs text-muted-foreground">Send weekly digest emails</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={notificationSettings.digestEmails}
                                                                                                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, digestEmails: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Job Alerts</label>
                                                                                                        <p className="text-xs text-muted-foreground">Notify users of new job postings</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={notificationSettings.jobAlerts}
                                                                                                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, jobAlerts: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Event Reminders</label>
                                                                                                        <p className="text-xs text-muted-foreground">Send event reminder notifications</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={notificationSettings.eventReminders}
                                                                                                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, eventReminders: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Mentorship Updates</label>
                                                                                                        <p className="text-xs text-muted-foreground">Notify about mentorship activities</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={notificationSettings.mentorshipUpdates}
                                                                                                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, mentorshipUpdates: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">System Alerts</label>
                                                                                                        <p className="text-xs text-muted-foreground">Send system maintenance and update notifications</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={notificationSettings.systemAlerts}
                                                                                                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, systemAlerts: checked })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex justify-end">
                                                                                        <Button onClick={handleSaveNotificationSettings} className="flex items-center gap-2">
                                                                                                <Save className="h-4 w-4" />
                                                                                                Save Changes
                                                                                        </Button>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="privacy" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <Lock className="h-5 w-5" />
                                                                                        Privacy Settings
                                                                                </CardTitle>
                                                                                <CardDescription>Configure privacy policies and data protection settings</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div>
                                                                                        <label className="text-sm font-medium mb-2 block">Data Retention Period (years)</label>
                                                                                        <Input
                                                                                                type="number"
                                                                                                value={privacySettings.dataRetentionPeriod}
                                                                                                onChange={(e) => setPrivacySettings({ ...privacySettings, dataRetentionPeriod: parseInt(e.target.value) })}
                                                                                        />
                                                                                </div>

                                                                                <Separator />

                                                                                <div className="space-y-4">
                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Public Profiles</label>
                                                                                                        <p className="text-xs text-muted-foreground">Allow public access to user profiles</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={privacySettings.publicProfiles}
                                                                                                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, publicProfiles: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Show Email in Profiles</label>
                                                                                                        <p className="text-xs text-muted-foreground">Display email addresses in public profiles</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={privacySettings.showEmail}
                                                                                                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showEmail: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Show Phone in Profiles</label>
                                                                                                        <p className="text-xs text-muted-foreground">Display phone numbers in public profiles</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={privacySettings.showPhone}
                                                                                                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showPhone: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Search Engine Indexing</label>
                                                                                                        <p className="text-xs text-muted-foreground">Allow search engines to index public content</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={privacySettings.allowSearchEngineIndexing}
                                                                                                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, allowSearchEngineIndexing: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Anonymize Deleted Accounts</label>
                                                                                                        <p className="text-xs text-muted-foreground">Remove personal data from deleted accounts</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={privacySettings.anonymizeDeletedAccounts}
                                                                                                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, anonymizeDeletedAccounts: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">GDPR Compliance</label>
                                                                                                        <p className="text-xs text-muted-foreground">Enable GDPR compliance features</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={privacySettings.gdprCompliance}
                                                                                                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, gdprCompliance: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Cookie Consent</label>
                                                                                                        <p className="text-xs text-muted-foreground">Require cookie consent from users</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={privacySettings.cookieConsent}
                                                                                                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, cookieConsent: checked })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex justify-end">
                                                                                        <Button onClick={handleSavePrivacySettings} className="flex items-center gap-2">
                                                                                                <Save className="h-4 w-4" />
                                                                                                Save Changes
                                                                                        </Button>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="system" className="space-y-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle className="flex items-center gap-2">
                                                                                        <Server className="h-5 w-5" />
                                                                                        System Settings
                                                                                </CardTitle>
                                                                                <CardDescription>Configure system performance and technical settings</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Cache Duration (seconds)</label>
                                                                                                <Input
                                                                                                        type="number"
                                                                                                        value={systemSettings.cacheDuration}
                                                                                                        onChange={(e) => setSystemSettings({ ...systemSettings, cacheDuration: parseInt(e.target.value) })}
                                                                                                />
                                                                                        </div>
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Max File Upload Size (MB)</label>
                                                                                                <Input
                                                                                                        type="number"
                                                                                                        value={systemSettings.maxFileUploadSize}
                                                                                                        onChange={(e) => setSystemSettings({ ...systemSettings, maxFileUploadSize: parseInt(e.target.value) })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div>
                                                                                        <label className="text-sm font-medium mb-2 block">Allowed File Types</label>
                                                                                        <Input
                                                                                                value={systemSettings.allowedFileTypes}
                                                                                                onChange={(e) => setSystemSettings({ ...systemSettings, allowedFileTypes: e.target.value })}
                                                                                                placeholder="jpg,jpeg,png,pdf,doc,docx"
                                                                                        />
                                                                                </div>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Log Level</label>
                                                                                                <Select value={systemSettings.logLevel} onValueChange={(value) => setSystemSettings({ ...systemSettings, logLevel: value })}>
                                                                                                        <SelectTrigger>
                                                                                                                <SelectValue />
                                                                                                        </SelectTrigger>
                                                                                                        <SelectContent>
                                                                                                                <SelectItem value="debug">Debug</SelectItem>
                                                                                                                <SelectItem value="info">Info</SelectItem>
                                                                                                                <SelectItem value="warning">Warning</SelectItem>
                                                                                                                <SelectItem value="error">Error</SelectItem>
                                                                                                        </SelectContent>
                                                                                                </Select>
                                                                                        </div>
                                                                                        <div>
                                                                                                <label className="text-sm font-medium mb-2 block">Backup Frequency</label>
                                                                                                <Select value={systemSettings.backupFrequency} onValueChange={(value) => setSystemSettings({ ...systemSettings, backupFrequency: value })}>
                                                                                                        <SelectTrigger>
                                                                                                                <SelectValue />
                                                                                                        </SelectTrigger>
                                                                                                        <SelectContent>
                                                                                                                <SelectItem value="hourly">Hourly</SelectItem>
                                                                                                                <SelectItem value="daily">Daily</SelectItem>
                                                                                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                                                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                                                                        </SelectContent>
                                                                                                </Select>
                                                                                        </div>
                                                                                </div>

                                                                                <div>
                                                                                        <label className="text-sm font-medium mb-2 block">Backup Retention (days)</label>
                                                                                        <Input
                                                                                                type="number"
                                                                                                value={systemSettings.backupRetention}
                                                                                                onChange={(e) => setSystemSettings({ ...systemSettings, backupRetention: parseInt(e.target.value) })}
                                                                                        />
                                                                                </div>

                                                                                <Separator />

                                                                                <div className="space-y-4">
                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Enable Caching</label>
                                                                                                        <p className="text-xs text-muted-foreground">Enable application-level caching</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={systemSettings.cacheEnabled}
                                                                                                        onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, cacheEnabled: checked })}
                                                                                                />
                                                                                        </div>

                                                                                        <div className="flex items-center justify-between">
                                                                                                <div>
                                                                                                        <label className="text-sm font-medium">Enable Compression</label>
                                                                                                        <p className="text-xs text-muted-foreground">Compress responses to reduce bandwidth</p>
                                                                                                </div>
                                                                                                <Switch
                                                                                                        checked={systemSettings.compressionEnabled}
                                                                                                        onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, compressionEnabled: checked })}
                                                                                                />
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex justify-end">
                                                                                        <Button onClick={handleSaveSystemSettings} className="flex items-center gap-2">
                                                                                                <Save className="h-4 w-4" />
                                                                                                Save Changes
                                                                                        </Button>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>
                                                </Tabs>
                                        </div>
                                </main>
                        </div>
                </div>
        );
};

export default AdminSettings;
