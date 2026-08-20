import { Card, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BarChart3, CheckCircle2, Target } from 'lucide-react';

interface SkillProgressItem {
  id: string;
  name: string;
  targetLevel: number;
  taskPercent: number;
  completedTasks: number;
  totalTasks: number;
  manualRating: number;
  confidence: number;
}

interface SkillsProps {
  skillProgress: SkillProgressItem[];
}

const CONFIDENCE_LABELS = [
  'Not rated',
  'Don\'t understand',
  'Beginner',
  'Can do with help',
  'Can do independently',
  'Can explain in an interview',
];

export function Skills({ skillProgress }: SkillsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Skills Tracker</h2>
        <p className="mt-1 text-sm text-slate-500">
          Track your competency across core MIS skill areas. Progress is calculated from related task completion.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skillProgress.map((skill) => {
          const overallPercent = skill.taskPercent;
          return (
            <Card key={skill.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900">{skill.name}</h4>
                    <p className="text-xs text-slate-400">Target: {skill.targetLevel}%</p>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{overallPercent}%</span>
                </div>

                {/* Task-based progress */}
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-slate-500">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Related tasks
                    </span>
                    <span className="font-medium text-slate-600">
                      {skill.completedTasks} / {skill.totalTasks} completed
                    </span>
                  </div>
                  <ProgressBar value={overallPercent} />
                </div>

                {/* Confidence */}
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                      <Target className="h-3.5 w-3.5" />
                      Confidence
                    </span>
                    <span className="text-xs text-slate-400">
                      {skill.confidence > 0 ? CONFIDENCE_LABELS[skill.confidence] : 'Not rated'}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div
                        key={rating}
                        className={`h-2 flex-1 rounded-full ${
                          skill.confidence >= rating ? 'bg-blue-500' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
