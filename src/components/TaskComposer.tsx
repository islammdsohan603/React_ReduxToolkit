import Icon from "./Icon";

const TaskComposer = () => (
  <section
    aria-label="Add a task"
    className="rounded-2xl border border-[#e5e1d9] bg-[#fffdfa] p-3 shadow-[0_8px_28px_rgba(35,44,39,0.045)]"
  >
    <div className="flex items-center gap-3 px-2">
      <span className="grid size-7 place-items-center rounded-full border-2 border-dashed border-[#c8cec7] text-[#91a098]">
        <Icon name="plus" size={15} />
      </span>
      <input
        aria-label="Task title"
        readOnly
        placeholder="What needs your attention?"
        className="min-w-0 flex-1 bg-transparent py-3 text-[15px] outline-none placeholder:text-[#a0a7a1]"
      />
      <button className="hidden rounded-lg bg-[#edf1eb] px-3 py-2 text-xs font-bold text-[#526057] sm:block">
        Add task
      </button>
    </div>
    <div className="mt-2 flex items-center gap-2 border-t border-[#f0eee8] px-2 pt-3 text-xs font-semibold text-[#859089]">
      <button className="flex items-center gap-1.5 rounded-md px-1.5 py-1">
        <Icon name="calendar" size={14} />
        Due date
      </button>
      <button className="flex items-center gap-1.5 rounded-md px-1.5 py-1">
        <Icon name="flag" size={14} />
        Priority
      </button>
      <button className="flex items-center gap-1.5 rounded-md px-1.5 py-1">
        <Icon name="tag" size={14} />
        List
      </button>
    </div>
  </section>
);
export default TaskComposer;
