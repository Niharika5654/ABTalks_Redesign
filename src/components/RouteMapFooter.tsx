import React from 'react';
import { Route, ExternalLink, Check, Copy, Smartphone } from 'lucide-react';

interface RouteMapFooterProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const RouteMapFooter: React.FC<RouteMapFooterProps> = ({ currentRoute, navigate }) => {
  const [copied, setCopied] = React.useState(false);

  const routesText = `/\n/dashboard\n/day/12`;

  const handleCopy = () => {
    navigator.clipboard.writeText(routesText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="mt-16 border-t border-white/10 bg-black py-10 px-4 text-zinc-400">
      <div className="max-w-md mx-auto space-y-6">
        {/* Route Map Required Card */}
        <div className="clay-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Route className="w-4 h-4 text-white" />
              <span>Submission Route Map</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] font-mono text-zinc-300 hover:text-white bg-zinc-900 border border-white/20 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Map'}</span>
            </button>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Evaluators view at 390px mobile viewport. Click any route below to test directly:
          </p>

          {/* Exact 3 Routes per line */}
          <div className="bg-black/90 p-3 rounded-xl border border-white/10 font-mono text-xs space-y-2">
            <div
              onClick={() => navigate('/')}
              className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                currentRoute === '/'
                  ? 'bg-white text-black font-bold shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8)]'
                  : 'hover:bg-zinc-900 text-zinc-300'
              }`}
            >
              <span>/</span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">Landing Page</span>
            </div>

            <div
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                currentRoute === '/dashboard'
                  ? 'bg-white text-black font-bold shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8)]'
                  : 'hover:bg-zinc-900 text-zinc-300'
              }`}
            >
              <span>/dashboard</span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">Student Dashboard</span>
            </div>

            <div
              onClick={() => navigate('/day/12')}
              className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                currentRoute === '/day/12'
                  ? 'bg-white text-black font-bold shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8)]'
                  : 'hover:bg-zinc-900 text-zinc-300'
              }`}
            >
              <span>/day/12</span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">Challenge Day 12</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
            <Smartphone className="w-3.5 h-3.5 text-zinc-400" />
            <span>Target Viewport: 390px (Mobile-First Claymorphism)</span>
          </div>
        </div>

        {/* ABTalks Footer Credits */}
        <div className="text-center text-xs text-zinc-600 space-y-1">
          <p className="font-semibold text-zinc-400">ABTalks 60-Day Coding Challenge</p>
          <p>Built for Indian College Students • Monochromatic Dark Claymorphism</p>
        </div>
      </div>
    </footer>
  );
};
