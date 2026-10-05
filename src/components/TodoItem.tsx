import React from 'react';
import { 
  FiCheck, 
  FiTrash2, 
  FiEdit3, 
  FiCalendar
} from 'react-icons/fi';
import type { Todo } from '../types/todo';
import { CATEGORY_STYLES, PRIORITY_STYLES } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const categoryStyle = CATEGORY_STYLES[todo.category];
  const priorityStyle = PRIORITY_STYLES[todo.priority];

  const isUrgent = todo.priority === 'urgent' && !todo.completed;
  const isToday = todo.dueDate.toLowerCase().includes('today') && !todo.completed;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
        todo.completed
          ? 'border-white/5 bg-slate-900/40 opacity-75'
          : isUrgent
          ? 'border-red-500/30 bg-slate-900/80 shadow-[0_8px_30px_rgb(239,68,68,0.08)] hover:border-red-500/50'
          : 'border-white/10 bg-slate-900/70 shadow-lg hover:border-indigo-500/30 hover:bg-slate-900/90 hover:shadow-indigo-500/5 hover:-translate-y-0.5'
      }`}
    >
      {/* Subtle indicator bar for urgent/high items */}
      {!todo.completed && (todo.priority === 'urgent' || todo.priority === 'high') && (
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 ${
            todo.priority === 'urgent' ? 'bg-red-500' : 'bg-amber-500'
          }`}
        />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5">
        
        {/* Left Side: Checkbox & Content */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          
          {/* Custom Animated Checkbox */}
          <button
            type="button"
            onClick={() => onToggleComplete(todo.id)}
            title={todo.completed ? "Mark as pending" : "Mark as completed"}
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 cursor-pointer ${
              todo.completed
                ? 'border-emerald-500 bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                : 'border-slate-600 bg-slate-800/80 hover:border-indigo-400 hover:bg-slate-700/60'
            }`}
          >
            {todo.completed && (
              <FiCheck className="h-4 w-4 stroke-[3] animate-in zoom-in-50 duration-150" />
            )}
          </button>

          {/* Title, Description & Metadata */}
          <div className="flex-1 min-w-0 space-y-2">
            
            {/* Title */}
            <div className="flex flex-wrap items-center gap-2">
              <h3
                onClick={() => onToggleComplete(todo.id)}
                className={`text-sm sm:text-base font-semibold tracking-tight transition-all cursor-pointer ${
                  todo.completed
                    ? 'line-through text-slate-500 font-normal'
                    : 'text-slate-100 hover:text-indigo-300'
                }`}
              >
                {todo.title}
              </h3>
            </div>

            {/* Description (if provided) */}
            {todo.description && (
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  todo.completed ? 'line-through text-slate-600' : 'text-slate-400'
                }`}
              >
                {todo.description}
              </p>
            )}

            {/* Badges Row: Category, Priority, Due Date, Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              
              {/* Category Badge */}
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${categoryStyle.border} ${categoryStyle.bg} ${categoryStyle.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${categoryStyle.dot}`} />
                {todo.category}
              </span>

              {/* Priority Pill */}
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${priorityStyle.border} ${priorityStyle.badge} ${priorityStyle.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${priorityStyle.dot}`} />
                {todo.priority}
              </span>

              {/* Due Date Indicator */}
              <span
                className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[11px] font-medium ${
                  isUrgent
                    ? 'border-red-500/30 bg-red-500/10 text-red-300'
                    : isToday
                    ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                    : 'border-white/5 bg-slate-800/60 text-slate-400'
                }`}
              >
                <FiCalendar className="h-3 w-3" />
                <span>{todo.dueDate}</span>
              </span>

              {/* Optional Tags */}
              {todo.tags && todo.tags.length > 0 && (
                <div className="hidden md:flex items-center gap-1">
                  {todo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-800/50 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right Side: Action Icons */}
        <div className="flex items-center gap-1 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 w-full sm:w-auto justify-end">
          
          {/* Quick Mark Complete Button */}
          <button
            type="button"
            onClick={() => onToggleComplete(todo.id)}
            title={todo.completed ? "Mark Incomplete" : "Mark Complete"}
            className={`flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 transition-all cursor-pointer ${
              todo.completed
                ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/30'
            }`}
          >
            <FiCheck className="h-4 w-4" />
          </button>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => onEdit(todo)}
            title="Edit Task Details"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 bg-slate-800/60 text-slate-400 transition-all hover:bg-indigo-500/20 hover:text-indigo-300 hover:border-indigo-500/30 cursor-pointer"
          >
            <FiEdit3 className="h-4 w-4" />
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            title="Delete Task"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 bg-slate-800/60 text-slate-400 transition-all hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30 cursor-pointer"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>

        </div>

      </div>
    </div>
  );
};

export default TodoItem;
