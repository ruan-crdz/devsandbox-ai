"use client";

import Editor from "@monaco-editor/react";
import { getLanguageFromFilename } from "@/core/editor/getLanguageFromFilename";

export default function EditorPanel({
  filename,
  code,
  onChange,
}: {
  filename: string;
  code: string;
  onChange: (value: string) => void;
}) {
  const language = getLanguageFromFilename(filename);

  return (
    <Editor
      height="100%"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={(value) => onChange(value ?? "")}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        automaticLayout: true,
      }}
    />
  );
}
