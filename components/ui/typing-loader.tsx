const TypingLoader = () => {
  return (
    <div className="flex items-center gap-2 px-5 py-4 bg-[#081120] border border-[#1b2a44] rounded-2xl w-fit">
      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce"></div>

      <div
        className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce"
        style={{
          animationDelay: "0.15s",
        }}
      ></div>

      <div
        className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce"
        style={{
          animationDelay: "0.3s",
        }}
      ></div>
    </div>
  );
};

export default TypingLoader;