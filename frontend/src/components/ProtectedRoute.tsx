import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
        children: React.ReactNode;
        allowedRoles?: string[];
        redirectTo?: string;
}

export const ProtectedRoute = ({
        children,
        allowedRoles = [],
        redirectTo = "/auth"
}: ProtectedRouteProps) => {
        const { user, loading, role } = useAuth();

        if (loading) {
                return (
                        <div className="flex items-center justify-center min-h-screen">
                                <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                );
        }

        if (!user) {
                return <Navigate to={redirectTo} replace />;
        }

        if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
                return <Navigate to="/" replace />;
        }

        return <>{children}</>;
};
