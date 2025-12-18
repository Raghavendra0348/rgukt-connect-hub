import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Users, Briefcase, Calendar, Heart, GraduationCap, Network } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const isMobile = useIsMobile();
  const features = [
    {
      icon: Users,
      title: "Alumni Network",
      description: "Connect with thousands of successful graduates across the globe.",
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Access exclusive job postings and internship opportunities.",
    },
    {
      icon: Network,
      title: "Mentorship",
      description: "Get guidance from experienced alumni in your field of interest.",
    },
    {
      icon: Calendar,
      title: "Events & Reunions",
      description: "Stay updated on upcoming events, workshops, and batch reunions.",
    },
    {
      icon: Heart,
      title: "Give Back",
      description: "Contribute to university development and support current students.",
    },
    {
      icon: GraduationCap,
      title: "Lifelong Learning",
      description: "Access resources, webinars, and continuous learning opportunities.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 pb-16 md:pb-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Welcome to RGUKT <span className="text-primary">Connect Hub</span>
              {!isMobile && <br />}
              <span className={isMobile ? " " : ""}>Alumni Portal</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Connecting generations of excellence. Build your network, advance your career,
              and give back to the institution that shaped your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link to="/auth?mode=signup">
                <Button size={isMobile ? "default" : "lg"} className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8">
                  Join the Network
                </Button>
              </Link>
              <Link to="/auth">
                <Button size={isMobile ? "default" : "lg"} variant="outline" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Link to="/events">
                <Button size="lg" variant="ghost" className="text-lg px-8">
                  View Events
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="ghost" className="text-lg px-8">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Stay Connected</h2>
            <p className="text-xl text-muted-foreground">
              A comprehensive platform designed for alumni, students, and administration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors hover:shadow-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Alumni Worldwide</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Companies Connected</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
              <div className="text-muted-foreground">Job Opportunities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Annual Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Reconnect?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of alumni who are already benefiting from our vibrant community.
            Your journey continues here.
          </p>
          <Link to="/auth?mode=signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Your Account Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-semibold">RGUKT R.K. Valley AMP</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 RGUKT R.K. Valley. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
