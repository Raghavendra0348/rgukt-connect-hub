import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
        role: "admin" | "alumni" | "student";
        children: React.ReactNode;
}

export const ResponsiveLayout = ({ role, children }: ResponsiveLayoutProps) => {
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
        const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
        const isMobile = useIsMobile();

        const handleSidebarToggle = () => {
                setSidebarCollapsed(!sidebarCollapsed);
        };

        const handleMobileMenuToggle = () => {
                setMobileMenuOpen(!mobileMenuOpen);
        };

        const handleMobileMenuClose = () => {
                setMobileMenuOpen(false);
        };

        return (
                <div className="min-h-screen bg-background">
                        <Navbar
                                showMobileMenuButton={true}
                                onMobileMenuToggle={handleMobileMenuToggle}
                        />

                        <Sidebar
                                role={role}
                                collapsed={sidebarCollapsed}
                                onToggle={handleSidebarToggle}
                                mobileOpen={mobileMenuOpen}
                                onMobileClose={handleMobileMenuClose}
                        />

                        <main className={cn(
                                "transition-all duration-300 pt-16",
                                isMobile ? "ml-0" : (sidebarCollapsed ? "ml-16" : "ml-64")
                        )}>
                                <div className="p-4 md:p-6">
                                        {children}
                                </div>
                        </main>
                </div>
        );
};
