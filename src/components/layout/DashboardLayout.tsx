import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DashboardScene } from '@/components/3d/DashboardScene';

interface DashboardLayoutProps {
  userRole?: 'student' | 'alumni' | 'admin';
}

export function DashboardLayout({ userRole = 'student' }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <DashboardScene />
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
