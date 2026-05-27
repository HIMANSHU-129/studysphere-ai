"use client";

import { useEffect, useState } from "react";

import {
  createSubject,
  fetchSubjects,
  deleteSubject,
} from "@/src/services/subjects";

import { Subject } from "@/src/types/subject";

const colors = [
  "#8B5CF6",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
];

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<
    Subject[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [name, setName] = useState("");

  const [selectedColor, setSelectedColor] =
    useState("#8B5CF6");

  async function loadSubjects() {
    try {
      const data = await fetchSubjects();
      setSubjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  async function handleCreateSubject() {
    if (!name.trim()) return;

    try {
      const newSubject =
        await createSubject(
          name,
          selectedColor
        );

      setSubjects([
        newSubject,
        ...subjects,
      ]);

      setName("");

      setSelectedColor("#8B5CF6");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteSubject(
    id: string
  ) {
    try {
      await deleteSubject(id);

      setSubjects(
        subjects.filter(
          (subject) =>
            subject.id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-5xl font-bold mb-2">
          Subjects
        </h1>

        <p className="text-zinc-400 text-lg">
          Organize your academic workflow
        </p>

      </div>

      <div className="grid grid-cols-[350px_1fr] gap-6">

        {/* CREATE SUBJECT */}

        <div
          className="
            bg-[#0F172A]
            border
            border-white/10
            rounded-[30px]
            p-6
            h-fit
          "
        >

          <h2 className="text-3xl font-bold mb-6">
            Create Subject
          </h2>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Subject name"
            className="
              w-full
              bg-[#111827]
              border
              border-white/5
              rounded-2xl
              px-5
              py-4
              outline-none
              text-white
              mb-6
            "
          />

          <p className="text-zinc-400 mb-4">
            Choose Color
          </p>

          <div className="flex gap-3 mb-8">

            {colors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  setSelectedColor(color)
                }
                className={`
                  w-12
                  h-12
                  rounded-2xl
                  border-4
                  transition-all
                  ${
                    selectedColor === color
                      ? "border-white scale-110"
                      : "border-transparent"
                  }
                `}
                style={{
                  backgroundColor: color,
                }}
              />
            ))}

          </div>

          <button
            onClick={
              handleCreateSubject
            }
            className="
              w-full
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-purple-600
              to-fuchsia-500
              font-semibold
              text-lg
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            Create Subject
          </button>

        </div>

        {/* SUBJECTS LIST */}

        <div
          className="
            bg-[#0F172A]
            border
            border-white/10
            rounded-[30px]
            p-6
            min-h-[500px]
          "
        >

          {loading ? (
            <div className="text-zinc-400">
              Loading subjects...
            </div>
          ) : subjects.length === 0 ? (
            <div
              className="
                h-full
                flex
                items-center
                justify-center
                text-zinc-500
                text-xl
              "
            >
              No subjects created yet
            </div>
          ) : (
            <div className="space-y-4">

              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="
                    bg-[#111827]
                    border
                    border-white/5
                    rounded-3xl
                    p-5
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-6
                        h-6
                        rounded-full
                      "
                      style={{
                        backgroundColor:
                          subject.color,
                      }}
                    />

                    <h2 className="text-2xl font-semibold">
                      {subject.name}
                    </h2>

                  </div>

                  <button
                    onClick={() =>
                      handleDeleteSubject(
                        subject.id
                      )
                    }
                    className="
                      px-5
                      py-2
                      rounded-xl
                      bg-red-500/20
                      text-red-400
                      hover:bg-red-500/30
                      transition-all
                    "
                  >
                    Delete
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}