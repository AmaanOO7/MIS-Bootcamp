import { DayDetail } from '@/components/DayDetail';
import type { TaskStatus, Task } from '@/types';

interface DailyTrainingProps {
  selectedDay: number;
  isTaskDone: (taskId: string) => boolean;
  onToggleTask: (taskId: string) => void;
  completedCount: number;
  status: TaskStatus;
  onPrevDay: () => void;
  onNextDay: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  nextTask?: { task: Task; dayId: number } | null;
  onOpenDay?: (dayId: number) => void;
  dayConfidence?: number;
  onSetDayConfidence?: (dayId: number, rating: number) => void;
}

export function DailyTraining({
  selectedDay,
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
}: DailyTrainingProps) {
  return (
    <DayDetail
      dayId={selectedDay}
      isTaskDone={isTaskDone}
      onToggleTask={onToggleTask}
      completedCount={completedCount}
      status={status}
      onPrevDay={onPrevDay}
      onNextDay={onNextDay}
      hasPrev={hasPrev}
      hasNext={hasNext}
      nextTask={nextTask}
      onOpenDay={onOpenDay}
      dayConfidence={dayConfidence}
      onSetDayConfidence={onSetDayConfidence}
    />
  );
}
