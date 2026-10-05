import Icon from "./Icon";

export type Task = { title: string; note: string; time: string; list: string; color: string; done?: boolean; urgent?: boolean };

const TaskItem = ({ task }: { task: Task }) => (
  <article className={`group relative flex gap-3 rounded-2xl border px-4 py-4 ${task.done ? "border-transparent bg-[#f1f0eb] opacity-65" : "border-[#e9e6de] bg-[#fffdfa] shadow-[0_4px_15px_rgba(35,44,39,0.025)]"}`}>
    <button aria-label={`Mark ${task.title} complete`} className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border ${task.done ? "border-[#67846d] bg-[#67846d] text-white" : "border-[#b9c1b9] text-transparent"}`}><Icon name="check" size={13} /></button>
    <div className="min-w-0 flex-1"><h3 className={`text-[15px] font-semibold ${task.done ? "text-[#718078] line-through" : "text-[#303934]"}`}>{task.title}</h3><p className="mt-1 text-sm text-[#89918b]">{task.note}</p><div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold"><span className={`rounded-full px-2.5 py-1 ${task.urgent ? "bg-[#fde6df] text-[#bb6046]" : "bg-[#edf1eb] text-[#5f7866]"}`}>{task.time}</span><span className="rounded-full bg-[#f1eff8] px-2.5 py-1 text-[#81789c]"><i className={`mr-1.5 inline-block size-1.5 rounded-full ${task.color}`} />{task.list}</span></div></div>
    <div className="flex gap-1 self-start opacity-0 transition group-hover:opacity-100"><button aria-label={`Delete ${task.title}`} className="grid size-8 place-items-center rounded-lg text-[#98a099] hover:bg-[#f9e9e5] hover:text-[#d36c51]"><Icon name="trash" size={16} /></button><button aria-label="More task options" className="grid size-8 place-items-center rounded-lg text-[#98a099] hover:bg-[#f2f0eb]"><Icon name="dots" size={16} /></button></div>
  </article>
);
export default TaskItem;
