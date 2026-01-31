import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  Lock, 
  Unlock, 
  Github, 
  Code2, 
  FolderGit2,
  Star,
  CheckCircle2,
  Building2,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ConnectionCriteria {
  githubContributions: number;
  codechefRating: number;
  projects: number;
  leetcodeSolved: number;
}

interface AlumniProfile {
  id: string;
  name: string;
  company: string;
  position: string;
  college: string;
  graduationYear: number;
  expertise: string[];
  connectionCriteria: ConnectionCriteria;
  isVerified: boolean;
  responseRate: number;
  totalConnections: number;
}

// Mock current user stats
const currentUserStats: ConnectionCriteria = {
  githubContributions: 450,
  codechefRating: 1650,
  projects: 6,
  leetcodeSolved: 280,
};

// Mock alumni data
const mockAlumni: AlumniProfile[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    company: 'Google',
    position: 'Senior Software Engineer',
    college: 'IIT Delhi',
    graduationYear: 2018,
    expertise: ['System Design', 'Distributed Systems', 'Backend'],
    connectionCriteria: {
      githubContributions: 500,
      codechefRating: 1800,
      projects: 5,
      leetcodeSolved: 300,
    },
    isVerified: true,
    responseRate: 95,
    totalConnections: 124,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    company: 'Microsoft',
    position: 'Product Manager',
    college: 'IIT Bombay',
    graduationYear: 2017,
    expertise: ['Product Strategy', 'User Research', 'Agile'],
    connectionCriteria: {
      githubContributions: 300,
      codechefRating: 1500,
      projects: 4,
      leetcodeSolved: 200,
    },
    isVerified: true,
    responseRate: 88,
    totalConnections: 89,
  },
  {
    id: '3',
    name: 'Amit Patel',
    company: 'Amazon',
    position: 'SDE II',
    college: 'BITS Pilani',
    graduationYear: 2019,
    expertise: ['Cloud Architecture', 'AWS', 'DevOps'],
    connectionCriteria: {
      githubContributions: 400,
      codechefRating: 1600,
      projects: 6,
      leetcodeSolved: 250,
    },
    isVerified: true,
    responseRate: 92,
    totalConnections: 67,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    company: 'Meta',
    position: 'Tech Lead',
    college: 'NIT Trichy',
    graduationYear: 2016,
    expertise: ['Frontend', 'React', 'Performance Optimization'],
    connectionCriteria: {
      githubContributions: 600,
      codechefRating: 1900,
      projects: 8,
      leetcodeSolved: 400,
    },
    isVerified: true,
    responseRate: 85,
    totalConnections: 156,
  },
  {
    id: '5',
    name: 'Arjun Singh',
    company: 'Adobe',
    position: 'Staff Engineer',
    college: 'IIT Kanpur',
    graduationYear: 2015,
    expertise: ['Machine Learning', 'Computer Vision', 'AI'],
    connectionCriteria: {
      githubContributions: 350,
      codechefRating: 1700,
      projects: 5,
      leetcodeSolved: 220,
    },
    isVerified: true,
    responseRate: 90,
    totalConnections: 78,
  },
  {
    id: '6',
    name: 'Kavya Menon',
    company: 'Netflix',
    position: 'Senior Engineer',
    college: 'IIIT Hyderabad',
    graduationYear: 2020,
    expertise: ['Data Engineering', 'Spark', 'Big Data'],
    connectionCriteria: {
      githubContributions: 250,
      codechefRating: 1400,
      projects: 4,
      leetcodeSolved: 180,
    },
    isVerified: true,
    responseRate: 94,
    totalConnections: 45,
  },
];

const ConnectPage = () => {
  const [alumni, setAlumni] = useState(mockAlumni);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  const checkCriteriaMet = (criteria: ConnectionCriteria): boolean => {
    return (
      currentUserStats.githubContributions >= criteria.githubContributions &&
      currentUserStats.codechefRating >= criteria.codechefRating &&
      currentUserStats.projects >= criteria.projects &&
      currentUserStats.leetcodeSolved >= criteria.leetcodeSolved
    );
  };

  const getCriteriaProgress = (required: number, current: number): number => {
    return Math.min((current / required) * 100, 100);
  };

  const handleConnect = (alumniId: string, alumniName: string, criteria: ConnectionCriteria) => {
    if (!checkCriteriaMet(criteria)) {
      toast.error(`You haven't met the criteria to connect with ${alumniName}`);
      return;
    }
    
    if (connectedIds.includes(alumniId)) {
      toast.info(`You're already connected with ${alumniName}`);
      return;
    }

    setConnectedIds([...connectedIds, alumniId]);
    toast.success(`Connection request sent to ${alumniName}!`);
  };

  const filteredAlumni = alumni.filter(person => {
    const matchesSearch = 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCompany = !selectedCompany || person.company === selectedCompany;
    
    return matchesSearch && matchesCompany;
  });

  const companies = Array.from(new Set(alumni.map(a => a.company)));

  return (
    <div className="relative z-10 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Connect with Alumni</h1>
        <p className="text-muted-foreground">
          Unlock connections by meeting coding achievement criteria
        </p>
      </div>

      {/* Current User Stats Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="text-lg">Your Current Stats</CardTitle>
          <CardDescription>Build your profile to unlock more connections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Github className="h-4 w-4" />
                GitHub Contributions
              </div>
              <p className="text-2xl font-bold">{currentUserStats.githubContributions}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code2 className="h-4 w-4" />
                CodeChef Rating
              </div>
              <p className="text-2xl font-bold">{currentUserStats.codechefRating}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FolderGit2 className="h-4 w-4" />
                Projects
              </div>
              <p className="text-2xl font-bold">{currentUserStats.projects}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code2 className="h-4 w-4" />
                LeetCode Solved
              </div>
              <p className="text-2xl font-bold">{currentUserStats.leetcodeSolved}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, company, college, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCompany === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCompany(null)}
              >
                All Companies
              </Button>
              {companies.map((company) => (
                <Button
                  key={company}
                  variant={selectedCompany === company ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCompany(company)}
                >
                  {company}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAlumni.map((person) => {
          const criteriaMet = checkCriteriaMet(person.connectionCriteria);
          const isConnected = connectedIds.includes(person.id);

          return (
            <Card key={person.id} className={cn(
              "hover:shadow-lg transition-shadow",
              criteriaMet && "border-primary/50"
            )}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.id}`} />
                    <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg truncate">{person.name}</CardTitle>
                      {person.isVerified && (
                        <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      )}
                      {criteriaMet ? (
                        <Unlock className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    <CardDescription className="truncate">{person.position}</CardDescription>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{person.company}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* College & Year */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{person.college}</span>
                  <span className="text-muted-foreground">Class of {person.graduationYear}</span>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                  {person.expertise.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  <div className="flex items-center gap-2 text-xs">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span>{person.totalConnections} connections</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span>{person.responseRate}% response rate</span>
                  </div>
                </div>

                {/* Connection Criteria */}
                <div className="space-y-3 pt-3 border-t">
                  <p className="text-sm font-medium">
                    {criteriaMet ? 'Requirements Met ✓' : 'Requirements to Connect'}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <Github className="h-3 w-3" />
                          GitHub: {person.connectionCriteria.githubContributions}+
                        </span>
                        <span className={cn(
                          "font-medium",
                          currentUserStats.githubContributions >= person.connectionCriteria.githubContributions
                            ? "text-green-500"
                            : "text-muted-foreground"
                        )}>
                          {currentUserStats.githubContributions}/{person.connectionCriteria.githubContributions}
                        </span>
                      </div>
                      <Progress 
                        value={getCriteriaProgress(person.connectionCriteria.githubContributions, currentUserStats.githubContributions)} 
                        className="h-1"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <Code2 className="h-3 w-3" />
                          CodeChef: {person.connectionCriteria.codechefRating}+
                        </span>
                        <span className={cn(
                          "font-medium",
                          currentUserStats.codechefRating >= person.connectionCriteria.codechefRating
                            ? "text-green-500"
                            : "text-muted-foreground"
                        )}>
                          {currentUserStats.codechefRating}/{person.connectionCriteria.codechefRating}
                        </span>
                      </div>
                      <Progress 
                        value={getCriteriaProgress(person.connectionCriteria.codechefRating, currentUserStats.codechefRating)} 
                        className="h-1"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <FolderGit2 className="h-3 w-3" />
                          Projects: {person.connectionCriteria.projects}+
                        </span>
                        <span className={cn(
                          "font-medium",
                          currentUserStats.projects >= person.connectionCriteria.projects
                            ? "text-green-500"
                            : "text-muted-foreground"
                        )}>
                          {currentUserStats.projects}/{person.connectionCriteria.projects}
                        </span>
                      </div>
                      <Progress 
                        value={getCriteriaProgress(person.connectionCriteria.projects, currentUserStats.projects)} 
                        className="h-1"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <Code2 className="h-3 w-3" />
                          LeetCode: {person.connectionCriteria.leetcodeSolved}+
                        </span>
                        <span className={cn(
                          "font-medium",
                          currentUserStats.leetcodeSolved >= person.connectionCriteria.leetcodeSolved
                            ? "text-green-500"
                            : "text-muted-foreground"
                        )}>
                          {currentUserStats.leetcodeSolved}/{person.connectionCriteria.leetcodeSolved}
                        </span>
                      </div>
                      <Progress 
                        value={getCriteriaProgress(person.connectionCriteria.leetcodeSolved, currentUserStats.leetcodeSolved)} 
                        className="h-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  disabled={!criteriaMet || isConnected}
                  onClick={() => handleConnect(person.id, person.name, person.connectionCriteria)}
                >
                  {isConnected ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Connected
                    </>
                  ) : criteriaMet ? (
                    <>
                      <Unlock className="h-4 w-4 mr-2" />
                      Send Connection Request
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Criteria Not Met
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredAlumni.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No alumni found matching your criteria. Try adjusting your search.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConnectPage;
