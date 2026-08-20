import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PROJECT_DETAILS } from '@/data/projects';
import {
  FolderKanban,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Target,
  Briefcase,
  Database,
  ListChecks,
  FileCheck,
  Star,
  StickyNote,
} from 'lucide-react';
import type { ProjectDetail } from '@/types';

interface ProjectsProps {
  projectCompletion: Record<number, boolean>;
  projectNotes: Record<string, string>;
  onToggleComplete: (projectId: number) => void;
  onSaveNote: (projectId: number, note: string) => void;
}

export function Projects({
  projectCompletion,
  projectNotes,
  onToggleComplete,
  onSaveNote,
}: ProjectsProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const total = PROJECT_DETAILS.length;
  const completed = PROJECT_DETAILS.filter((p) => projectCompletion[p.id]).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    { label: 'Completed', value: `${completed} / ${total}`, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Remaining', value: total - completed, icon: Target, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Progress', value: `${percent}%`, icon: FolderKanban, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  if (selectedProjectId) {
    const project = PROJECT_DETAILS.find((p) => p.id === selectedProjectId);
    if (project) {
      return (
        <ProjectDetail
          project={project}
          isComplete={Boolean(projectCompletion[project.id])}
          note={projectNotes[`project-${project.id}`] ?? ''}
          onToggleComplete={() => onToggleComplete(project.id)}
          onSaveNote={(note) => onSaveNote(project.id, note)}
          onExit={() => setSelectedProjectId(null)}
        />
      );
    }
  }

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
    Advanced: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Projects</h2>
        <p className="mt-1 text-sm text-slate-500">
          Apply your MIS skills through real-world projects. Mark each project complete when done.
        </p>
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                    <Icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="text-xl font-bold text-slate-900">{s.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <ProgressBar value={percent} size="lg" />
            <p className="mt-2 text-center text-sm font-medium text-slate-600">
              {completed} / {total} Completed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Project Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {PROJECT_DETAILS.map((project) => {
          const isComplete = Boolean(projectCompletion[project.id]);
          return (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isComplete ? 'bg-emerald-50' : 'bg-blue-50'}`}>
                      {isComplete ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <FolderKanban className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Project {project.id}</p>
                      <h4 className="text-base font-semibold text-slate-900">{project.title}</h4>
                    </div>
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyColors[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-500">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <span key={skill} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Clock className="h-4 w-4" />
                    ~{project.estimatedHours} hours
                  </span>
                  <Button variant="secondary" size="sm" onClick={() => setSelectedProjectId(project.id)}>
                    {isComplete ? 'Review' : 'Open'} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

interface ProjectDetailProps {
  project: ProjectDetail;
  isComplete: boolean;
  note: string;
  onToggleComplete: () => void;
  onSaveNote: (note: string) => void;
  onExit: () => void;
}

function ProjectDetail({ project, isComplete, note, onToggleComplete, onSaveNote, onExit }: ProjectDetailProps) {
  const [noteDraft, setNoteDraft] = useState(note);
  const [noteSaved, setNoteSaved] = useState(false);

  const handleSaveNote = () => {
    onSaveNote(noteDraft);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
    Advanced: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </button>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyColors[project.difficulty]}`}>
          {project.difficulty}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isComplete ? 'bg-emerald-50' : 'bg-blue-50'}`}>
            {isComplete ? <CheckCircle2 className="h-6 w-6 text-emerald-600" /> : <FolderKanban className="h-6 w-6 text-blue-600" />}
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Project {project.id}</p>
            <h2 className="text-xl font-bold text-slate-900">{project.title}</h2>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500">{project.description}</p>
      </div>

      {/* Objective */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <Target className="h-5 w-5 text-slate-400" />
              Objective
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">{project.objective}</p>
        </CardContent>
      </Card>

      {/* Business Scenario */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-slate-400" />
              Business Scenario
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">{project.businessScenario}</p>
        </CardContent>
      </Card>

      {/* Dataset Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <Database className="h-5 w-5 text-slate-400" />
              Dataset Requirements
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {project.datasetRequirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                {req}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-slate-400" />
              Tasks
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {project.tasks.map((task, i) => (
              <li key={task.id} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-medium text-slate-500">
                  {i + 1}
                </span>
                {task.title}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Expected Deliverables */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-slate-400" />
              Expected Deliverables
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {project.deliverables.map((del, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {del}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Skills Tested */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <Star className="h-5 w-5 text-slate-400" />
              Skills Tested
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.skillsTested.map((skill, i) => (
              <span key={i} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <StickyNote className="h-5 w-5 text-slate-400" />
              Notes
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            placeholder="Add your notes about this project..."
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <div className="mt-2 flex items-center gap-3">
            <Button size="sm" variant="secondary" onClick={handleSaveNote}>
              <Check className="h-4 w-4" /> Save Note
            </Button>
            {noteSaved && <span className="text-xs font-medium text-emerald-600">Saved!</span>}
          </div>
        </CardContent>
      </Card>

      {/* Completion */}
      <Card className={isComplete ? 'border-emerald-200 bg-emerald-50/30' : ''}>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isComplete ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                {isComplete ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <Check className="h-5 w-5 text-slate-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {isComplete ? 'Project Completed' : 'Mark Project Complete'}
                </p>
                <p className="text-xs text-slate-500">
                  {isComplete
                    ? 'You have completed this project.'
                    : 'Check this box when you have finished all deliverables.'}
                </p>
              </div>
            </div>
            <Button
              variant={isComplete ? 'secondary' : 'primary'}
              onClick={onToggleComplete}
            >
              {isComplete ? (
                <>
                  <Check className="h-4 w-4" /> Completed
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" /> Mark Complete
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
