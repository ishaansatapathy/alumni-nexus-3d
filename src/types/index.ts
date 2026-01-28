// User Types
export type UserRole = 'student' | 'alumni' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  headline?: string;
  location?: string;
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills: string[];
  graduationYear?: number;
  institution?: string;
  currentCompany?: string;
  currentPosition?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Alumni Verification
export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export interface AlumniVerification {
  id: string;
  userId: string;
  status: VerificationStatus;
  documentUrl?: string;
  graduationYear: number;
  degree: string;
  major: string;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
}

// Opportunities
export type OpportunityType = 'job' | 'internship' | 'mentorship';
export type OpportunityStatus = 'active' | 'closed' | 'draft';

export interface Opportunity {
  id: string;
  type: OpportunityType;
  title: string;
  description: string;
  company?: string;
  location: string;
  salaryRange?: string;
  requirements: string[];
  tags: string[];
  postedBy: string;
  status: OpportunityStatus;
  applicationCount: number;
  createdAt: Date;
  expiresAt?: Date;
}

// Referral Requests
export type ReferralStatus = 'pending' | 'approved' | 'rejected' | 'submitted';

export interface ReferralRequest {
  id: string;
  studentId: string;
  alumniId: string;
  company: string;
  position: string;
  status: ReferralStatus;
  resumeUrl?: string;
  coverLetter?: string;
  studentNote?: string;
  alumniNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mentorship
export type MentorshipStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export interface MentorshipRequest {
  id: string;
  studentId: string;
  alumniId: string;
  topic: string;
  message: string;
  status: MentorshipStatus;
  sessionCount: number;
  createdAt: Date;
  acceptedAt?: Date;
}

// Interview Experiences
export type InterviewDifficulty = 'easy' | 'medium' | 'hard';
export type InterviewResult = 'offer' | 'rejected' | 'pending' | 'withdrawn';

export interface InterviewExperience {
  id: string;
  authorId: string;
  isAnonymous: boolean;
  company: string;
  role: string;
  difficulty: InterviewDifficulty;
  result: InterviewResult;
  rounds: InterviewRound[];
  overallExperience: string;
  tips: string[];
  views: number;
  likes: number;
  createdAt: Date;
}

export interface InterviewRound {
  roundNumber: number;
  type: string; // 'phone', 'onsite', 'technical', 'behavioral', etc.
  duration: number; // in minutes
  questions: string[];
  feedback?: string;
}

// Analytics
export interface PlatformMetrics {
  totalUsers: number;
  activeUsers: number;
  totalAlumni: number;
  totalStudents: number;
  totalOpportunities: number;
  totalReferrals: number;
  totalMentorships: number;
  engagementRate: number;
}

export interface UserActivityLog {
  id: string;
  userId: string;
  action: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}
