"use client";

import dynamic from "next/dynamic";

const AITutorPage = dynamic(
  () => import("./TutorContent"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <AITutorPage />;
}