import React from 'react';
import { 
  FiCheckCircle, 
  FiClock, 
  FiAlertTriangle, 
  FiTarget
} from 'react-icons/fi';
import type { TodoStatsData } from '../types/todo';

interface TodoStatsProps {
  stats: TodoStatsData;
}

export const TodoStats: React.FC<TodoStatsProps> = ({ stats }) => {
  const cards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      subtext: 'Active pipeline',
      icon: FiTarget,
      color: 'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/20',
      glow: 'shadow-indigo-500/10',
    },
    {
      label: 'In Progress',
      value: stats.pending,
      subtext: 'Pending completion',
      icon: FiClock,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/20',
      glow: 'shadow-amber-500/10',
    },
    {
      label: 'Completed',
      value: stats.completed,
      subtext: `${stats.completionRate}% completion rate`,
      icon: FiCheckCircle,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/20',
      glow: 'shadow-emerald-500/10',
    },
    {
      label: 'Urgent / High',
      value: stats.urgentCount + stats.highCount,
      subtext: 'Immediate focus',
      icon: FiAlertTriangle,
      color: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/20',
      glow: 'shadow-rose-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-3 sm:p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-slate-900/80 hover:-translate-y-1 shadow-lg ${card.glow}`}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
                {card.label}
              </span>
              <div
                className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br ${card.color}`}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
            </div>

            <div className="mt-2 sm:mt-2.5 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {card.value}
              </span>
            </div>

            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-medium text-slate-400 truncate">
              {card.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TodoStats;
