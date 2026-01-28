import { Link } from 'react-router-dom';
import { NetworkScene } from '@/components/3d/NetworkScene';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowRight, Users, Briefcase, GraduationCap, Award, Network, Sparkles } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Alumni Network',
      description: 'Connect with thousands of verified alumni across industries',
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Job Opportunities',
      description: 'Exclusive job postings and referrals from alumni connections',
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Mentorship',
      description: 'Get guidance from experienced professionals in your field',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Interview Prep',
      description: 'Real interview experiences shared by the community',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Alumni' },
    { value: '500+', label: 'Companies' },
    { value: '2K+', label: 'Referrals' },
    { value: '95%', label: 'Success Rate' },
  ];

  return (
    <div className="min-h-screen relative">
      <NetworkScene />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
              <Network className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold">AlumniNet</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/opportunities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Opportunities
            </Link>
            <Link to="/interview-experiences" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Interviews
            </Link>
            <Link to="/referrals" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Referrals
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/auth/register">
              <Button size="sm" className="btn-glow">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Connecting 10,000+ Alumni Worldwide</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Your Professional
            <span className="block gradient-text">Network Awaits</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join the most powerful alumni platform. Find mentors, discover opportunities, 
            and accelerate your career with verified connections.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/auth/register">
              <Button size="lg" className="btn-glow text-base px-8">
                Join Network
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/opportunities">
              <Button size="lg" variant="outline" className="text-base px-8">
                Browse Opportunities
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat, i) => (
              <GlassCard key={i} className="p-6 text-center">
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="gradient-text"> Succeed</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive platform designed to bridge the gap between students, 
              alumni, and industry professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <GlassCard 
                key={i} 
                hover 
                className="p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-glow-secondary/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Expand Your Network?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join thousands of professionals who've transformed their careers through meaningful connections.
              </p>
              <Link to="/auth/register">
                <Button size="lg" className="btn-glow text-base px-10">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-primary" />
            <span className="font-semibold">AlumniNet</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 AlumniNet. Connecting futures, one relationship at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
