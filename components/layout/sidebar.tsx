"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "◫",
  },
  {
    title: "Notes",
    href: "/dashboard/notes",
    icon: "📝",
  },
  {
    title: "Subjects",
    href: "/dashboard/subjects",
    icon: "📚",
  },
  {
    title: "AI Tutor",
    href: "/dashboard/ai-tutor",
    icon: "🧠",
  },
  {
    title: "Question Bank",
    href: "/dashboard/question-bank",
    icon: "❔",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "⚙",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        w-[220px]
        h-screen
        bg-[#070B1A]
        border-r
        border-white/5
        flex
        flex-col
        justify-between
        px-4
        py-5
      "
    >

      <div>

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-4">

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-r
                from-cyan-400
                to-purple-500
              "
            />

            <div>

              <h1 className="text-[20px] font-bold leading-none">
                StudySphere
              </h1>

              <h2 className="text-[20px] font-bold leading-none">
                AI
              </h2>

            </div>

          </div>

          <p className="text-zinc-500 text-sm">
            AI Academic OS
          </p>

        </div>

        <nav className="space-y-2">

          {menuItems.map((item) => {
            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  transition-all
                  duration-300
                  text-sm
                  ${
                    active
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <span>{item.icon}</span>

                {item.title}
              </Link>
            );
          })}

        </nav>

      </div>

      <div
        className="
          bg-gradient-to-br
          from-[#1E1B4B]
          to-[#0F172A]
          border
          border-white/10
          rounded-3xl
          p-4
        "
      >

        <p className="text-zinc-400 text-sm mb-3">
          Weekly Progress
        </p>

        <h2 className="text-5xl font-bold mb-3">
          76%
        </h2>

        <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden mb-3">
          <div className="w-[76%] h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
        </div>

        <p className="text-cyan-400 text-xs">
          Excellent consistency
        </p>

      </div>

    </aside>
  );
}