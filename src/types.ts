export type EdgeCaseType = 'normal_day12' | 'day1_fresh' | 'missed_day' | 'empty_profile';

export type TrackId = 'fullstack' | 'aiml' | 'backend' | 'mobile';

export interface Track {
  id: TrackId;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  enrolledStudents: number;
}

export interface DayTask {
  dayNumber: number;
  title: string;
  trackId: TrackId;
  summary: string;
  description: string;
  learningObjectives: string[];
  starterCode?: string;
  hints: string[];
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  recruiterSkillTag: string;
}

export interface Submission {
  dayNumber: number;
  githubUrl: string;
  linkedinUrl: string;
  reflectionText?: string;
  submittedAt: string;
  verified: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  unlockedAtDay?: number;
  unlocked: boolean;
  iconName: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  githubUsername: string;
  linkedinHandle: string;
  college: string;
  yearOfStudy: string;
  trackId: TrackId;
  currentStreak: number;
  highestStreak: number;
  totalCompletedDays: number;
  graceTokensRemaining: number;
  isMissedDayWarning: boolean;
  joinedDate: string;
  completedDays: number[]; // e.g. [1, 2, 3, ..., 11]
  submissions: Record<number, Submission>; // key is dayNumber
  badges: AchievementBadge[];
}
