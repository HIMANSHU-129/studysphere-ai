"use client";

import { ChatMessage } from "@/src/types/chat";

import clsx from "clsx";

import ReactMarkdown from "react-markdown";

import {
  Check,
  Copy,
} from "lucide-react";

import { useState } from "react";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import {
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  chat: ChatMessage;
}

const ChatBubble = ({ chat }: Props) => {
  const isUser =
    chat.role === "user";

  const [copied, setCopied] =
    useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        chat.message
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={clsx(
        "w-full flex",
        isUser
          ? "justify-end"
          : "justify-start"
      )}
    >
      <div
        className={clsx(
          "relative max-w-[85%] rounded-3xl px-6 py-5 border shadow-xl overflow-hidden",
          "transition-all duration-300",
          isUser
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-400"
            : "bg-[#081120] border-[#1b2a44] text-gray-200"
        )}
      >
        {!isUser && (
          <button
            onClick={handleCopy}
            className="
              absolute top-4 right-4
              bg-black/20
              hover:bg-black/40
              transition-all
              p-2
              rounded-xl
              z-10
            "
          >
            {copied ? (
              <Check
                size={16}
                className="text-green-400"
              />
            ) : (
              <Copy
                size={16}
                className="text-gray-300"
              />
            )}
          </button>
        )}

        <div
          className="
            text-[15px]
            leading-8
            whitespace-pre-wrap
            break-words

            [&_h1]:text-3xl
            [&_h1]:font-bold
            [&_h1]:mb-4

            [&_h2]:text-2xl
            [&_h2]:font-semibold
            [&_h2]:mb-3

            [&_h3]:text-xl
            [&_h3]:font-semibold
            [&_h3]:mb-2

            [&_p]:mb-4

            [&_ul]:ml-6
            [&_ul]:list-disc
            [&_ul]:mb-4

            [&_ol]:ml-6
            [&_ol]:list-decimal
            [&_ol]:mb-4

            [&_li]:mb-2
          "
        >
          <ReactMarkdown
            components={{
              code(props) {
                const {
                  children,
                  className,
                } = props;

                const match =
                  /language-(\\w+)/.exec(
                    className || ""
                  );

                return match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius:
                        "18px",
                      padding:
                        "20px",
                      marginTop:
                        "16px",
                      marginBottom:
                        "16px",
                      fontSize:
                        "14px",
                    }}
                  >
                    {String(
                      children
                    ).replace(
                      /\\n$/,
                      ""
                    )}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-black/30 px-2 py-1 rounded-md text-cyan-300">
                    {children}
                  </code>
                );
              },
            }}
          >
            {chat.message}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;