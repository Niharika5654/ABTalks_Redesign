import React, { useState, useEffect } from 'react';
import { ClayCard } from './ClayCard';
import { ClayButton } from './ClayButton';
import { ClayBadge } from './ClayBadge';
import { Moon, Clock, ShieldCheck, Copy, Check, Sparkles, X, Share2, Flame } from 'lucide-react';

interface ThoughtfulFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber?: number;
  taskTitle?: string;
  graceTokens: number;
  onUseGraceToken: () => void;
}

export const ThoughtfulFeatureModal: React.FC<ThoughtfulFeatureModalProps> = ({
  isOpen,
  onClose,
  dayNumber = 12,
  taskTitle = 'REST API Rate Limiter',
  graceTokens,
  onUseGraceToken
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 24, seconds: 18 });
  const [copiedType, setCopiedType] = useState<'linkedin' | 'commit' | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const linkedinTemplate = `🚀 Day ${dayNumber}/60 of ABTalks Coding Challenge!\n\nToday I built: ${taskTitle}\n\n💡 Key learnings:\n- Implemented custom sliding window rate limiting in Express\n- Set HTTP 429 status code and X-RateLimit headers\n- Protected API routes against DDoS and request spam\n\nCode Repo: https://github.com/rahul-codes-dev/abtalks-60days\n\n#ABTalks #60DaysOfCode #BuildInPublic #IndianDevelopers #SoftwareEngineering`;

  const commitTemplate = `feat(day${dayNumber}): implement ${taskTitle.toLowerCase()} with rate limiting tests`;

  const copyToClipboard = (text: string, type: 'linkedin' | 'commit') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-zinc-950 border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-6 space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900 border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-zinc-900 border border-white/20 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Late-Night Study Companion</h3>
              <p className="text-xs text-zinc-400">Tailored for Indian college students coding late</p>
            </div>
          </div>
        </div>

        {/* Feature 1: IST Midnight Deadline Timer */}
        <ClayCard inflated className="space-y-3 bg-zinc-900/90">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white" /> Midnight IST Reset Timer
            </span>
            <ClayBadge variant="white" size="sm">
              ACTIVE
            </ClayBadge>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center py-2 bg-black/60 rounded-2xl border border-white/10">
            <div>
              <div className="font-mono text-2xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-[10px] text-zinc-500 uppercase">Hours</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-[10px] text-zinc-500 uppercase">Mins</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-[10px] text-zinc-500 uppercase">Secs</div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Submitting before 11:59 PM IST preserves your daily streak automatically.
          </p>
        </ClayCard>

        {/* Feature 2: Grace Token Protector */}
        <ClayCard className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="font-bold text-sm text-white">Streak Freeze Grace Token</span>
            </div>
            <ClayBadge variant="white" size="sm">
              {graceTokens} Available
            </ClayBadge>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Had college exams or late lab work yesterday? Use a Grace Token to recover broken streak instantly without restarting from Day 1.
          </p>

          <ClayButton
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onUseGraceToken}
            disabled={graceTokens <= 0}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Apply 1 Grace Token ({graceTokens} Left)</span>
          </ClayButton>
        </ClayCard>

        {/* Feature 3: Auto Social & Commit Generator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-white" /> 1-Click Social Proof Generator
            </span>
          </div>

          {/* LinkedIn Post Copy */}
          <div className="bg-zinc-900 border border-white/10 p-3 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>LinkedIn Proof Post (Day {dayNumber})</span>
              <button
                onClick={() => copyToClipboard(linkedinTemplate, 'linkedin')}
                className="flex items-center gap-1 text-[11px] font-mono text-white bg-black border border-white/20 px-2.5 py-1 rounded-full cursor-pointer hover:bg-zinc-800 transition-colors"
              >
                {copiedType === 'linkedin' ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'linkedin' ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
            <p className="text-[11px] font-mono text-zinc-300 line-clamp-3 bg-black/80 p-2 rounded-xl border border-white/5">
              {linkedinTemplate}
            </p>
          </div>

          {/* Git Commit Copy */}
          <div className="bg-zinc-900 border border-white/10 p-3 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Git Commit Message</span>
              <button
                onClick={() => copyToClipboard(commitTemplate, 'commit')}
                className="flex items-center gap-1 text-[11px] font-mono text-white bg-black border border-white/20 px-2.5 py-1 rounded-full cursor-pointer hover:bg-zinc-800 transition-colors"
              >
                {copiedType === 'commit' ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'commit' ? 'Copied!' : 'Copy Commit'}</span>
              </button>
            </div>
            <code className="block text-[11px] font-mono text-zinc-200 bg-black/80 p-2 rounded-xl border border-white/5">
              git commit -m &quot;{commitTemplate}&quot;
            </code>
          </div>
        </div>

        <ClayButton variant="primary" fullWidth onClick={onClose}>
          Done / Close
        </ClayButton>
      </div>
    </div>
  );
};
