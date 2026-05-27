"use client";

import { useState } from "react";

interface Props {
  question: string;
  options: string[];
  answer: string;
}

const QuizCard = ({
  question,
  options,
  answer,
}: Props) => {
  const [selected, setSelected] =
    useState("");

  const [showAnswer, setShowAnswer] =
    useState(false);

  return (
    <div
      className="
        bg-[#0b1529]
        border border-[#1e2d4d]
        rounded-3xl
        p-6
        space-y-5
      "
    >
      <h2 className="text-xl font-semibold leading-8">
        {question}
      </h2>

      <div className="space-y-3">
        {options.map((option) => {
          const isCorrect =
            showAnswer &&
            option === answer;

          const isWrong =
            showAnswer &&
            selected === option &&
            option !== answer;

          return (
            <button
              key={option}
              onClick={() =>
                setSelected(option)
              }
              className={`
                w-full text-left px-5 py-4 rounded-2xl border transition-all

                ${
                  selected === option
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-[#1e2d4d]"
                }

                ${
                  isCorrect
                    ? "border-green-500 bg-green-500/10"
                    : ""
                }

                ${
                  isWrong
                    ? "border-red-500 bg-red-500/10"
                    : ""
                }
              `}
            >
              {option}
            </button>
          );
        })}
      </div>

      {!showAnswer ? (
        <button
          onClick={() =>
            setShowAnswer(true)
          }
          disabled={!selected}
          className="
            bg-gradient-to-r from-cyan-500 to-blue-500
            px-5 py-3
            rounded-2xl
            font-semibold
            disabled:opacity-50
          "
        >
          Check Answer
        </button>
      ) : (
        <div className="text-green-400 font-medium">
          Correct Answer: {answer}
        </div>
      )}
    </div>
  );
};

export default QuizCard;