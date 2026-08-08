import React, { useState } from 'react';
import { ClayCard } from '../components/ClayCard';
import { ClayButton } from '../components/ClayButton';
import { ClayBadge } from '../components/ClayBadge';
import { MOCK_TRACKS, MOCK_FAQS, MOCK_RECRUITERS } from '../data/mockData';
import { TrackId } from '../types';
import {
  Code2,
  Flame,
  GitCommit,
  Share2,
  Trophy,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Users,
  Building2,
  Clock,
  Briefcase
} from 'lucide-react';

interface LandingViewProps {
  navigate: (route: string) => void;
  selectedTrack: TrackId;
  setSelectedTrack: (track: TrackId) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  navigate,
  selectedTrack,
  setSelectedTrack
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentTrackData = MOCK_TRACKS.find((t) => t.id === selectedTrack) || MOCK_TRACKS[0];

  return (
    <div className="space-y-12 pb-8">
      {/* 1. Hero Section */}
      <section className="space-y-6 pt-4 text-center">
        {/* Trust pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/20 text-xs font-medium text-zinc-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.15)]">
          <Flame className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>India&apos;s #1 Proof-of-Work Challenge for College Coders</span>
        </div>

        {/* Title */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Build Daily. Maintain Your Streak. <br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent underline decoration-white/30 decoration-wavy underline-offset-8">
              Get Recruiter Visible.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md mx-auto">
            A 60-day coding challenge built for Indian college students. Pick a track, ship code every night, and share public proof of work on GitHub and LinkedIn.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-sm mx-auto">
          <ClayButton
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/dashboard')}
          >
            <span>Start 60-Day Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </ClayButton>

          <ClayButton
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => navigate('/day/12')}
          >
            <span>Preview Day 12 Task</span>
          </ClayButton>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto pt-2 text-[11px] font-mono text-zinc-400">
          <div className="bg-zinc-900/80 p-2 rounded-xl border border-white/10 text-center">
            <span className="block font-bold text-white text-sm">60</span>
            <span>Days</span>
          </div>
          <div className="bg-zinc-900/80 p-2 rounded-xl border border-white/10 text-center">
            <span className="block font-bold text-white text-sm">2</span>
            <span>Proofs/Day</span>
          </div>
          <div className="bg-zinc-900/80 p-2 rounded-xl border border-white/10 text-center">
            <span className="block font-bold text-white text-sm">100%</span>
            <span>Free</span>
          </div>
        </div>
      </section>

      {/* 2. How ABTalks Works (The Proof Cycle) */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight">The 3-Step Daily Proof Cycle</h2>
          <p className="text-xs text-zinc-400">Designed to fit after-college hours (10 PM - 2 AM IST)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ClayCard inflated className="space-y-3 relative overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-sm shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
              1
            </div>
            <h3 className="font-bold text-white text-base">Pick Your Track</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Select Full-Stack, AI/ML, Backend Systems, or Mobile App Dev. Get daily structured tasks with code starters and clear specifications.
            </p>
          </ClayCard>

          <ClayCard inflated className="space-y-3 relative overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-sm shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
              2
            </div>
            <h3 className="font-bold text-white text-base">Build & Commit Code</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Spend 45-60 mins coding. Push verified commits to your public GitHub repository to prove your engineering consistency.
            </p>
          </ClayCard>

          <ClayCard inflated className="space-y-3 relative overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-sm shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
              3
            </div>
            <h3 className="font-bold text-white text-base">Share LinkedIn Proof</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Post your daily reflection with code screenshots on LinkedIn. Tech recruiters actively search for students maintaining #BuildInPublic streaks.
            </p>
          </ClayCard>
        </div>
      </section>

      {/* 3. Interactive Track Selection */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Choose Your 60-Day Track</h2>
            <p className="text-xs text-zinc-400">Switch anytime • All tracks tailored for college students</p>
          </div>
          <ClayBadge variant="white" size="sm">
            {currentTrackData.enrolledStudents}+ Enrolled
          </ClayBadge>
        </div>

        {/* Track Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MOCK_TRACKS.map((track) => (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                selectedTrack === track.id
                  ? 'bg-white text-black font-bold border-white shadow-[4px_4px_10px_rgba(0,0,0,0.9),inset_1px_1px_2px_rgba(255,255,255,0.9)]'
                  : 'bg-zinc-950 text-zinc-300 border-white/10 hover:border-white/20 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]'
              }`}
            >
              <div className="text-xs font-bold truncate">{track.name}</div>
              <div className="text-[10px] opacity-75 font-mono">{track.enrolledStudents} students</div>
            </button>
          ))}
        </div>

        {/* Selected Track Details Card */}
        <ClayCard inflated className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white text-base">{currentTrackData.name}</h3>
              <ClayBadge variant="dark" size="sm" icon={<Users className="w-3 h-3" />}>
                {currentTrackData.enrolledStudents} Coders Active
              </ClayBadge>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">{currentTrackData.description}</p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-zinc-400">Core Tech Stack Mastered:</span>
            <div className="flex flex-wrap gap-1.5">
              {currentTrackData.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-xs text-zinc-200 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>45-60 mins daily commitment</span>
            </div>
            <ClayButton variant="primary" size="sm" onClick={() => navigate('/dashboard')}>
              Enroll in {currentTrackData.name.split(' ')[0]} Track
            </ClayButton>
          </div>
        </ClayCard>
      </section>

      {/* 4. Recruiter Trust & Hiring Network */}
      <section className="clay-card p-6 space-y-4">
        <div className="space-y-1 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-zinc-300">
            <Briefcase className="w-3.5 h-3.5 text-white" /> Recruiter Visibility Engine
          </div>
          <h2 className="text-lg font-bold text-white">Engineering Teams Watching ABTalks Streaks</h2>
          <p className="text-xs text-zinc-400">
            Recruiters prioritize students who demonstrate 60 consecutive days of verified GitHub commits.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
          {MOCK_RECRUITERS.map((company) => (
            <div
              key={company}
              className="p-3 bg-zinc-950 rounded-xl border border-white/10 text-center font-mono text-xs font-semibold text-zinc-300 flex items-center justify-center gap-1.5 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]"
            >
              <Building2 className="w-3.5 h-3.5 text-white" />
              <span>{company}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQs */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-zinc-400">Everything you need to know before committing to 60 days</p>
        </div>

        <div className="space-y-2">
          {MOCK_FAQS.map((faq, idx) => (
            <div
              key={idx}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="clay-card p-4 space-y-2 cursor-pointer transition-colors hover:border-white/20"
            >
              <div className="flex items-center justify-between text-sm font-bold text-white">
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-white' : ''
                  }`}
                />
              </div>
              {openFaq === idx && (
                <p className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-white/10 animate-in fade-in duration-150">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <section className="clay-card-inflated p-6 text-center space-y-4 bg-zinc-900 border-white/20">
        <div className="w-12 h-12 mx-auto rounded-full bg-white text-black flex items-center justify-center shadow-[4px_4px_12px_rgba(0,0,0,0.8)]">
          <Trophy className="w-6 h-6" />
        </div>

        <div className="space-y-2 max-w-sm mx-auto">
          <h2 className="text-xl font-extrabold text-white">Ready to Build Your 60-Day Streak?</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Join thousands of Indian college students shipping code tonight. Zero cost, maximum growth.
          </p>
        </div>

        <ClayButton variant="primary" size="lg" fullWidth onClick={() => navigate('/dashboard')}>
          <span>Enter Student Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </ClayButton>
      </section>
    </div>
  );
};
