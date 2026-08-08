import React, { useState, useEffect } from 'react';
import { ClayCard } from '../components/ClayCard';
import { ClayButton } from '../components/ClayButton';
import { ClayBadge } from '../components/ClayBadge';
import { ClayInput } from '../components/ClayInput';
import { DayTask, StudentProfile, Submission } from '../types';
import { MOCK_TASKS } from '../data/mockData';
import {
  GitCommit,
  Share2,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award,
  BookOpen,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface DayViewProps {
  dayNumber: number;
  navigate: (route: string) => void;
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onOpenThoughtfulModal: () => void;
}

export const DayView: React.FC<DayViewProps> = ({
  dayNumber,
  navigate,
  profile,
  setProfile,
  onOpenThoughtfulModal
}) => {
  const task: DayTask = MOCK_TASKS[dayNumber] || MOCK_TASKS[12];
  const existingSubmission = profile.submissions[dayNumber];

  const [githubUrl, setGithubUrl] = useState(existingSubmission?.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(existingSubmission?.linkedinUrl || '');
  const [reflectionText, setReflectionText] = useState(existingSubmission?.reflectionText || '');
  
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const sub = profile.submissions[dayNumber];
    if (sub) {
      setGithubUrl(sub.githubUrl);
      setLinkedinUrl(sub.linkedinUrl);
      setReflectionText(sub.reflectionText || '');
    } else {
      setGithubUrl('');
      setLinkedinUrl('');
      setReflectionText('');
    }
  }, [dayNumber, profile.submissions]);

  const handleCopyCode = () => {
    if (task.starterCode) {
      navigator.clipboard.writeText(task.starterCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Basic URL format check
    if (!githubUrl.includes('github.com')) {
      setValidationError('Please enter a valid GitHub repository or commit URL (e.g., https://github.com/username/repo/commit/...)');
      return;
    }

    if (!linkedinUrl.includes('linkedin.com')) {
      setValidationError('Please enter a valid LinkedIn post URL (e.g., https://linkedin.com/posts/username/...)');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: Submission = {
        dayNumber,
        githubUrl,
        linkedinUrl,
        reflectionText,
        submittedAt: new Date().toISOString(),
        verified: true
      };

      setProfile((prev) => {
        const completedSet = new Set<number>(prev.completedDays);
        completedSet.add(dayNumber);
        const newCompletedDays = Array.from(completedSet).sort((a: number, b: number) => a - b);
        const newStreak = prev.currentStreak + (prev.completedDays.includes(dayNumber) ? 0 : 1);

        return {
          ...prev,
          completedDays: newCompletedDays,
          currentStreak: newStreak,
          highestStreak: Math.max(prev.highestStreak, newStreak),
          totalCompletedDays: newCompletedDays.length,
          submissions: {
            ...prev.submissions,
            [dayNumber]: newSubmission
          }
        };
      });

      setIsSubmitting(false);
      setShowCelebration(true);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* 1. Day Navigation Bar */}
      <div className="flex items-center justify-between bg-zinc-950 p-2.5 rounded-2xl border border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]">
        <button
          onClick={() => navigate(`/day/${Math.max(1, dayNumber - 1)}`)}
          disabled={dayNumber <= 1}
          className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Day {dayNumber - 1}</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Challenge Day {dayNumber}
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">60 Days of ABTalks</span>
        </div>

        <button
          onClick={() => navigate(`/day/${Math.min(60, dayNumber + 1)}`)}
          disabled={dayNumber >= 60}
          className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 cursor-pointer"
        >
          <span>Day {dayNumber + 1}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2-Column Responsive Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Task Info, Specs & Code) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 2. Task Header Card */}
          <ClayCard inflated className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <ClayBadge variant="white" size="sm">
                    Day {task.dayNumber}
                  </ClayBadge>
                  <ClayBadge variant="dark" size="sm">
                    {task.difficulty}
                  </ClayBadge>
                </div>
                <div className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span>Est. {task.estimatedMinutes} mins</span>
                </div>
              </div>

              <h1 className="text-2xl font-extrabold text-white leading-tight">{task.title}</h1>
              <p className="text-xs text-zinc-300 leading-relaxed">{task.description}</p>
            </div>

            <div className="p-3 bg-black/80 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-mono">Recruiter Skill Spotlight:</span>
              <span className="font-bold text-white font-mono">{task.recruiterSkillTag}</span>
            </div>
          </ClayCard>

          {/* 3. Learning Objectives & Task Requirements */}
          <ClayCard className="space-y-3">
            <h2 className="font-bold text-sm uppercase tracking-wider text-white flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-white" /> Key Deliverables & Specifications
            </h2>

            <ul className="space-y-2 text-xs text-zinc-300">
              {task.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 bg-black/50 p-2.5 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </ClayCard>

          {/* 4. Starter Code & Hints */}
          {task.starterCode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-white" /> Starter Code Template
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] font-mono text-zinc-300 hover:text-white bg-zinc-900 border border-white/20 px-2.5 py-1 rounded-full cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="bg-black/95 p-4 rounded-2xl border border-white/10 font-mono text-xs text-zinc-200 overflow-x-auto shadow-[inset_4px_4px_8px_rgba(0,0,0,0.95)]">
                <code>{task.starterCode}</code>
              </pre>
            </div>
          )}

          {/* Hints Card */}
          {task.hints && task.hints.length > 0 && (
            <div className="bg-zinc-950 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
              <span className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-white" /> Pro Hints for Students
              </span>
              <ul className="list-disc list-inside text-zinc-400 space-y-1 pl-1">
                {task.hints.map((hint, idx) => (
                  <li key={idx}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Submission Form & Guidance) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          {/* 5. Proof of Work Submission Form */}
          <section className="clay-card-inflated p-6 space-y-5 bg-zinc-900 border-white/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h2 className="font-extrabold text-base text-white flex items-center gap-2">
                  <span>Submit Proof of Work</span>
                  {existingSubmission && (
                    <ClayBadge variant="white" size="sm">
                      VERIFIED
                    </ClayBadge>
                  )}
                </h2>
                <p className="text-xs text-zinc-400">Provide GitHub commit URL and LinkedIn post URL</p>
              </div>

              <button
                onClick={onOpenThoughtfulModal}
                className="p-2 rounded-xl bg-black border border-white/20 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Open Late-Night Helper"
              >
                <Flame className="w-4 h-4 text-white" />
              </button>
            </div>

            {validationError && (
              <div className="p-3 bg-black border border-white/40 rounded-xl text-xs text-zinc-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitProof} className="space-y-4">
              <ClayInput
                label="GitHub Repository or Commit URL"
                placeholder="https://github.com/username/abtalks-60days/commit/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                icon={<GitCommit className="w-4 h-4" />}
                required
                hint="Must be a public GitHub repository or commit"
              />

              <ClayInput
                label="LinkedIn Post URL"
                placeholder="https://linkedin.com/posts/username/day12-abtalks-..."
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                icon={<Share2 className="w-4 h-4" />}
                required
                hint="Include hashtag #ABTalks #60DaysOfCode for recruiter indexing"
              />

              <ClayInput
                label="Daily Reflection & Engineering Notes (Optional)"
                placeholder="What key challenges did you encounter while building today's task?"
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                isTextArea
                rows={3}
              />

              <ClayButton
                variant="primary"
                size="lg"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    <span>Verifying Proof...</span>
                  </span>
                ) : existingSubmission ? (
                  <span>Update Day {dayNumber} Submission</span>
                ) : (
                  <span>Submit Day {dayNumber} Proof & Maintain Streak</span>
                )}
              </ClayButton>
            </form>
          </section>

          {/* Verification Tip */}
          <div className="p-4 bg-zinc-950 rounded-2xl border border-white/10 text-xs text-zinc-400 space-y-1 font-mono">
            <span className="text-white font-bold block flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-white" /> Daily Submission Rule
            </span>
            <p>
              Submissions automatically lock in at 11:59 PM IST. If you miss a deadline, use your Grace Tokens to preserve your streak.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Success / Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-zinc-950 border border-white/30 rounded-3xl p-6 text-center space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative">
            <div className="w-16 h-16 mx-auto rounded-full bg-white text-black flex items-center justify-center shadow-[4px_4px_16px_rgba(0,0,0,0.8)]">
              <Flame className="w-8 h-8 text-black" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">Day {dayNumber} Proof Verified!</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Your GitHub commit & LinkedIn post have been registered. Streak updated to{' '}
                <strong className="text-white">{profile.currentStreak} Days</strong>!
              </p>
            </div>

            <div className="p-3 bg-zinc-900 rounded-2xl border border-white/10 text-xs font-mono text-zinc-300">
              Recruiter visibility updated in dashboard.
            </div>

            <div className="flex flex-col gap-2">
              <ClayButton
                variant="primary"
                fullWidth
                onClick={() => {
                  setShowCelebration(false);
                  navigate('/dashboard');
                }}
              >
                Go to Dashboard
              </ClayButton>

              <button
                onClick={() => {
                  setShowCelebration(false);
                  if (dayNumber < 60) navigate(`/day/${dayNumber + 1}`);
                }}
                className="text-xs text-zinc-400 hover:text-white py-2 font-mono underline cursor-pointer"
              >
                Continue to Day {dayNumber + 1} &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
