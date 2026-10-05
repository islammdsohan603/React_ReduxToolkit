import React from 'react';
import { 
  FiSearch, 
  FiX, 
  FiSliders, 
  FiFilter
} from 'react-icons/fi';
import type { FilterStatus, SortOption, Category } from '../types/todo';

interface TodoFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: FilterStatus;
  onStatusFilterChange: (status: FilterStatus) => void;
  selectedCategory: Category | 'all';
  onCategoryFilterChange: (cat: Category | 'all') => void;
  sortOption: SortOption;
  onSortOptionChange: (sort: SortOption) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
  onClearFilters: () => void;
}

const CATEGORIES: (Category | 'all')[] = ['all', 'Work', 'Design', 'Development', 'Personal', 'Health', 'Finance'];

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  selectedCategory,
  onCategoryFilterChange,
  sortOption,
  onSortOptionChange,
  counts,
  onClearFilters,
}) => {
  const isFiltered = searchQuery.trim() !== '' || statusFilter !== 'all' || selectedCategory !== 'all';

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Search Bar & Sort Dropdown Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Bar with Glass Glow */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <FiSearch className="h-4 w-4 text-indigo-400" />
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks, descriptions, or tags..."
            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 backdrop-blur-xl transition-all focus:border-indigo-500/50 focus:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />

          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white cursor-pointer"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/60 px-3.5 py-2.5 backdrop-blur-xl">
              <FiSliders className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-xs text-slate-400 hidden md:inline font-medium">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => onSortOptionChange(e.target.value as SortOption)}
                aria-label="Sort tasks by"
                className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer pr-1"
              >
                <option value="newest" className="bg-slate-900 text-slate-200">Newest Created</option>
                <option value="dueDate" className="bg-slate-900 text-slate-200">Due Date</option>
                <option value="priority" className="bg-slate-900 text-slate-200">Priority (Urgent First)</option>
                <option value="alphabetical" className="bg-slate-900 text-slate-200">Title (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Reset Filters Chip (if active) */}
          {isFiltered && (
            <button
              onClick={onClearFilters}
              title="Reset all active filters"
              className="flex items-center gap-1 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-all cursor-pointer"
            >
              <FiX className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Filter Tabs & Category Chips Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
        
        {/* Status Tabs: All, Pending, Completed */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-white/5 bg-slate-900/50 p-1 backdrop-blur-xl self-start">
          {(['all', 'pending', 'completed'] as FilterStatus[]).map((tab) => {
            const isActive = statusFilter === tab;
            const count = counts[tab];

            return (
              <button
                key={tab}
                onClick={() => onStatusFilterChange(tab)}
                className={`relative flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider pl-1 pr-1 flex items-center gap-1 shrink-0">
            <FiFilter className="h-3 w-3" /> Category:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryFilterChange(cat)}
                className={`shrink-0 rounded-xl px-2.5 py-1 text-xs font-medium transition-all border cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500/50 bg-indigo-500/20 text-indigo-300 font-semibold ring-1 ring-indigo-500/30'
                    : 'border-white/5 bg-slate-900/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default TodoFilters;
