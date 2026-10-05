import Icon from "./Icon";

const FocusCard = () => (
  <aside className="h-fit overflow-hidden rounded-3xl bg-[#30483c] p-6 text-[#f8f6ed] shadow-[0_18px_35px_rgba(37,58,48,0.19)] xl:sticky xl:top-8">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b5c2b7]">
        Today&apos;s focus
      </span>
      <Icon name="leaf" size={19} />
    </div>
    <p className="mt-7 font-serif text-3xl leading-[1.08] tracking-[-0.04em]">
      Slow is smooth.
      <br />
      Smooth is fast.
    </p>
    <div className="relative mt-8 overflow-hidden rounded-2xl bg-[#e9b86b] p-5 text-[#30483c]">
      <div className="absolute -right-7 -top-8 size-32 rounded-full border-[18px] border-[#f4d395]" />
      <p className="relative text-[10px] font-extrabold uppercase tracking-[0.16em]">
        Daily intention
      </p>
      <p className="relative mt-5 font-serif text-xl leading-tight">
        Finish one thing before starting another.
      </p>
      <button className="relative mt-6 flex items-center gap-2 text-xs font-extrabold">
        Read note <Icon name="chevron" size={14} />
      </button>
    </div>
    <div className="mt-7">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#b5c2b7]">
            Weekly pace
          </p>
          <p className="mt-1 font-serif text-2xl">
            72%{" "}
            <span className="font-sans text-xs font-medium text-[#b5c2b7]">
              complete
            </span>
          </p>
        </div>
        <span className="text-sm text-[#cfdbcf]">18 / 25</span>
      </div>
      <div className="mt-3 flex gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <i
            key={day}
            className={`h-2 flex-1 rounded-full ${day < 6 ? "bg-[#8eab90]" : "bg-[#4b6455]"}`}
          />
        ))}
      </div>
    </div>
    <button className="mt-7 flex w-full items-center justify-between border-t border-[#526a5c] pt-5 text-sm font-semibold text-[#dfe7dc]">
      Archive completed <Icon name="archive" size={17} />
    </button>
  </aside>
);
export default FocusCard;
