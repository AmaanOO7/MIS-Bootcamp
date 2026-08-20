import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { INTERVIEW_QUESTIONS } from '@/data/interviews';
import {
  MessageSquare,
  Brain,
  Eye,
  Check,
  User,
  FileSpreadsheet,
  BarChart3,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

interface InterviewPrepProps {
  practicedIds: string[];
  confidenceRatings: Record<string, number>;
  onTogglePracticed: (questionId: string) => void;
  onSetConfidence: (questionId: string, rating: number) => void;
}

const CATEGORIES = [
  { id: 'HR', label: 'HR Questions', icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'Excel', label: 'Excel Questions', icon: FileSpreadsheet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'MIS', label: 'MIS Questions', icon: BarChart3, color: 'text-violet-600', bg: 'bg-violet-50' },
  { id: 'Scenario', label: 'Scenario Questions', icon: Lightbulb, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const CONFIDENCE_LABELS = [
  '',
  'Don\'t understand',
  'Beginner',
  'Can do with help',
  'Can do independently',
  'Can explain in an interview',
];

export function InterviewPrep({
  practicedIds,
  confidenceRatings,
  onTogglePracticed,
  onSetConfidence,
}: InterviewPrepProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const practicedCount = practicedIds.length;
  const totalCount = INTERVIEW_QUESTIONS.length;
  const percent = totalCount > 0 ? Math.round((practicedCount / totalCount) * 100) : 0;

  const visibleQuestions = activeCategory
    ? INTERVIEW_QUESTIONS.filter((q) => q.category === activeCategory)
    : INTERVIEW_QUESTIONS;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Interview Prep</h2>
        <p className="mt-1 text-sm text-slate-500">
          Prepare for MIS Analyst interviews with curated questions, model answers, and confidence tracking.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Total Questions</p>
              <p className="text-xl font-bold text-slate-900">{totalCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Practiced</p>
              <p className="text-xl font-bold text-slate-900">{practicedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Brain className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Progress</p>
              <p className="text-xl font-bold text-slate-900">{percent}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
              <BarChart3 className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Categories</p>
              <p className="text-xl font-bold text-slate-900">{CATEGORIES.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Questions
        </button>
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const count = INTERVIEW_QUESTIONS.filter((q) => q.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
              <span className={`rounded-md px-1.5 py-0.5 text-xs ${activeCategory === cat.id ? 'bg-blue-500' : 'bg-slate-100'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {visibleQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            isPracticed={practicedIds.includes(q.id)}
            confidence={confidenceRatings[`iv-${q.id}`] ?? 0}
            onTogglePracticed={() => onTogglePracticed(q.id)}
            onSetConfidence={(rating) => onSetConfidence(q.id, rating)}
          />
        ))}
      </div>
    </div>
  );
}

interface QuestionCardProps {
  question: { id: string; category: string; question: string; modelAnswer: string };
  isPracticed: boolean;
  confidence: number;
  onTogglePracticed: () => void;
  onSetConfidence: (rating: number) => void;
}

function QuestionCard({ question, isPracticed, confidence, onTogglePracticed, onSetConfidence }: QuestionCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showThink, setShowThink] = useState(false);

  return (
    <Card className={isPracticed ? 'border-emerald-200' : ''}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
              {question.category}
            </span>
            <p className="text-sm font-semibold text-slate-900">{question.question}</p>
          </div>
          {isPracticed && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              <Check className="h-3 w-3" /> Practiced
            </span>
          )}
        </div>

        {/* Think First */}
        {showThink && (
          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <p className="text-xs font-medium text-blue-600">Think First</p>
            <p className="mt-1 text-sm text-slate-600">
              Take a moment to think about how you would answer this question. Structure your response before reading the model answer.
            </p>
          </div>
        )}

        {/* Model Answer */}
        {showAnswer && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-500">Model Answer</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{question.modelAnswer}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowThink((v) => !v)}
          >
            <Brain className="h-4 w-4" /> {showThink ? 'Hide' : 'Think First'}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowAnswer((v) => !v)}
          >
            <Eye className="h-4 w-4" /> {showAnswer ? 'Hide' : 'Show Model Answer'}
          </Button>
          <Button
            size="sm"
            variant={isPracticed ? 'secondary' : 'primary'}
            onClick={onTogglePracticed}
          >
            <Check className="h-4 w-4" /> {isPracticed ? 'Practiced' : 'Mark Practiced'}
          </Button>
        </div>

        {/* Confidence Rating */}
        <div className="mt-4 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">Confidence Rating</p>
            {confidence > 0 && (
              <p className="text-xs text-slate-400">{CONFIDENCE_LABELS[confidence]}</p>
            )}
          </div>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onSetConfidence(rating)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  confidence >= rating
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
                title={CONFIDENCE_LABELS[rating]}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
