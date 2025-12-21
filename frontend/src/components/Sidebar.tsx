import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
        Users,
        UserCheck,
        Briefcase,
        Calendar,
        Settings,
        BarChart3,
        FileText,
        Shield,
        Database,
        Bell,
        Home,
        User,
        Heart,
        BookOpen,
        MessageCircle,
        Award,
        Building,
        MapPin,
        Phone,
        Mail,
        ChevronLeft,
        ChevronRight,
        X
} from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

interface SidebarProps {
        role: "admin" | "alumni" | "student";
        collapsed: boolean;
        onToggle: () => void;
        mobileOpen?: boolean;
        onMobileClose?: () => void;
}

export const Sidebar = ({ role, collapsed, onToggle, mobileOpen = false, onMobileClose }: SidebarProps) => {
        const location = useLocation();
        const isMobile = useIsMobile();

        const adminMenuItems = [
                { icon: Home, label: "Dashboard", href: "/dashboard/admin" },
                { icon: Users, label: "User Management", href: "/admin/users" },
                { icon: UserCheck, label: "Approve Alumni", href: "/admin/approve-alumni" },
                { icon: Briefcase, label: "Job Management", href: "/admin/jobs" },
                { icon: Calendar, label: "Event Management", href: "/admin/events" },
                { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
                { icon: FileText, label: "Reports", href: "/admin/reports" },
                { icon: Bell, label: "Announcements", href: "/admin/announcements" },
                { icon: Database, label: "Data Export", href: "/admin/export" },
                { icon: Settings, label: "System Settings", href: "/admin/settings" },
        ];

        const alumniMenuItems = [
                { icon: Home, label: "Dashboard", href: "/dashboard/alumni" },
                { icon: User, label: "Profile", href: "/profile" },
                { icon: Users, label: "Alumni Network", href: "/alumni/network" },
                { icon: MessageCircle, label: "Mentorship", href: "/alumni/mentorship" },
                { icon: Briefcase, label: "Job Board", href: "/alumni/jobs" },
                { icon: Building, label: "Post Job", href: "/alumni/post-job" },
                { icon: Calendar, label: "Events", href: "/events" },
                { icon: Award, label: "Create Event", href: "/alumni/create-event" },
                { icon: Heart, label: "Donations", href: "/alumni/donations" },
                { icon: BarChart3, label: "My Activity", href: "/alumni/activity" },
        ];

        const studentMenuItems = [
                { icon: Home, label: "Dashboard", href: "/dashboard/student" },
                { icon: User, label: "Profile", href: "/profile" },
                { icon: Briefcase, label: "Job Opportunities", href: "/student/jobs" },
                { icon: Users, label: "Find Alumni", href: "/student/find-alumni" },
                { icon: MessageCircle, label: "Mentorship", href: "/student/mentorship" },
                { icon: Calendar, label: "Events", href: "/events" },
                { icon: BookOpen, label: "Resources", href: "/student/resources" },
                { icon: Award, label: "Achievements", href: "/student/achievements" },
                { icon: Building, label: "Companies", href: "/student/companies" },
                { icon: Settings, label: "Settings", href: "/student/settings" },
        ];

        const getMenuItems = () => {
                switch (role) {
                        case "admin":
                                return adminMenuItems;
                        case "alumni":
                                return alumniMenuItems;
                        case "student":
                                return studentMenuItems;
                        default:
                                return [];
                }
        };

        const menuItems = getMenuItems();

        const SidebarContent = ({ isMobileSheet = false }: { isMobileSheet?: boolean }) => (
                <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between p-4">
                                {(!collapsed || isMobileSheet) && (
                                        <h2 className="text-lg font-semibold capitalize">{role} Portal</h2>
                                )}
                                {!isMobileSheet && (
                                        <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={onToggle}
                                                className="ml-auto"
                                        >
                                                {collapsed ? (
                                                        <ChevronRight className="h-4 w-4" />
                                                ) : (
                                                        <ChevronLeft className="h-4 w-4" />
                                                )}
                                        </Button>
                                )}
                                {isMobileSheet && onMobileClose && (
                                        <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={onMobileClose}
                                                className="ml-auto"
                                        >
                                                <X className="h-4 w-4" />
                                        </Button>
                                )}
                        </div>

                        <Separator />

                        <ScrollArea className="flex-1 py-4">
                                <nav className="space-y-1 px-2">
                                        {menuItems.map((item, index) => (
                                                <Link
                                                        key={index}
                                                        to={item.href}
                                                        onClick={isMobileSheet ? onMobileClose : undefined}
                                                        className={cn(
                                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                                                location.pathname === item.href
                                                                        ? "bg-accent text-accent-foreground"
                                                                        : "text-muted-foreground",
                                                                !isMobileSheet && collapsed && "justify-center"
                                                        )}
                                                >
                                                        <item.icon className="h-4 w-4" />
                                                        {(!collapsed || isMobileSheet) && <span>{item.label}</span>}
                                                </Link>
                                        ))}
                                </nav>
                        </ScrollArea>
                </div>
        );

        if (isMobile) {
                return (
                        <Sheet open={mobileOpen} onOpenChange={onMobileClose}>
                                <SheetContent side="left" className="p-0 w-64">
                                        <SidebarContent isMobileSheet={true} />
                                </SheetContent>
                        </Sheet>
                );
        }

        return (
                <div
                        className={cn(
                                "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300",
                                collapsed ? "w-16" : "w-64"
                        )}
                >
                        <SidebarContent />
                </div>
        );
};
