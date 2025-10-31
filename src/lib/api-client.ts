// Custom API client to replace Supabase
interface User {
  id: string;
  email: string;
  full_name: string;
  status: string;
  email_verified: boolean;
  role?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    this.token = localStorage.getItem('auth_token');
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  auth = {
    signUp: async (credentials: { email: string; password: string; fullName: string; role?: string }): Promise<AuthResponse> => {
      const response = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
      
      return response;
    },

    signInWithPassword: async (credentials: { email: string; password: string }): Promise<{ data: AuthResponse; error: null }> => {
      try {
        const response = await this.request('/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
        
        this.token = response.token;
        localStorage.setItem('auth_token', response.token);
        
        return { data: response, error: null };
      } catch (error) {
        return { data: null as any, error: error as any };
      }
    },

    getUser: async (): Promise<{ data: { user: User | null }; error: any }> => {
      try {
        if (!this.token) {
          return { data: { user: null }, error: null };
        }

        const response = await this.request('/auth/me');
        return { data: { user: response.user }, error: null };
      } catch (error) {
        return { data: { user: null }, error };
      }
    },

    getSession: async (): Promise<{ data: { session: { user: User } | null }; error: any }> => {
      try {
        if (!this.token) {
          return { data: { session: null }, error: null };
        }

        const response = await this.request('/auth/me');
        return { data: { session: { user: response.user } }, error: null };
      } catch (error) {
        return { data: { session: null }, error };
      }
    },

    signOut: async (): Promise<void> => {
      this.token = null;
      localStorage.removeItem('auth_token');
      await this.request('/auth/logout', { method: 'POST' }).catch(() => {});
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Simple implementation - in a real app you might want WebSocket or polling
      const checkAuth = async () => {
        const { data } = await this.auth.getSession();
        callback('SIGNED_IN', data.session);
      };

      if (this.token) {
        checkAuth();
      }

      return {
        data: {
          subscription: {
            unsubscribe: () => {
              // Cleanup if needed
            }
          }
        }
      };
    }
  };

  // Database-like methods
  from(table: string) {
    return {
      select: (columns: string = '*') => ({
        eq: (column: string, value: any) => ({
          single: async () => {
            // For now, return mock data based on table
            if (table === 'user_roles') {
              return { data: { role: 'admin' }, error: null };
            }
            if (table === 'alumni_profiles') {
              return { 
                data: {
                  id: '1',
                  full_name: 'Mock User',
                  email: 'mock@example.com',
                  batch_year: 2020,
                  branch: 'CSE'
                }, 
                error: null 
              };
            }
            return { data: null, error: null };
          }
        })
      })
    };
  }
}

// Create and export the client instance
const apiClient = new ApiClient();
export { apiClient as supabase };
