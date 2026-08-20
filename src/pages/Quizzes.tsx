import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { QUIZZES } from '@/data/quizzes';
import { DAYS } from '@/data/curriculum';
import { Check, X, RotateCcw, ArrowRight, ArrowLeft, HelpCircle, Award, TrendingUp, Target, CheckCircle2 } from 'lucide-react';
import type { QuizQuestion } from '@/types';

interface QuizzesProps {
  quizScores: Record<string, number>;
  onSaveScore: (quizId: string, score: number) => void;
}

export function Quizzes({ quizScores, onSaveScore }: QuizzesProps) {
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  const total = QUIZZES.length;
  const completed = QUIZZES.filter((q) => quizScores[q.id] !== undefined).length;
  const scores = Object.values(quizScores);
  const average = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const best = scores.length > 0 ? Math.max(...scores) : 0;

  const stats = [
    { label: 'Total Quizzes', value: total, icon: HelpCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed', value: completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Average Score', value: `${average}%`, icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Best Score', value: `${best}%`, icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  if (activeQuizId) {
    const quiz = QUIZZES.find((q) => q.id === activeQuizId);
    if (quiz) {
      return (
        <QuizRunner
          quiz={quiz}
          onExit={() => setActiveQuizId(null)}
          onSaveScore={(score) => onSaveScore(quiz.id, score)}
          bestScore={quizScores[quiz.id]}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Quizzes</h2>
        <p className="mt-1 text-sm text-slate-500">
          Test your knowledge with quizzes after each training day.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-3 pt-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{s.label}</p>
                  <p className="text-xl font-bold text-slate-900">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quiz Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {QUIZZES.map((quiz) => {
          const day = DAYS.find((d) => d.id === quiz.dayId);
          const bestScore = quizScores[quiz.id];
          const isCompleted = bestScore !== undefined;
          return (
            <Card key={quiz.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${isCompleted ? 'bg-emerald-50' : 'bg-blue-50'}`}>
                      <HelpCircle className={`h-5 w-5 ${isCompleted ? 'text-emerald-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Day {quiz.dayId}</p>
                      <h4 className="text-sm font-semibold text-slate-900">{quiz.title}</h4>
                    </div>
                  </div>
                  <StatusBadge status={isCompleted ? 'completed' : 'not-started'} />
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Target className="h-3.5 w-3.5" />
                    {quiz.questions.length} questions
                  </span>
                  {isCompleted && (
                    <span className="flex items-center gap-1 font-medium text-emerald-600">
                      <Award className="h-3.5 w-3.5" />
                      Best: {bestScore}%
                    </span>
                  )}
                </div>

                <Button
                  variant={isCompleted ? 'secondary' : 'primary'}
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => setActiveQuizId(quiz.id)}
                >
                  {isCompleted ? 'Retry Quiz' : 'Start Quiz'} <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

interface QuizRunnerProps {
  quiz: { id: string; dayId: number; title: string; questions: QuizQuestion[] };
  onExit: () => void;
  onSaveScore: (score: number) => void;
  bestScore?: number;
}

function QuizRunner({ quiz, onExit, onSaveScore, bestScore }: QuizRunnerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = quiz.questions.length;
  const current = quiz.questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;

  const score = quiz.questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const scorePercent = Math.round((score / total) * 100);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSaveScore(scorePercent);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentIdx(0);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        {/* Score Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className={`flex h-20 w-20 items-center justify-center rounded-full ${scorePercent >= 80 ? 'bg-emerald-50' : scorePercent >= 50 ? 'bg-amber-50' : 'bg-red-50'}`}>
                <span className={`text-3xl font-bold ${scorePercent >= 80 ? 'text-emerald-600' : scorePercent >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                  {scorePercent}%
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{score} / {total}</h2>
                <p className="text-sm text-slate-500">{quiz.title}</p>
                {bestScore !== undefined && scorePercent > bestScore && (
                  <p className="mt-1 text-xs font-medium text-emerald-600">New best score!</p>
                )}
                {bestScore !== undefined && scorePercent <= bestScore && scorePercent < bestScore && (
                  <p className="mt-1 text-xs text-slate-400">Best score: {bestScore}%</p>
                )}
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={handleRetry}>
                  <RotateCcw className="h-4 w-4" /> Retry Quiz
                </Button>
                <Button variant="ghost" onClick={onExit}>
                  Back to Quizzes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review */}
        <div className="space-y-4">
          {quiz.questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <Card key={q.id} className={isCorrect ? 'border-emerald-200' : 'border-red-200'}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${isCorrect ? 'bg-emerald-100' : 'bg-red-100'}`}>
                      {isCorrect ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-red-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {idx + 1}. {q.question}
                      </p>
                      <div className="mt-3 space-y-2">
                        {q.options.map((opt, i) => {
                          const isUserAnswer = userAnswer === i;
                          const isCorrectAnswer = q.correctIndex === i;
                          return (
                            <div
                              key={i}
                              className={`rounded-lg border px-3 py-2 text-sm ${
                                isCorrectAnswer
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                                  : isUserAnswer
                                  ? 'border-red-300 bg-red-50 text-red-800'
                                  : 'border-slate-200 text-slate-600'
                              }`}
                            >
                              {opt}
                              {isCorrectAnswer && <span className="ml-2 text-xs font-medium text-emerald-600">Correct answer</span>}
                              {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-xs font-medium text-red-600">Your answer</span>}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-medium text-slate-500">Explanation</p>
                        <p className="mt-1 text-sm text-slate-600">{q.explanation}</p>
                      </div>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" /> Back to Quizzes
        </button>
        <span className="text-sm font-medium text-slate-500">
          Question {currentIdx + 1} of {total}
        </span>
      </div>

      {/* Progress */}
      <div>
        <ProgressBar value={Math.round((answeredCount / total) * 100)} size="md" />
      </div>

      {/* Question */}
      <Card>
        <CardHeader>
          <p className="text-xs font-medium text-blue-600">Day {quiz.dayId} - {quiz.title}</p>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold text-slate-900">{current.question}</h3>
          <div className="mt-5 space-y-3">
            {current.options.map((opt, i) => {
              const isSelected = answers[current.id] === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(current.id, i)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                  }`}>
                    {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                  </div>
                  <span className={`text-sm ${isSelected ? 'font-medium text-blue-900' : 'text-slate-700'}`}>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
          disabled={currentIdx === 0}
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>

        {currentIdx < total - 1 ? (
          <Button
            size="sm"
            onClick={() => setCurrentIdx((i) => Math.min(total - 1, i + 1))}
          >
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            Submit Quiz <Check className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Question Grid */}
      <div className="flex flex-wrap gap-2">
        {quiz.questions.map((q, i) => {
          const isAnswered = answers[q.id] !== undefined;
          const isCurrent = i === currentIdx;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(i)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                isCurrent
                  ? 'bg-blue-600 text-white'
                  : isAnswered
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
