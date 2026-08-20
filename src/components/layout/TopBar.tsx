import { Menu } from 'lucide-react';
import type { PageId } from './Sidebar';

interface TopBarProps {
  onOpenMobile: () => void;
  current: PageId;
}

const TITLES: Record<PageId, string> = {
  dashboard: 'Dashboard',
  roadmap: '14-Day Roadmap',
  training: 'Daily Training',
  projects: 'Projects',
  quizzes: 'Quizzes',
  skills: 'Skills',
  progress: 'Progress',
  interview: 'Interview Prep',
  assessment: 'Final Assessment',
  settings: 'Settings',
};

export function TopBar({ onOpenMobile, current }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:px-8">
      <button
        onClick={onOpenMobile}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <h1 className="text-lg font-semibold text-slate-900">{TITLES[current]}</h1>
    </header>
  );
}
