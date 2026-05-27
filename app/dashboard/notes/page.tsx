"use client";

import { useEffect, useMemo, useState } from "react";

import {
  createNote,
  fetchNotes,
  deleteNote,
} from "@/src/services/notes";

import {
  fetchSubjects,
} from "@/src/services/subjects";

import { Note } from "@/src/types/note";

import { Subject } from "@/src/types/subject";

export default function NotesPage() {

  const [notes, setNotes] =
    useState<Note[]>([]);

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [subjectId, setSubjectId] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function loadData() {

    try {

      const fetchedNotes =
        await fetchNotes();

      const fetchedSubjects =
        await fetchSubjects();

      setNotes(fetchedNotes);

      setSubjects(fetchedSubjects);

    } catch (error) {

      console.error(error);

    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreateNote() {

    if (!title || !content) return;

    try {

      setLoading(true);

      await createNote(
        title,
        content,
        subjectId || null
      );

      setTitle("");

      setContent("");

      setSubjectId("");

      await loadData();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  async function handleDelete(
    id: string
  ) {

    try {

      await deleteNote(id);

      await loadData();

    } catch (error) {

      console.error(error);

    }
  }

  const filteredNotes =
    useMemo(() => {

      return notes.filter((note) => {

        const query =
          search.toLowerCase();

        return (
          note.title
            .toLowerCase()
            .includes(query) ||

          note.content
            .toLowerCase()
            .includes(query)
        );
      });

    }, [notes, search]);

  function getSubjectName(
    subjectId?: string
  ) {

    const subject =
      subjects.find(
        (s) => s.id === subjectId
      );

    return subject?.name || "General";
  }

  return (

    <div className="space-y-7">

      {/* HEADER */}

      <div
        className="
          rounded-[32px]
          border
          border-white/10
          bg-[#0F172A]
          p-8
          relative
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-purple-500/10
            to-cyan-500/10
          "
        />

        <div className="relative z-10">

          <h1 className="text-6xl font-bold mb-3">
            Smart Notes
          </h1>

          <p className="text-zinc-400 text-lg">
            AI-powered academic notes system
          </p>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-3 gap-5">

        <div
          className="
            bg-[#0F172A]
            border
            border-white/10
            rounded-[28px]
            p-6
          "
        >

          <p className="text-zinc-400 mb-3">
            Total Notes
          </p>

          <h2 className="text-5xl font-bold">
            {notes.length}
          </h2>

        </div>

        <div
          className="
            bg-[#0F172A]
            border
            border-white/10
            rounded-[28px]
            p-6
          "
        >

          <p className="text-zinc-400 mb-3">
            Subjects
          </p>

          <h2 className="text-5xl font-bold">
            {subjects.length}
          </h2>

        </div>

        <div
          className="
            bg-[#0F172A]
            border
            border-white/10
            rounded-[28px]
            p-6
          "
        >

          <p className="text-zinc-400 mb-3">
            AI Ready
          </p>

          <h2 className="text-5xl font-bold">
            100%
          </h2>

        </div>

      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          bg-[#0F172A]
          border
          border-white/10
          rounded-2xl
          px-6
          py-4
          outline-none
          text-lg
        "
      />

      {/* MAIN */}

      <div className="grid grid-cols-[420px_1fr] gap-6">

        {/* CREATE NOTE */}

        <div
          className="
            bg-[#0F172A]
            border
            border-white/10
            rounded-[32px]
            p-6
            h-fit
          "
        >

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-4xl font-bold">
                Create Note
              </h2>

              <p className="text-zinc-400 mt-2">
                Capture your ideas instantly
              </p>

            </div>

            <div className="text-3xl">
              ✨
            </div>

          </div>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="
                w-full
                bg-[#111827]
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            />

            <select
              value={subjectId}
              onChange={(e) =>
                setSubjectId(
                  e.target.value
                )
              }
              className="
                w-full
                bg-[#111827]
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            >

              <option value="">
                Select Subject
              </option>

              {subjects.map(
                (subject) => (

                  <option
                    key={subject.id}
                    value={subject.id}
                  >
                    {subject.name}
                  </option>
                )
              )}

            </select>

            <textarea
              placeholder="Start writing your thoughts..."
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
              rows={10}
              className="
                w-full
                bg-[#111827]
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                outline-none
                resize-none
              "
            />

            <button
              onClick={handleCreateNote}
              disabled={loading}
              className="
                w-full
                rounded-2xl
                py-4
                font-semibold
                text-lg
                bg-gradient-to-r
                from-purple-600
                to-fuchsia-500
                hover:scale-[1.02]
                transition-all
                duration-300
              "
            >

              {loading
                ? "Creating..."
                : "Create Smart Note"}

            </button>

          </div>

        </div>

        {/* NOTES */}

        <div
          className="
            bg-[#0F172A]
            border
            border-white/10
            rounded-[32px]
            p-6
          "
        >

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-4xl font-bold">
              Your Notes
            </h2>

            <div
              className="
                px-4
                py-2
                rounded-full
                bg-purple-500/20
                text-purple-300
                text-sm
              "
            >
              {filteredNotes.length} Notes
            </div>

          </div>

          {filteredNotes.length === 0 ? (

            <div
              className="
                h-[500px]
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <div className="text-7xl mb-6">
                🧠
              </div>

              <h2 className="text-5xl font-bold mb-4">
                No Notes Yet
              </h2>

              <p className="text-zinc-500 text-lg">
                Start building your knowledge base
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredNotes.map(
                (note) => (

                  <div
                    key={note.id}
                    className="
                      bg-[#111827]
                      border
                      border-white/5
                      rounded-[28px]
                      p-6
                      hover:border-purple-500/30
                      transition-all
                    "
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <div className="flex items-center gap-3 mb-3">

                          <h2 className="text-3xl font-bold">
                            {note.title}
                          </h2>

                          <div
                            className="
                              px-3
                              py-1
                              rounded-full
                              bg-purple-500/20
                              text-purple-300
                              text-sm
                            "
                          >
                            {
                              getSubjectName(
                                note.subject_id
                              )
                            }
                          </div>

                        </div>

                        <p
                          className="
                            text-zinc-400
                            whitespace-pre-wrap
                          "
                        >
                          {note.content}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          handleDelete(
                            note.id
                          )
                        }
                        className="
                          bg-red-500/20
                          text-red-400
                          px-4
                          py-2
                          rounded-xl
                          hover:bg-red-500/30
                          transition-all
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}