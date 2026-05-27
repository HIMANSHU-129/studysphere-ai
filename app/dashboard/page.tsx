"use client";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white p-6 lg:p-10 lg:ml-[40px]">
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 mb-12 mt-16 lg:mt-0">
        <div>
          <h1 className="text-5xl xl:text-7xl font-black leading-none">
            Welcome back,
            <br />
            Himanshu 👋
          </h1>

          <p className="text-gray-400 text-xl mt-5">
            Ready to dominate your studies today?
          </p>
        </div>

        <input
          placeholder="Search notes and subjects..."
          className="
            w-full
            xl:w-[360px]
            bg-[#0b1529]
            border
            border-[#1e2d4d]
            rounded-2xl
            px-6
            py-4
            outline-none
            focus:border-cyan-500
            transition-all
          "
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#081120] border border-[#1e2d4d] rounded-[32px] p-8 hover:border-cyan-500/40 transition-all duration-300">
          <p className="text-gray-400 text-lg mb-4">
            Notes Created
          </p>

          <h2 className="text-6xl font-black">
            0
          </h2>

          <p className="text-cyan-400 mt-5">
            Live academic workspace
          </p>
        </div>

        <div className="bg-[#081120] border border-[#1e2d4d] rounded-[32px] p-8 hover:border-purple-500/40 transition-all duration-300">
          <p className="text-gray-400 text-lg mb-4">
            Subjects
          </p>

          <h2 className="text-6xl font-black">
            0
          </h2>

          <p className="text-purple-400 mt-5">
            Organized learning
          </p>
        </div>

        <div className="bg-[#081120] border border-[#1e2d4d] rounded-[32px] p-8 hover:border-green-500/40 transition-all duration-300">
          <p className="text-gray-400 text-lg mb-4">
            Weekly Progress
          </p>

          <h2 className="text-6xl font-black">
            0%
          </h2>

          <p className="text-green-400 mt-5">
            AI productivity tracking
          </p>
        </div>
      </div>

      <h2 className="text-5xl font-black mb-8">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div
          className="
            rounded-[32px]
            p-8
            bg-gradient-to-br
            from-fuchsia-600
            to-pink-500
            min-h-[260px]
            hover:scale-[1.03]
            hover:shadow-2xl
            transition-all
            duration-300
            cursor-pointer
          "
        >
          <h2 className="text-4xl font-black leading-tight">
            Create
            <br />
            Note
          </h2>

          <p className="mt-5 text-lg opacity-90">
            Start writing smart notes
          </p>
        </div>

        <div
          className="
            rounded-[32px]
            p-8
            bg-[#157e9b]
            min-h-[260px]
            hover:scale-[1.03]
            hover:shadow-2xl
            transition-all
            duration-300
            cursor-pointer
          "
        >
          <h2 className="text-4xl font-black leading-tight">
            Ask AI
            <br />
            Tutor
          </h2>

          <p className="mt-5 text-lg opacity-90">
            Solve doubts instantly
          </p>
        </div>

        <div
          className="
            rounded-[32px]
            p-8
            bg-green-700
            min-h-[260px]
            hover:scale-[1.03]
            hover:shadow-2xl
            transition-all
            duration-300
            cursor-pointer
          "
        >
          <h2 className="text-4xl font-black leading-tight">
            Upload
            <br />
            PDF
          </h2>

          <p className="mt-5 text-lg opacity-90">
            Store study materials
          </p>
        </div>

        <div
          className="
            rounded-[32px]
            p-8
            bg-orange-600
            min-h-[260px]
            hover:scale-[1.03]
            hover:shadow-2xl
            transition-all
            duration-300
            cursor-pointer
          "
        >
          <h2 className="text-4xl font-black leading-tight">
            Revision
            <br />
            Mode
          </h2>

          <p className="mt-5 text-lg opacity-90">
            Smart AI revision flow
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;