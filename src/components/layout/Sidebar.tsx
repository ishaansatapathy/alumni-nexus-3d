import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  MessageSquare, 
  BarChart3,
  GraduationCap,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Network,
  FileText,
  Award
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: ('student' | 'alumni' | 'admin')[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Opportunities', href: '/opportunities', icon: <Briefcase size={20} /> },
  { label: 'Referrals', href: '/referrals', icon: <Network size={20} /> },
  { label: 'Interview Exp.', href: '/interview-experiences', icon: <FileText size={20} /> },
  { label: 'Mentorship', href: '/opportunities/mentorship', icon: <GraduationCap size={20} /> },
  { label: 'Analytics', href: '/analytics', icon: <BarChart3 size={20} />, roles: ['admin'] },
  { label: 'Verify Alumni', href: '/admin/verify', icon: <Award size={20} />, roles: ['admin'] },
  { label: 'Users', href: '/admin/users', icon: <Users size={20} />, roles: ['admin'] },
];

interface SidebarProps {
  userRole?: 'student' | 'alumni' | 'admin';
}

export function Sidebar({ userRole = 'student' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const filteredItems = navItems.filter(
    item => !item.roles || item.roles.includes(userRole)
  );

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Network size={18} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">AlumniNet</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "sidebar-active text-primary" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <span className={cn(
                "transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
              )}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-sidebar-border">
        <Link
          to="/profile/me"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent transition-colors",
            collapsed && "justify-center"
          )}
        >
          <UserCircle size={20} className="text-muted-foreground" />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          )}
        </Link>
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors mt-1",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
