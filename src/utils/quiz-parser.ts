interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export const parseQuizResponse = (
  text: string
): QuizQuestion[] => {
  const questions: QuizQuestion[] =
    [];

  const blocks =
    text.split("QUESTION:");

  for (const block of blocks) {
    if (!block.trim()) continue;

    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const question = lines[0] || "";

    const options = lines
      .filter(
        (line) =>
          line.startsWith("A.") ||
          line.startsWith("B.") ||
          line.startsWith("C.") ||
          line.startsWith("D.")
      )
      .map((line) =>
        line.replace(
          /^[A-D]\\./,
          ""
        ).trim()
      );

    const answerLine = lines.find(
      (line) =>
        line.startsWith("ANSWER:")
    );

    const answer =
      answerLine
        ?.replace("ANSWER:", "")
        .trim() || "";

    if (
      question &&
      options.length > 0 &&
      answer
    ) {
      questions.push({
        question,
        options,
        answer,
      });
    }
  }

  return questions;
};