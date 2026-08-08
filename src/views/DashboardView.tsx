import React, { useState } from 'react';
import { ClayCard } from '../components/ClayCard';
import { ClayButton } from '../components/ClayButton';
import { ClayBadge } from '../components/ClayBadge';
import { ClayInput } from '../components/ClayInput';
import { D3ProgressChart } from '../components/D3ProgressChart';
import { StudentProfile, EdgeCaseType, TrackId } from '../types';
import { MOCK_TASKS, MOCK_TRACKS } from '../data/mockData';
import {
  Flame,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldAlert,
  Trophy,
  Award,
  GitCommit,
  Share2,
  Calendar,
  Sparkles,
  User,
  AlertCircle,
  Clock,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Quote,
  Zap,
  Check,
  Sun,
  Moon,
  Crown,
  Target,
  Star,
  X,
  Copy
} from 'lucide-react';

const MOTIVATIONAL_QUOTES = [
  {
    quote: "Consistency is what transforms average effort into extraordinary engineering mastery.",
    author: "Atomic Habits for Engineers"
  },
  {
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds"
  },
  {
    quote: "The only way to do great work is to love what you do. Keep pushing commits daily.",
    author: "Steve Jobs"
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    quote: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  },
  {
    quote: "Small daily improvements over time lead to stunning career transformations.",
    author: "Robin Sharma"
  }
];

const TOP_PERFORMERS = [
  { id: '1', rank: 1, name: 'Aarav Sharma', college: 'IIT Bombay', streak: 58, track: 'Full Stack', avatar: 'A' },
  { id: '2', rank: 2, name: 'Priya Verma', college: 'BITS Pilani', streak: 56, track: 'AI/ML', avatar: 'P' },
  { id: '3', rank: 3, name: 'Rohan Mehta', college: 'NIT Surathkal', streak: 54, track: 'Backend', avatar: 'R' },
  { id: '4', rank: 4, name: 'Ananya Iyer', college: 'DTU Delhi', streak: 51, track: 'Full Stack', avatar: 'A' },
  { id: '5', rank: 5, name: 'Siddharth Nair', college: 'IIT Madras', streak: 49, track: 'System Design', avatar: 'S' }
];

interface DashboardViewProps {
  navigate: (route: string) => void;
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  edgeCase: EdgeCaseType;
  onOpenThoughtfulModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  navigate,
  profile,
  setProfile,
  edgeCase,
  onOpenThoughtfulModal
}) => {
  const [githubInput, setGithubInput] = useState(profile.githubUsername || '');
  const [linkedinInput, setLinkedinInput] = useState(profile.linkedinHandle || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // Daily Check-in & Motivation State
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [didCodeToday, setDidCodeToday] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [isPulsingStreak, setIsPulsingStreak] = useState(true);

  // Trigger pulse effect
  const triggerMilestonePulse = () => {
    setIsPulsingStreak(true);
    setTimeout(() => {
      setIsPulsingStreak(false);
    }, 2800);
  };

  // Social Share Achievement Modal State
  const [sharingAchievement, setSharingAchievement] = useState<{
    title: string;
    description: string;
    tag: string;
  } | null>(null);
  const [copiedShareText, setCopiedShareText] = useState(false);

  const handleCopyShareText = () => {
    if (!sharingAchievement) return;
    const shareText = `🎉 Just unlocked the "${sharingAchievement.title}" milestone on the #ABTalks 60-Day Coding Challenge!\n\n🔥 Current Streak: ${profile.currentStreak} Days\n🎓 College: ${profile.college}\n\nTracking daily public commits on GitHub and proof-of-work on LinkedIn. Join the journey!\n\n#60DaysOfCode #BuildInPublic #ABTalks #DeveloperJourney`;
    navigator.clipboard.writeText(shareText);
    setCopiedShareText(true);
    setTimeout(() => setCopiedShareText(false), 2000);
  };

  // Compute stats
  const currentDay = edgeCase === 'day1_fresh' ? 1 : 12;
  const todayTask = MOCK_TASKS[currentDay] || MOCK_TASKS[12];
  const totalDays = 60;
  const completedCount = profile.completedDays.length;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      githubUsername: githubInput,
      linkedinHandle: linkedinInput
    }));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleToggleCodeToday = () => {
    if (!didCodeToday) {
      setDidCodeToday(true);
      setCheckInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      triggerMilestonePulse();
    } else {
      setDidCodeToday(false);
      setCheckInTime(null);
    }
  };

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  return (
    <div className="space-y-6 pb-8">
      {/* 2-Column Responsive Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Main Actions & Progress) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Profile Header & Streak Banner */}
          <ClayCard inflated className="space-y-4">
            {/* Top bar: Student info + Streak */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/20 flex items-center justify-center font-black text-white text-lg shadow-[inset_2px_2px_4px_rgba(255,255,255,0.2)] shrink-0">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h1 className="font-extrabold text-base text-white flex items-center gap-2">
                    <span>{profile.name}</span>
                    <ClayBadge variant="white" size="sm">
                      {profile.yearOfStudy}
                    </ClayBadge>
                  </h1>
                  <p className="text-xs text-zinc-400 font-mono">{profile.college}</p>
                </div>
              </div>

              {/* Streak Badge with Claymorphic Pop Pulse Effect */}
              <div className="text-right shrink-0 flex flex-col items-end gap-1">
                <div
                  onClick={triggerMilestonePulse}
                  className={`inline-block cursor-pointer transition-all ${
                    isPulsingStreak ? 'clay-pulse-active scale-105' : 'hover:scale-105'
                  }`}
                  title="Click to celebrate streak milestone pulse!"
                >
                  <ClayBadge
                    variant={profile.currentStreak > 0 ? 'white' : 'dark'}
                    size="md"
                    icon={<Flame className={`w-4 h-4 ${isPulsingStreak ? 'text-black animate-bounce' : 'text-white'}`} />}
                  >
                    <span className="font-extrabold">
                      {profile.currentStreak + (didCodeToday ? 1 : 0)} Days Streak
                    </span>
                  </ClayBadge>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                  <span>Best: {Math.max(profile.highestStreak, profile.currentStreak + (didCodeToday ? 1 : 0))} Days</span>
                  {isPulsingStreak && (
                    <span className="px-1.5 py-0.2 rounded-full bg-white text-black font-black text-[8px] uppercase tracking-wider animate-pulse">
                      Milestone Pop!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Real-World Edge Case Banners */}

            {/* Edge Case A: Missed Day Warning */}
            {edgeCase === 'missed_day' && (
              <div className="bg-zinc-950 border border-white/30 p-3.5 rounded-2xl space-y-2.5 animate-in fade-in">
                <div className="flex items-start gap-2.5 text-xs text-zinc-200">
                  <ShieldAlert className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Streak At Risk! Missed Day 11</span>
                    <p className="text-zinc-400 text-[11px] leading-relaxed pt-0.5">
                      You missed submitting Day 11 yesterday. Activate a Grace Token before midnight IST to save your 11-day streak.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                  <span className="text-[10px] font-mono text-zinc-400">
                    Grace Tokens: <strong className="text-white">{profile.graceTokensRemaining} Left</strong>
                  </span>
                  <ClayButton variant="primary" size="sm" onClick={onOpenThoughtfulModal}>
                    <Flame className="w-3.5 h-3.5" />
                    <span>Recover Streak Now</span>
                  </ClayButton>
                </div>
              </div>
            )}

            {/* Edge Case B: First Day / Fresh Student */}
            {edgeCase === 'day1_fresh' && (
              <div className="bg-zinc-900 border border-white/20 p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Welcome to Day 1, {profile.name}!</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Your 60-day coding journey begins today. Submit your first GitHub commit and LinkedIn post to activate your Day 1 streak!
                </p>
              </div>
            )}

            {/* Edge Case C: Empty Profile Setup Prompt */}
            {edgeCase === 'empty_profile' && (!profile.githubUsername || !profile.linkedinHandle) && (
              <form onSubmit={handleSaveProfile} className="bg-zinc-950 border border-white/20 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <AlertCircle className="w-4 h-4 text-white" />
                  <span>Complete Profile for Recruiter Visibility</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Add your public handles so recruiters can verify your daily GitHub commits and LinkedIn proof of work.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <ClayInput
                    label="GitHub Username"
                    placeholder="e.g. niharika-codes"
                    value={githubInput}
                    onChange={(e) => setGithubInput(e.target.value)}
                    icon={<GitCommit className="w-4 h-4" />}
                    required
                  />
                  <ClayInput
                    label="LinkedIn Profile Handle"
                    placeholder="e.g. niharika-tech"
                    value={linkedinInput}
                    onChange={(e) => setLinkedinInput(e.target.value)}
                    icon={<Share2 className="w-4 h-4" />}
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  {profileSaved && (
                    <span className="text-xs text-zinc-300 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Profile Saved!
                    </span>
                  )}
                  <ClayButton variant="primary" size="sm" type="submit" className="ml-auto">
                    Save Public Handles
                  </ClayButton>
                </div>
              </form>
            )}
          </ClayCard>

          {/* Daily Check-in & Habit Tracker Section */}
          <ClayCard className="space-y-4 border-white/20 bg-zinc-900/90">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    Daily Habit Check-in
                  </h2>
                  <p className="text-[11px] text-zinc-400 font-mono">Gamify your daily coding discipline</p>
                </div>
              </div>
              <ClayBadge variant={didCodeToday ? 'white' : 'dark'} size="sm">
                {didCodeToday ? 'Checked In Today' : 'Pending Today'}
              </ClayBadge>
            </div>

            {/* Quote of the Day Box */}
            <div className="p-3.5 bg-black/80 rounded-2xl border border-white/10 space-y-2 relative group">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <Quote className="w-3.5 h-3.5 text-white" /> Daily Motivation
                </span>
                <button
                  onClick={handleNextQuote}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10px] bg-zinc-900 px-2 py-1 rounded-full border border-white/10"
                  title="Next Quote"
                >
                  <RefreshCw className="w-3 h-3 text-zinc-400 group-hover:rotate-180 transition-transform duration-300" />
                  <span>Next Inspiration</span>
                </button>
              </div>
              <p className="text-xs text-zinc-200 italic font-sans leading-relaxed">
                &ldquo;{currentQuote.quote}&rdquo;
              </p>
              <div className="text-[10px] font-mono text-zinc-400 text-right">
                — {currentQuote.author}
              </div>
            </div>

            {/* Interactive 'Did you code today?' Toggle */}
            <div className="p-4 bg-zinc-950 rounded-2xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="font-extrabold text-sm text-white flex items-center justify-center sm:justify-start gap-1.5">
                  Did you code today?
                </span>
                <p className="text-xs text-zinc-400">
                  {didCodeToday
                    ? `Checked in at ${checkInTime}. Habit logged for Day ${currentDay}!`
                    : 'Track your daily effort to reinforce muscle memory and habit momentum.'}
                </p>
              </div>

              <button
                onClick={handleToggleCodeToday}
                className={`px-5 py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 border ${
                  didCodeToday
                    ? 'bg-white text-black border-white shadow-[2px_2px_8px_rgba(255,255,255,0.2)]'
                    : 'bg-zinc-900 text-zinc-300 border-white/30 hover:border-white hover:text-white'
                }`}
              >
                {didCodeToday ? (
                  <>
                    <Check className="w-4 h-4 text-black stroke-[3]" />
                    <span>Yes, I Coded Today!</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 text-white" />
                    <span>Log Today&apos;s Coding Session</span>
                  </>
                )}
              </button>
            </div>
          </ClayCard>

          {/* 2. Today's Task Primary Action Card */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-white" /> Today&apos;s Challenge Action
              </h2>
              <ClayBadge variant="white" size="sm">
                Day {currentDay} of 60
              </ClayBadge>
            </div>

            <ClayCard inflated className="space-y-4 border-white/30 bg-zinc-900">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ClayBadge variant="dark" size="sm">
                      {todayTask.difficulty}
                    </ClayBadge>
                    <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {todayTask.estimatedMinutes} Mins
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg text-white">{todayTask.title}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{todayTask.summary}</p>
                </div>
              </div>

              <div className="p-3 bg-black/80 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-mono">Recruiter Skill Tested:</span>
                <span className="font-bold text-white font-mono">{todayTask.recruiterSkillTag}</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <ClayButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => navigate(`/day/${currentDay}`)}
                >
                  <span>{profile.submissions[currentDay] ? 'View/Update Day ' + currentDay + ' Submission' : 'Open Day ' + currentDay + ' Challenge'}</span>
                  <ArrowRight className="w-4 h-4" />
                </ClayButton>

                <button
                  onClick={onOpenThoughtfulModal}
                  className="w-full sm:w-auto px-4 py-3 rounded-full bg-zinc-950 border border-white/20 text-xs font-semibold text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1)]"
                >
                  <Flame className="w-3.5 h-3.5 text-white" />
                  <span>Late-Night Helper</span>
                </button>
              </div>
            </ClayCard>
          </section>

          {/* 3. Challenge Progress & Overall Completion */}
          <section className="clay-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white text-base">Challenge Completion Progress</h2>
                <p className="text-xs text-zinc-400">{completedCount} of 60 Days Completed</p>
              </div>
              <div className="font-mono font-black text-xl text-white">{progressPercent}%</div>
            </div>

            {/* Progress Bar */}
            <div className="clay-progress-track h-3.5 w-full overflow-hidden p-0.5">
              <div
                className="clay-progress-fill h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(progressPercent, 4)}%` }}
              />
            </div>

            {/* D3 Monochromatic Progress Trajectory Chart */}
            <div className="pt-2">
              <D3ProgressChart completedDays={profile.completedDays} currentDay={currentDay} />
            </div>

            {/* 60-Day Grid Visualizer */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>60-Day Consistency Grid</span>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-white inline-block"></span> Done
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 border border-white inline-block"></span> Today
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-white/20 inline-block"></span> Locked
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-10 gap-1.5 p-3 bg-black/90 rounded-2xl border border-white/10">
                {Array.from({ length: 60 }, (_, i) => i + 1).map((dayNum) => {
                  const isCompleted = profile.completedDays.includes(dayNum);
                  const isCurrent = dayNum === currentDay;

                  let tileClass = 'bg-zinc-950 text-zinc-600 border-white/5';
                  if (isCompleted) {
                    tileClass = 'bg-white text-black font-bold border-white shadow-[1px_1px_3px_rgba(0,0,0,0.8)]';
                  } else if (isCurrent) {
                    tileClass = 'bg-zinc-800 text-white font-extrabold border-white animate-pulse';
                  }

                  return (
                    <button
                      key={dayNum}
                      onClick={() => navigate(`/day/${dayNum}`)}
                      title={`Day ${dayNum}: ${isCompleted ? 'Completed' : isCurrent ? 'Active Today' : 'Upcoming'}`}
                      className={`h-7 rounded-lg text-[10px] font-mono border flex items-center justify-center transition-all cursor-pointer ${tileClass}`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3 h-3 text-black" /> : dayNum}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Standings, Stats & Recruiter Status) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Stats Sidebar Card */}
          <ClayCard className="space-y-3 bg-zinc-900/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-white" /> Student Snapshot
            </h3>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 bg-black/80 rounded-xl border border-white/10">
                <span className="text-[10px] text-zinc-400 block font-mono">Current Streak</span>
                <span className="text-lg font-black text-white">{profile.currentStreak} Days</span>
              </div>
              <div className="p-2.5 bg-black/80 rounded-xl border border-white/10">
                <span className="text-[10px] text-zinc-400 block font-mono">Highest Streak</span>
                <span className="text-lg font-black text-white">{profile.highestStreak} Days</span>
              </div>
              <div className="p-2.5 bg-black/80 rounded-xl border border-white/10">
                <span className="text-[10px] text-zinc-400 block font-mono">Completed</span>
                <span className="text-lg font-black text-white">{completedCount}/60</span>
              </div>
              <div className="p-2.5 bg-black/80 rounded-xl border border-white/10">
                <span className="text-[10px] text-zinc-400 block font-mono">Grace Tokens</span>
                <span className="text-lg font-black text-white">{profile.graceTokensRemaining} Left</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 text-xs text-zinc-400 space-y-1">
              <div className="flex items-center justify-between">
                <span>Selected Track:</span>
                <strong className="text-white font-mono">{MOCK_TRACKS.find(t => t.id === profile.trackId)?.name.split(' ')[0]}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Public GitHub:</span>
                <strong className="text-white font-mono">{profile.githubUsername ? '@' + profile.githubUsername : 'Not set'}</strong>
              </div>
            </div>
          </ClayCard>

          {/* Top Performers Leaderboard Card (Claymorphism) */}
          <ClayCard className="space-y-3.5 bg-zinc-900/90 border-white/20">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-white" /> Top Performers
              </h3>
              <ClayBadge variant="white" size="sm">
                Highest Streaks
              </ClayBadge>
            </div>

            <div className="space-y-2">
              {TOP_PERFORMERS.map((student) => (
                <div
                  key={student.id}
                  className="p-2.5 rounded-xl bg-black/80 border border-white/10 flex items-center justify-between gap-2 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.05)] hover:border-white/30 transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg font-mono font-black text-xs flex items-center justify-center shrink-0 ${
                        student.rank === 1
                          ? 'bg-white text-black shadow-[1px_1px_3px_rgba(0,0,0,0.8)]'
                          : student.rank === 2
                          ? 'bg-zinc-700 text-white border border-white/20'
                          : student.rank === 3
                          ? 'bg-zinc-800 text-zinc-300 border border-white/10'
                          : 'bg-zinc-950 text-zinc-500'
                      }`}
                    >
                      #{student.rank}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-bold text-xs text-white truncate">{student.name}</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-mono truncate">
                        {student.college} • {student.track}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <ClayBadge variant={student.rank === 1 ? 'white' : 'dark'} size="sm">
                      <span className="font-extrabold">{student.streak}d</span>
                    </ClayBadge>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/leaderboard')}
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-950 border border-white/20 text-xs font-semibold text-zinc-300 hover:text-white hover:border-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[inset_1px_1px_2px_rgba(255,255,255,0.08)]"
            >
              <span>View Full Leaderboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </ClayCard>

          {/* Student Standings & Achievements Section (Claymorphism) */}
          <section className="space-y-3">
            <ClayCard className="space-y-4 bg-zinc-900/90 border-white/20">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
                    <Award className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                      Milestone Achievements
                    </h2>
                    <p className="text-[10px] text-zinc-400 font-mono">Unlock proof-of-work badges</p>
                  </div>
                </div>

                <ClayBadge variant="white" size="sm">
                  {
                    [
                      { unlocked: profile.highestStreak >= 5 },
                      { unlocked: profile.highestStreak >= 7 },
                      { unlocked: profile.totalCompletedDays >= 1 },
                      { unlocked: profile.totalCompletedDays >= 11 },
                      { unlocked: profile.totalCompletedDays >= 10 },
                      { unlocked: profile.totalCompletedDays >= 10 },
                      { unlocked: profile.totalCompletedDays >= 30 },
                      { unlocked: profile.totalCompletedDays >= 60 }
                    ].filter((m) => m.unlocked).length
                  } / 8 Unlocked
                </ClayBadge>
              </div>

              {/* Achievements Claymorphic Cards Grid */}
              <div className="space-y-2.5">
                {[
                  {
                    id: 'm1',
                    title: '5-Day Streak',
                    description: 'Maintained 5 consecutive days of public commits & posts',
                    unlocked: profile.highestStreak >= 5,
                    icon: Flame,
                    tag: 'Streak'
                  },
                  {
                    id: 'm2',
                    title: '7-Day Streak Warrior',
                    description: 'Maintained 7 consecutive daily GitHub commits & LinkedIn posts',
                    unlocked: profile.highestStreak >= 7,
                    icon: Zap,
                    tag: 'Streak'
                  },
                  {
                    id: 'm3',
                    title: 'Early Bird',
                    description: 'Submitted proof of work before 9:00 PM IST',
                    unlocked: profile.totalCompletedDays >= 1,
                    icon: Sun,
                    tag: 'Habit'
                  },
                  {
                    id: 'm4',
                    title: 'Night Owl Builder',
                    description: 'Consistently completed late-night engineering challenges',
                    unlocked: profile.totalCompletedDays >= 11,
                    icon: Moon,
                    tag: 'Habit'
                  },
                  {
                    id: 'm5',
                    title: 'Git Machine',
                    description: 'Pushed 10+ clean verified commits to public GitHub',
                    unlocked: profile.totalCompletedDays >= 10,
                    icon: GitCommit,
                    tag: 'Git'
                  },
                  {
                    id: 'm6',
                    title: 'LinkedIn Legend',
                    description: 'Shared 10 public proof-of-work updates with recruiters',
                    unlocked: profile.totalCompletedDays >= 10,
                    icon: Share2,
                    tag: 'Proof'
                  },
                  {
                    id: 'm7',
                    title: 'Halfway Hero (30 Days)',
                    description: 'Complete 30 days of the ABTalks challenge',
                    unlocked: profile.totalCompletedDays >= 30,
                    icon: Star,
                    tag: 'Milestone'
                  },
                  {
                    id: 'm8',
                    title: '60-Day ABTalks Legend',
                    description: 'Finish full 60-day challenge & unlock Recruiter Connect',
                    unlocked: profile.totalCompletedDays >= 60,
                    icon: Crown,
                    tag: 'Mastery'
                  }
                ].map((item) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                        item.unlocked
                          ? 'bg-zinc-950/90 border-white/30 text-white shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1)]'
                          : 'bg-black/50 border-white/10 text-zinc-500 opacity-60'
                      }`}
                    >
                      {/* Claymorphic Small Icon Tile */}
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                          item.unlocked
                            ? 'bg-white text-black border border-white shadow-[2px_2px_6px_rgba(0,0,0,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.2),inset_1px_1px_3px_rgba(255,255,255,0.9)]'
                            : 'bg-zinc-950 text-zinc-600 border border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.9)]'
                        }`}
                      >
                        {item.unlocked ? (
                          <IconComp className="w-5 h-5 text-black stroke-[2.2]" />
                        ) : (
                          <Lock className="w-4 h-4 text-zinc-600" />
                        )}
                      </div>

                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className={`font-extrabold text-xs truncate ${item.unlocked ? 'text-white' : 'text-zinc-400'}`}>
                            {item.title}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full uppercase border ${
                                item.unlocked
                                  ? 'bg-white/15 text-white border-white/30'
                                  : 'bg-zinc-900 text-zinc-600 border-white/5'
                              }`}
                            >
                              {item.unlocked ? 'Unlocked' : 'Locked'}
                            </span>

                            {item.unlocked && (
                              <button
                                onClick={() =>
                                  setSharingAchievement({
                                    title: item.title,
                                    description: item.description,
                                    tag: item.tag
                                  })
                                }
                                className="px-2 py-0.5 rounded-full bg-white text-black hover:bg-zinc-200 text-[9px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-[1px_1px_3px_rgba(0,0,0,0.8)]"
                                title="Share Achievement"
                              >
                                <Share2 className="w-2.5 h-2.5 text-black" />
                                <span>Share</span>
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-snug">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ClayCard>
          </section>
        </div>
      </div>

      {/* Social Share Achievement Modal */}
      {sharingAchievement && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSharingAchievement(null)}
        >
          <div
            className="clay-card-inflated bg-zinc-900 border-2 border-white/30 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-[0_0_50px_rgba(255,255,255,0.15)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSharingAchievement(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/20 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ClayBadge variant="white" size="sm" icon={<Share2 className="w-3.5 h-3.5 text-black" />}>
                  Share Milestone
                </ClayBadge>
                <span className="text-xs text-zinc-400 font-mono">Proof-of-Work</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">Showcase Your Milestone</h3>
              <p className="text-xs text-zinc-400">
                Share your achievements on LinkedIn and X (Twitter) to boost recruiter visibility!
              </p>
            </div>

            {/* Share Card Preview Box */}
            <div className="p-4 bg-black rounded-2xl border border-white/20 space-y-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white text-black font-black flex items-center justify-center text-xs shadow-[1px_1px_3px_rgba(0,0,0,0.8)]">
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block">{profile.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{profile.college}</span>
                  </div>
                </div>
                <ClayBadge variant="white" size="sm">
                  <Flame className="w-3.5 h-3.5 text-black" /> {profile.currentStreak} Days
                </ClayBadge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-white font-extrabold">
                  <Award className="w-4 h-4 text-white" />
                  <span>Unlocked: {sharingAchievement.title}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {sharingAchievement.description}
                </p>
              </div>

              <div className="text-[10px] font-mono text-zinc-500 pt-1">
                #ABTalks #60DaysOfCode #BuildInPublic #ProofOfWork
              </div>
            </div>

            {/* Pre-written Post Text Area */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400 font-bold block">
                Post Copy Preview
              </label>
              <div className="p-3 bg-zinc-950 rounded-xl border border-white/10 text-xs text-zinc-300 font-mono space-y-1 select-all">
                🎉 Just unlocked the &ldquo;{sharingAchievement.title}&rdquo; milestone on the #ABTalks 60-Day Coding Challenge! 🔥 Current Streak: {profile.currentStreak} Days. Building in public! #60DaysOfCode #BuildInPublic
              </div>
            </div>

            {/* Share Actions Grid */}
            <div className="space-y-2 pt-1">
              <a
                href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
                  `🎉 Just unlocked the "${sharingAchievement.title}" milestone on the ABTalks 60-Day Coding Challenge!\n\n🔥 Current Streak: ${profile.currentStreak} Days\n🎓 College: ${profile.college}\n\nTracking daily public commits on GitHub and proof-of-work. #60DaysOfCode #ABTalks #BuildInPublic`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-white text-black font-extrabold text-xs hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_6px_rgba(0,0,0,0.8)]"
              >
                <Share2 className="w-4 h-4 text-black" />
                <span>Share on LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-black/60 ml-auto" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `🎉 Just unlocked "${sharingAchievement.title}" on the @ABTalks 60-Day Coding Challenge!\n\n🔥 Streak: ${profile.currentStreak} Days\n#60DaysOfCode #BuildInPublic #ABTalks`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-zinc-950 border border-white/20 text-xs font-bold text-white hover:border-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[inset_1px_1px_2px_rgba(255,255,255,0.08)]"
                >
                  <Share2 className="w-3.5 h-3.5 text-white" />
                  <span>Share on X</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>

                <button
                  onClick={handleCopyShareText}
                  className="py-2.5 px-3 rounded-xl bg-zinc-950 border border-white/20 text-xs font-bold text-white hover:border-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[inset_1px_1px_2px_rgba(255,255,255,0.08)]"
                >
                  {copiedShareText ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                  <span>{copiedShareText ? 'Copied Text!' : 'Copy Text'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
