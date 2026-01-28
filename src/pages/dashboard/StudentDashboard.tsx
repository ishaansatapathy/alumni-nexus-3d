import { GlassCard, StatCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, GraduationCap, FileText, Users, MessageSquare, 
  ArrowRight, Clock, Star, CheckCircle, XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const mentorshipRequests = [
    { id: 1, mentor: 'Sarah Chen', role: 'Senior Engineer at Google', status: 'pending', date: '2 days ago' },
    { id: 2, mentor: 'Michael Ross', role: 'Product Manager at Meta', status: 'accepted', date: '1 week ago' },
  ];

  const recentJobs = [
    { id: 1, title: 'Software Engineer Intern', company: 'Microsoft', type: 'Internship', location: 'Remote' },
    { id: 2, title: 'Data Analyst', company: 'Amazon', type: 'Full-time', location: 'Seattle, WA' },
    { id: 3, title: 'UX Designer', company: 'Apple', type: 'Full-time', location: 'Cupertino, CA' },
  ];

  const referralStatus = [
    { id: 1, company: 'Google', status: 'in_review', referrer: 'John Smith', date: '3 days ago' },
    { id: 2, company: 'Netflix', status: 'submitted', referrer: 'Emily Davis', date: '1 week ago' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your career journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Mentorship Requests" 
          value={2} 
          change="1 pending"
          icon={<GraduationCap className="w-5 h-5" />}
          trend="neutral"
        />
        <StatCard 
          title="Saved Jobs" 
          value={12} 
          change="+3 this week"
          icon={<Briefcase className="w-5 h-5" />}
          trend="up"
        />
        <StatCard 
          title="Referral Requests" 
          value={4} 
          change="2 in review"
          icon={<Users className="w-5 h-5" />}
          trend="neutral"
        />
        <StatCard 
          title="Interviews Read" 
          value={28} 
          change="+8 this week"
          icon={<FileText className="w-5 h-5" />}
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
          <div className="space-y-4">
            {mentorshipRequests.map((request) => (
              <div key={request.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{request.mentor}</p>
                  <p className="text-sm text-muted-foreground truncate">{request.role}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'accepted' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {request.status === 'accepted' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {request.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{request.date}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Referral Status */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Referral Status</h2>
            <Link to="/referrals">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {referralStatus.map((referral) => (
              <div key={referral.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{referral.company}</p>
                  <p className="text-sm text-muted-foreground">via {referral.referrer}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    referral.status === 'in_review' 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {referral.status === 'in_review' ? 'In Review' : 'Submitted'}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{referral.date}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Job Opportunities */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Opportunities</h2>
          <Link to="/opportunities/jobs">
            <Button variant="ghost" size="sm">
              Browse All <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {recentJobs.map((job) => (
            <div key={job.id} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {job.type}
                </span>
              </div>
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <p className="text-xs text-muted-foreground mt-2">{job.location}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
