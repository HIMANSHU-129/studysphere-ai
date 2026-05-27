"use client";

import QuizCard from "@/components/ui/quiz-card";

interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

interface Props {
  quizzes: Quiz[];
}

const QuizSection = ({
  quizzes,
}: Props) => {
  if (quizzes.length === 0)
    return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          AI Quiz Mode
        </h2>

        <p className="text-gray-400">
          Test your understanding with
          AI-generated MCQs.
        </p>
      </div>

      <div className="space-y-5">
        {quizzes.map(
          (quiz, index) => (
            <QuizCard
              key={index}
              question={
                quiz.question
              }
              options={quiz.options}
              answer={quiz.answer}
            />
          )
        )}
      </div>
    </div>
  );
};

export default QuizSection;