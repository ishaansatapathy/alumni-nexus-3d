import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Briefcase, GraduationCap, Building2, MapPin, Clock, 
  Search, Filter, ArrowRight, Star, Bookmark, BookmarkCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type OpportunityType = 'all' | 'jobs' | 'internships';

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState<OpportunityType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [appliedIds, setAppliedIds] = useState<number[]>([]);

  const opportunities = [
    {
      id: 1,
      type: 'job',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      salary: '₹1.2Cr - ₹1.6Cr',
      posted: '2 days ago',
      tags: ['Full-time', 'Remote Optional'],
      featured: true,
    },
    {
      id: 2,
      type: 'internship',
      title: 'Product Management Intern',
      company: 'Meta',
      location: 'Menlo Park, CA',
      salary: '₹6.5L/month',
      posted: '1 week ago',
      tags: ['Summer 2024', 'On-site'],
      featured: false,
    },

    {
      id: 4,
      type: 'job',
      title: 'Data Scientist',
      company: 'Amazon',
      location: 'Seattle, WA',
      salary: '₹1.1Cr - ₹1.5Cr',
      posted: '5 days ago',
      tags: ['Full-time', 'Hybrid'],
      featured: false,
    },
    {
      id: 5,
      type: 'internship',
      title: 'UX Design Intern',
      company: 'Apple',
      location: 'Cupertino, CA',
      salary: '₹6L/month',
      posted: '1 day ago',
      tags: ['Fall 2024', 'On-site'],
      featured: false,
    },

  ];

  const tabs = [
    { value: 'all', label: 'All', icon: <Briefcase className="w-4 h-4" /> },
    { value: 'jobs', label: 'Jobs', icon: <Building2 className="w-4 h-4" /> },
    { value: 'internships', label: 'Internships', icon: <Clock className="w-4 h-4" /> },
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    if (activeTab !== 'all' && opp.type !== activeTab.slice(0, -1)) return false;
    if (searchQuery && !opp.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !opp.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'job': return <Building2 className="w-5 h-5" />;
      case 'internship': return <Clock className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  const handleBookmark = (id: number, title: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(oppId => oppId !== id));
      toast.success(`Removed "${title}" from bookmarks`);
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      toast.success(`Bookmarked "${title}"`);
    }
  };

  const handleApply = (id: number, title: string, company: string) => {
    if (appliedIds.includes(id)) {
      toast.info(`You've already applied to ${title} at ${company}`);
    } else {
      setAppliedIds([...appliedIds, id]);
      toast.success(`Application submitted for ${title} at ${company}!`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Opportunities</h1>
        <p className="text-muted-foreground">Discover jobs and internships from top companies</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
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

      {/* Tabs */}
      <div className="flex gap-2 p-1 rounded-lg bg-secondary/30 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as OpportunityType)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === tab.value 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Opportunities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOpportunities.map((opp) => (
          <GlassCard key={opp.id} hover className="p-5 relative">
            {opp.featured && (
              <div className="absolute top-4 right-4">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
            )}
            <div className="flex items-start gap-4 mb-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                opp.type === 'job' && "bg-blue-500/10 text-blue-400",
                opp.type === 'internship' && "bg-emerald-500/10 text-emerald-400"
              )}>
                {getTypeIcon(opp.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{opp.title}</h3>
                <p className="text-sm text-muted-foreground">{opp.company}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {opp.location}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                {opp.salary}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {opp.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">{opp.posted}</span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleBookmark(opp.id, opp.title)}
                  className={cn(
                    bookmarkedIds.includes(opp.id) && "text-primary"
                  )}
                >
                  {bookmarkedIds.includes(opp.id) ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleApply(opp.id, opp.title, opp.company)}
                  disabled={appliedIds.includes(opp.id)}
                >
                  {appliedIds.includes(opp.id) ? 'Applied' : 'Apply'} 
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
