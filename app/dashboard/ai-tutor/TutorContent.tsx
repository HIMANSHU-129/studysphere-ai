"use client";


import AIInput from "@/components/ui/ai-input";
import ChatBubble from "@/components/ui/chat-bubble";
import TypingLoader from "@/components/ui/typing-loader";
import PDFUpload from "@/components/ui/pdf-upload";
import PDFActions from "@/components/ui/pdf-actions";
import QuizSection from "@/components/ui/quiz-section";

import { askAI } from "@/src/services/ai";

import {
  clearChatMessages,
  fetchChatMessages,
  saveChatMessage,
} from "@/src/services/ai-chat";

import {
  createConversation,
  deleteConversation,
  fetchConversations,
} from "@/src/services/conversations";

import { supabase } from "@/lib/supabase";

import { extractTextFromPDF } from "@/src/lib/pdf";

import { parseQuizResponse } from "@/src/utils/quiz-parser";

import { ChatMessage } from "@/src/types/chat";

import {
  BrainCircuit,
  Sparkles,
  Trash2,
  Plus,
  MessageSquare,
  FileText,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const suggestions = [
  "Generate DBMS revision notes",
  "Explain Operating System scheduling",
  "Create DSA interview questions",
  "Generate CN viva questions",
];

interface Conversation {
  id: string;
  title: string;
}

const AITutorPage = () => {
  const [messages, setMessages] = useState<
    ChatMessage[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [userId, setUserId] =
    useState("");

  const [conversationId, setConversationId] =
    useState("");

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [selectedPDF, setSelectedPDF] =
    useState<File | null>(null);

  const [pdfText, setPDFText] =
    useState("");

  const [quizzes, setQuizzes] =
    useState<any[]>([]);

  const bottomRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    initializeAI();
  }, []);

  const initializeAI = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);

    const existingConversations =
      await fetchConversations(user.id);

    setConversations(existingConversations);

    if (existingConversations.length > 0) {
      const firstConversation =
        existingConversations[0];

      setConversationId(
        firstConversation.id
      );

      const chats =
        await fetchChatMessages(
          firstConversation.id
        );

      setMessages(chats);
    }
  };

  const handleCreateConversation =
    async () => {
      if (!userId) return;

      const conversation =
        await createConversation(
          userId,
          "New Conversation"
        );

      if (!conversation) return;

      setConversationId(conversation.id);

      setMessages([]);

      setPDFText("");

      setSelectedPDF(null);

      setQuizzes([]);

      const updatedConversations =
        await fetchConversations(userId);

      setConversations(
        updatedConversations
      );
    };

  const handleSelectConversation =
    async (id: string) => {
      setConversationId(id);

      const chats =
        await fetchChatMessages(id);

      setMessages(chats);

      setQuizzes([]);
    };

  const handleDeleteConversation =
    async (id: string) => {
      await deleteConversation(id);

      const updatedConversations =
        await fetchConversations(userId);

      setConversations(
        updatedConversations
      );

      setMessages([]);

      setConversationId("");

      setPDFText("");

      setSelectedPDF(null);

      setQuizzes([]);
    };

  const handlePDFSelect = async (
    file: File | null
  ) => {
    if (!file) return;

    setSelectedPDF(file);

    try {
      setLoading(true);

      const extractedText =
        await extractTextFromPDF(file);

      setPDFText(extractedText);

      const successMessage: ChatMessage =
        {
          role: "assistant",
          message: `PDF uploaded successfully.

File Name: ${file.name}

Extracted ${
            extractedText.length
          } characters from PDF.

You can now:
- ask questions from the PDF
- generate summaries
- create revision notes
- generate quizzes
- ask topic explanations`,
        };

      setMessages((prev) => [
        ...prev,
        successMessage,
      ]);
    } catch (error) {
      console.log(error);

      const errorMessage: ChatMessage =
        {
          role: "assistant",
          message:
            "Failed to process PDF.",
        };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (
    message: string
  ) => {
    try {
      setLoading(true);

      let activeConversationId =
        conversationId;

      if (!activeConversationId) {
        const newConversation =
          await createConversation(
            userId,
            message.slice(0, 30)
          );

        if (!newConversation) return;

        activeConversationId =
          newConversation.id;

        setConversationId(
          activeConversationId
        );

        const updatedConversations =
          await fetchConversations(
            userId
          );

        setConversations(
          updatedConversations
        );
      }

      let finalMessage = message;

      if (pdfText) {
        finalMessage = `
User Question:
${message}

PDF Content:
${pdfText.slice(0, 12000)}

Instructions:
Answer ONLY using the PDF content if relevant.
`;
      }

      const userMessage: ChatMessage = {
        role: "user",
        message,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      await saveChatMessage(
        userId,
        activeConversationId,
        userMessage
      );

      const data = await askAI(
        finalMessage
      );

      const fullResponse =
        data.response;

      let streamedText = "";

      const aiMessage: ChatMessage = {
        role: "assistant",
        message: "",
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      for (
        let i = 0;
        i < fullResponse.length;
        i++
      ) {
        streamedText += fullResponse[i];

        await new Promise((resolve) =>
          setTimeout(resolve, 6)
        );

        setMessages((prev) => {
          const updated = [...prev];

          updated[
            updated.length - 1
          ] = {
            role: "assistant",
            message: streamedText,
          };

          return updated;
        });
      }

      if (
        message.includes("Generate 5 MCQ") ||
        message.includes("Create Quiz")
      ) {
        const parsedQuizzes =
          parseQuizResponse(
            fullResponse
          );

        setQuizzes(parsedQuizzes);
      }

      await saveChatMessage(
        userId,
        activeConversationId,
        {
          role: "assistant",
          message: fullResponse,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (!conversationId) return;

    await clearChatMessages(
      conversationId
    );

    setMessages([]);

    setPDFText("");

    setSelectedPDF(null);

    setQuizzes([]);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex">
      <div className="w-[320px] border-r border-[#1b2a44] bg-[#050b18] p-5 flex flex-col">
        <button
          onClick={
            handleCreateConversation
          }
          className="
            flex items-center justify-center gap-2
            bg-gradient-to-r from-cyan-500 to-blue-500
            hover:scale-[1.02]
            transition-all
            rounded-2xl
            py-4
            font-semibold
            mb-6
          "
        >
          <Plus size={18} />

          <span>New Chat</span>
        </button>

        <div className="flex-1 overflow-y-auto space-y-3">
          {conversations.map(
            (conversation) => (
              <div
                key={conversation.id}
                className={`
                  group
                  flex items-center justify-between
                  p-4 rounded-2xl cursor-pointer
                  transition-all
                  border

                  ${
                    conversationId ===
                    conversation.id
                      ? "bg-cyan-500/10 border-cyan-500"
                      : "bg-[#081120] border-[#1b2a44] hover:border-cyan-400"
                  }
                `}
                onClick={() =>
                  handleSelectConversation(
                    conversation.id
                  )
                }
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageSquare
                    size={18}
                    className="text-cyan-400"
                  />

                  <p className="truncate text-sm">
                    {conversation.title}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    handleDeleteConversation(
                      conversation.id
                    );
                  }}
                  className="
                    opacity-0 group-hover:opacity-100
                    transition-all
                    text-red-400
                  "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                <BrainCircuit size={30} />
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  StudySphere AI
                </h1>

                <p className="text-gray-400 mt-1">
                  Your futuristic academic
                  copilot
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <PDFUpload
                onFileSelect={
                  handlePDFSelect
                }
              />

              {selectedPDF && (
                <div className="flex items-center gap-2 bg-[#0b1529] border border-cyan-500/30 px-4 py-3 rounded-2xl">
                  <FileText
                    size={18}
                    className="text-cyan-400"
                  />

                  <p className="text-sm max-w-[220px] truncate">
                    {selectedPDF.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {selectedPDF && (
            <div className="mb-6">
              <PDFActions
                onAction={handleSend}
                disabled={loading}
              />
            </div>
          )}

          <div className="bg-[#081120]/90 backdrop-blur-xl border border-[#1b2a44] rounded-[32px] h-[82vh] flex flex-col overflow-hidden shadow-[0_0_60px_rgba(0,255,255,0.08)]">
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {quizzes.length > 0 && (
                <QuizSection quizzes={quizzes} />
              )}

              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-8 shadow-2xl shadow-cyan-500/20">
                    <Sparkles size={40} />
                  </div>

                  <h2 className="text-5xl font-bold mb-5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Welcome to StudySphere AI
                  </h2>

                  <p className="text-gray-400 text-lg max-w-2xl leading-8 mb-10">
                    Ask coding doubts,
                    semester questions,
                    revision topics, viva
                    preparation, interview
                    questions, and much more.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 w-full max-w-3xl">
                    {suggestions.map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() =>
                            handleSend(item)
                          }
                          className="
                            bg-[#0b1529]
                            border border-[#1e2d4d]
                            hover:border-cyan-400
                            hover:scale-[1.02]
                            transition-all duration-300
                            rounded-2xl
                            p-5
                            text-left
                          "
                        >
                          <p className="font-medium text-gray-200">
                            {item}
                          </p>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {messages.map(
                (chat, index) => (
                  <ChatBubble
                    key={index}
                    chat={chat}
                  />
                )
              )}

              {loading && <TypingLoader />}

              <div ref={bottomRef} />
            </div>

            <div className="p-5 border-t border-[#1b2a44] bg-[#050b18]/80 backdrop-blur-xl">
              <AIInput
                onSend={handleSend}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutorPage;