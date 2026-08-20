import { useState } from 'react';
import { Sidebar, type PageId } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { useProgress } from '@/hooks/useProgress';
import { Dashboard } from '@/pages/Dashboard';
import { Roadmap } from '@/pages/Roadmap';
import { DailyTraining } from '@/pages/DailyTraining';
import { Projects } from '@/pages/Projects';
import { Quizzes } from '@/pages/Quizzes';
import { Skills } from '@/pages/Skills';
import { Progress } from '@/pages/Progress';
import { InterviewPrep } from '@/pages/InterviewPrep';
import { FinalAssessment } from '@/pages/FinalAssessment';
import { Settings } from '@/pages/Settings';
import { DAYS } from '@/data/curriculum';
import type { TaskStatus } from '@/types';

function App() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const {
    progress,
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
    skillProgress,
    confidenceTrend,
    resetAll,
  } = useProgress();

  const currentDayStat = dayStats.find((s) => s.dayId === selectedDay) ?? {
    dayId: selectedDay,
    completed: 0,
    total: 0,
    percent: 0,
    status: 'locked' as TaskStatus,
  };

  const openDay = (dayId: number) => {
    setSelectedDay(dayId);
    setPage('training');
    setMobileOpen(false);
  };

  const goPrevDay = () => {
    if (selectedDay > 1) setSelectedDay(selectedDay - 1);
  };
  const goNextDay = () => {
    if (selectedDay < DAYS.length) setSelectedDay(selectedDay + 1);
  };

  const practicedIds = progress.achievements
    .filter((a) => a.startsWith('iv-'))
    .map((a) => a.replace('iv-', ''));

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            overall={overall}
            skillRatings={progress.skillRatings}
            dayStats={dayStats}
            onNavigate={setPage}
            onOpenDay={openDay}
            nextTask={nextTask}
            allComplete={allComplete}
          />
        );
      case 'roadmap':
        return <Roadmap dayStats={dayStats} onOpenDay={openDay} />;
      case 'training':
        return (
          <DailyTraining
            selectedDay={selectedDay}
            isTaskDone={isTaskDone}
            onToggleTask={toggleTask}
            completedCount={currentDayStat.completed}
            status={currentDayStat.status as TaskStatus}
            onPrevDay={goPrevDay}
            onNextDay={goNextDay}
            hasPrev={selectedDay > 1}
            hasNext={selectedDay < DAYS.length}
            nextTask={nextTask}
            onOpenDay={openDay}
            dayConfidence={progress.confidenceRatings[`day-${selectedDay}`] ?? 0}
            onSetDayConfidence={setDayConfidence}
          />
        );
      case 'projects':
        return (
          <Projects
            projectCompletion={progress.projectCompletion}
            projectNotes={progress.notes}
            onToggleComplete={toggleProjectComplete}
            onSaveNote={saveProjectNote}
          />
        );
      case 'quizzes':
        return (
          <Quizzes
            quizScores={progress.quizScores}
            onSaveScore={saveQuizScore}
          />
        );
      case 'skills':
        return <Skills skillProgress={skillProgress} />;
      case 'progress':
        return (
          <Progress
            overall={overall}
            skillRatings={progress.skillRatings}
            quizStats={quizStats}
            projectStats={projectStats}
            confidenceTrend={confidenceTrend}
          />
        );
      case 'interview':
        return (
          <InterviewPrep
            practicedIds={practicedIds}
            confidenceRatings={progress.confidenceRatings}
            onTogglePracticed={toggleInterviewPracticed}
            onSetConfidence={setInterviewConfidence}
          />
        );
      case 'assessment':
        return (
          <FinalAssessment
            overall={overall}
            quizStats={quizStats}
            projectStats={projectStats}
            onNavigate={setPage}
          />
        );
      case 'settings':
        return (
          <Settings settings={settings} setSettings={setSettings} onReset={resetAll} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        current={page}
        onNavigate={setPage}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="lg:pl-64">
        <TopBar onOpenMobile={() => setMobileOpen(true)} current={page} />
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;
