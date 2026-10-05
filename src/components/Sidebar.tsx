import Icon from "./Icon";

const navigation: [string, "home" | "inbox" | "calendar", string, boolean][] = [
  ["Today", "home", "04", true],
  ["Inbox", "inbox", "12", false],
  ["Upcoming", "calendar", "", false],
];

const Sidebar = () => (
  <aside className="hidden w-[250px] shrink-0 flex-col border-r border-[#e6e3db] bg-[#eeece5] px-5 py-8 lg:flex">
    <a href="#top" className="mb-14 flex items-center gap-3 px-2">
      <span className="grid size-9 place-items-center rounded-xl bg-[#e8734a] text-white shadow-[0_7px_16px_rgba(232,115,74,0.28)]">
        <Icon name="leaf" size={20} />
      </span>
      <span className="font-serif text-2xl tracking-[-0.06em]">morrow</span>
    </a>
    <nav className="space-y-1">
      {navigation.map(([label, icon, count, active]) => (
        <a
          key={label}
          href="#tasks"
          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${active ? "bg-[#fffdfa] text-[#293d34] shadow-sm" : "text-[#68716c]"}`}
        >
          <Icon name={icon} size={18} />
          <span className="flex-1">{label}</span>
          {count && <span className="text-xs text-[#9aa19c]">{count}</span>}
        </a>
      ))}
    </nav>
    <div className="mt-11">
      <div className="mb-3 flex items-center justify-between px-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#979d96]">
          My lists
        </span>
        <Icon name="plus" size={15} />
      </div>
      <div className="space-y-1 text-sm font-medium text-[#68716c]">
        <a
          href="#tasks"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5"
        >
          <i className="size-2 rounded-full bg-[#dbbc54]" />
          Personal <span className="ml-auto text-xs text-[#9aa19c]">03</span>
        </a>
        <a
          href="#tasks"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5"
        >
          <i className="size-2 rounded-full bg-[#779985]" />
          Work <span className="ml-auto text-xs text-[#9aa19c]">06</span>
        </a>
        <a
          href="#tasks"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5"
        >
          <i className="size-2 rounded-full bg-[#a897c2]" />
          Someday
        </a>
      </div>
    </div>
    <div className="mt-auto rounded-2xl bg-[#dfe7dd] p-4">
      <p className="font-serif text-lg text-[#304237]">Tiny steps, big days.</p>
      <p className="mt-1 text-xs leading-5 text-[#718076]">
        You&apos;re making good progress this week.
      </p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#c6d2c5]">
        <div className="h-full w-[72%] rounded-full bg-[#557860]" />
      </div>
    </div>
  </aside>
);

export default Sidebar;
