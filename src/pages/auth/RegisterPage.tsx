import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/GlassCard';
import { Network, Mail, Lock, User, ArrowRight, Eye, EyeOff, GraduationCap, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserRole = 'student' | 'alumni';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === 'alumni' ? '/dashboard/alumni' : '/dashboard/student');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 gradient-bg bg-gradient-mesh">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
            <Network className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-bold">AlumniNet</span>
        </Link>

        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join the network and start connecting</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 text-left",
                role === 'student' 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-border bg-secondary/30 hover:border-muted-foreground"
              )}
            >
              <GraduationCap className="w-6 h-6 mb-2" />
              <p className="font-medium">Student</p>
              <p className="text-xs text-muted-foreground">Current student</p>
            </button>
            <button
              type="button"
              onClick={() => setRole('alumni')}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 text-left",
                role === 'alumni' 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-border bg-secondary/30 hover:border-muted-foreground"
              )}
            >
              <Briefcase className="w-6 h-6 mb-2" />
              <p className="font-medium">Alumni</p>
              <p className="text-xs text-muted-foreground">Graduated member</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 bg-secondary/50 border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 bg-secondary/50 border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-secondary/50 border-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="rounded border-border mt-1" />
              <span className="text-muted-foreground">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <Button type="submit" className="w-full btn-glow">
              Create Account
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/auth/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
