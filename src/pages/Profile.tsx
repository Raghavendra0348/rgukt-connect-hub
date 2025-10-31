import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Building, Calendar } from "lucide-react";

interface AlumniProfile {
        id: string;
        user_id: string;
        batch_year: number;
        branch: string;
        current_company?: string;
        job_title?: string;
        location?: string;
        phone_number?: string;
        linkedin_url?: string;
        bio?: string;
        is_mentor: boolean;
}

interface StudentProfile {
        id: string;
        user_id: string;
        roll_number: string;
        branch: string;
        graduation_year: number;
        phone_number?: string;
        bio?: string;
}

export default function Profile() {
        const { user, role } = useAuth();
        const { toast } = useToast();
        const [loading, setLoading] = useState(true);
        const [saving, setSaving] = useState(false);
        const [alumniProfile, setAlumniProfile] = useState<AlumniProfile | null>(null);
        const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);

        useEffect(() => {
                if (user && role) {
                        fetchProfile();
                }
        }, [user, role]);

        const fetchProfile = async () => {
                if (!user) return;

                try {
                        if (role === "alumni") {
                                const { data, error } = await supabase
                                        .from("alumni_profiles")
                                        .select("*")
                                        .eq("user_id", user.id)
                                        .single();

                                if (error && error.code !== "PGRST116") throw error;
                                setAlumniProfile(data);
                        } else if (role === "student") {
                                const { data, error } = await supabase
                                        .from("student_profiles")
                                        .select("*")
                                        .eq("user_id", user.id)
                                        .single();

                                if (error && error.code !== "PGRST116") throw error;
                                setStudentProfile(data);
                        }
                } catch (error) {
                        console.error("Error fetching profile:", error);
                        toast({
                                title: "Error",
                                description: "Failed to load profile data.",
                                variant: "destructive",
                        });
                } finally {
                        setLoading(false);
                }
        };

        const handleSaveAlumniProfile = async (profileData: Partial<AlumniProfile>) => {
                if (!user) return;

                setSaving(true);
                try {
                        if (alumniProfile) {
                                const { error } = await supabase
                                        .from("alumni_profiles")
                                        .update(profileData)
                                        .eq("user_id", user.id);

                                if (error) throw error;
                        } else {
                                const { error } = await supabase
                                        .from("alumni_profiles")
                                        .insert({ ...profileData, user_id: user.id });

                                if (error) throw error;
                        }

                        toast({
                                title: "Success",
                                description: "Profile updated successfully!",
                        });

                        fetchProfile();
                } catch (error) {
                        console.error("Error saving profile:", error);
                        toast({
                                title: "Error",
                                description: "Failed to update profile.",
                                variant: "destructive",
                        });
                } finally {
                        setSaving(false);
                }
        };

        const handleSaveStudentProfile = async (profileData: Partial<StudentProfile>) => {
                if (!user) return;

                setSaving(true);
                try {
                        if (studentProfile) {
                                const { error } = await supabase
                                        .from("student_profiles")
                                        .update(profileData)
                                        .eq("user_id", user.id);

                                if (error) throw error;
                        } else {
                                const { error } = await supabase
                                        .from("student_profiles")
                                        .insert({ ...profileData, user_id: user.id });

                                if (error) throw error;
                        }

                        toast({
                                title: "Success",
                                description: "Profile updated successfully!",
                        });

                        fetchProfile();
                } catch (error) {
                        console.error("Error saving profile:", error);
                        toast({
                                title: "Error",
                                description: "Failed to update profile.",
                                variant: "destructive",
                        });
                } finally {
                        setSaving(false);
                }
        };

        if (loading) {
                return (
                        <ResponsiveLayout role={(role as "admin" | "alumni" | "student") || "student"}>
                                <div className="flex items-center justify-center py-12">
                                        <div className="text-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                                <p className="mt-4 text-muted-foreground">Loading profile...</p>
                                        </div>
                                </div>
                        </ResponsiveLayout>
                );
        }

        return (
                <ResponsiveLayout role={(role as "admin" | "alumni" | "student") || "student"}>
                        <div className="space-y-6 max-w-4xl mx-auto">
                                <div className="text-center mb-8">
                                        <h1 className="text-4xl font-bold mb-4">My Profile</h1>
                                        <p className="text-xl text-muted-foreground">
                                                Manage your profile information and preferences
                                        </p>
                                </div>

                                <div className="space-y-6">
                                        {/* Basic Information */}
                                        <Card>
                                                <CardHeader>
                                                        <CardTitle className="flex items-center gap-2">
                                                                <User className="h-5 w-5" />
                                                                Basic Information
                                                        </CardTitle>
                                                        <CardDescription>
                                                                Your basic account information
                                                        </CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                        <Label>Email</Label>
                                                                        <div className="flex items-center gap-2 mt-1">
                                                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                                                <span className="text-sm">{user?.email}</span>
                                                                        </div>
                                                                </div>
                                                                <div>
                                                                        <Label>Role</Label>
                                                                        <div className="flex items-center gap-2 mt-1">
                                                                                <span className="text-sm capitalize">{role}</span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>

                                        {/* Alumni Profile */}
                                        {role === "alumni" && (
                                                <AlumniProfileForm
                                                        profile={alumniProfile}
                                                        onSave={handleSaveAlumniProfile}
                                                        saving={saving}
                                                />
                                        )}

                                        {/* Student Profile */}
                                        {role === "student" && (
                                                <StudentProfileForm
                                                        profile={studentProfile}
                                                        onSave={handleSaveStudentProfile}
                                                        saving={saving}
                                                />
                                        )}
                                </div>
                        </div>
                </ResponsiveLayout>
        );
}

interface AlumniProfileFormProps {
        profile: AlumniProfile | null;
        onSave: (data: Partial<AlumniProfile>) => void;
        saving: boolean;
}

const AlumniProfileForm = ({ profile, onSave, saving }: AlumniProfileFormProps) => {
        const [formData, setFormData] = useState({
                batch_year: profile?.batch_year || new Date().getFullYear(),
                branch: profile?.branch || "",
                current_company: profile?.current_company || "",
                job_title: profile?.job_title || "",
                location: profile?.location || "",
                phone_number: profile?.phone_number || "",
                linkedin_url: profile?.linkedin_url || "",
                bio: profile?.bio || "",
                is_mentor: profile?.is_mentor || false,
        });

        const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                onSave(formData);
        };

        return (
                <Card>
                        <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                        <Building className="h-5 w-5" />
                                        Alumni Information
                                </CardTitle>
                                <CardDescription>
                                        Share your professional journey with fellow alumni
                                </CardDescription>
                        </CardHeader>
                        <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                        <Label htmlFor="batch_year">Batch Year</Label>
                                                        <Input
                                                                id="batch_year"
                                                                type="number"
                                                                value={formData.batch_year}
                                                                onChange={(e) => setFormData({ ...formData, batch_year: parseInt(e.target.value) })}
                                                                required
                                                        />
                                                </div>
                                                <div>
                                                        <Label htmlFor="branch">Branch</Label>
                                                        <Input
                                                                id="branch"
                                                                value={formData.branch}
                                                                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                                                placeholder="e.g., Computer Science"
                                                                required
                                                        />
                                                </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                        <Label htmlFor="current_company">Current Company</Label>
                                                        <Input
                                                                id="current_company"
                                                                value={formData.current_company}
                                                                onChange={(e) => setFormData({ ...formData, current_company: e.target.value })}
                                                                placeholder="e.g., Tech Corp"
                                                        />
                                                </div>
                                                <div>
                                                        <Label htmlFor="job_title">Job Title</Label>
                                                        <Input
                                                                id="job_title"
                                                                value={formData.job_title}
                                                                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                                                                placeholder="e.g., Senior Software Engineer"
                                                        />
                                                </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                        <Label htmlFor="location">Location</Label>
                                                        <Input
                                                                id="location"
                                                                value={formData.location}
                                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                                placeholder="e.g., Hyderabad, India"
                                                        />
                                                </div>
                                                <div>
                                                        <Label htmlFor="phone_number">Phone Number</Label>
                                                        <Input
                                                                id="phone_number"
                                                                value={formData.phone_number}
                                                                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                                                placeholder="e.g., +91 9876543210"
                                                        />
                                                </div>
                                        </div>

                                        <div>
                                                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                                <Input
                                                        id="linkedin_url"
                                                        value={formData.linkedin_url}
                                                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                                        placeholder="https://linkedin.com/in/yourprofile"
                                                />
                                        </div>

                                        <div>
                                                <Label htmlFor="bio">Bio</Label>
                                                <Textarea
                                                        id="bio"
                                                        value={formData.bio}
                                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                        placeholder="Tell us about yourself..."
                                                        rows={4}
                                                />
                                        </div>

                                        <div className="flex items-center space-x-2">
                                                <Switch
                                                        id="is_mentor"
                                                        checked={formData.is_mentor}
                                                        onCheckedChange={(checked) => setFormData({ ...formData, is_mentor: checked })}
                                                />
                                                <Label htmlFor="is_mentor">Available as a mentor</Label>
                                        </div>

                                        <Button type="submit" disabled={saving}>
                                                {saving ? "Saving..." : "Save Profile"}
                                        </Button>
                                </form>
                        </CardContent>
                </Card>
        );
};

interface StudentProfileFormProps {
        profile: StudentProfile | null;
        onSave: (data: Partial<StudentProfile>) => void;
        saving: boolean;
}

const StudentProfileForm = ({ profile, onSave, saving }: StudentProfileFormProps) => {
        const [formData, setFormData] = useState({
                roll_number: profile?.roll_number || "",
                branch: profile?.branch || "",
                graduation_year: profile?.graduation_year || new Date().getFullYear() + 4,
                phone_number: profile?.phone_number || "",
                bio: profile?.bio || "",
        });

        const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                onSave(formData);
        };

        return (
                <Card>
                        <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Student Information
                                </CardTitle>
                                <CardDescription>
                                        Your academic information and current status
                                </CardDescription>
                        </CardHeader>
                        <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                        <Label htmlFor="roll_number">Roll Number</Label>
                                                        <Input
                                                                id="roll_number"
                                                                value={formData.roll_number}
                                                                onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
                                                                placeholder="e.g., 2021A7PS1234G"
                                                                required
                                                        />
                                                </div>
                                                <div>
                                                        <Label htmlFor="branch">Branch</Label>
                                                        <Input
                                                                id="branch"
                                                                value={formData.branch}
                                                                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                                                placeholder="e.g., Computer Science"
                                                                required
                                                        />
                                                </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                        <Label htmlFor="graduation_year">Expected Graduation Year</Label>
                                                        <Input
                                                                id="graduation_year"
                                                                type="number"
                                                                value={formData.graduation_year}
                                                                onChange={(e) => setFormData({ ...formData, graduation_year: parseInt(e.target.value) })}
                                                                required
                                                        />
                                                </div>
                                                <div>
                                                        <Label htmlFor="phone_number">Phone Number</Label>
                                                        <Input
                                                                id="phone_number"
                                                                value={formData.phone_number}
                                                                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                                                placeholder="e.g., +91 9876543210"
                                                        />
                                                </div>
                                        </div>

                                        <div>
                                                <Label htmlFor="bio">Bio</Label>
                                                <Textarea
                                                        id="bio"
                                                        value={formData.bio}
                                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                        placeholder="Tell us about yourself, your interests, and goals..."
                                                        rows={4}
                                                />
                                        </div>

                                        <Button type="submit" disabled={saving}>
                                                {saving ? "Saving..." : "Save Profile"}
                                        </Button>
                                </form>
                        </CardContent>
                </Card>
        );
};
