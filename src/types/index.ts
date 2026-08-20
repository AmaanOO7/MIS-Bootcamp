export type TaskStatus = 'not-started' | 'in-progress' | 'completed' | 'locked';

export interface Task {
  id: string;
  dayId: number;
  title: string;
  description?: string;
  estimatedMinutes?: number;
}

export interface Day {
  id: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  skills: string[];
  topics?: string[];
  tasks: Task[];
  practical?: string;
  isMajorProject?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  targetLevel: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  dayId: number;
  title: string;
  questions: QuizQuestion[];
}

export interface ProjectTask {
  id: string;
  title: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  skills: string[];
  objective: string;
  businessScenario: string;
  datasetRequirements: string[];
  tasks: ProjectTask[];
  deliverables: string[];
  skillsTested: string[];
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  modelAnswer: string;
}

export interface InterviewProgress {
  practiced: Record<string, boolean>;
  confidence: Record<string, number>;
}

export interface UserProgress {
  taskCompletion: Record<string, boolean>;
  quizScores: Record<string, number>;
  projectCompletion: Record<number, boolean>;
  skillRatings: Record<string, number>;
  notes: Record<string, string>;
  confidenceRatings: Record<string, number>;
  achievements: string[];
  currentDay: number;
}

export interface Settings {
  profileName: string;
  theme: 'light' | 'dark';
}

export interface AppState {
  progress: UserProgress;
  settings: Settings;
}
