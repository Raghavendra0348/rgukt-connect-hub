# 📱 RGUKT Alumni Portal - Frontend

## Overview
React + TypeScript + Vite single-page application for the RGUKT Alumni Portal.

## Technology Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI Framework |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Vite** | 5.x | Build tool & dev server |
| **TailwindCSS** | 3.x | CSS framework |
| **shadcn/ui** | Latest | UI components |
| **React Router** | 6.x | Client-side routing |
| **Lucide React** | Latest | Icons |

## Directory Structure

```
src/
├── main.tsx                 # React entry point
├── App.tsx                  # Main App with routing
├── App.css                  # App-specific styles
├── index.css                # Global styles + Tailwind
│
├── 📂 pages/                # Route components
│   ├── Index.tsx            # Landing page (/)
│   ├── Auth.tsx             # Login/Register (/auth)
│   ├── Profile.tsx          # Profile management (/profile)
│   ├── AlumniDashboard.tsx  # Alumni home
│   ├── StudentDashboard.tsx # Student home
│   ├── AdminDashboard.tsx   # Admin home
│   ├── Events.tsx           # Events listing
│   ├── Jobs.tsx             # Jobs listing
│   └── FindAlumni.tsx       # Alumni search
│
├── 📂 components/           # Reusable components
│   ├── Navbar.tsx           # Top navigation
│   ├── Sidebar.tsx          # Side navigation
│   ├── DashboardLayout.tsx  # Dashboard wrapper
│   ├── ProtectedRoute.tsx   # Auth guard
│   ├── ResponsiveLayout.tsx # Responsive wrapper
│   └── 📂 ui/               # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
│
├── 📂 hooks/                # Custom React hooks
│   ├── use-auth.ts          # Authentication hook
│   ├── use-toast.ts         # Toast notifications
│   └── use-mobile.tsx       # Mobile detection
│
├── 📂 lib/                  # Utility libraries
│   ├── api-client.ts        # API client ⭐
│   ├── auth.ts              # Auth utilities
│   └── utils.ts             # Common utilities
│
└── 📂 assets/               # Static assets
    └── hero-bg.jpg
```

## Key Files

### `src/lib/api-client.ts`
Custom API client for backend communication:
```typescript
import { apiClient } from '@/lib/api-client';

// Authentication
await apiClient.auth.signUp({ email, password, fullName, role });
await apiClient.auth.signInWithPassword({ email, password });
await apiClient.auth.getUser();
await apiClient.auth.signOut();

// Profiles
await apiClient.profiles.getAlumniProfile(userId);
await apiClient.profiles.updateAlumniProfile(userId, data);
await apiClient.profiles.getStudentProfile(userId);
await apiClient.profiles.updateStudentProfile(userId, data);
```

### `src/hooks/use-auth.ts`
Authentication hook:
```typescript
const { user, role, loading, signIn, signUp, signOut } = useAuth();
```

## Routing

| Path | Component | Access |
|------|-----------|--------|
| `/` | Index | Public |
| `/auth` | Auth | Public |
| `/profile` | Profile | Auth |
| `/alumni-dashboard` | AlumniDashboard | Alumni |
| `/student-dashboard` | StudentDashboard | Student |
| `/admin-dashboard` | AdminDashboard | Admin |
| `/events` | Events | Auth |
| `/jobs` | Jobs | Auth |

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build configuration |
| `tailwind.config.ts` | TailwindCSS configuration |
| `tsconfig.json` | TypeScript configuration |
| `components.json` | shadcn/ui configuration |
| `postcss.config.js` | PostCSS configuration |

## Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:3001/api
```

## Development Commands

```bash
# Start development server
npm run dev
# Runs at http://localhost:5173 (or 8080)

# Build for production
npm run build
# Output in dist/

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Component Usage Examples

### Authentication
```tsx
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, role, signOut } = useAuth();
  
  return (
    <div>
      <p>Welcome, {user?.full_name}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

### UI Components
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

function MyForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Input type="email" placeholder="Email" />
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

Deploy `dist/` folder to Vercel, Netlify, or any static hosting.
