import React, { useState, useMemo } from 'react';
import type { 
  Todo, 
  FilterStatus, 
  SortOption, 
  Category, 
  Priority,
  NewTodoFormData,
  TodoStatsData 
} from './types/todo';
import { PRIORITY_STYLES } from './types/todo';
import { INITIAL_TODOS } from './data/mockTodos';
import { TodoHeader } from './components/TodoHeader';
import { TodoStats } from './components/TodoStats';
import { TodoInput } from './components/TodoInput';
import { TodoFilters } from './components/TodoFilters';
import { TodoList } from './components/TodoList';
import { TodoInsights } from './components/TodoInsights';
import { NewTaskModal } from './components/NewTaskModal';
import { TodoFooter } from './components/TodoFooter';

export const App: React.FC = () => {
  // Main Todos State
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  
  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // Computed Real-Time Statistics
  const stats: TodoStatsData = useMemo(() => {
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
  }, [todos]);

  // Tab counts for filter header
  const tabCounts = useMemo(() => ({
    all: todos.length,
    pending: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }), [todos]);

  // Filter and Sort Processing
  const filteredAndSortedTodos = useMemo(() => {
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
  }, [todos, statusFilter, selectedCategory, searchQuery, sortOption]);

  // Handlers
  const handleQuickAdd = (
    title: string, 
    category: Category, 
    priority: Priority, 
    dueDate: string
  ) => {
    const newTodo: Todo = {
      id: `task-${Date.now()}`,
      title,
      description: '',
      category,
      priority,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
      tags: [],
    };
    setTodos([newTodo, ...todos]);
  };

  const handleOpenNewTaskModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleModalSubmit = (taskData: NewTodoFormData) => {
    if (editingTodo) {
      setTodos(
        todos.map((t) =>
          t.id === editingTodo.id
            ? {
                ...t,
                title: taskData.title,
                description: taskData.description,
                category: taskData.category,
                priority: taskData.priority,
                dueDate: taskData.dueDate,
                tags: taskData.tags,
              }
            : t
        )
      );
    } else {
      const newTodo: Todo = {
        id: `task-${Date.now()}`,
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        completed: false,
        createdAt: new Date().toISOString(),
        tags: taskData.tags,
      };
      setTodos([newTodo, ...todos]);
    }
  };

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  const handleMarkAllCompleted = () => {
    setTodos(todos.map((t) => ({ ...t, completed: true })));
  };

  const handleResetSampleData = () => {
    setTodos(INITIAL_TODOS);
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedCategory('all');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedCategory('all');
  };

  return (
    <div className="relative min-h-screen bg-[#080c14] text-slate-100 selection:bg-indigo-500 selection:text-white pb-16 sm:pb-24 overflow-x-hidden">
      
      {/* Background ambient glowing gradients */}
      <div className="fixed top-0 left-1/4 h-[550px] w-[550px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
      <div className="fixed top-1/3 right-10 h-[480px] w-[480px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-10 left-10 h-[420px] w-[420px] rounded-full bg-cyan-600/8 blur-[130px] pointer-events-none" />

      {/* Main Container - max-w-7xl with fluid responsive padding */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 lg:pt-10 space-y-6 sm:space-y-8">
        
        {/* 1. App Header with Progress & Stats */}
        <TodoHeader 
          stats={stats} 
          onOpenNewTaskModal={handleOpenNewTaskModal} 
        />

        {/* 2. Mini Metric Cards */}
        <TodoStats stats={stats} />

        {/* 3. Responsive Workspace Layout (Mobile 1-col, Desktop/Laptop 12-col grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Main Work Area: Input, Filters, and Task List (8 cols on laptop/desktop) */}
          <section className="lg:col-span-8 space-y-6">
            {/* Floating Task Input */}
            <TodoInput 
              onQuickAdd={handleQuickAdd} 
              onOpenModal={handleOpenNewTaskModal} 
            />

            {/* Filter & Search Controls */}
            <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-3 sm:p-5 backdrop-blur-xl">
              <TodoFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                selectedCategory={selectedCategory}
                onCategoryFilterChange={setSelectedCategory}
                sortOption={sortOption}
                onSortOptionChange={setSortOption}
                counts={tabCounts}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Main Task List */}
            <TodoList
              todos={filteredAndSortedTodos}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onEdit={handleOpenEditModal}
              onClearCompleted={handleClearCompleted}
              filterStatus={statusFilter}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onOpenNewTaskModal={handleOpenNewTaskModal}
              onResetFilters={handleClearFilters}
            />
          </section>

          {/* Right Insights & Analytics Sidebar (4 cols on laptop/desktop) */}
          <aside className="lg:col-span-4 space-y-6">
            <TodoInsights
              todos={todos}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenNewTaskModal={handleOpenNewTaskModal}
            />
          </aside>

        </div>

        {/* 4. Quick Action Bar / Footer */}
        <TodoFooter
          onOpenNewTaskModal={handleOpenNewTaskModal}
          onMarkAllCompleted={handleMarkAllCompleted}
          onResetSampleData={handleResetSampleData}
          pendingCount={stats.pending}
        />

      </main>

      {/* 5. New Task / Edit Task Modal Form */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        initialData={
          editingTodo
            ? {
                title: editingTodo.title,
                description: editingTodo.description || '',
                category: editingTodo.category,
                priority: editingTodo.priority,
                dueDate: editingTodo.dueDate,
                tags: editingTodo.tags || [],
              }
            : undefined
        }
        isEditing={!!editingTodo}
      />

    </div>
  );
};

export default App;
