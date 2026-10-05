export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type Category = 
  | 'Work' 
  | 'Design' 
  | 'Development' 
  | 'Personal' 
  | 'Health' 
  | 'Finance';

export type FilterStatus = 'all' | 'pending' | 'completed';

export type SortOption = 'newest' | 'dueDate' | 'priority' | 'alphabetical';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  category: Category;
  priority: Priority;
  dueDate: string; // e.g. "2026-10-06" or formatted date
  completed: boolean;
  createdAt: string;
  tags?: string[];
}

export interface TodoStatsData {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
  urgentCount: number;
  highCount: number;
}

export interface NewTodoFormData {
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  dueDate: string;
  tags: string[];
}

// Visual metadata helpers
export const CATEGORY_STYLES: Record<Category, {
  label: string;
  bg: string;
  text: string;
  border: string;
  glow: string;
  dot: string;
}> = {
  Work: {
    label: 'Work',
    bg: 'bg-blue-500/10 hover:bg-blue-500/15',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    glow: 'rgba(59, 130, 246, 0.2)',
    dot: 'bg-blue-400',
  },
  Design: {
    label: 'Design',
    bg: 'bg-purple-500/10 hover:bg-purple-500/15',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    glow: 'rgba(168, 85, 247, 0.2)',
    dot: 'bg-purple-400',
  },
  Development: {
    label: 'Dev',
    bg: 'bg-cyan-500/10 hover:bg-cyan-500/15',
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    glow: 'rgba(6, 182, 212, 0.2)',
    dot: 'bg-cyan-400',
  },
  Personal: {
    label: 'Personal',
    bg: 'bg-emerald-500/10 hover:bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'rgba(16, 185, 129, 0.2)',
    dot: 'bg-emerald-400',
  },
  Health: {
    label: 'Health',
    bg: 'bg-rose-500/10 hover:bg-rose-500/15',
    text: 'text-rose-400',
    border: 'border-rose-500/20',
    glow: 'rgba(244, 63, 94, 0.2)',
    dot: 'bg-rose-400',
  },
  Finance: {
    label: 'Finance',
    bg: 'bg-amber-500/10 hover:bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    glow: 'rgba(245, 158, 11, 0.2)',
    dot: 'bg-amber-400',
  },
};

export const PRIORITY_STYLES: Record<Priority, {
  label: string;
  badge: string;
  text: string;
  border: string;
  dot: string;
  ring: string;
  level: number;
}> = {
  urgent: {
    label: 'Urgent',
    badge: 'bg-red-500/15',
    text: 'text-red-400',
    border: 'border-red-500/30',
    dot: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]',
    ring: 'ring-red-500/30',
    level: 4,
  },
  high: {
    label: 'High',
    badge: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    ring: 'ring-amber-500/30',
    level: 3,
  },
  medium: {
    label: 'Medium',
    badge: 'bg-sky-500/15',
    text: 'text-sky-400',
    border: 'border-sky-500/30',
    dot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]',
    ring: 'ring-sky-500/30',
    level: 2,
  },
  low: {
    label: 'Low',
    badge: 'bg-slate-500/15',
    text: 'text-slate-400',
    border: 'border-slate-500/30',
    dot: 'bg-slate-400',
    ring: 'ring-slate-500/20',
    level: 1,
  },
};
