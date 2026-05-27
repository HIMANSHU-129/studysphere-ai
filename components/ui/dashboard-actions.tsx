"use client";

import Link from "next/link";

import {
  Brain,
  FileText,
  Upload,
  Sparkles,
} from "lucide-react";

const DashboardActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Link
        href="/dashboard/notes"
        className="
          rounded-[32px]
          p-8
          bg-gradient-to-br from-fuchsia-600 to-pink-500
          hover:scale-[1.03]
          transition-all
        "
      >
        <FileText size={42} />

        <h2 className="text-5xl font-black mt-8 leading-tight">
          Create
          <br />
          Note
        </h2>

        <p className="mt-6 text-lg opacity-90">
          Start writing smart notes
        </p>
      </Link>

      <Link
        href="/dashboard/ai-tutor"
        className="
          rounded-[32px]
          p-8
          bg-[#0d7d9c]
          hover:scale-[1.03]
          transition-all
        "
      >
        <Brain size={42} />

        <h2 className="text-5xl font-black mt-8 leading-tight">
          Ask AI
          <br />
          Tutor
        </h2>

        <p className="mt-6 text-lg opacity-90">
          Solve doubts instantly
        </p>
      </Link>

      <Link
        href="/dashboard/ai-tutor"
        className="
          rounded-[32px]
          p-8
          bg-green-700
          hover:scale-[1.03]
          transition-all
        "
      >
        <Upload size={42} />

        <h2 className="text-5xl font-black mt-8 leading-tight">
          Upload
          <br />
          PDF
        </h2>

        <p className="mt-6 text-lg opacity-90">
          Store study materials
        </p>
      </Link>

      <Link
        href="/dashboard/ai-tutor"
        className="
          rounded-[32px]
          p-8
          bg-orange-600
          hover:scale-[1.03]
          transition-all
        "
      >
        <Sparkles size={42} />

        <h2 className="text-5xl font-black mt-8 leading-tight">
          Revision
          <br />
          Mode
        </h2>

        <p className="mt-6 text-lg opacity-90">
          Smart AI revision flow
        </p>
      </Link>
    </div>
  );
};

export default DashboardActions;