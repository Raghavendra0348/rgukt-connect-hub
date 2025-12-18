import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import AlumniDashboard from "./pages/AlumniDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import EventsDemo from "./pages/EventsDemo";
import JobsDemo from "./pages/JobsDemo";
import Profile from "./pages/Profile";
import FindAlumni from "./pages/FindAlumni";
import StudentResources from "./pages/StudentResources";
import StudentMentorship from "./pages/StudentMentorship";
import StudentAchievements from "./pages/StudentAchievements";
import StudentSettings from "./pages/StudentSettings";
import StudentCompanies from "./pages/StudentCompanies";
import AlumniNetwork from "./pages/AlumniNetwork";
import AlumniMentorship from "./pages/AlumniMentorship";
import AlumniPostJob from "./pages/AlumniPostJob";
import AlumniCreateEvent from "./pages/AlumniCreateEvent";
import AlumniDonations from "./pages/AlumniDonations";
import AlumniActivity from "./pages/AlumniActivity";
import AdminUsers from "./pages/AdminUsers";
import AdminApproveAlumni from "./pages/AdminApproveAlumni";
import AdminJobs from "./pages/AdminJobs";
import AdminEvents from "./pages/AdminEvents";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminReports from "./pages/AdminReports";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminExport from "./pages/AdminExport";
import AdminSettings from "./pages/AdminSettings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/alumni"
            element={
              <ProtectedRoute allowedRoles={["alumni"]}>
                <AlumniDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/events" element={<EventsDemo />} />
          <Route path="/jobs" element={<JobsDemo />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/find-alumni"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <FindAlumni />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/resources"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentResources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/mentorship"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentMentorship />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/achievements"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentAchievements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/settings"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/companies"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentCompanies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/network"
            element={
              <ProtectedRoute allowedRoles={["alumni"]}>
                <AlumniNetwork />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/mentorship"
            element={
              <ProtectedRoute allowedRoles={["alumni"]}>
                <AlumniMentorship />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/post-job"
            element={
              <ProtectedRoute allowedRoles={["alumni"]}>
                <AlumniPostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/create-event"
            element={
              <ProtectedRoute allowedRoles={["alumni"]}>
                <AlumniCreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/donations"
            element={
              <ProtectedRoute allowedRoles={["alumni"]}>
                <AlumniDonations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/activity"
            element={
              <ProtectedRoute allowedRoles={["alumni"]}>
                <AlumniActivity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/approve-alumni"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminApproveAlumni />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminAnnouncements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/export"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminExport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
