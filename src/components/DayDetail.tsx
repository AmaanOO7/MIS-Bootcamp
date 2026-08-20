import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DAYS, SKILLS } from '@/data/curriculum';
import { formatMinutes } from '@/lib/utils';
import { Check, Clock, ListChecks, ArrowRight, ArrowLeft, BookOpen, FlaskConical, Star, Zap, Brain } from 'lucide-react';
import type { TaskStatus, Task } from '@/types';

interface DayDetailProps {
  dayId: number;
  isTaskDone: (taskId: string) => boolean;
  onToggleTask: (taskId: string) => void;
  completedCount: number;
  status: TaskStatus;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  nextTask?: { task: Task; dayId: number } | null;
  onOpenDay?: (dayId: number) => void;
  dayConfidence?: number;
  onSetDayConfidence?: (dayId: number, rating: number) => void;
}

export function DayDetail({
  dayId,
  isTaskDone,
  onToggleTask,
  completedCount,
  status,
  onPrevDay,
  onNextDay,
  hasPrev,
  hasNext,
  nextTask,
  onOpenDay,
  dayConfidence,
  onSetDayConfidence,
}: DayDetailProps) {
  const day = DAYS.find((d) => d.id === dayId);
  if (!day) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-slate-500">Day not found.</p>
        </CardContent>
      </Card>
    );
  }

  const total = day.tasks.length;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);
  const isLocked = status === 'locked';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${
                isLocked ? 'bg-slate-400' : 'bg-blue-600'
              }`}
            >
              <span className="text-xl font-bold">{day.id}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium text-blue-600">Day {day.id}</p>
                {day.isMajorProject && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                    <Star className="h-3 w-3" /> Major Project
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{day.title}</h2>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-slate-500">{day.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {formatMinutes(day.estimatedMinutes)}
            </span>
            <span className="flex items-center gap-1.5">
              <ListChecks className="h-4 w-4" />
              {completedCount} / {total} tasks
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4" />
              {percent}%
            </span>
            <StatusBadge status={status} />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {day.skills.map((skillId) => {
          const skill = SKILLS.find((s) => s.id === skillId);
          if (!skill) return null;
          return (
            <span
              key={skillId}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600"
            >
              {skill.name}
            </span>
          );
        })}
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Day Progress</span>
            <span className="text-sm font-semibold text-slate-900">{completedCount} / {total} ({percent}%)</span>
          </div>
          <ProgressBar value={percent} size="lg" />
        </CardContent>
      </Card>

      {/* Topics */}
      {day.topics && day.topics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-slate-400" />
                Topics Covered
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {day.topics.map((topic, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600"
                >
                  {topic}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Action */}
      {!isLocked && nextTask && nextTask.dayId === dayId && (
        <div className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-600">NEXT ACTION</p>
              <p className="text-sm font-medium text-slate-800">{nextTask.task.title}</p>
            </div>
          </div>
        </div>
      )}

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {isLocked ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-slate-400">
                Complete the previous day to unlock Day {day.id}.
              </p>
            </div>
          ) : (
            <>
              <ul className="space-y-2">
                {day.tasks.map((task, idx) => {
                  const done = isTaskDone(task.id);
                  return (
                    <li key={task.id}>
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                          done
                            ? 'border-emerald-200 bg-emerald-50'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                            done
                              ? 'border-emerald-500 bg-emerald-500 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {done && <Check className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              done ? 'text-slate-400 line-through' : 'text-slate-800'
                            }`}
                          >
                            {task.title}
                          </p>
                          {task.estimatedMinutes ? (
                            <p className="mt-0.5 text-xs text-slate-400">
                              ~{formatMinutes(task.estimatedMinutes)}
                            </p>
                          ) : null}
                        </div>
                        <span className="text-xs text-slate-300">{idx + 1}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {percent === 100 && (
                <div className="mt-5 flex items-center justify-between rounded-xl bg-emerald-50 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-emerald-600" />
                    <p className="text-sm font-medium text-emerald-700">
                      Day {day.id} complete! Great work.
                    </p>
                  </div>
                  {hasNext && (
                    <Button variant="secondary" size="sm" onClick={onNextDay}>
                      Next Day <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Practical */}
      {day.practical && !isLocked && (
        <Card className="border-blue-100 bg-blue-50/30">
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-blue-500" />
                Practical Exercise
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">{day.practical}</p>
          </CardContent>
        </Card>
      )}

      {/* Confidence Tracker */}
      {!isLocked && (
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-slate-400" />
                How confident are you?
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                { rating: 1, label: 'Don\'t understand' },
                { rating: 2, label: 'Beginner' },
                { rating: 3, label: 'Can do with help' },
                { rating: 4, label: 'Can do independently' },
                { rating: 5, label: 'Can explain in an interview' },
              ].map(({ rating, label }) => (
                <button
                  key={rating}
                  onClick={() => onSetDayConfidence?.(dayId, rating)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${
                    dayConfidence === rating
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                    dayConfidence === rating ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {rating}
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Day navigation */}
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" onClick={onPrevDay} disabled={!hasPrev}>
          <ArrowLeft className="h-4 w-4" /> Previous Day
        </Button>
        <span className="text-sm text-slate-400">
          Day {day.id} of {DAYS.length}
        </span>
        <Button variant="secondary" size="sm" onClick={onNextDay} disabled={!hasNext}>
          Next Day <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
