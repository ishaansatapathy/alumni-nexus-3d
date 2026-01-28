import { GlassCard, StatCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { 
  Users, Shield, BarChart3, AlertTriangle, CheckCircle, 
  Clock, ArrowRight, TrendingUp, Eye, Ban
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const pendingVerifications = [
    { id: 1, name: 'John Smith', email: 'john@company.com', graduationYear: 2020, status: 'pending' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@firm.com', graduationYear: 2019, status: 'pending' },
    { id: 3, name: 'Mike Chen', email: 'mike@startup.io', graduationYear: 2021, status: 'pending' },
  ];

  const flaggedContent = [
    { id: 1, type: 'Interview Experience', title: 'Contains inappropriate content', reporter: 'User123', date: '2 hours ago' },
    { id: 2, type: 'Job Posting', title: 'Potential scam listing', reporter: 'User456', date: '5 hours ago' },
  ];

  const recentActivity = [
    { action: 'New user registration', count: 12, period: 'today' },
    { action: 'Alumni verifications', count: 5, period: 'today' },
    { action: 'Job postings', count: 8, period: 'this week' },
    { action: 'Referral requests', count: 24, period: 'this week' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value="2,847" 
          change="+124 this month"
          icon={<Users className="w-5 h-5" />}
          trend="up"
        />
        <StatCard 
          title="Pending Verifications" 
          value={15} 
          change="3 urgent"
          icon={<Shield className="w-5 h-5" />}
          trend="neutral"
        />
        <StatCard 
          title="Flagged Content" 
          value={7} 
          change="2 high priority"
          icon={<AlertTriangle className="w-5 h-5" />}
          trend="down"
        />
        <StatCard 
          title="Platform Engagement" 
          value="89%" 
          change="+5% vs last month"
          icon={<TrendingUp className="w-5 h-5" />}
          trend="up"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Verifications */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Pending Alumni Verifications</h2>
            <Link to="/admin/verify">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {pendingVerifications.map((user) => (
              <div key={user.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">Class of {user.graduationYear}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    <Eye className="w-4 h-4 mr-1" /> Review
                  </Button>
                  <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Flagged Content */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Flagged Content</h2>
            <Link to="/admin/moderation">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {flaggedContent.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.type}</p>
                  <p className="text-sm text-muted-foreground truncate">{item.title}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    <Eye className="w-4 h-4 mr-1" /> View
                  </Button>
                  <Button size="sm" variant="destructive" className="h-8">
                    <Ban className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Activity Overview */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Platform Activity</h2>
          <Link to="/analytics">
            <Button variant="ghost" size="sm">
              Full Analytics <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentActivity.map((activity, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/30 text-center">
              <p className="text-3xl font-bold gradient-text mb-1">{activity.count}</p>
              <p className="text-sm text-muted-foreground">{activity.action}</p>
              <p className="text-xs text-primary mt-1">{activity.period}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/admin/users">
          <GlassCard hover className="p-5 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Manage Users</p>
                <p className="text-sm text-muted-foreground">View and manage all users</p>
              </div>
            </div>
          </GlassCard>
        </Link>
        <Link to="/admin/verify">
          <GlassCard hover className="p-5 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold">Verify Alumni</p>
                <p className="text-sm text-muted-foreground">Process verification requests</p>
              </div>
            </div>
          </GlassCard>
        </Link>
        <Link to="/analytics">
          <GlassCard hover className="p-5 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <p className="font-semibold">View Analytics</p>
                <p className="text-sm text-muted-foreground">Platform statistics</p>
              </div>
            </div>
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
