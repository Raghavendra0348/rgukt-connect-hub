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
      await this.request('/auth/logout', { method: 'POST' }).catch(() => { });
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

  // Profile methods
  profiles = {
    getAlumniProfile: async (userId: string) => {
      try {
        const response = await this.request(`/profiles/alumni/${userId}`);
        return { data: response, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    updateAlumniProfile: async (userId: string, profileData: any) => {
      try {
        const response = await this.request(`/profiles/alumni/${userId}`, {
          method: 'PUT',
          body: JSON.stringify(profileData),
        });
        return { data: response, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    createAlumniProfile: async (profileData: any) => {
      try {
        const response = await this.request('/profiles/alumni', {
          method: 'POST',
          body: JSON.stringify(profileData),
        });
        return { data: response, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    getStudentProfile: async (userId: string) => {
      try {
        const response = await this.request(`/profiles/student/${userId}`);
        return { data: response, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    updateStudentProfile: async (userId: string, profileData: any) => {
      try {
        const response = await this.request(`/profiles/student/${userId}`, {
          method: 'PUT',
          body: JSON.stringify(profileData),
        });
        return { data: response, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    createStudentProfile: async (profileData: any) => {
      try {
        const response = await this.request('/profiles/student', {
          method: 'POST',
          body: JSON.stringify(profileData),
        });
        return { data: response, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },
  };

  // Database-like methods (for backward compatibility with Supabase-style code)
  from(table: string) {
    const self = this;

    // Helper to execute update request
    const executeUpdate = async (data: any, column: string, value: any): Promise<{ data: any; error: any }> => {
      try {
        if (table === 'alumni_profiles' && column === 'user_id') {
          const response = await self.request(`/profiles/alumni/${value}`, {
            method: 'PUT',
            body: JSON.stringify(data),
          });
          return { data: response, error: null };
        }
        if (table === 'student_profiles' && column === 'user_id') {
          const response = await self.request(`/profiles/student/${value}`, {
            method: 'PUT',
            body: JSON.stringify(data),
          });
          return { data: response, error: null };
        }
        return { data: null, error: { message: 'Unknown table' } };
      } catch (error) {
        return { data: null, error };
      }
    };

    // Helper to execute insert request
    const executeInsert = async (data: any): Promise<{ data: any; error: any }> => {
      try {
        if (table === 'alumni_profiles') {
          const response = await self.request('/profiles/alumni', {
            method: 'POST',
            body: JSON.stringify(data),
          });
          return { data: response, error: null };
        }
        if (table === 'student_profiles') {
          const response = await self.request('/profiles/student', {
            method: 'POST',
            body: JSON.stringify(data),
          });
          return { data: response, error: null };
        }
        return { data: null, error: { message: 'Unknown table' } };
      } catch (error) {
        return { data: null, error };
      }
    };

    // Helper to create a promise-like object with chainable methods
    const createPromiseWithMethods = <T>(
      promiseGetter: () => Promise<T>,
      methods: Record<string, (...args: any[]) => any>
    ): Promise<T> & typeof methods => {
      const promise = promiseGetter();
      return Object.assign(promise, methods);
    };

    return {
      select: (columns: string = '*') => ({
        eq: (column: string, value: any) => ({
          single: async (): Promise<{ data: any; error: any }> => {
            try {
              if (table === 'user_roles') {
                const response = await self.request(`/user-roles/${value}`);
                return { data: response, error: null };
              }
              if (table === 'alumni_profiles' && column === 'user_id') {
                const response = await self.request(`/profiles/alumni/${value}`);
                return { data: response, error: null };
              }
              if (table === 'student_profiles' && column === 'user_id') {
                const response = await self.request(`/profiles/student/${value}`);
                return { data: response, error: null };
              }
              return { data: null, error: null };
            } catch (error: any) {
              // Return null data for "not found" errors (like PGRST116)
              if (error.message?.includes('404') || error.message?.includes('not found')) {
                return { data: null, error: { code: 'PGRST116', message: 'Not found' } };
              }
              return { data: null, error };
            }
          }
        })
      }),
      insert: (data: any): Promise<{ data: any; error: any }> & { select: () => { single: () => Promise<{ data: any; error: any }> } } => {
        const promise = executeInsert(data);
        return Object.assign(promise, {
          select: () => ({
            single: () => executeInsert(data)
          })
        });
      },
      update: (data: any) => ({
        eq: (column: string, value: any): Promise<{ data: any; error: any }> & { select: () => { single: () => Promise<{ data: any; error: any }> } } => {
          const promise = executeUpdate(data, column, value);
          return Object.assign(promise, {
            select: () => ({
              single: () => executeUpdate(data, column, value)
            })
          });
        }
      })
    };
  }
}

// Create and export the client instance
const apiClient = new ApiClient();
export { apiClient as supabase };
export { apiClient }; // Also export as apiClient for new code
