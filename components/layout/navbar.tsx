export default function Navbar() {
  return (
    <header
      className="
        h-[82px]
        border-b
        border-white/5
        px-8
        flex
        items-center
        justify-between
        bg-[#050816]/80
        backdrop-blur-xl
      "
    >

      <div>

        <h1 className="text-[42px] font-bold tracking-tight">
          Welcome back, Himanshu 👋
        </h1>

        <p className="text-zinc-400 text-[17px]">
          Ready to dominate your studies today?
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div
          className="
            w-[300px]
            bg-[#0F172A]
            border
            border-white/10
            rounded-2xl
            px-5
            py-3.5
          "
        >
          <p className="text-zinc-500 text-sm">
            Search notes, subjects, PDFs...
          </p>
        </div>

        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-[#0F172A]
            border
            border-white/10
          "
        />

        <div
          className="
            bg-[#0F172A]
            border
            border-white/10
            rounded-2xl
            px-4
            py-2.5
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
            "
          />

          <div>
            <h2 className="font-semibold text-sm">
              Himanshu
            </h2>

            <p className="text-zinc-400 text-xs">
              Premium Student
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}