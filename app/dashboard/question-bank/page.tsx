import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

export default function QuestionBankPage() {
  return (
    <main className="flex min-h-screen bg-[#020617] text-white">
      <Sidebar />

      <section className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Navbar />

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h1 className="text-4xl font-bold">
            Question Bank
          </h1>

          <p className="text-gray-400 mt-3">
            Store PYQs, MCQs, viva questions, and important problems.
          </p>
        </div>
      </section>
    </main>
  );
}