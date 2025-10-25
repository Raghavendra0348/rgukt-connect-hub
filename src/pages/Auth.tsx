import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

type UserRole = "admin" | "alumni" | "student";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("alumni");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Additional fields for different roles
  const [batchYear, setBatchYear] = useState("");
  const [branch, setBranch] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });

        // Redirect based on role
        const { data: userRole } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .single();

        if (userRole) {
          navigate(`/dashboard/${userRole.role}`);
        } else {
          navigate("/");
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;

        if (data.user) {
          // Create role entry
          const { error: roleError } = await supabase
            .from("user_roles")
            .insert({ user_id: data.user.id, role });

          if (roleError) throw roleError;

          // Create profile based on role
          if (role === "alumni") {
            const { error: profileError } = await supabase
              .from("alumni_profiles")
              .insert({
                user_id: data.user.id,
                batch_year: parseInt(batchYear),
                branch,
              });
            if (profileError) throw profileError;
          } else if (role === "student") {
            const { error: profileError } = await supabase
              .from("student_profiles")
              .insert({
                user_id: data.user.id,
                roll_number: rollNumber,
                branch,
                graduation_year: parseInt(graduationYear),
              });
            if (profileError) throw profileError;
          }

          toast({
            title: "Account created!",
            description: "Welcome to the RGUKT R.K. Valley Alumni Portal.",
          });

          navigate(`/dashboard/${role}`);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-10 w-10 text-primary" />
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold">
            {mode === "login" ? "Welcome Back" : "Join Our Community"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Sign in to access your portal"
              : "Create your account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@rgukt.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="role">I am a</Label>
                  <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alumni">Alumni</SelectItem>
                      <SelectItem value="student">Current Student</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={branch} onValueChange={setBranch}>
                    <SelectTrigger id="branch">
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CSE">Computer Science Engineering</SelectItem>
                      <SelectItem value="ECE">Electronics & Communication</SelectItem>
                      <SelectItem value="EEE">Electrical Engineering</SelectItem>
                      <SelectItem value="MECH">Mechanical Engineering</SelectItem>
                      <SelectItem value="CIVIL">Civil Engineering</SelectItem>
                      <SelectItem value="CHEM">Chemical Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {role === "alumni" && (
                  <div className="space-y-2">
                    <Label htmlFor="batchYear">Batch Year</Label>
                    <Input
                      id="batchYear"
                      type="number"
                      placeholder="2020"
                      value={batchYear}
                      onChange={(e) => setBatchYear(e.target.value)}
                      required
                      min={2000}
                      max={new Date().getFullYear()}
                    />
                  </div>
                )}

                {role === "student" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input
                        id="rollNumber"
                        type="text"
                        placeholder="R200101"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                      <Input
                        id="graduationYear"
                        type="number"
                        placeholder="2025"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        required
                        min={new Date().getFullYear()}
                        max={new Date().getFullYear() + 10}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <Button type="submit" className="w-full" variant="hero" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-primary hover:underline"
              >
                {mode === "login"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
