import React from 'react';
import { FiCheckSquare, FiTrash2 } from 'react-icons/fi';
import type { Todo, FilterStatus, Category } from '../types/todo';
import { TodoItem } from './TodoItem';
import { TodoEmptyState } from './TodoEmptyState';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onClearCompleted: () => void;
  filterStatus: FilterStatus;
  searchQuery: string;
  selectedCategory: Category | 'all';
  onOpenNewTaskModal: () => void;
  onResetFilters: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onDelete,
  onEdit,
  onClearCompleted,
  filterStatus,
  searchQuery,
  selectedCategory,
  onOpenNewTaskModal,
  onResetFilters,
}) => {
  const completedCount = todos.filter((t) => t.completed).length;

  if (todos.length === 0) {
    return (
      <TodoEmptyState
        filterStatus={filterStatus}
        searchQuery={searchQuery}
        hasCategoryFilter={selectedCategory !== 'all'}
        onOpenNewTaskModal={onOpenNewTaskModal}
        onResetFilters={onResetFilters}
      />
    );
  }

  return (
    <div className="space-y-3.5">
      {/* List Meta Header */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-medium">
          <FiCheckSquare className="text-indigo-400" />
          <span>Showing <strong className="text-white font-semibold">{todos.length}</strong> {todos.length === 1 ? 'task' : 'tasks'}</span>
        </div>

        {completedCount > 0 && filterStatus !== 'pending' && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <FiTrash2 className="h-3 w-3" />
            <span>Clear Completed ({completedCount})</span>
          </button>
        )}
      </div>

      {/* Task Items Column */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
