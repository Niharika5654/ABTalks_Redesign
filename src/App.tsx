import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { RouteMapFooter } from './components/RouteMapFooter';
import { ThoughtfulFeatureModal } from './components/ThoughtfulFeatureModal';
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { DayView } from './views/DayView';
import { EdgeCaseType, StudentProfile, TrackId } from './types';
import { MOCK_PROFILES, MOCK_TASKS } from './data/mockData';

export default function App() {
  // Routing state based on current window.location.pathname
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Edge Case state for live testing
  const [edgeCase, setEdgeCase] = useState<EdgeCaseType>('normal_day12');

  // Active student profile (syncs with edgeCase selection)
  const [profile, setProfile] = useState<StudentProfile>(MOCK_PROFILES.normal_day12);

  // Selected Track
  const [selectedTrack, setSelectedTrack] = useState<TrackId>('fullstack');

  // Thoughtful feature modal state
  const [isThoughtfulModalOpen, setIsThoughtfulModalOpen] = useState(false);

  // 390px Mobile Viewport Frame Simulation toggle
  const [isMobileSimulated, setIsMobileSimulated] = useState(false);

  // Synchronize profile state when edge case switches
  useEffect(() => {
    setProfile(MOCK_PROFILES[edgeCase]);
  }, [edgeCase]);

  // Handle browser popstate / back / forward button navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom client navigation function
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parse path to route
  const getRouteView = () => {
    const path = currentPath;

    if (path === '/dashboard') {
      return (
        <DashboardView
          navigate={navigate}
          profile={profile}
          setProfile={setProfile}
          edgeCase={edgeCase}
          onOpenThoughtfulModal={() => setIsThoughtfulModalOpen(true)}
        />
      );
    }

    if (path.startsWith('/day/')) {
      const dayStr = path.replace('/day/', '');
      const dayNum = parseInt(dayStr, 10) || 12;

      return (
        <DayView
          dayNumber={dayNum}
          navigate={navigate}
          profile={profile}
          setProfile={setProfile}
          onOpenThoughtfulModal={() => setIsThoughtfulModalOpen(true)}
        />
      );
    }

    // Default to Landing Page (/)
    return (
      <LandingView
        navigate={navigate}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
    );
  };

  const handleUseGraceToken = () => {
    if (profile.graceTokensRemaining > 0) {
      setProfile((prev) => ({
        ...prev,
        graceTokensRemaining: prev.graceTokensRemaining - 1,
        isMissedDayWarning: false,
        currentStreak: prev.highestStreak > 0 ? prev.highestStreak : 12
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased">
      {/* Top Navigation */}
      <Navbar
        currentRoute={currentPath}
        navigate={navigate}
        edgeCase={edgeCase}
        setEdgeCase={setEdgeCase}
        isMobileSimulated={isMobileSimulated}
        setIsMobileSimulated={setIsMobileSimulated}
        onOpenThoughtfulModal={() => setIsThoughtfulModalOpen(true)}
        streakCount={profile.currentStreak}
      />

      {/* Main Container: Mobile-first responsive grid covering full viewport width */}
      <main className="px-4 py-6">
        <div
          className={`mx-auto transition-all duration-300 ${
            isMobileSimulated
              ? 'max-w-[390px] border-4 border-zinc-800 rounded-[40px] p-4 bg-black shadow-[0_0_50px_rgba(255,255,255,0.08)] my-4'
              : 'max-w-7xl w-full'
          }`}
        >
          {isMobileSimulated && (
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-[10px] font-mono text-zinc-500">
              <span>390px Mobile Viewport Frame</span>
              <span className="w-12 h-3 rounded-full bg-zinc-800 inline-block"></span>
            </div>
          )}

          {getRouteView()}
        </div>
      </main>

      {/* Route Map Footer */}
      <RouteMapFooter currentRoute={currentPath} navigate={navigate} />

      {/* Thoughtful Late-Night Feature Modal */}
      <ThoughtfulFeatureModal
        isOpen={isThoughtfulModalOpen}
        onClose={() => setIsThoughtfulModalOpen(false)}
        dayNumber={12}
        taskTitle={MOCK_TASKS[12]?.title || 'REST API Rate Limiter'}
        graceTokens={profile.graceTokensRemaining}
        onUseGraceToken={handleUseGraceToken}
      />
    </div>
  );
}
