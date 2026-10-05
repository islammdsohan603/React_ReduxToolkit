import type { ReactNode } from "react";

type IconName = "archive" | "calendar" | "check" | "chevron" | "dots" | "flag" | "home" | "inbox" | "leaf" | "plus" | "search" | "tag" | "trash";

const paths: Record<IconName, ReactNode> = {
  archive: <><path d="M3 7h18" /><path d="M5 7l1 13h12l1-13" /><path d="M9 11h6" /><path d="M4 4h16v3H4z" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  dots: <path d="M5 12h.01M12 12h.01M19 12h.01" strokeWidth="3" strokeLinecap="round" />,
  flag: <path d="M5 21V4m0 1h11l-1 4 1 4H5" />,
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M9 21v-7h6v7" /></>,
  inbox: <><path d="M4 4h16v13H4z" /><path d="M4 13h4l2 3h4l2-3h4" /></>,
  leaf: <path d="M20 4C10 4 4 8 4 15c0 3 2 5 5 5 7 0 11-6 11-16ZM4 20c2-4 6-7 11-9" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
  tag: <><path d="M20 12 12 20 3 11V4h7z" /><circle cx="7.5" cy="8.5" r=".7" fill="currentColor" /></>,
  trash: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></>,
};

const Icon = ({ name, size = 20 }: { name: IconName; size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
export default Icon;
