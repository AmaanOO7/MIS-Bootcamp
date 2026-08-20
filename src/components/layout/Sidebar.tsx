import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  CalendarRange,
  BookOpen,
  FolderKanban,
  HelpCircle,
  BarChart3,
  TrendingUp,
  MessageSquare,
  Award,
  Settings as SettingsIcon,
  X,
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'roadmap'
  | 'training'
  | 'projects'
  | 'quizzes'
  | 'skills'
  | 'progress'
  | 'interview'
  | 'assessment'
  | 'settings';

interface NavItem {
  id: PageId;
  label: string;
  icon: typeof LayoutDashboard;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'roadmap', label: '14-Day Roadmap', icon: CalendarRange },
  { id: 'training', label: 'Daily Training', icon: BookOpen },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
  { id: 'skills', label: 'Skills', icon: BarChart3 },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
  { id: 'assessment', label: 'Final Assessment', icon: Award },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

interface SidebarProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 leading-tight">MIS Bootcamp</p>
              <p className="text-xs text-slate-500">Job-Ready in 14 Days</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = current === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      onCloseMobile();
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    <Icon className={cn('h-5 w-5 shrink-0', active ? 'text-blue-600' : 'text-slate-400')} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-200 px-5 py-4">
          <p className="text-xs text-slate-400">14-Day Bootcamp v1.0</p>
        </div>
      </aside>
    </>
  );
}
