# RGUKT R.K. Valley Alumni Management Portal

A comprehensive alumni management system built with modern web technologies, connecting generations of RGUKT R.K. Valley graduates.

## ✨ Features

🎓 **Multi-Role Authentication**
- Admin, Alumni, and Student dashboards
- Role-based access control
- Secure Supabase authentication

🌐 **Alumni Network**
- Connect with graduates worldwide
- Professional networking capabilities
- Mentorship programs

💼 **Career Services**
- Job opportunity listings
- Internship postings
- Career guidance and resources

📅 **Event Management**
- University events and reunions
- Workshop announcements
- Alumni gatherings

👤 **Profile Management**
- Comprehensive profile system
- Professional information sharing
- Mentor availability settings

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## 📋 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/bun
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rgukt-connect-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   ```

4. **Database Setup**
   Run the migrations in your Supabase SQL editor:
   - Execute the files in `supabase/migrations/` in order

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:5173` to see the application.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx      # Navigation component
│   ├── ProtectedRoute.tsx
│   └── DashboardLayout.tsx
├── hooks/              # Custom React hooks
│   ├── use-auth.ts     # Authentication hook
│   └── use-toast.ts    # Toast notifications
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
├── lib/                # Utility functions
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Auth.tsx        # Authentication
│   ├── AdminDashboard.tsx
│   ├── AlumniDashboard.tsx
│   ├── StudentDashboard.tsx
│   ├── Profile.tsx     # Profile management
│   ├── EventsDemo.tsx  # Events listing
│   └── JobsDemo.tsx    # Job opportunities
└── assets/             # Static assets
```

## 🗄️ Database Schema

The application uses the following main tables:

- **user_roles**: Role assignments (admin/alumni/student)
- **alumni_profiles**: Alumni-specific information
- **student_profiles**: Current student information
- **events**: University events and reunions
- **event_registrations**: Event participation tracking
- **job_postings**: Career opportunities
- **job_applications**: Job application tracking
- **mentorship_requests**: Mentorship connections

## 🎯 Available Routes

- `/` - Landing page
- `/auth` - Authentication (login/signup)
- `/dashboard/admin` - Admin dashboard
- `/dashboard/alumni` - Alumni dashboard
- `/dashboard/student` - Student dashboard
- `/profile` - Profile management
- `/events` - Events listing
- `/jobs` - Job opportunities

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling
- Prettier for code formatting

## 📦 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🔐 Authentication & Authorization

The app implements role-based access control:

- **Admin**: Full system access, user management
- **Alumni**: Profile management, job posting, event creation
- **Student**: Profile management, job applications, event registration

## 🎨 UI Components

Built with shadcn/ui components:
- Modern, accessible design system
- Dark/light mode support
- Responsive layouts
- Consistent styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@rguktrkvalley.edu or create an issue in this repository.

## 🙏 Acknowledgments

- RGUKT R.K. Valley for inspiration and requirements
- The open-source community for amazing tools and libraries
- All contributors who help improve this project

---

Made with ❤️ for RGUKT R.K. Valley Alumni Community

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ad4cf75e-7c40-4bc2-b464-528f23bbe159) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ad4cf75e-7c40-4bc2-b464-528f23bbe159) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
