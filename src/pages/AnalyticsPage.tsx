import { GlassCard, StatCard } from '@/components/ui/GlassCard';
import { 
  BarChart3, TrendingUp, Users, Briefcase, GraduationCap, 
  ArrowUp, ArrowDown, Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const userGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1450 },
    { month: 'Mar', users: 1680 },
    { month: 'Apr', users: 1890 },
    { month: 'May', users: 2100 },
    { month: 'Jun', users: 2450 },
    { month: 'Jul', users: 2847 },
  ];

  const engagementData = [
    { name: 'Job Views', value: 45 },
    { name: 'Mentorship', value: 25 },
    { name: 'Referrals', value: 20 },
    { name: 'Interviews', value: 10 },
  ];

  const weeklyActivityData = [
    { day: 'Mon', logins: 420, actions: 180 },
    { day: 'Tue', logins: 380, actions: 200 },
    { day: 'Wed', logins: 510, actions: 250 },
    { day: 'Thu', logins: 450, actions: 220 },
    { day: 'Fri', logins: 390, actions: 190 },
    { day: 'Sat', logins: 210, actions: 80 },
    { day: 'Sun', logins: 180, actions: 60 },
  ];

  const COLORS = ['#00d4ff', '#8b5cf6', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Platform performance and engagement metrics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value="2,847" 
          change="+12.5%"
          icon={<Users className="w-5 h-5" />}
          trend="up"
        />
        <StatCard 
          title="Active Jobs" 
          value="156" 
          change="+8.2%"
          icon={<Briefcase className="w-5 h-5" />}
          trend="up"
        />
        <StatCard 
          title="Mentorships" 
          value="89" 
          change="+15.3%"
          icon={<GraduationCap className="w-5 h-5" />}
          trend="up"
        />
        <StatCard 
          title="Referrals Made" 
          value="234" 
          change="+22.1%"
          icon={<TrendingUp className="w-5 h-5" />}
          trend="up"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-6">User Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #1e293b',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#00d4ff" 
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Engagement Distribution */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-6">Engagement Distribution</h3>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #1e293b',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {engagementData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Weekly Activity */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-6">Weekly Activity</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #1e293b',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="logins" fill="#00d4ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actions" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-8 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Logins</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            <span className="text-sm text-muted-foreground">Actions</span>
          </div>
        </div>
      </GlassCard>

      {/* Top Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Top Company</span>
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold">Google</p>
          <p className="text-sm text-muted-foreground">45 referrals this month</p>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Most Active Alumni</span>
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold">Sarah Chen</p>
          <p className="text-sm text-muted-foreground">28 mentees helped</p>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Peak Hours</span>
            <Calendar className="w-5 h-5 text-violet-400" />
          </div>
          <p className="text-2xl font-bold">2 PM - 6 PM</p>
          <p className="text-sm text-muted-foreground">Highest engagement time</p>
        </GlassCard>
      </div>
    </div>
  );
}
