import Icon from "./Icon";

const Header = () => (
  <header
    id="top"
    className="flex flex-wrap items-center justify-between gap-5"
  >
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#89918b]">
        Monday, October 5
      </p>
      <h1 className="font-serif text-4xl tracking-[-0.04em] text-[#1f2925] sm:text-5xl">
        Make room for what matters.
      </h1>
    </div>
    <div className="flex items-center gap-3">
      <button
        aria-label="Search tasks"
        className="grid size-11 place-items-center rounded-full border border-[#e1ded5] bg-[#fbfaf7] text-[#57605a] shadow-[0_4px_14px_rgba(35,44,39,0.04)]"
      >
        <Icon name="search" size={18} />
      </button>
      <button
        onClick={() => alert("New task button clicked!")}
        className="flex cursor-pointer items-center gap-2 rounded-full bg-[#293d34] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(41,61,52,0.2)]"
      >
        <Icon name="plus" size={17} />
        New task
      </button>
    </div>
  </header>
);

export default Header;
