import { cn } from '@/lib/utils';
import type { TaskStatus } from '@/types';

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const STATUS_CONFIG: Record<TaskStatus, { label: string; classes: string }> = {
  'not-started': {
    label: 'Not Started',
    classes: 'bg-slate-100 text-slate-600 border-slate-200',
  },
  'in-progress': {
    label: 'In Progress',
    classes: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  completed: {
    label: 'Completed',
    classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  locked: {
    label: 'Locked',
    classes: 'bg-slate-50 text-slate-400 border-slate-200',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  );
}
