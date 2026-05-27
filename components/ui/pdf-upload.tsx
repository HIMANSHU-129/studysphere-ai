"use client";

import { UploadCloud } from "lucide-react";

interface Props {
  onFileSelect: (
    file: File | null
  ) => void;
}

const PDFUpload = ({
  onFileSelect,
}: Props) => {
  return (
    <label
      className="
        flex items-center gap-3
        cursor-pointer
        bg-[#0b1529]
        border border-[#1e2d4d]
        hover:border-cyan-400
        transition-all
        rounded-2xl
        px-4 py-3
      "
    >
      <UploadCloud size={18} />

      <span>Upload PDF</span>

      <input
        type="file"
        accept=".pdf"
        hidden
        onChange={(e) => {
          const file =
            e.target.files?.[0];

          onFileSelect(file || null);
        }}
      />
    </label>
  );
};

export default PDFUpload;