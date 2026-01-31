import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DashboardBackground3D } from '@/components/3d/DashboardBackground3D';
import { AnimatedGradient } from '@/components/3d/AnimatedGradient';

interface DashboardLayoutProps {
  userRole?: 'student' | 'alumni' | 'admin';
}

export function DashboardLayout({ userRole = 'student' }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardBackground3D />
      <AnimatedGradient />
      <Sidebar userRole={userRole} />
      <main className="pl-64 min-h-screen">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
