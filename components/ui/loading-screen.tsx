export default function LoadingScreen() {

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#020617]
      "
    >

      <div className="text-center">

        {/* LOGO */}

        <div
          className="
            w-24
            h-24
            rounded-[28px]
            bg-gradient-to-r
            from-cyan-400
            to-purple-600
            flex
            items-center
            justify-center
            text-4xl
            font-bold
            mx-auto
            animate-pulse
            shadow-2xl
            shadow-purple-500/30
          "
        >
          AI
        </div>

        {/* TITLE */}

        <h1
          className="
            text-5xl
            font-bold
            mt-8
            bg-gradient-to-r
            from-white
            to-zinc-400
            bg-clip-text
            text-transparent
          "
        >
          StudySphere AI
        </h1>

        <p className="text-zinc-500 mt-4 text-lg">
          Initializing your academic workspace...
        </p>

        {/* LOADER */}

        <div
          className="
            mt-10
            w-[320px]
            h-2
            bg-white/10
            rounded-full
            overflow-hidden
            mx-auto
          "
        >

          <div
            className="
              h-full
              w-[40%]
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              animate-[loading_1.2s_ease-in-out_infinite]
            "
          />

        </div>

      </div>

    </div>
  );
}