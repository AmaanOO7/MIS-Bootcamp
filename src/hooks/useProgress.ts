import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { DAYS, SKILLS } from '@/data/curriculum';
import { QUIZZES } from '@/data/quizzes';
import { PROJECT_DETAILS } from '@/data/projects';
import { INTERVIEW_QUESTIONS } from '@/data/interviews';
import type { UserProgress, Settings, Task } from '@/types';

const DEFAULT_PROGRESS: UserProgress = {
  taskCompletion: {},
  quizScores: {},
  projectCompletion: {},
  skillRatings: {
    excel: 15,
    'mis-reporting': 10,
    'data-cleaning': 10,
    'power-bi': 5,
    sql: 5,
    dashboarding: 5,
    interview: 5,
  },
  notes: {},
  confidenceRatings: {},
  achievements: [],
  currentDay: 1,
};

const DEFAULT_SETTINGS: Settings = {
  profileName: 'Learner',
  theme: 'light',
};

export function useProgress() {
  const [progress, setProgress, resetProgress] = useLocalStorage<UserProgress>(
    'progress',
    DEFAULT_PROGRESS
  );
  const [settings, setSettings, resetSettings] = useLocalStorage<Settings>(
    'settings',
    DEFAULT_SETTINGS
  );

  const toggleTask = useCallback(
    (taskId: string) => {
      setProgress((prev) => ({
        ...prev,
        taskCompletion: {
          ...prev.taskCompletion,
          [taskId]: !prev.taskCompletion[taskId],
        },
      }));
    },
    [setProgress]
  );

  const isTaskDone = useCallback(
    (taskId: string) => Boolean(progress.taskCompletion[taskId]),
    [progress.taskCompletion]
  );

  const dayStats = useMemo(() => {
    return DAYS.map((day) => {
      const tasks = day.tasks;
      const completed = tasks.filter((t) => progress.taskCompletion[t.id]).length;
      const total = tasks.length;
      const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
      let status: 'not-started' | 'in-progress' | 'completed' | 'locked' = 'locked';

      if (day.id === 1) {
        status = completed === 0 ? 'not-started' : completed === total ? 'completed' : 'in-progress';
      } else {
        const prevDay = DAYS.find((d) => d.id === day.id - 1);
        const prevCompleted = prevDay
          ? prevDay.tasks.filter((t) => progress.taskCompletion[t.id]).length
          : 0;
        const prevTotal = prevDay ? prevDay.tasks.length : 0;
        const prevDone = prevTotal > 0 && prevCompleted === prevTotal;
        if (prevDone) {
          status = completed === 0 ? 'not-started' : completed === total ? 'completed' : 'in-progress';
        }
      }
      return { dayId: day.id, completed, total, percent, status };
    });
  }, [progress.taskCompletion]);

  const overall = useMemo(() => {
    const allTasks = DAYS.flatMap((d) => d.tasks);
    const completedTasks = allTasks.filter((t) => progress.taskCompletion[t.id]).length;
    const totalTasks = allTasks.length;
    const overallPercent =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    const daysCompleted = dayStats.filter((d) => d.status === 'completed').length;

    const firstUnlockedIncomplete = dayStats.find(
      (s) => s.status !== 'locked' && s.status !== 'completed'
    );
    const currentDay = firstUnlockedIncomplete?.dayId ?? progress.currentDay ?? 1;

    return {
      overallPercent,
      completedTasks,
      totalTasks,
      daysCompleted,
      currentDay,
    };
  }, [progress.taskCompletion, progress.currentDay, dayStats]);

  const nextTask = useMemo<{ task: Task; dayId: number } | null>(() => {
    for (const day of DAYS) {
      const stat = dayStats.find((s) => s.dayId === day.id);
      if (!stat || stat.status === 'locked' || stat.status === 'completed') continue;
      const incomplete = day.tasks.find((t) => !progress.taskCompletion[t.id]);
      if (incomplete) return { task: incomplete, dayId: day.id };
    }
    return null;
  }, [progress.taskCompletion, dayStats]);

  const allComplete = useMemo(() => {
    const allTasks = DAYS.flatMap((d) => d.tasks);
    return allTasks.length > 0 && allTasks.every((t) => progress.taskCompletion[t.id]);
  }, [progress.taskCompletion]);

  const saveQuizScore = useCallback(
    (quizId: string, score: number) => {
      setProgress((prev) => {
        const prevBest = prev.quizScores[quizId] ?? 0;
        return {
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [quizId]: Math.max(prevBest, score),
          },
        };
      });
    },
    [setProgress]
  );

  const toggleProjectComplete = useCallback(
    (projectId: number) => {
      setProgress((prev) => ({
        ...prev,
        projectCompletion: {
          ...prev.projectCompletion,
          [projectId]: !prev.projectCompletion[projectId],
        },
      }));
    },
    [setProgress]
  );

  const saveProjectNote = useCallback(
    (projectId: number, note: string) => {
      setProgress((prev) => ({
        ...prev,
        notes: {
          ...prev.notes,
          [`project-${projectId}`]: note,
        },
      }));
    },
    [setProgress]
  );

  const quizStats = useMemo(() => {
    const total = QUIZZES.length;
    const completed = QUIZZES.filter((q) => progress.quizScores[q.id] !== undefined).length;
    const scores = QUIZZES.map((q) => progress.quizScores[q.id]).filter((s) => s !== undefined) as number[];
    const average = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const best = scores.length > 0 ? Math.max(...scores) : 0;
    return { total, completed, average, best };
  }, [progress.quizScores]);

  const projectStats = useMemo(() => {
    const total = PROJECT_DETAILS.length;
    const completed = PROJECT_DETAILS.filter((p) => progress.projectCompletion[p.id]).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, remaining: total - completed, percent };
  }, [progress.projectCompletion]);

  const toggleInterviewPracticed = useCallback(
    (questionId: string) => {
      setProgress((prev) => ({
        ...prev,
        achievements: prev.achievements.includes(`iv-${questionId}`)
          ? prev.achievements.filter((a) => a !== `iv-${questionId}`)
          : [...prev.achievements, `iv-${questionId}`],
      }));
    },
    [setProgress]
  );

  const setInterviewConfidence = useCallback(
    (questionId: string, rating: number) => {
      setProgress((prev) => ({
        ...prev,
        confidenceRatings: {
          ...prev.confidenceRatings,
          [`iv-${questionId}`]: rating,
        },
      }));
    },
    [setProgress]
  );

  const setDayConfidence = useCallback(
    (dayId: number, rating: number) => {
      setProgress((prev) => ({
        ...prev,
        confidenceRatings: {
          ...prev.confidenceRatings,
          [`day-${dayId}`]: rating,
        },
      }));
    },
    [setProgress]
  );

  const interviewStats = useMemo(() => {
    const total = INTERVIEW_QUESTIONS.length;
    const practiced = INTERVIEW_QUESTIONS.filter((q) =>
      progress.achievements.includes(`iv-${q.id}`)
    ).length;
    return { total, practiced };
  }, [progress.achievements]);

  const skillProgress = useMemo(() => {
    return SKILLS.map((skill) => {
      const relatedDays = DAYS.filter((d) => d.skills.includes(skill.id));
      const relatedTasks = relatedDays.flatMap((d) => d.tasks);
      const completedTasks = relatedTasks.filter((t) => progress.taskCompletion[t.id]).length;
      const totalTasks = relatedTasks.length;
      const taskPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      const manualRating = progress.skillRatings[skill.id] ?? 0;
      const confidence = progress.confidenceRatings[`skill-${skill.id}`] ?? 0;
      return {
        ...skill,
        taskPercent,
        completedTasks,
        totalTasks,
        manualRating,
        confidence,
      };
    });
  }, [progress.taskCompletion, progress.skillRatings, progress.confidenceRatings]);

  const confidenceTrend = useMemo(() => {
    return DAYS.map((day) => ({
      dayId: day.id,
      title: day.title,
      rating: progress.confidenceRatings[`day-${day.id}`] ?? 0,
      dayStatus: dayStats.find((s) => s.dayId === day.id)?.status ?? 'locked',
    }));
  }, [progress.confidenceRatings, dayStats]);

  const resetAll = useCallback(() => {
    resetProgress();
    resetSettings();
  }, [resetProgress, resetSettings]);

  return {
    progress,
    setProgress,
    settings,
    setSettings,
    toggleTask,
    isTaskDone,
    dayStats,
    overall,
    nextTask,
    allComplete,
    saveQuizScore,
    toggleProjectComplete,
    saveProjectNote,
    quizStats,
    projectStats,
    toggleInterviewPracticed,
    setInterviewConfidence,
    setDayConfidence,
    interviewStats,
    skillProgress,
    confidenceTrend,
    resetAll,
  };
}
