import React from 'react';
import { ClayBadge } from './ClayBadge';
import { ClayButton } from './ClayButton';
import { EdgeCaseType } from '../types';
import { Code2, Flame, Moon, Smartphone, ShieldAlert, Sparkles, Layout } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
  edgeCase: EdgeCaseType;
  setEdgeCase: (ec: EdgeCaseType) => void;
  isMobileSimulated: boolean;
  setIsMobileSimulated: (val: boolean) => void;
  onOpenThoughtfulModal: () => void;
  streakCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  navigate,
  edgeCase,
  setEdgeCase,
  isMobileSimulated,
  setIsMobileSimulated,
  onOpenThoughtfulModal,
  streakCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white leading-none">
                ABTalks
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-zinc-300">
                60D
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono tracking-tight block">
              Proof of Work
            </span>
          </div>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden sm:flex items-center gap-1.5 p-1 bg-zinc-950/80 rounded-full border border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]">
          <button
            onClick={() => navigate('/')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              currentRoute === '/'
                ? 'bg-white text-black font-bold shadow-[2px_2px_6px_rgba(0,0,0,0.8)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Landing
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              currentRoute === '/dashboard'
                ? 'bg-white text-black font-bold shadow-[2px_2px_6px_rgba(0,0,0,0.8)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/day/12')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              currentRoute === '/day/12'
                ? 'bg-white text-black font-bold shadow-[2px_2px_6px_rgba(0,0,0,0.8)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Day 12
          </button>
        </nav>

        {/* Right Actions: Streak Counter, Edge Case Controls & Mobile Frame Toggle */}
        <div className="flex items-center gap-2">
          {/* Late-Night Thoughtful Feature Button */}
          <button
            onClick={onOpenThoughtfulModal}
            title="Late-Night Focus & Midnight Grace Protection"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition-all cursor-pointer shadow-[inset_1px_1px_2px_rgba(255,255,255,0.15)]"
          >
            <Moon className="w-3.5 h-3.5 text-white" />
            <span className="hidden md:inline">Late-Night Mode</span>
          </button>

          {/* Streak pill */}
          <ClayBadge variant={streakCount > 0 ? 'white' : 'dark'} size="sm" icon={<Flame className="w-3.5 h-3.5" />}>
            {streakCount} {streakCount === 1 ? 'Day' : 'Days'}
          </ClayBadge>

          {/* Viewport Frame Toggle (for Desktop reviewers wanting to see 390px mobile container) */}
          <button
            onClick={() => setIsMobileSimulated(!isMobileSimulated)}
            title={isMobileSimulated ? "Switch to Full Screen" : "Simulate 390px Mobile Viewport"}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono">{isMobileSimulated ? '390px' : 'Responsive'}</span>
          </button>
        </div>
      </div>

      {/* Edge Case Quick Tester Drawer / Bar */}
      <div className="mt-2.5 pt-2 border-t border-white/5 max-w-5xl mx-auto flex items-center justify-between text-[11px] text-zinc-400 overflow-x-auto gap-2 no-scrollbar">
        <span className="shrink-0 font-mono text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-zinc-400" /> State Test:
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setEdgeCase('normal_day12')}
            className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
              edgeCase === 'normal_day12'
                ? 'bg-white/20 text-white font-bold border border-white/30'
                : 'hover:text-zinc-200'
            }`}
          >
            Day 12 Active (Niharika)
          </button>
          <button
            onClick={() => setEdgeCase('day1_fresh')}
            className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
              edgeCase === 'day1_fresh'
                ? 'bg-white/20 text-white font-bold border border-white/30'
                : 'hover:text-zinc-200'
            }`}
          >
            Day 1 Fresh (Ananya)
          </button>
          <button
            onClick={() => setEdgeCase('missed_day')}
            className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
              edgeCase === 'missed_day'
                ? 'bg-white/20 text-white font-bold border border-white/30'
                : 'hover:text-zinc-200'
            }`}
          >
            Missed Day Alert (Vikram)
          </button>
          <button
            onClick={() => setEdgeCase('empty_profile')}
            className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
              edgeCase === 'empty_profile'
                ? 'bg-white/20 text-white font-bold border border-white/30'
                : 'hover:text-zinc-200'
            }`}
          >
            Empty Profile
          </button>
        </div>
      </div>
    </header>
  );
};
