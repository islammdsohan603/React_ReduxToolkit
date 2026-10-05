import Icon from "./Icon";
import TaskItem, { type Task } from "./TaskItem";

const tasks: Task[] = [
  {
    title: "Refine the project proposal",
    note: "Add the timeline and budget section before sharing.",
    time: "9:30 AM",
    list: "Work",
    color: "bg-[#779985]",
    urgent: true,
  },
  {
    title: "Call Mum for her birthday",
    note: "Pick up a card on the way home.",
    time: "12:00 PM",
    list: "Personal",
    color: "bg-[#dbbc54]",
  },
  {
    title: "30-minute sketching session",
    note: "Continue the little coffee shop series.",
    time: "5:30 PM",
    list: "Someday",
    color: "bg-[#a897c2]",
  },
];

const TaskList = () => (
  <section id="tasks" className="mt-9">
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 className="font-serif text-2xl tracking-[-0.035em]">
          Today&apos;s rhythm
        </h2>
        <p className="mt-1 text-sm text-[#8b938c]">3 tasks waiting for you</p>
      </div>
      <button className="flex items-center gap-1 text-xs font-bold text-[#68746b]">
        All tasks <Icon name="chevron" size={14} />
      </button>
    </div>
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.title} task={task} />
      ))}
    </div>
    <div className="mt-8 border-t border-[#deddd5] pt-6">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="font-serif text-xl tracking-[-0.03em]">
          Already tended to
        </h2>
        <span className="rounded-full bg-[#e1e5df] px-2 py-0.5 text-[10px] font-bold text-[#6a796e]">
          2
        </span>
      </div>
      <div className="space-y-3">
        <TaskItem
          task={{
            title: "Water the balcony herbs",
            note: "A little care goes a long way.",
            time: "Done",
            list: "Personal",
            color: "bg-[#dbbc54]",
            done: true,
          }}
        />
        <TaskItem
          task={{
            title: "Clear the download folder",
            note: "A calmer desktop for tomorrow.",
            time: "Done",
            list: "Work",
            color: "bg-[#779985]",
            done: true,
          }}
        />
      </div>
    </div>
  </section>
);
export default TaskList;
