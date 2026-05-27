export default function AICopilot() {
  return (
    <div
      className="
        fixed
        bottom-5
        right-5
        w-[320px]
        bg-[#0F172A]/95
        backdrop-blur-xl
        border
        border-white/10
        rounded-[28px]
        overflow-hidden
        shadow-2xl
        z-40
      "
    >

      <div className="p-5 border-b border-white/5">

        <div className="flex items-center gap-3">

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
            <h2 className="text-[28px] font-bold">
              AI Copilot
            </h2>

            <p className="text-zinc-400 text-sm">
              Smart academic assistant
            </p>
          </div>

        </div>

      </div>

      <div className="p-4 space-y-3">

        <div className="bg-white/5 rounded-2xl p-4 text-sm">
          Generate revision notes for DBMS
        </div>

        <div className="bg-white/5 rounded-2xl p-4 text-sm">
          Create important viva questions
        </div>

        <div className="bg-white/5 rounded-2xl p-4 text-sm">
          Predict exam topics from PYQs
        </div>

      </div>

      <div className="p-4 border-t border-white/5">

        <div
          className="
            bg-white/5
            rounded-2xl
            px-4
            py-3
            flex
            items-center
            justify-between
          "
        >
          <p className="text-zinc-500 text-sm">
            Ask AI anything...
          </p>

          <div
            className="
              w-9
              h-9
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
            "
          />

        </div>

      </div>

    </div>
  );
}