import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Star, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Calendar,
  Search,
  Filter,
  Video,
  Award,
  CheckCircle
} from 'lucide-react';
import { MentorProfile } from '@/types';
import { toast } from 'sonner';

// Mock data for demonstration
const mockMentors: MentorProfile[] = [
  {
    id: '1',
    userId: 'u1',
    title: 'CEO & Founder',
    company: 'TechCorp Inc.',
    yearsOfExperience: 15,
    expertise: ['Leadership', 'Startup Strategy', 'Product Management', 'Fundraising'],
    hourlyRate: 20000,
    bio: 'Former VP at Google, now running a successful B2B SaaS startup. Passionate about helping the next generation of tech leaders.',
    availability: [],
    rating: 4.9,
    totalSessions: 127,
    isVerified: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: 'u2',
    title: 'Chief Marketing Officer',
    company: 'GrowthLabs',
    yearsOfExperience: 12,
    expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking', 'Content Marketing'],
    hourlyRate: 15000,
    bio: 'Led marketing teams at Fortune 500 companies. Expert in scaling marketing operations from 0 to 100M+ revenue.',
    availability: [],
    rating: 4.8,
    totalSessions: 94,
    isVerified: true,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    userId: 'u3',
    title: 'VP of Engineering',
    company: 'CloudScale Systems',
    yearsOfExperience: 18,
    expertise: ['System Design', 'Cloud Architecture', 'Team Leadership', 'Technical Strategy'],
    hourlyRate: 18000,
    bio: 'Built and scaled engineering teams from 5 to 200+. Deep expertise in distributed systems and cloud infrastructure.',
    availability: [],
    rating: 5.0,
    totalSessions: 156,
    isVerified: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '4',
    userId: 'u4',
    title: 'Chief Technology Officer',
    company: 'AI Innovations',
    yearsOfExperience: 20,
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Technical Leadership', 'Innovation'],
    hourlyRate: 25000,
    bio: 'Pioneer in AI/ML space. Led technology at multiple unicorn startups. Published researcher and conference speaker.',
    availability: [],
    rating: 4.9,
    totalSessions: 89,
    isVerified: true,
    createdAt: new Date('2024-03-05'),
  },
  {
    id: '5',
    userId: 'u5',
    title: 'Chief Product Officer',
    company: 'UserFirst Design',
    yearsOfExperience: 14,
    expertise: ['Product Strategy', 'UX Design', 'Product-Market Fit', 'Agile Methodologies'],
    hourlyRate: 16000,
    bio: 'Launched 20+ successful products. Specialized in B2C mobile apps and SaaS platforms. Former Facebook PM.',
    availability: [],
    rating: 4.7,
    totalSessions: 112,
    isVerified: true,
    createdAt: new Date('2024-02-12'),
  },
  {
    id: '6',
    userId: 'u6',
    title: 'Chief Financial Officer',
    company: 'FinTech Solutions',
    yearsOfExperience: 16,
    expertise: ['Financial Planning', 'Corporate Finance', 'Investment Strategy', 'M&A'],
    hourlyRate: 20000,
    bio: 'Managed IPOs and M&A deals worth ₹16,000Cr+. Expert in financial modeling and corporate strategy.',
    availability: [],
    rating: 4.8,
    totalSessions: 73,
    isVerified: true,
    createdAt: new Date('2024-01-25'),
  },
];

const expertiseOptions = [
  'All Expertise',
  'Leadership',
  'Startup Strategy',
  'Product Management',
  'Digital Marketing',
  'System Design',
  'Artificial Intelligence',
  'Financial Planning',
  'UX Design',
  'Growth Hacking',
];

const MentorshipPage = () => {
  const [mentors, setMentors] = useState(mockMentors);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All Expertise');
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [sessionTopic, setSessionTopic] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = 
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesExpertise = 
      selectedExpertise === 'All Expertise' || 
      mentor.expertise.includes(selectedExpertise);

    return matchesSearch && matchesExpertise;
  });

  const handleBookSession = (mentor: MentorProfile) => {
    setSelectedMentor(mentor);
    setBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!sessionTopic || !selectedDate || !selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would integrate with payment gateway
    toast.success(`Session booked with ${selectedMentor?.title} at ${selectedMentor?.company}! Payment of ₹${selectedMentor?.hourlyRate} will be processed.`);
    
    // Reset form
    setBookingDialogOpen(false);
    setSessionTopic('');
    setSessionDescription('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedMentor(null);
  };

  return (
    <div className="relative z-10 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Premium Mentorship</h1>
        <p className="text-muted-foreground">
          Book 1-on-1 sessions with industry leaders and executives
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mentors.length}</p>
                <p className="text-xs text-muted-foreground">Expert Mentors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">4.9</p>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Video className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">651</p>
                <p className="text-xs text-muted-foreground">Sessions Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">15+</p>
                <p className="text-xs text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, company, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by expertise" />
              </SelectTrigger>
              <SelectContent>
                {expertiseOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.id}`} />
                  <AvatarFallback>{mentor.title.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{mentor.title}</CardTitle>
                    {mentor.isVerified && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <CardDescription>{mentor.company}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {mentor.bio}
              </p>
              
              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.slice(0, 3).map((exp) => (
                  <Badge key={exp} variant="secondary" className="text-xs">
                    {exp}
                  </Badge>
                ))}
                {mentor.expertise.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{mentor.expertise.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{mentor.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({mentor.totalSessions})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mentor.yearsOfExperience} years</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 text-lg font-bold text-primary">
                ₹{mentor.hourlyRate.toLocaleString('en-IN')}/hour
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleBookSession(mentor)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Session
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredMentors.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No mentors found matching your criteria. Try adjusting your search.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book a Session</DialogTitle>
            <DialogDescription>
              Book a 1-hour mentorship session with {selectedMentor?.title} at {selectedMentor?.company}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Mentor Info */}
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMentor?.id}`} />
                <AvatarFallback>{selectedMentor?.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{selectedMentor?.title}</p>
                <p className="text-sm text-muted-foreground">{selectedMentor?.company}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">₹{selectedMentor?.hourlyRate.toLocaleString('en-IN')}</p>
                <p className="text-xs text-muted-foreground">per hour</p>
              </div>
            </div>

            {/* Session Topic */}
            <div className="space-y-2">
              <Label htmlFor="topic">Session Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g., Career guidance in product management"
                value={sessionTopic}
                onChange={(e) => setSessionTopic(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Additional Details (Optional)</Label>
              <Textarea
                id="description"
                placeholder="What would you like to discuss in this session?"
                value={sessionDescription}
                onChange={(e) => setSessionDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            {/* Session Details */}
            <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  60 minutes
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Session Type:</span>
                <span className="font-medium flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  Video Call
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold text-primary">
                  ₹{selectedMentor?.hourlyRate.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              * You will receive a meeting link via email after payment confirmation.
              Sessions can be rescheduled up to 24 hours in advance.
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking}>
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorshipPage;
