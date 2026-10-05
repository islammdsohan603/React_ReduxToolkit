import React from 'react';
import { 
  FiPlus, 
  FiCheckCircle, 
  FiRotateCcw,
  FiZap 
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  selectTodoStats, 
  openNewTaskModal, 
  markAllCompleted, 
  resetToDemoData 
} from '../redux/todoSlice';

/**
 * TaskActionBarFooter Component
 * 
 * Bottom dashboard action toolbar providing batch actions,
 * demo reset capabilities, and keyboard shortcut tips.
 */
export const TaskActionBarFooter: React.FC = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectTodoStats);

  return (
    <footer className="relative mt-8 sm:mt-12 w-full rounded-2xl border border-white/5 bg-slate-900/40 p-3.5 sm:p-4 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 text-xs text-slate-400">
        
        {/* Left: Quick Action Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5 mr-1 text-[11px] sm:text-xs">
            <FiZap className="text-indigo-400 h-3.5 w-3.5" /> Quick Actions:
          </span>

          <button
            onClick={() => dispatch(openNewTaskModal())}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-2.5 sm:px-3 py-1.5 font-medium text-slate-200 hover:bg-indigo-600/30 hover:text-indigo-200 hover:border-indigo-500/30 transition-all cursor-pointer text-xs"
          >
            <FiPlus className="h-3 w-3" />
            <span>New Task Modal</span>
          </button>

          {stats.pending > 0 && (
            <button
              onClick={() => dispatch(markAllCompleted())}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-2.5 sm:px-3 py-1.5 font-medium text-slate-200 hover:bg-emerald-600/30 hover:text-emerald-200 hover:border-emerald-500/30 transition-all cursor-pointer text-xs"
            >
              <FiCheckCircle className="h-3 w-3" />
              <span>Mark All Done</span>
            </button>
          )}

          <button
            onClick={() => dispatch(resetToDemoData())}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-2.5 sm:px-3 py-1.5 font-medium text-slate-200 hover:bg-slate-700/60 transition-all cursor-pointer text-xs"
          >
            <FiRotateCcw className="h-3 w-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* Right: Keyboard Shortcuts Guide */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-slate-400 text-[10px] sm:text-[11px]">
          <span className="hidden md:inline-flex items-center gap-1">
            <kbd className="rounded border border-white/10 bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">Esc</kbd> Close Modal
          </span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="font-medium text-slate-400">
            React Redux Toolkit • Modern UI
          </span>
        </div>

      </div>
    </footer>
  );
};

export default TaskActionBarFooter;
