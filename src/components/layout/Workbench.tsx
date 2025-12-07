"use client";

import React from "react";
import { useWorkspace } from "@/core/editor/useWorkspace";
import EditorPanel from "@/components/editor/EditorPanel";
import { useRuntime } from "@/core/runtime/useRuntime";
import FileExplorer from "@/components/files/FileExplorer";
import EditorTabs from "@/components/editor/EditorTabs";
import AIPanel from "@/components/ai/AIPanel";

export default function Workbench() {
  const {
    files,
    currentFile,
    openFile,
    updateFile,
    createFile,
    deleteFile,
    renameFile,
  } = useWorkspace();

  const { logs, run, clearLogs } = useRuntime();

  const currentCode = currentFile ? files[currentFile] ?? "" : "";

  function handleRun() {
    if (!currentFile) return;
    run(currentFile, currentCode);
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* File Explorer */}
      <aside className="w-56 bg-[#0B1020] border-r border-[#1E293B] p-3 overflow-auto">
        <FileExplorer
          files={Object.keys(files)}
          currentFile={currentFile}
          onOpen={openFile}
          onCreate={createFile}
          onDelete={deleteFile}
          onRename={renameFile}
        />
      </aside>

      {/* Editor + Console */}
      <main className="flex-1 flex flex-col border-r border-[#1E293B]">
        {/* Header com Tabs + Run */}
        <div className="h-10 border-b border-[#1E293B] bg-[#0B1020] flex items-center justify-between px-3 text-xs text-gray-400">
          <EditorTabs
            files={Object.keys(files)}
            currentFile={currentFile}
            onSelect={openFile}
          />

          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              className="px-3 py-1 rounded bg-[#38BDF8] text-black font-medium hover:bg-[#0ea5e9] transition text-xs cursor-pointer"
            >
              ▶ Run
            </button>
            <button
              onClick={clearLogs}
              className="px-2 py-1 rounded border border-[#1E293B] hover:bg-[#020617] transition text-xs cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-[#050816]">
          {currentFile ? (
            <EditorPanel
              filename={currentFile}
              code={currentCode}
              onChange={(value) => updateFile(currentFile, value)}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
              Nenhum arquivo selecionado
            </div>
          )}
        </div>

        {/* Console */}
        <div className="h-32 bg-[#0B1020] border-t border-[#1E293B] p-2 overflow-auto font-mono text-xs">
          {logs.length === 0 ? (
            <p className="text-gray-500">Console vazio…</p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className={
                  log.type === "error" ? "text-red-400" : "text-gray-100"
                }
              >
                {log.type === "error" ? "❌" : "💬"} {log.message}
              </div>
            ))
          )}
        </div>
      </main>

      {/* AI Panel */}
      <aside className="w-80 bg-[#0B1020] border-l border-[#1E293B] p-3 overflow-hidden h-[540px]">
        <AIPanel
          getCurrentFile={() =>
            currentFile
              ? { name: currentFile, content: files[currentFile] }
              : null
          }
        />
      </aside>
    </div>
  );
}
