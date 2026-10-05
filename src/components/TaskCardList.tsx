import React from 'react';
import { FiCheckSquare, FiTrash2 } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  selectFilteredAndSortedTodos, 
  selectStatusFilter,
  clearCompleted 
} from '../redux/todoSlice';
import { TaskCard } from './TaskCard';
import { TaskEmptyState } from './TaskEmptyState';

/**
 * TaskCardList Component
 * 
 * Container for the list of task cards. Handles list meta info (total tasks shown),
 * batch clear completed actions, and conditionally renders TaskEmptyState.
 */
export const TaskCardList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectFilteredAndSortedTodos);
  const statusFilter = useAppSelector(selectStatusFilter);

  const completedCount = todos.filter((t) => t.completed).length;

  if (todos.length === 0) {
    return <TaskEmptyState />;
  }

  return (
    <div className="space-y-3 sm:space-y-3.5">
      {/* List Meta Header */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-medium">
          <FiCheckSquare className="text-indigo-400" />
          <span>
            Showing <strong className="text-white font-semibold">{todos.length}</strong> {todos.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        {completedCount > 0 && statusFilter !== 'pending' && (
          <button
            type="button"
            onClick={() => dispatch(clearCompleted())}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <FiTrash2 className="h-3 w-3" />
            <span>Clear Completed ({completedCount})</span>
          </button>
        )}
      </div>

      {/* Task Cards Stack */}
      <div className="space-y-2.5 sm:space-y-3">
        {todos.map((todo) => (
          <TaskCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TaskCardList;
