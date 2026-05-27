"use client";

import { SendHorizonal } from "lucide-react";
import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
  loading: boolean;
}

const AIInput = ({ onSend, loading }: Props) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="w-full flex items-center gap-3 bg-[#081120] border border-[#1b2a44] rounded-2xl px-4 py-3 shadow-xl">
      <input
        type="text"
        placeholder="Ask StudySphere AI anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all duration-300 text-white p-3 rounded-xl disabled:opacity-50"
      >
        <SendHorizonal size={18} />
      </button>
    </div>
  );
};

export default AIInput;