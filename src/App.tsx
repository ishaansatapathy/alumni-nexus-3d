import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import AlumniDashboard from "./pages/dashboard/AlumniDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import InterviewExperiencesPage from "./pages/InterviewExperiencesPage";
import ReferralsPage from "./pages/ReferralsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProfilePage from "./pages/ProfilePage";
import MentorshipPage from "./pages/MentorshipPage";
import ConnectPage from "./pages/ConnectPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          
          {/* Student Dashboard routes */}
          <Route element={<DashboardLayout userRole="student" />}>
            <Route path="/dashboard/student" element={<StudentDashboard />} />
          </Route>

          {/* Alumni Dashboard routes */}
          <Route element={<DashboardLayout userRole="alumni" />}>
            <Route path="/dashboard/alumni" element={<AlumniDashboard />} />
          </Route>

          {/* Admin Dashboard routes */}
          <Route element={<DashboardLayout userRole="admin" />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/verify" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminDashboard />} />
          </Route>

          {/* Common authenticated routes - using student layout as default */}
          <Route element={<DashboardLayout userRole="student" />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/opportunities/mentorship" element={<OpportunitiesPage />} />
            <Route path="/opportunities/jobs" element={<OpportunitiesPage />} />
            <Route path="/opportunities/internships" element={<OpportunitiesPage />} />
            <Route path="/mentorship" element={<MentorshipPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/referrals" element={<ReferralsPage />} />
            <Route path="/interview-experiences" element={<InterviewExperiencesPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
