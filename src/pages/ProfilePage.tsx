import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { 
  User, MapPin, Briefcase, GraduationCap, Calendar, 
  Mail, Linkedin, Github, Edit, Award, Users
} from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { id } = useParams();
  
  // Mock user data
  const user = {
    name: 'John Doe',
    role: 'student',
    headline: 'Computer Science Student | Aspiring Software Engineer',
    location: 'San Francisco, CA',
    company: 'Stanford University',
    graduationYear: 2025,
    email: 'john.doe@stanford.edu',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    bio: 'Passionate about building products that make a difference. Currently exploring machine learning and distributed systems. Looking for internship opportunities in software engineering.',
    skills: ['Python', 'JavaScript', 'React', 'Machine Learning', 'System Design', 'AWS'],
    achievements: [
      { title: 'Dean\'s List', year: '2023' },
      { title: 'Hackathon Winner', year: '2023' },
      { title: 'Research Assistant', year: '2022' },
    ],
    connections: 156,
    mentoringSessions: 3,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Profile Header */}
      <GlassCard className="p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-glow-secondary/20 flex items-center justify-center shrink-0">
            <User className="w-16 h-16 text-primary" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                <p className="text-muted-foreground">{user.headline}</p>
              </div>
              {id === 'me' && (
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {user.location}
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                {user.company}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Class of {user.graduationYear}
              </span>
            </div>

            <div className="flex gap-3">
              <a href={`mailto:${user.email}`} className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href={`https://${user.linkedin}`} target="_blank" className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`https://${user.github}`} target="_blank" className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="flex md:flex-col gap-4 md:gap-2 md:text-right">
            <div>
              <p className="text-2xl font-bold text-primary">{user.connections}</p>
              <p className="text-xs text-muted-foreground">Connections</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400">{user.mentoringSessions}</p>
              <p className="text-xs text-muted-foreground">Mentoring Sessions</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-3 gap-6">
        {/* About */}
        <div className="md:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
          </GlassCard>

          {/* Skills */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Achievements
            </h2>
            <div className="space-y-3">
              {user.achievements.map((achievement, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm">{achievement.title}</span>
                  <span className="text-xs text-muted-foreground">{achievement.year}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Actions */}
          {id !== 'me' && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold mb-4">Connect</h2>
              <div className="space-y-3">
                <Button className="w-full btn-glow">
                  <Users className="w-4 h-4 mr-2" />
                  Request Connection
                </Button>
                <Button variant="outline" className="w-full">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Request Mentorship
                </Button>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
