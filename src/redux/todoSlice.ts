import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { 
  Todo, 
  FilterStatus, 
  SortOption, 
  Category, 
  Priority,
  NewTodoFormData, 
  TodoStatsData 
} from '../types/todo';
import { PRIORITY_STYLES } from '../types/todo';
import { INITIAL_TODOS } from '../data/mockTodos';

export interface TodoState {
  todos: Todo[];
  searchQuery: string;
  statusFilter: FilterStatus;
  selectedCategory: Category | 'all';
  sortOption: SortOption;
  isModalOpen: boolean;
  editingTodo: Todo | null;
}

const initialState: TodoState = {
  todos: INITIAL_TODOS,
  searchQuery: '',
  statusFilter: 'all',
  selectedCategory: 'all',
  sortOption: 'newest',
  isModalOpen: false,
  editingTodo: null,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (
      state, 
      action: PayloadAction<{
        title: string;
        description?: string;
        category: Category;
        priority: Priority;
        dueDate: string;
        tags?: string[];
      }>
    ) => {
      const newTodo: Todo = {
        id: `task-${Date.now()}`,
        title: action.payload.title,
        description: action.payload.description || '',
        category: action.payload.category,
        priority: action.payload.priority,
        dueDate: action.payload.dueDate,
        completed: false,
        createdAt: new Date().toISOString(),
        tags: action.payload.tags || [],
      };
      state.todos.unshift(newTodo);
    },

    updateTodo: (
      state, 
      action: PayloadAction<{ id: string; data: NewTodoFormData }>
    ) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          title: action.payload.data.title,
          description: action.payload.data.description,
          category: action.payload.data.category,
          priority: action.payload.data.priority,
          dueDate: action.payload.data.dueDate,
          tags: action.payload.data.tags,
        };
      }
    },

    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },

    clearCompleted: (state) => {
      state.todos = state.todos.filter((t) => !t.completed);
    },

    markAllCompleted: (state) => {
      state.todos.forEach((todo) => {
        todo.completed = true;
      });
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setStatusFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.statusFilter = action.payload;
    },

    setSelectedCategory: (state, action: PayloadAction<Category | 'all'>) => {
      state.selectedCategory = action.payload;
    },

    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },

    openNewTaskModal: (state) => {
      state.editingTodo = null;
      state.isModalOpen = true;
    },

    openEditTaskModal: (state, action: PayloadAction<Todo>) => {
      state.editingTodo = action.payload;
      state.isModalOpen = true;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
      state.editingTodo = null;
    },

    resetFilters: (state) => {
      state.searchQuery = '';
      state.statusFilter = 'all';
      state.selectedCategory = 'all';
    },

    resetToDemoData: (state) => {
      state.todos = INITIAL_TODOS;
      state.searchQuery = '';
      state.statusFilter = 'all';
      state.selectedCategory = 'all';
      state.sortOption = 'newest';
      state.isModalOpen = false;
      state.editingTodo = null;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  markAllCompleted,
  setSearchQuery,
  setStatusFilter,
  setSelectedCategory,
  setSortOption,
  openNewTaskModal,
  openEditTaskModal,
  closeModal,
  resetFilters,
  resetToDemoData,
} = todoSlice.actions;

// Selectors
export const selectTodos = (state: { todo: TodoState }) => state.todo.todos;
export const selectSearchQuery = (state: { todo: TodoState }) => state.todo.searchQuery;
export const selectStatusFilter = (state: { todo: TodoState }) => state.todo.statusFilter;
export const selectSelectedCategory = (state: { todo: TodoState }) => state.todo.selectedCategory;
export const selectSortOption = (state: { todo: TodoState }) => state.todo.sortOption;
export const selectIsModalOpen = (state: { todo: TodoState }) => state.todo.isModalOpen;
export const selectEditingTodo = (state: { todo: TodoState }) => state.todo.editingTodo;

// Selector: Computed Stats
export const selectTodoStats = (state: { todo: TodoState }): TodoStatsData => {
  const todos = state.todo.todos;
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const urgentCount = todos.filter((t) => !t.completed && t.priority === 'urgent').length;
  const highCount = todos.filter((t) => !t.completed && t.priority === 'high').length;

  return {
    total,
    completed,
    pending,
    completionRate,
    urgentCount,
    highCount,
  };
};

// Selector: Tab Counts
export const selectTabCounts = (state: { todo: TodoState }) => {
  const todos = state.todo.todos;
  return {
    all: todos.length,
    pending: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };
};

// Selector: Filtered & Sorted Todos
export const selectFilteredAndSortedTodos = (state: { todo: TodoState }): Todo[] => {
  const { todos, statusFilter, selectedCategory, searchQuery, sortOption } = state.todo;

  return todos
    .filter((todo) => {
      // Status filter
      if (statusFilter === 'pending' && todo.completed) return false;
      if (statusFilter === 'completed' && !todo.completed) return false;

      // Category filter
      if (selectedCategory !== 'all' && todo.category !== selectedCategory) return false;

      // Search query (title, description, tags)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = todo.title.toLowerCase().includes(query);
        const matchDesc = todo.description?.toLowerCase().includes(query) ?? false;
        const matchTags = todo.tags?.some((t) => t.toLowerCase().includes(query)) ?? false;
        if (!matchTitle && !matchDesc && !matchTags) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'priority') {
        return PRIORITY_STYLES[b.priority].level - PRIORITY_STYLES[a.priority].level;
      }
      if (sortOption === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      if (sortOption === 'dueDate') {
        return a.dueDate.localeCompare(b.dueDate);
      }
      // default 'newest'
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
};

export default todoSlice.reducer;
