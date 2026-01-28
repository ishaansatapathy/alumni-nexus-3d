import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Filter, ThumbsUp, MessageSquare, Eye, 
  Building2, Calendar, User, ChevronRight, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InterviewExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const experiences = [
    {
      id: 1,
      company: 'Google',
      role: 'Software Engineer L4',
      author: 'Anonymous',
      date: '2 weeks ago',
      difficulty: 'Hard',
      result: 'Offer',
      views: 1234,
      likes: 89,
      comments: 23,
      preview: 'The interview process consisted of 5 rounds: 1 phone screen, 4 onsite. Questions focused heavily on system design and algorithms...',
    },
    {
      id: 2,
      company: 'Meta',
      role: 'Product Manager',
      author: 'John D.',
      date: '1 month ago',
      difficulty: 'Medium',
      result: 'Offer',
      views: 856,
      likes: 67,
      comments: 15,
      preview: 'The PM interview at Meta was structured around product sense, execution, and leadership. Expect lots of estimation questions...',
    },
    {
      id: 3,
      company: 'Amazon',
      role: 'SDE II',
      author: 'Anonymous',
      date: '3 weeks ago',
      difficulty: 'Hard',
      result: 'Rejected',
      views: 2341,
      likes: 156,
      comments: 45,
      preview: 'Leadership principles are EVERYTHING at Amazon. Make sure you have 2-3 stories for each LP. The technical rounds were standard LC medium...',
    },
    {
      id: 4,
      company: 'Apple',
      role: 'iOS Engineer',
      author: 'Sarah M.',
      date: '2 months ago',
      difficulty: 'Medium',
      result: 'Offer',
      views: 567,
      likes: 34,
      comments: 8,
      preview: 'Apple interviews are very team-specific. My team focused heavily on UIKit fundamentals and Swift concurrency patterns...',
    },
    {
      id: 5,
      company: 'Netflix',
      role: 'Senior Engineer',
      author: 'Anonymous',
      date: '1 week ago',
      difficulty: 'Hard',
      result: 'Pending',
      views: 432,
      likes: 28,
      comments: 12,
      preview: 'Netflix culture interview is unique. Be prepared to discuss scenarios where you disagreed with management and how you handled it...',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-400';
      case 'Medium': return 'bg-amber-500/10 text-amber-400';
      case 'Hard': return 'bg-red-500/10 text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Offer': return 'bg-emerald-500/10 text-emerald-400';
      case 'Rejected': return 'bg-red-500/10 text-red-400';
      case 'Pending': return 'bg-blue-500/10 text-blue-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Interview Experiences</h1>
          <p className="text-muted-foreground">Learn from real interview stories shared by the community</p>
        </div>
        <Button className="btn-glow">
          <Plus className="w-4 h-4 mr-2" />
          Share Experience
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by company, role, or keyword..."
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

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Netflix'].map((company) => (
          <button
            key={company}
            className="px-4 py-2 rounded-full bg-secondary/50 text-sm hover:bg-secondary transition-colors"
          >
            {company}
          </button>
        ))}
      </div>

      {/* Experiences List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <GlassCard key={exp.id} hover className="p-6 cursor-pointer group">
            <div className="flex items-start gap-6">
              {/* Company Logo Placeholder */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {exp.company} - {exp.role}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {exp.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getDifficultyColor(exp.difficulty))}>
                      {exp.difficulty}
                    </span>
                    <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getResultColor(exp.result))}>
                      {exp.result}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {exp.preview}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {exp.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {exp.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {exp.comments}
                    </span>
                  </div>
                  <span className="text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
