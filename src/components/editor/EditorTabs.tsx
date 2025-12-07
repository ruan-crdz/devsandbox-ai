"use client";

interface EditorTabsProps {
  files: string[];
  currentFile: string;
  onSelect: (file: string) => void;
}

function getLabel(path: string) {
  const parts = path.split("/");
  return parts[parts.length - 1];
}

export default function EditorTabs({
  files,
  currentFile,
  onSelect,
}: EditorTabsProps) {
  return (
    <div className="flex items-center gap-1 h-full">
      {files.map((file) => (
            <button
              key={file}
              onClick={() => onSelect(file)}
              className={`px-3 h-7 text-xs rounded-t border-b-2 cursor-pointer ${
                currentFile === file
                  ? "border-[#38BDF8] text-gray-100 bg-[#020617]"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
              title={file}
            >
              {getLabel(file)}
            </button>
      ))}
    </div>
  );
}
