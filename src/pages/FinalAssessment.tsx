import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Award, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface FinalAssessmentProps {
  overall: {
    overallPercent: number;
    completedTasks: number;
    totalTasks: number;
    daysCompleted: number;
    currentDay: number;
  };
  quizStats: { total: number; completed: number; average: number; best: number };
  projectStats: { total: number; completed: number; remaining: number; percent: number };
  onNavigate: (page: 'dashboard' | 'roadmap' | 'training' | 'projects' | 'quizzes' | 'skills' | 'progress' | 'interview' | 'assessment' | 'settings') => void;
}

export function FinalAssessment({ overall, quizStats, projectStats, onNavigate }: FinalAssessmentProps) {
  const daysDone = overall.daysCompleted;
  const quizzesDone = quizStats.completed;
  const projectsDone = projectStats.completed;

  const prerequisites = [
    { label: 'Training Days', value: `${daysDone}/14`, done: daysDone >= 14, action: () => onNavigate('roadmap') },
    { label: 'Quizzes', value: `${quizzesDone}/${quizStats.total}`, done: quizzesDone >= quizStats.total, action: () => onNavigate('quizzes') },
    { label: 'Projects', value: `${projectsDone}/${projectStats.total}`, done: projectsDone >= projectStats.total, action: () => onNavigate('projects') },
  ];

  const completedCount = prerequisites.filter((p) => p.done).length;
  const percent = Math.round((completedCount / prerequisites.length) * 100);
  const allDone = prerequisites.every((p) => p.done);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Final Assessment</h2>
        <p className="mt-1 text-sm text-slate-500">
          Complete the final assessment to validate your MIS Analyst readiness.
        </p>
      </div>

      {allDone ? (
        <Card className="border-emerald-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Final Assessment Unlocked</h3>
              <p className="max-w-md text-sm text-slate-500">
                You have completed all 14 training days, all quizzes, and all projects.
                You are ready for the final assessment.
              </p>
              <Button className="mt-2">
                Start Final Assessment <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700">Final Assessment Locked</h3>
                <p className="max-w-md text-sm text-slate-500">
                  Complete all 14 days of training, projects, and quizzes to unlock the final assessment.
                </p>
                <div className="w-full max-w-sm">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Prerequisites completed</span>
                    <span className="font-semibold text-slate-900">{percent}%</span>
                  </div>
                  <ProgressBar value={percent} size="lg" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prerequisites.map((pre) => (
                  <div key={pre.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${pre.done ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {pre.done ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <Lock className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{pre.label}</p>
                        <p className="text-xs text-slate-500">{pre.value} completed</p>
                      </div>
                    </div>
                    {!pre.done && (
                      <Button variant="secondary" size="sm" onClick={pre.action}>
                        Go <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
