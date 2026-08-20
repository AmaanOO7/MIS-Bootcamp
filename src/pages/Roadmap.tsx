import { Card, CardContent } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DAYS, SKILLS } from '@/data/curriculum';
import { formatMinutes } from '@/lib/utils';
import { Lock, ListChecks, Clock, ArrowRight } from 'lucide-react';

interface RoadmapProps {
  dayStats: { dayId: number; completed: number; total: number; percent: number; status: string }[];
  onOpenDay: (dayId: number) => void;
}

export function Roadmap({ dayStats, onOpenDay }: RoadmapProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">14-Day Roadmap</h2>
        <p className="mt-1 text-sm text-slate-500">
          Your day-by-day path to becoming an MIS Analyst. Complete each day to unlock the next.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {DAYS.map((day) => {
          const stat = dayStats.find((s) => s.dayId === day.id) ?? {
            completed: 0,
            total: day.tasks.length,
            percent: 0,
            status: 'locked',
          };
          const isLocked = stat.status === 'locked';
          const isCompleted = stat.status === 'completed';
          const isInProgress = stat.status === 'in-progress' || stat.status === 'not-started';

          return (
            <Card
              key={day.id}
              className={`transition-shadow ${
                isLocked ? 'opacity-70' : 'hover:shadow-md'
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${
                        isLocked
                          ? 'bg-slate-100 text-slate-400'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {isLocked ? <Lock className="h-5 w-5" /> : day.id}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Day {day.id}</p>
                      <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                        {day.title}
                      </h4>
                    </div>
                  </div>
                  <StatusBadge status={stat.status as never} />
                </div>

                <p className="mt-3 text-sm text-slate-500 line-clamp-2">{day.description}</p>

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ListChecks className="h-3.5 w-3.5" />
                    {day.tasks.length || '—'} tasks
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatMinutes(day.estimatedMinutes)}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-medium text-slate-600">{stat.completed} / {stat.total} ({stat.percent}%)</span>
                  </div>
                  <ProgressBar value={stat.percent} size="sm" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {day.skills.map((skillId) => {
                    const skill = SKILLS.find((s) => s.id === skillId);
                    if (!skill) return null;
                    return (
                      <span
                        key={skillId}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                      >
                        {skill.name}
                      </span>
                    );
                  })}
                </div>

                {!isLocked && (
                  <button
                    onClick={() => onOpenDay(day.id)}
                    className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    {isCompleted ? 'Review Day' : 'Open Day'} {day.id} <ArrowRight className="ml-1 inline h-4 w-4" />
                  </button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
