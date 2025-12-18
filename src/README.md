# 📱 RGUKT Alumni Portal - Frontend

## Overview
React + TypeScript + Vite single-page application for the RGUKT Alumni Portal.

## Technology Stack
- **Framework:** React 18
- **Language:** TypeScript 5
- **Build Tool:** Vite 5
- **Styling:** TailwindCSS 3
- **UI Components:** shadcn/ui
- **Routing:** React Router DOM 6
- **Icons:** Lucide React

## Directory Structure

```
src/
├── main.tsx                 # React entry point
├── App.tsx                  # Main App with routing
├── App.css                  # App-specific styles
├── index.css                # Global styles + Tailwind imports
├── vite-env.d.ts           # Vite type declarations
│
├── 📂 pages/                # Route components
│   ├── Index.tsx            # Landing page (/)
│   ├── Auth.tsx             # Login/Register (/auth)
│   ├── Profile.tsx          # Profile management (/profile)
│   ├── AlumniDashboard.tsx  # Alumni home (/alumni-dashboard)
│   ├── StudentDashboard.tsx # Student home (/student-dashboard)
│   ├── AdminDashboard.tsx   # Admin home (/admin-dashboard)
│   ├── Events.tsx           # Events listing (/events)
│   ├── Jobs.tsx             # Jobs listing (/jobs)
│   ├── FindAlumni.tsx       # Alumni search (/find-alumni)
│   └── ...                  # Other pages
│
├── 📂 components/           # Reusable components
│   ├── Navbar.tsx           # Top navigation
│   ├── Sidebar.tsx          # Side navigation
│   ├── DashboardLayout.tsx  # Dashboard wrapper
│   ├── ProtectedRoute.tsx   # Authentication guard
│   ├── ResponsiveLayout.tsx # Mobile-responsive wrapper
│   ├── ProfileForm.tsx      # Profile editing form
│   │
│   └── 📂 ui/               # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── textarea.tsx
│       ├── switch.tsx
│       ├── toast.tsx
│       └── ...
│
├── 📂 hooks/                # Custom React hooks
│   ├── use-auth.ts          # Authentication state & methods
│   ├── use-toast.ts         # Toast notifications
│   └── use-mobile.tsx       # Mobile device detection
│
├── 📂 lib/                  # Utility libraries
│   ├── api-client.ts        # API client (main backend connection)
│   ├── auth.ts              # Auth helper functions
│   ├── database.ts          # Database utilities
│   └── utils.ts             # Common utilities (cn, etc.)
│
└── 📂 assets/               # Static assets
    └── hero-bg.jpg          # Hero section background
```

## Key Files

### `src/lib/api-client.ts`
Custom API client that handles all backend communication.

```typescript
// Exported as both 'supabase' (for compatibility) and 'apiClient'
export { apiClient as supabase };
export { apiClient };

// Key methods:
apiClient.auth.signUp(credentials)           // Register
apiClient.auth.signInWithPassword(credentials) // Login
apiClient.auth.getUser()                     // Get current user
apiClient.auth.signOut()                     // Logout

apiClient.profiles.getAlumniProfile(userId)   // Get alumni profile
apiClient.profiles.updateAlumniProfile(userId, data)
apiClient.profiles.getStudentProfile(userId)
apiClient.profiles.updateStudentProfile(userId, data)

// Supabase-compatible interface
apiClient.from('table').select().eq().single()
apiClient.from('table').insert(data)
apiClient.from('table').update(data).eq()
```

### `src/hooks/use-auth.ts`
Authentication context provider and hook.

```typescript
const { user, role, loading, signIn, signUp, signOut } = useAuth();

// user: Current user object or null
// role: 'admin' | 'alumni' | 'student' | null
// loading: boolean
// signIn: (email, password) => Promise
// signUp: (email, password, fullName, role) => Promise
// signOut: () => Promise
```

### `src/pages/Auth.tsx`
Login and registration page with role selection.

### `src/pages/Profile.tsx`
Profile management with forms for:
- Alumni: batch year, branch, company, job title, skills, mentor status
- Students: roll number, branch, year, CGPA, skills

## Routing

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/` | Index | Public | Landing page |
| `/auth` | Auth | Public | Login/Register |
| `/profile` | Profile | Auth | Profile management |
| `/alumni-dashboard` | AlumniDashboard | Alumni | Alumni home |
| `/student-dashboard` | StudentDashboard | Student | Student home |
| `/admin-dashboard` | AdminDashboard | Admin | Admin home |
| `/events` | Events | Auth | Events listing |
| `/jobs` | Jobs | Auth | Jobs listing |
| `/find-alumni` | FindAlumni | Auth | Alumni search |

## Styling

### TailwindCSS
Configuration in `tailwind.config.ts`:
- Custom colors
- Dark mode support
- shadcn/ui integration

### shadcn/ui
Pre-built components configured in `components.json`:
- Button, Card, Input, Label
- Toast notifications
- Switch, Tabs, Dialog
- And more...

## Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:3001/api
```

Access in code:
```typescript
const API_URL = import.meta.env.VITE_API_URL;
```

## Development

### Start Development Server
```bash
npm run dev
# Runs at http://localhost:5173 (or 8080)
```

### Build for Production
```bash
npm run build
# Output in dist/
```

### Preview Production Build
```bash
npm run preview
# Runs at http://localhost:4173
```

### Lint Code
```bash
npm run lint
```

## Component Examples

### Using Authentication
```tsx
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, role, signOut } = useAuth();
  
  if (!user) return <Navigate to="/auth" />;
  
  return (
    <div>
      <p>Welcome, {user.full_name}</p>
      <p>Role: {role}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

### Making API Calls
```tsx
import { apiClient } from '@/lib/api-client';

async function fetchProfile(userId: string) {
  const { data, error } = await apiClient.profiles.getAlumniProfile(userId);
  if (error) {
    console.error('Error:', error);
    return null;
  }
  return data;
}
```

### Using UI Components
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function MyForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter email" />
        <Button type="submit">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Build Output

Production build creates:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
```

Deploy `dist/` folder to any static hosting (Vercel, Netlify, etc.)
