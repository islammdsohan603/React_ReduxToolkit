import React from 'react';
import { 
  FiCheckCircle, 
  FiSearch, 
  FiPlus, 
  FiInbox, 
  FiZap,
  FiRotateCcw 
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  selectStatusFilter, 
  selectSearchQuery, 
  selectSelectedCategory, 
  openNewTaskModal, 
  resetFilters 
} from '../redux/todoSlice';

/**
 * TaskEmptyState Component
 * 
 * Displays an elegant glassmorphism placeholder when no tasks match current
 * search queries or category/status filters.
 */
export const TaskEmptyState: React.FC = () => {
  const dispatch = useAppDispatch();
  const filterStatus = useAppSelector(selectStatusFilter);
  const searchQuery = useAppSelector(selectSearchQuery);
  const selectedCategory = useAppSelector(selectSelectedCategory);

  const isSearchOrFilterActive = searchQuery.trim() !== '' || selectedCategory !== 'all';

  return (
    <div className="relative flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-7 sm:p-12 text-center backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute h-36 w-36 rounded-full bg-indigo-500/10 blur-2xl" />

      {/* Modern Glass Illustration Container */}
      <div className="relative mb-4 sm:mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-tr from-slate-800/80 to-slate-900/80 shadow-2xl backdrop-blur-md">
        {filterStatus === 'completed' ? (
          <FiCheckCircle className="h-8 w-8 sm:h-9 sm:w-9 text-emerald-400 animate-bounce" />
        ) : isSearchOrFilterActive ? (
          <FiSearch className="h-8 w-8 sm:h-9 sm:w-9 text-indigo-400" />
        ) : (
          <FiZap className="h-8 w-8 sm:h-9 sm:w-9 text-indigo-400" />
        )}

        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md">
          <FiInbox className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </div>
      </div>

      {/* Contextual Title */}
      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
        {filterStatus === 'completed'
          ? 'No completed tasks yet'
          : isSearchOrFilterActive
          ? 'No matching tasks found'
          : 'Your slate is sparkling clean!'}
      </h3>

      {/* Contextual Subtitle */}
      <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-slate-400 leading-relaxed px-2">
        {filterStatus === 'completed'
          ? 'Complete pending tasks from your list to track milestones and productivity velocity.'
          : isSearchOrFilterActive
          ? "We couldn't find any tasks matching your active query or selected category filter."
          : 'Ready to plan your next milestone? Add your first high-impact task and get in the flow.'}
      </p>

      {/* Quick Action Button */}
      <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3">
        {isSearchOrFilterActive ? (
          <button
            onClick={() => dispatch(resetFilters())}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-2 sm:py-2.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white cursor-pointer"
          >
            <FiRotateCcw className="h-3.5 w-3.5" />
            <span>Reset Search & Filters</span>
          </button>
        ) : (
          <button
            onClick={() => dispatch(openNewTaskModal())}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FiPlus className="h-4 w-4" />
            <span>Create First Task</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskEmptyState;
