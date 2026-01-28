import { GlassCard, StatCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, GraduationCap, FileText, Users, Plus, 
  ArrowRight, Clock, CheckCircle, XCircle, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AlumniDashboard() {
  const mentorshipRequests = [
    { id: 1, student: 'Alex Johnson', field: 'Software Engineering', status: 'pending', date: '1 day ago' },
    { id: 2, student: 'Maria Garcia', field: 'Product Management', status: 'pending', date: '3 days ago' },
    { id: 3, student: 'James Wilson', field: 'Data Science', status: 'accepted', date: '1 week ago' },
  ];

  const referralRequests = [
    { id: 1, student: 'Emily Chen', position: 'Software Engineer', status: 'pending', date: '2 days ago' },
    { id: 2, student: 'David Kim', position: 'Product Manager', status: 'approved', date: '5 days ago' },
  ];

  const myOpportunities = [
    { id: 1, title: 'Senior Developer', company: 'Your Company', applications: 24, status: 'active' },
    { id: 2, title: 'Mentorship Program', type: 'Mentorship', slots: 3, status: 'active' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Alumni Dashboard</h1>
          <p className="text-muted-foreground">Help shape the next generation of professionals</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Share Experience
          </Button>
          <Button className="btn-glow">
            <Plus className="w-4 h-4 mr-2" />
            Post Opportunity
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Mentorship Requests" 
          value={5} 
          change="2 new"
          icon={<GraduationCap className="w-5 h-5" />}
          trend="up"
        />
        <StatCard 
          title="Referral Requests" 
          value={8} 
          change="3 pending"
          icon={<Users className="w-5 h-5" />}
          trend="neutral"
        />
        <StatCard 
          title="Posted Opportunities" 
          value={4} 
          change="2 active"
          icon={<Briefcase className="w-5 h-5" />}
          trend="neutral"
        />
        <StatCard 
          title="Students Helped" 
          value={32} 
          change="+5 this month"
          icon={<Award className="w-5 h-5" />}
          trend="up"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mentorship Requests */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Mentorship Requests</h2>
            <Link to="/opportunities/mentorship">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {mentorshipRequests.map((request) => (
              <div key={request.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{request.student}</p>
                  <p className="text-sm text-muted-foreground">{request.field}</p>
                </div>
                {request.status === 'pending' ? (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <XCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="h-8">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                    Accepted
                  </span>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Referral Requests */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Referral Requests</h2>
            <Link to="/referrals">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {referralRequests.map((request) => (
              <div key={request.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{request.student}</p>
                  <p className="text-sm text-muted-foreground">{request.position}</p>
                </div>
                {request.status === 'pending' ? (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">Decline</Button>
                    <Button size="sm" className="h-8">Approve</Button>
                  </div>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                    Approved
                  </span>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* My Opportunities */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">My Posted Opportunities</h2>
          <Button className="btn-glow" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Post New
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {myOpportunities.map((opp) => (
            <div key={opp.id} className="p-5 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">{opp.title}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                  {opp.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {opp.company || opp.type}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {opp.applications ? `${opp.applications} applications` : `${opp.slots} slots available`}
                </span>
                <Button variant="ghost" size="sm">
                  Manage <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
