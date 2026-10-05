import React, { useState, useEffect } from 'react';
import { 
  FiX, 
  FiCalendar, 
  FiFlag, 
  FiTag, 
  FiAlignLeft, 
  FiCheckCircle, 
  FiPlus, 
  FiZap 
} from 'react-icons/fi';
import type { Category, Priority } from '../types/todo';
import { CATEGORY_STYLES, PRIORITY_STYLES } from '../types/todo';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  selectIsModalOpen, 
  selectEditingTodo, 
  addTodo, 
  updateTodo, 
  closeModal 
} from '../redux/todoSlice';

const CATEGORIES: Category[] = ['Work', 'Design', 'Development', 'Personal', 'Health', 'Finance'];
const PRIORITIES: Priority[] = ['low', 'medium', 'high', 'urgent'];
const QUICK_TAG_SUGGESTIONS = ['Urgent', 'UI/UX', 'Client', 'DeepWork', 'Meeting', 'Sprint'];

/**
 * TaskFormModal Component
 * 
 * Interactive dialog modal for both creating new tasks and editing existing tasks.
 * Includes complete category, priority, due date, tags, and description fields.
 */
export const TaskFormModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsModalOpen);
  const editingTodo = useAppSelector(selectEditingTodo);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Work');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('Today');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || '');
      setDescription(editingTodo.description || '');
      setCategory(editingTodo.category || 'Work');
      setPriority(editingTodo.priority || 'medium');
      setDueDate(editingTodo.dueDate || 'Today');
      setTags(editingTodo.tags || []);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Work');
      setPriority('medium');
      setDueDate('Today');
      setTags([]);
    }
  }, [editingTodo, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        dispatch(closeModal());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const handleAddTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim().replace(/^#/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTodo) {
      dispatch(
        updateTodo({
          id: editingTodo.id,
          data: {
            title: title.trim(),
            description: description.trim(),
            category,
            priority,
            dueDate,
            tags,
          },
        })
      );
    } else {
      dispatch(
        addTodo({
          title: title.trim(),
          description: description.trim(),
          category,
          priority,
          dueDate,
          tags,
        })
      );
    }

    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={() => dispatch(closeModal())}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/95 p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-2xl z-10 animate-in zoom-in-95 duration-200">
        
        {/* Glow behind modal */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-500/15 blur-3xl" />

        {/* Modal Header */}
        <div className="relative flex items-center justify-between pb-4 sm:pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
              <FiZap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {editingTodo ? 'Edit Task Details' : 'Create New Task'}
              </h2>
              <p className="text-xs text-slate-400">
                {editingTodo ? 'Update existing task metadata and parameters' : 'Define your goal with priority, category, and target dates'}
              </p>
            </div>
          </div>

          <button
            onClick={() => dispatch(closeModal())}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-800/60 text-slate-400 transition-all hover:bg-slate-700 hover:text-white cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">
          
          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>Task Title</span>
              <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Deliver UX wireframes for mobile check-in"
              className="w-full rounded-2xl border border-white/10 bg-slate-800/60 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <FiAlignLeft className="text-indigo-400" />
              <span>Description / Notes</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide background context, sub-deliverables, or links..."
              className="w-full resize-none rounded-2xl border border-white/10 bg-slate-800/60 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Category Selector Grid */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <FiTag className="text-indigo-400" />
              <span>Category</span>
            </label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                const style = CATEGORY_STYLES[cat];
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2 sm:p-2.5 text-xs font-semibold transition-all border cursor-pointer ${
                      isSelected
                        ? `${style.bg} ${style.text} ${style.border} ring-2 ring-indigo-500/40 shadow-md`
                        : 'border-white/5 bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority & Due Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Priority Picker */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FiFlag className="text-indigo-400" />
                <span>Priority Level</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRIORITIES.map((p) => {
                  const isSelected = priority === p;
                  const style = PRIORITY_STYLES[p];
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2 px-2.5 sm:px-3 text-xs font-semibold capitalize transition-all border cursor-pointer ${
                        isSelected
                          ? `${style.badge} ${style.text} ${style.border} ring-2 ring-indigo-500/30`
                          : 'border-white/5 bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                      <span>{p}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Due Date Presets & Custom Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FiCalendar className="text-indigo-400" />
                <span>Due Date Target</span>
              </label>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1.5">
                  {['Today', 'Tomorrow', 'Next Week'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setDueDate(preset)}
                      className={`rounded-xl py-1.5 px-2 text-xs font-medium transition-all border cursor-pointer text-center ${
                        dueDate === preset
                          ? 'border-indigo-500/50 bg-indigo-500/20 text-indigo-300'
                          : 'border-white/5 bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="Or custom: e.g. Oct 15, 2026"
                  className="w-full rounded-xl border border-white/10 bg-slate-800/60 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FiTag className="text-indigo-400" />
                <span>Tags / Labels</span>
              </span>
              <span className="text-[11px] text-slate-400 lowercase font-normal">
                Press Enter to add
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-slate-800/40 p-2.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(tagInput);
                  }
                }}
                placeholder={tags.length === 0 ? "Type tag name and hit Enter..." : "+ add tag"}
                className="min-w-[120px] flex-1 bg-transparent px-2 py-1 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            {/* Quick tag suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500">Suggested:</span>
              {QUICK_TAG_SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => handleAddTag(sug)}
                  disabled={tags.includes(sug)}
                  className={`text-[11px] rounded-md px-2 py-0.5 transition-colors cursor-pointer ${
                    tags.includes(sug)
                      ? 'opacity-40 line-through text-slate-500'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                >
                  +{sug}
                </button>
              ))}
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 sm:pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="rounded-2xl border border-white/10 bg-slate-800/80 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!title.trim()}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xl transition-all cursor-pointer ${
                title.trim()
                  ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
              }`}
            >
              {editingTodo ? (
                <>
                  <FiCheckCircle className="h-4 w-4" />
                  <span>Update Task</span>
                </>
              ) : (
                <>
                  <FiPlus className="h-4 w-4" />
                  <span>Create Task</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default TaskFormModal;
