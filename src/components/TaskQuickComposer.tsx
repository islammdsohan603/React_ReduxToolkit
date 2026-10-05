import React, { useState } from 'react';
import { 
  FiPlus, 
  FiCalendar, 
  FiFlag, 
  FiTag, 
  FiMaximize2, 
  FiZap,
  FiChevronDown
} from 'react-icons/fi';
import type { Category, Priority } from '../types/todo';
import { CATEGORY_STYLES, PRIORITY_STYLES } from '../types/todo';
import { useAppDispatch } from '../redux/hooks';
import { addTodo, openNewTaskModal } from '../redux/todoSlice';

const CATEGORIES: Category[] = ['Work', 'Design', 'Development', 'Personal', 'Health', 'Finance'];
const PRIORITIES: Priority[] = ['low', 'medium', 'high', 'urgent'];
const DUE_DATE_PRESETS = ['Today', 'Tomorrow', 'This Weekend', 'Next Week'];

/**
 * TaskQuickComposer Component
 * 
 * Floating quick-entry input bar docked above the task list.
 * Supports rapid keyboard entry, instant category selection, priority toggles,
 * and quick modal expansion.
 */
export const TaskQuickComposer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Work');
  const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');
  const [selectedDueDate, setSelectedDueDate] = useState<string>('Today');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      addTodo({
        title: title.trim(),
        description: '',
        category: selectedCategory,
        priority: selectedPriority,
        dueDate: selectedDueDate,
        tags: [],
      })
    );
    setTitle('');
  };

  return (
    <div className="relative z-20 w-full transition-all duration-300">
      {/* Floating Glassmorphism Container with subtle gradient border */}
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-cyan-500/30 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)]">
        <div className="relative rounded-3xl bg-slate-900/80 p-3.5 sm:p-5 backdrop-blur-2xl">
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Main Input Row */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FiZap className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be accomplished today? (Press Enter to add)"
                className="w-full bg-transparent text-xs sm:text-sm md:text-base font-medium text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0"
              />

              {/* Expand to full modal button */}
              <button
                type="button"
                onClick={() => dispatch(openNewTaskModal())}
                title="Open comprehensive task form modal"
                className="hidden sm:flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 transition-all hover:bg-slate-700/60 hover:text-white cursor-pointer shrink-0"
              >
                <FiMaximize2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Modal Form</span>
              </button>
            </div>

            {/* Controls Bar: Category, Priority, Due Date & Add Task Button */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pt-3 border-t border-white/5">
              <div className="flex flex-wrap items-center gap-2">
                
                {/* Category Picker Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                      setIsDatePickerOpen(false);
                    }}
                    className={`flex items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${CATEGORY_STYLES[selectedCategory].border} ${CATEGORY_STYLES[selectedCategory].bg} ${CATEGORY_STYLES[selectedCategory].text}`}
                  >
                    <FiTag className="h-3 w-3" />
                    <span>{selectedCategory}</span>
                    <FiChevronDown className="h-3 w-3 opacity-60" />
                  </button>

                  {isCategoryDropdownOpen && (
                    <div className="absolute left-0 mt-2 z-30 w-44 rounded-2xl border border-white/10 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 tracking-wider">
                        Select Category
                      </div>
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors text-left ${
                            selectedCategory === cat
                              ? 'bg-indigo-600/30 text-indigo-200'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className={`h-2 w-2 rounded-full ${CATEGORY_STYLES[cat].dot}`} />
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Priority Selector Pills */}
                <div className="flex items-center gap-1 rounded-xl bg-slate-800/40 p-1 border border-white/5">
                  <span className="hidden md:inline-flex items-center pl-1.5 pr-1 text-[11px] font-medium text-slate-400">
                    <FiFlag className="mr-1 h-3 w-3" /> Priority:
                  </span>
                  {PRIORITIES.map((p) => {
                    const isSelected = selectedPriority === p;
                    const style = PRIORITY_STYLES[p];
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setSelectedPriority(p)}
                        className={`group relative flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-medium capitalize transition-all cursor-pointer ${
                          isSelected
                            ? `${style.badge} ${style.text} ${style.border} border shadow-sm`
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        <span>{p}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Due Date Picker Mockup */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDatePickerOpen(!isDatePickerOpen);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/50 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-slate-700/50 hover:text-white cursor-pointer"
                  >
                    <FiCalendar className="h-3 w-3 text-indigo-400" />
                    <span>{selectedDueDate}</span>
                    <FiChevronDown className="h-3 w-3 opacity-60" />
                  </button>

                  {isDatePickerOpen && (
                    <div className="absolute left-0 mt-2 z-30 w-44 rounded-2xl border border-white/10 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-xl">
                      <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 tracking-wider">
                        Due Date Preset
                      </div>
                      {DUE_DATE_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setSelectedDueDate(preset);
                            setIsDatePickerOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors ${
                            selectedDueDate === preset
                              ? 'bg-indigo-600/30 text-indigo-200'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span>{preset}</span>
                          {selectedDueDate === preset && (
                            <span className="text-indigo-400 text-xs">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Add Task Button */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="submit"
                  disabled={!title.trim()}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-2xl px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer duration-200 ${
                    title.trim()
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  <FiPlus className="h-4 w-4" />
                  <span>Add Task</span>
                </button>
              </div>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default TaskQuickComposer;
