interface Props {
  onAction: (prompt: string) => void;

  disabled?: boolean;
}

const actions = [
  {
    title: "Summarize PDF",
    prompt:
      "Summarize this PDF in detailed easy-to-understand notes.",
  },

  {
    title: "Generate Revision Notes",
    prompt:
      "Generate concise revision notes from this PDF.",
  },

  {
    title: "Create Quiz",
    prompt: `
Generate 5 MCQ quiz questions from this PDF.

STRICT FORMAT:

QUESTION:
Question here

A. Option
B. Option
C. Option
D. Option

ANSWER: Correct option

Only follow this exact format.
`,
  },

  {
    title: "Generate Viva Questions",
    prompt:
      "Generate important viva questions from this PDF.",
  },

  {
    title: "Extract Important Topics",
    prompt:
      "Extract the most important exam topics from this PDF.",
  },
];

const PDFActions = ({
  onAction,
  disabled,
}: Props) => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-3">
      {actions.map((action) => (
        <button
          key={action.title}
          disabled={disabled}
          onClick={() =>
            onAction(action.prompt)
          }
          className="
            bg-[#0b1529]
            border border-[#1e2d4d]
            hover:border-cyan-400
            hover:scale-[1.02]
            transition-all
            rounded-2xl
            px-4 py-4
            text-sm
            font-medium
            disabled:opacity-50
          "
        >
          {action.title}
        </button>
      ))}
    </div>
  );
};

export default PDFActions;