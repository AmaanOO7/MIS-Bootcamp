import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { SKILLS, DAYS } from '@/data/curriculum';
import { formatMinutes } from '@/lib/utils';
import { ArrowRight, Clock, ListChecks, CalendarDays, TrendingUp, CheckCircle2, Zap } from 'lucide-react';
import type { PageId } from '@/components/layout/Sidebar';
import type { Task } from '@/types';

interface DayStat {
  dayId: number;
  completed: number;
  total: number;
  percent: number;
  status: string;
}

interface DashboardProps {
  overall: {
    overallPercent: number;
    completedTasks: number;
    totalTasks: number;
    daysCompleted: number;
    currentDay: number;
  };
  skillRatings: Record<string, number>;
  dayStats: DayStat[];
  onNavigate: (page: PageId) => void;
  onOpenDay: (dayId: number) => void;
  nextTask: { task: Task; dayId: number } | null;
  allComplete: boolean;
}

export function Dashboard({ overall, skillRatings, dayStats, onNavigate, onOpenDay, nextTask, allComplete }: DashboardProps) {
  const today = DAYS[overall.currentDay - 1] ?? DAYS[0];
  const kpis = [
    {
      label: 'Overall Progress',
      value: `${overall.overallPercent}%`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Current Day',
      value: `Day ${overall.currentDay}`,
      icon: CalendarDays,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
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
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <p className="text-sm font-medium text-slate-500">Welcome back</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">MIS Analyst Job-Ready</h2>
        <p className="mt-1 text-slate-500">14 Days. Real Tasks. Real Projects. Real MIS Skills.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label}>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${kpi.bg}`}>
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{kpi.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's Focus / Next Action */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {allComplete ? 'Training Complete' : "Today's Focus"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {allComplete ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-emerald-50 p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                <h4 className="text-lg font-semibold text-slate-900">Training Complete</h4>
                <p className="text-sm text-slate-500">
                  You have completed all 14 days. You are job-ready!
                </p>
                <Button variant="secondary" size="sm" onClick={() => onNavigate('assessment')}>
                  View Final Assessment <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : nextTask ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <span className="text-lg font-bold">{today.id}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-blue-600">Day {today.id}</p>
                      <h4 className="text-lg font-semibold text-slate-900">{today.title}</h4>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <ListChecks className="h-4 w-4" />
                          {today.tasks.length} tasks
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          ~{formatMinutes(today.estimatedMinutes)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => onOpenDay(today.id)}
                    className="shrink-0"
                  >
                    Start Training <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Next Action */}
                <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                      <Zap className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-blue-600">NEXT ACTION</p>
                      <p className="text-sm font-medium text-slate-800">
                        {nextTask.task.title}
                      </p>
                      <p className="text-xs text-slate-400">Day {nextTask.dayId}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onOpenDay(nextTask.dayId)}
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-xl bg-slate-50 p-8 text-center">
                <p className="text-sm text-slate-500">No tasks available yet.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 14-Day Progress */}
        <Card>
          <CardHeader>
            <CardTitle>14-Day Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <span className="text-sm text-slate-500">Overall completion</span>
                <span className="text-2xl font-bold text-slate-900">{overall.overallPercent}%</span>
              </div>
              <ProgressBar value={overall.overallPercent} size="lg" />
              <div className="flex gap-1 pt-2">
                {Array.from({ length: 14 }, (_, i) => i + 1).map((dayId) => {
                  const stat = dayStats.find((s) => s.dayId === dayId);
                  const isDone = stat?.status === 'completed';
                  const isInProgress = stat?.status === 'in-progress';
                  const isCurrent = dayId === overall.currentDay;
                  return (
                    <div
                      key={dayId}
                      className={`h-2 flex-1 rounded-full ${
                        isDone
                          ? 'bg-emerald-500'
                          : isInProgress
                          ? 'bg-blue-400'
                          : isCurrent
                          ? 'bg-blue-500'
                          : 'bg-slate-200'
                      }`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Day 1</span>
                <span>Day 14</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Progress</CardTitle>
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
