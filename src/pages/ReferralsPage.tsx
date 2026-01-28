import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Filter, Clock, CheckCircle, XCircle, 
  Building2, User, Calendar, Plus, ArrowRight, Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ReferralsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'browse' | 'my-requests'>('browse');

  const referralOpportunities = [
    {
      id: 1,
      company: 'Google',
      alumni: 'Sarah Chen',
      role: 'Software Engineer',
      available: true,
      responseTime: '2-3 days',
    },
    {
      id: 2,
      company: 'Meta',
      alumni: 'Michael Ross',
      role: 'Product Manager',
      available: true,
      responseTime: '1 week',
    },
    {
      id: 3,
      company: 'Amazon',
      alumni: 'Emily Davis',
      role: 'Data Scientist',
      available: false,
      responseTime: 'N/A',
    },
    {
      id: 4,
      company: 'Apple',
      alumni: 'James Wilson',
      role: 'iOS Engineer',
      available: true,
      responseTime: '3-5 days',
    },
  ];

  const myRequests = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer',
      referrer: 'Sarah Chen',
      status: 'pending',
      submittedDate: '2 days ago',
    },
    {
      id: 2,
      company: 'Netflix',
      position: 'Senior Engineer',
      referrer: 'John Smith',
      status: 'approved',
      submittedDate: '1 week ago',
    },
    {
      id: 3,
      company: 'Stripe',
      position: 'Backend Engineer',
      referrer: 'Alice Johnson',
      status: 'rejected',
      submittedDate: '2 weeks ago',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-400';
      case 'approved': return 'bg-emerald-500/10 text-emerald-400';
      case 'rejected': return 'bg-red-500/10 text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Referrals</h1>
          <p className="text-muted-foreground">Get referred to top companies by verified alumni</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 rounded-lg bg-secondary/30 w-fit">
        <button
          onClick={() => setActiveTab('browse')}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            activeTab === 'browse' 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
        >
          Browse Referrals
        </button>
        <button
          onClick={() => setActiveTab('my-requests')}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            activeTab === 'my-requests' 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
        >
          My Requests
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by company or role..."
            className="pl-10 bg-secondary/50 border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {activeTab === 'browse' ? (
        /* Browse Referrals */
        <div className="grid md:grid-cols-2 gap-4">
          {referralOpportunities.map((opp) => (
            <GlassCard key={opp.id} hover className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{opp.company}</h3>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      opp.available 
                        ? "bg-emerald-500/10 text-emerald-400" 
                        : "bg-red-500/10 text-red-400"
                    )}>
                      {opp.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{opp.role}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {opp.alumni}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {opp.responseTime}
                    </span>
                  </div>

                  <Button 
                    className="w-full" 
                    disabled={!opp.available}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Request Referral
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        /* My Requests */
        <div className="space-y-4">
          {myRequests.map((request) => (
            <GlassCard key={request.id} className="p-5">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold">{request.company}</h3>
                  <p className="text-sm text-muted-foreground">{request.position}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">via {request.referrer}</p>
                  <p className="text-xs text-muted-foreground">{request.submittedDate}</p>
                </div>

                <span className={cn(
                  "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
                  getStatusColor(request.status)
                )}>
                  {getStatusIcon(request.status)}
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
