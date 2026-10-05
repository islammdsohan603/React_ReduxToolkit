import React from 'react';
import { 
  FiZap, 
  FiPieChart, 
  FiCheckCircle, 
  FiArrowUpRight,
  FiTrendingUp,
  FiPlus
} from 'react-icons/fi';
import type { Category } from '../types/todo';
import { CATEGORY_STYLES } from '../types/todo';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  selectTodos, 
  selectSelectedCategory, 
  setSelectedCategory, 
  openNewTaskModal 
} from '../redux/todoSlice';

const ALL_CATEGORIES: Category[] = ['Work', 'Design', 'Development', 'Personal', 'Health', 'Finance'];

/**
 * TaskInsightsPanel Component
 * 
 * Side panel providing productivity metrics, critical priority spotlight,
 * and category distribution analytics.
 */
export const TaskInsightsPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const selectedCategory = useAppSelector(selectSelectedCategory);

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const urgentTasks = todos.filter((t) => !t.completed && t.priority === 'urgent');
  const highTasks = todos.filter((t) => !t.completed && t.priority === 'high');

  // Calculate distribution by category
  const categoryCounts = ALL_CATEGORIES.map((cat) => {
    const inCategory = todos.filter((t) => t.category === cat);
    const count = inCategory.length;
    const catCompleted = inCategory.filter((t) => t.completed).length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return {
      category: cat,
      count,
      completed: catCompleted,
      percentage,
      style: CATEGORY_STYLES[cat],
    };
  }).filter((item) => item.count > 0);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Urgent Focus Spotlight Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-indigo-950/40 p-4 sm:p-5 backdrop-blur-2xl shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse" />
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
              <FiZap className="text-amber-400" />
              <span>High-Impact Focus</span>
            </h3>
          </div>
          <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-500/20">
            {urgentTasks.length + highTasks.length} Critical
          </span>
        </div>

        <div className="mt-3.5 space-y-2.5">
          {urgentTasks.length > 0 ? (
            urgentTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className="group rounded-2xl border border-red-500/20 bg-red-500/5 p-3 transition-all hover:bg-red-500/10 hover:border-red-500/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-red-300 transition-colors">
                    {task.title}
                  </span>
                  <span className="shrink-0 text-[10px] font-mono text-red-400">
                    {task.dueDate}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-red-300 font-bold uppercase">
                    Urgent
                  </span>
                  <span>#{task.category}</span>
                </div>
              </div>
            ))
          ) : highTasks.length > 0 ? (
            highTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3"
              >
                <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {task.title}
                </span>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300 font-bold uppercase">
                    High
                  </span>
                  <span>#{task.category}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-xs text-slate-400">
              <FiCheckCircle className="mx-auto mb-1.5 h-6 w-6 text-emerald-400" />
              <span>No pressing urgent tasks! You are on top of everything.</span>
            </div>
          )}
        </div>

        <button
          onClick={() => dispatch(openNewTaskModal())}
          className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/10 bg-slate-800/40 py-2 text-xs font-semibold text-slate-300 hover:border-indigo-500/40 hover:bg-slate-800/80 hover:text-white transition-all cursor-pointer"
        >
          <FiPlus className="h-3.5 w-3.5 text-indigo-400" />
          <span>Add Priority Goal</span>
        </button>
      </div>

      {/* 2. Productivity Streak & Daily Target Widget */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-2xl shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-amber-400 h-4 w-4" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Productivity Flow
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            {completed}/{total} Done
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-2xl font-black text-white tracking-tight">
              {total > 0 ? Math.round((completed / total) * 100) : 0}%
            </p>
            <p className="text-xs text-slate-400">Daily Completion Goal</p>
          </div>

          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400 shadow-inner">
            <FiArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-white/5">
          <span>Streak: <strong className="text-amber-400 font-bold">5 Days Active</strong></span>
          <span>Target: <strong className="text-slate-200">8 tasks/day</strong></span>
        </div>
      </div>

      {/* 3. Category Distribution breakdown */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-2xl shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <FiPieChart className="text-indigo-400 h-4 w-4" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Category Distribution
            </h3>
          </div>
          <button
            onClick={() => dispatch(setSelectedCategory('all'))}
            className={`text-[10px] font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Show All
          </button>
        </div>

        <div className="mt-3.5 space-y-2.5 sm:space-y-3">
          {categoryCounts.map((item) => {
            const isSelected = selectedCategory === item.category;
            return (
              <div
                key={item.category}
                onClick={() => dispatch(setSelectedCategory(item.category))}
                className={`group rounded-xl p-2 transition-all cursor-pointer border ${
                  isSelected
                    ? 'border-indigo-500/40 bg-indigo-500/10'
                    : 'border-transparent hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.style.dot}`} />
                    <span className="font-semibold text-slate-200 group-hover:text-white">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskInsightsPanel;
