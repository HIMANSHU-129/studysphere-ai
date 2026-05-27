"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  LayoutDashboard,
  FileText,
 BookOpen,
  Brain,
  HelpCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({
  children,
}: Props) => {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-[#020817] text-white">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          lg:hidden
          fixed
          top-5
          left-5
          z-50
          bg-[#0b1529]
          border
          border-[#1e2d4d]
          p-3
          rounded-2xl
        "
      >
        {open ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>

      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/50
            z-30
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed
          lg:relative
          top-0
          left-0
          z-40
          h-screen
          w-[280px]
          bg-[#050b18]
          border-r
          border-[#1b2a44]
          p-5
          flex
          flex-col
          transition-all
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex items-center gap-3 mb-10">
          <Image
            src="/logo.png"
            alt="StudySphere AI"
            width={50}
            height={50}
            className="object-contain"
            priority
          />

          <div>
            <h1 className="text-2xl font-black">
              StudySphere
            </h1>

            <p className="text-gray-400 text-sm">
              AI Academic OS
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="
              flex
              items-center
              gap-4
              px-4
              py-4
              rounded-2xl
              border
              border-[#1b2a44]
              hover:bg-[#0b1529]
              transition-all
            "
          >
            <LayoutDashboard size={22} />

            Dashboard
          </Link>

          <Link
            href="/dashboard/notes"
            className="
              flex
              items-center
              gap-4
              px-4
              py-4
              rounded-2xl
              hover:bg-[#0b1529]
              transition-all
            "
          >
            <FileText size={22} />

            Notes
          </Link>

          <Link
            href="/dashboard/subjects"
            className="
              flex
              items-center
              gap-4
              px-4
              py-4
              rounded-2xl
              hover:bg-[#0b1529]
              transition-all
            "
          >
            <BookOpen size={22} />

            Subjects
          </Link>

          <Link
            href="/dashboard/ai-tutor"
            className="
              flex
              items-center
              gap-4
              px-4
              py-4
              rounded-2xl
              hover:bg-[#0b1529]
              transition-all
            "
          >
            <Brain size={22} />

            AI Tutor
          </Link>

          <Link
            href="/dashboard/question-bank"
            className="
              flex
              items-center
              gap-4
              px-4
              py-4
              rounded-2xl
              hover:bg-[#0b1529]
              transition-all
            "
          >
            <HelpCircle size={22} />

            Question Bank
          </Link>

          <Link
            href="/dashboard/settings"
            className="
              flex
              items-center
              gap-4
              px-4
              py-4
              rounded-2xl
              hover:bg-[#0b1529]
              transition-all
            "
          >
            <Settings size={22} />

            Settings
          </Link>
        </nav>

        <div className="mt-auto">
          <div className="bg-[#0b1529] border border-[#1b2a44] rounded-2xl p-4">
            <p className="text-xs text-gray-400">
              StudySphere AI
            </p>

            <h2 className="text-lg font-bold mt-1">
              Academic OS
            </h2>

            <p className="text-cyan-400 text-xs mt-2">
              Powered by Thakur Himanshu
            </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto ml-0">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;