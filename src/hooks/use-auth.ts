import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthState {
        user: User | null;
        loading: boolean;
        role: string | null;
}

export const useAuth = () => {
        const [authState, setAuthState] = useState<AuthState>({
                user: null,
                loading: true,
                role: null,
        });

        useEffect(() => {
                // Get initial session
                supabase.auth.getSession().then(({ data: { session } }) => {
                        if (session?.user) {
                                getUserRole(session.user.id).then((role) => {
                                        setAuthState({
                                                user: session.user,
                                                loading: false,
                                                role,
                                        });
                                });
                        } else {
                                setAuthState({
                                        user: null,
                                        loading: false,
                                        role: null,
                                });
                        }
                });

                // Listen for auth changes
                const { data: { subscription } } = supabase.auth.onAuthStateChange(
                        async (event, session) => {
                                if (session?.user) {
                                        const role = await getUserRole(session.user.id);
                                        setAuthState({
                                                user: session.user,
                                                loading: false,
                                                role,
                                        });
                                } else {
                                        setAuthState({
                                                user: null,
                                                loading: false,
                                                role: null,
                                        });
                                }
                        }
                );

                return () => subscription.unsubscribe();
        }, []);

        const getUserRole = async (userId: string): Promise<string | null> => {
                try {
                        const { data, error } = await supabase
                                .from("user_roles")
                                .select("role")
                                .eq("user_id", userId)
                                .single();

                        if (error) {
                                console.error("Error fetching user role:", error);
                                return null;
                        }

                        return data?.role || null;
                } catch (error) {
                        console.error("Error fetching user role:", error);
                        return null;
                }
        };

        return authState;
};
