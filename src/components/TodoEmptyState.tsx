import React from 'react';
import { 
  FiCheckCircle, 
  FiSearch, 
  FiPlus, 
  FiInbox, 
  FiZap,
  FiRotateCcw 
} from 'react-icons/fi';
import type { FilterStatus } from '../types/todo';

interface TodoEmptyStateProps {
  filterStatus: FilterStatus;
  searchQuery: string;
  hasCategoryFilter: boolean;
  onOpenNewTaskModal: () => void;
  onResetFilters: () => void;
}

export const TodoEmptyState: React.FC<TodoEmptyStateProps> = ({
  filterStatus,
  searchQuery,
  hasCategoryFilter,
  onOpenNewTaskModal,
  onResetFilters,
}) => {
  const isSearchOrFilterActive = searchQuery.trim() !== '' || hasCategoryFilter;

  return (
    <div className="relative flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-8 sm:p-12 text-center backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute h-36 w-36 rounded-full bg-indigo-500/10 blur-2xl" />

      {/* Modern Glass Illustration Container */}
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-tr from-slate-800/80 to-slate-900/80 shadow-2xl backdrop-blur-md">
        {filterStatus === 'completed' ? (
          <FiCheckCircle className="h-9 w-9 text-emerald-400 animate-bounce" />
        ) : isSearchOrFilterActive ? (
          <FiSearch className="h-9 w-9 text-indigo-400" />
        ) : (
          <FiZap className="h-9 w-9 text-indigo-400" />
        )}

        <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md">
          <FiInbox className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Contextual Title */}
      <h3 className="text-lg font-bold text-white tracking-tight">
        {filterStatus === 'completed'
          ? 'No completed tasks yet'
          : isSearchOrFilterActive
          ? 'No matching tasks found'
          : 'Your slate is sparkling clean!'}
      </h3>

      {/* Contextual Subtitle */}
      <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-slate-400 leading-relaxed">
        {filterStatus === 'completed'
          ? 'Complete pending tasks from your list to track milestones and productivity velocity.'
          : isSearchOrFilterActive
          ? `We couldn't find any tasks matching your active query or selected category filter.`
          : 'Ready to plan your next milestone? Add your first high-impact task and get in the flow.'}
      </p>

      {/* Quick Action Button */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {isSearchOrFilterActive ? (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white cursor-pointer"
          >
            <FiRotateCcw className="h-3.5 w-3.5" />
            <span>Reset Search & Filters</span>
          </button>
        ) : (
          <button
            onClick={onOpenNewTaskModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FiPlus className="h-4 w-4" />
            <span>Create First Task</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoEmptyState;
