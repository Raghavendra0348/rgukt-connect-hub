import { GraduationCap, LogOut, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface NavbarProps {
  onMobileMenuToggle?: () => void;
  showMobileMenuButton?: boolean;
}

export const Navbar = ({ onMobileMenuToggle, showMobileMenuButton = false }: NavbarProps) => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  const getDashboardLink = () => {
    if (role === "admin") return "/dashboard/admin";
    if (role === "alumni") return "/dashboard/alumni";
    if (role === "student") return "/dashboard/student";
    return "/";
  };

  const MenuItems = () => (
    <>
      <DropdownMenuItem asChild>
        <Link to={getDashboardLink()}>
          Dashboard
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/profile">
          Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/events">
          Events
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/jobs">
          Jobs
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSignOut}>
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </DropdownMenuItem>
    </>
  );

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showMobileMenuButton && isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileMenuToggle}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
           <img
  src="/rgukt.jpg"
  alt="RGUKT Logo"
  className="h-6 w-6 md:h-8 md:w-8 object-contain"
/>

            <span className="text-lg md:text-xl font-bold hidden sm:block">
              RGUKT Connect Hub
            </span>
            <span className="text-lg font-bold sm:hidden">
              RGUKT
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {!isMobile && <span className="max-w-[150px] truncate">{user.email}</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-medium">{user.email}</div>
                <DropdownMenuSeparator />
                <MenuItems />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size={isMobile ? "sm" : "default"}>
                  {isMobile ? "Sign In" : "Sign In"}
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button size={isMobile ? "sm" : "default"}>
                  {isMobile ? "Join" : "Get Started"}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
