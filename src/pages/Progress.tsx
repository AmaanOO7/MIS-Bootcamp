import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SKILLS } from '@/data/curriculum';
import { TrendingUp, ListChecks, CalendarDays, HelpCircle, FolderKanban, Brain, BarChart3 } from 'lucide-react';

interface ProgressProps {
  overall: {
    overallPercent: number;
    completedTasks: number;
    totalTasks: number;
    daysCompleted: number;
    currentDay: number;
  };
  skillRatings: Record<string, number>;
  quizStats: { total: number; completed: number; average: number; best: number };
  projectStats: { total: number; completed: number; remaining: number; percent: number };
  confidenceTrend: { dayId: number; title: string; rating: number; dayStatus: string }[];
}

const CONFIDENCE_LABELS = [
  'Not rated',
  'Don\'t understand',
  'Beginner',
  'Can do with help',
  'Can do independently',
  'Can explain in an interview',
];

export function Progress({ overall, skillRatings, quizStats, projectStats, confidenceTrend }: ProgressProps) {
  const stats = [
    {
      label: 'Overall Progress',
      value: `${overall.overallPercent}%`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Tasks Completed',
      value: `${overall.completedTasks}/${overall.totalTasks}`,
      icon: ListChecks,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Days Completed',
      value: `${overall.daysCompleted}/14`,
      icon: CalendarDays,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Quiz Average',
      value: quizStats.completed > 0 ? `${quizStats.average}%` : '—',
      icon: HelpCircle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Projects Completed',
      value: `${projectStats.completed}/${projectStats.total}`,
      icon: FolderKanban,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
  ];

  const ratedDays = confidenceTrend.filter((d) => d.rating > 0);
  const avgConfidence = ratedDays.length > 0
    ? (ratedDays.reduce((sum, d) => sum + d.rating, 0) / ratedDays.length).toFixed(1)
    : '—';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Progress</h2>
        <p className="mt-1 text-sm text-slate-500">
          An overview of your bootcamp completion and skill development.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Confidence Trend */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-slate-400" />
              Confidence Trend
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Average Confidence:</span>
              <span className="text-lg font-bold text-slate-900">{avgConfidence}</span>
              <span className="text-sm text-slate-400">/ 5</span>
            </div>
          </div>
          <div className="space-y-3">
            {confidenceTrend.map((day) => {
              const isLocked = day.dayStatus === 'locked';
              return (
                <div key={day.dayId} className={`flex items-center gap-3 ${isLocked ? 'opacity-40' : ''}`}>
                  <span className="w-20 shrink-0 text-xs font-medium text-slate-500">
                    Day {day.dayId}
                  </span>
                  <div className="flex-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div
                          key={rating}
                          className={`h-3 flex-1 rounded-full ${
                            day.rating >= rating
                              ? rating >= 4
                                ? 'bg-emerald-500'
                                : rating >= 3
                                ? 'bg-blue-500'
                                : 'bg-amber-500'
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="w-28 shrink-0 text-right text-xs text-slate-400">
                    {day.rating > 0 ? CONFIDENCE_LABELS[day.rating] : isLocked ? 'Locked' : 'Not rated'}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Skill progress cards */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-slate-400" />
              Skill Progress
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
            {SKILLS.map((skill) => {
              const value = skillRatings[skill.id] ?? 0;
              return (
                <div key={skill.id}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                    <span className="text-sm text-slate-500">{value}%</span>
                  </div>
                  <ProgressBar value={value} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
