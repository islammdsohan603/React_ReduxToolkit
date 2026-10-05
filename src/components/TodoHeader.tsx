import React from 'react';
import { 
  FiCalendar, 
  FiCheckCircle, 
  FiPlus, 
  FiZap, 
  FiTrendingUp
} from 'react-icons/fi';
import type { TodoStatsData } from '../types/todo';

interface TodoHeaderProps {
  stats: TodoStatsData;
  onOpenNewTaskModal: () => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({ 
  stats, 
  onOpenNewTaskModal 
}) => {
  // Current dynamic formatted date
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const completionPercent = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <header className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-indigo-950/40 p-6 md:p-8 backdrop-blur-2xl shadow-2xl">
      {/* Ambient decorative glowing backdrops */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl animate-pulse-subtle" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left Side: Brand, Title, and Date */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30">
              <FiZap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  Zenith<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Task</span>
                </h1>
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                  PRO Studio
                </span>
              </div>
              <p className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-slate-400">
                <FiCalendar className="text-indigo-400 inline-block h-3.5 w-3.5" />
                <span>{dateFormatted}</span>
                <span className="text-slate-600">•</span>
                <span className="text-indigo-300/80 font-mono">Workspace Overview</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Stats summary & New Task CTA */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Quick Counter Chips */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-slate-800/40 p-2 backdrop-blur-md">
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/60 px-3 py-1.5 border border-white/5">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span className="text-xs text-slate-400">Pending:</span>
              <span className="text-xs font-bold text-white">{stats.pending}</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-900/60 px-3 py-1.5 border border-white/5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span className="text-xs text-slate-400">Done:</span>
              <span className="text-xs font-bold text-white">{stats.completed}</span>
            </div>

            {stats.urgentCount > 0 && (
              <div className="hidden sm:flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-1.5 border border-red-500/20">
                <span className="flex h-2 w-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-ping" />
                <span className="text-xs font-semibold text-red-300">{stats.urgentCount} Urgent</span>
              </div>
            )}
          </div>

          {/* New Task Button */}
          <button
            onClick={onOpenNewTaskModal}
            className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <FiPlus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90 text-white" />
            <span>New Task</span>
            <span className="hidden sm:inline-block rounded-md bg-white/20 px-1.5 py-0.5 text-[10px] font-mono tracking-wider">
              +N
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Progress Bar & Motivational Quote */}
      <div className="relative mt-7 pt-5 border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-300 font-medium">
            <FiTrendingUp className="text-emerald-400 h-4 w-4" />
            <span>Progress Velocity:</span>
            <span className="font-semibold text-white">
              {stats.completed} of {stats.total} tasks completed
            </span>
            <span className="text-xs text-slate-400">({completionPercent}%)</span>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <FiCheckCircle className="text-indigo-400 h-3.5 w-3.5" />
            {completionPercent === 100 ? (
              <span className="text-emerald-400 font-semibold">🎉 All caught up! Stellar work.</span>
            ) : completionPercent > 50 ? (
              <span>⚡ Great momentum! More than halfway there.</span>
            ) : (
              <span>🚀 Focus on high priority items first.</span>
            )}
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800/80 p-0.5 border border-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-700 ease-out shadow-[0_0_12px_rgba(99,102,241,0.5)]"
            style={{ width: `${Math.max(completionPercent, stats.total === 0 ? 0 : 4)}%` }}
          />
        </div>
      </div>
    </header>
  );
};

export default TodoHeader;
