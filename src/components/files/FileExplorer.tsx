"use client";

import { useState } from "react";
import { useModal } from "@/core/ui/useModal";
import CreateFileModal from "@/components/modals/CreateFileModal";
import RenameFileModal from "@/components/modals/RenameFileModal";
import DeleteFileModal from "@/components/modals/DeleteFileModal";
import { getFileIcon } from "@/core/editor/getFileIcon";

interface FileExplorerProps {
  files: string[];
  currentFile: string;
  onOpen: (file: string) => void;
  onCreate: (file: string) => void;
  onDelete: (file: string) => void;
  onRename: (oldName: string, newName: string) => void;
}

function groupByFolder(files: string[]) {
  const root: string[] = [];
  const folders: Record<string, string[]> = {};

  for (const file of files) {
    const parts = file.split("/");
    if (parts.length === 1) {
      root.push(file);
    } else {
      const folder = parts[0];
      const rest = parts.slice(1).join("/");
      if (!folders[folder]) folders[folder] = [];
      folders[folder].push(rest);
    }
  }

  return { root, folders };
}

export default function FileExplorer({
  files,
  currentFile,
  onOpen,
  onCreate,
  onDelete,
  onRename,
}: FileExplorerProps) {
  const { showModal } = useModal();
  const { root, folders } = groupByFolder(files);

  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({});
  const [dragging, setDragging] = useState<string | null>(null);

  function toggleFolder(folder: string) {
    setExpandedFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  }

  function handleCreate() {
    showModal(<CreateFileModal onCreate={onCreate} />);
  }

  function handleRename(file: string) {
    showModal(
      <RenameFileModal
        oldName={file}
        onRename={(newName) => onRename(file, newName)}
      />
    );
  }

  function handleDelete(file: string) {
    showModal(<DeleteFileModal name={file} onDelete={() => onDelete(file)} />);
  }

  function handleDragStart(file: string) {
    setDragging(file);
  }

  function handleDragEnd() {
    setDragging(null);
  }

  function handleDropOnFolder(folder: string) {
    if (!dragging) return;
    const parts = dragging.split("/");
    const base = parts[parts.length - 1];
    const newName = `${folder}/${base}`;
    onRename(dragging, newName);
    setDragging(null);
  }

  function renderFile(fullPath: string, label: string, indent = 0) {
    return (
      <div
        key={fullPath}
        className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer text-xs ${
          currentFile === fullPath
            ? "bg-[#1E293B] text-white"
            : "text-gray-400 hover:bg-[#020617]"
        }`}
        style={{ paddingLeft: 8 + indent * 10 }}
        onClick={() => onOpen(fullPath)}
        draggable
        onDragStart={() => handleDragStart(fullPath)}
        onDragEnd={handleDragEnd}
      >
        <span className="truncate flex items-center gap-1" title={fullPath}>
          <span>{getFileIcon(fullPath)}</span>
          {label}
        </span>
        <div
          className="flex items-center gap-1 opacity-70"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="cursor-pointer hover:text-[#38BDF8]"
            onClick={() => handleRename(fullPath)}
            title="Renomear"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M14.85 7.15a1 1 0 0 0 0-1.41l-1.59-1.59a1 1 0 0 0-1.41 0l-1.13 1.13 2.5 2.5 1.13-1.13z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="cursor-pointer hover:text-red-400"
            onClick={() => handleDelete(fullPath)}
            title="Excluir"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 8v6M10 8v6m3-6v6M4 6h12M5 6V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
        <span>Explorer</span>
        <button
          className="px-2 py-0.5 border border-[#1E293B] rounded hover:bg-[#020617] hover:text-[#38BDF8]"
          onClick={handleCreate}
        >
          +
        </button>
      </div>

      <div className="space-y-1 text-sm">
        {/* Arquivos raiz */}
        {root.map((file) => renderFile(file, file, 0))}

        {/* Pastas 1º nível */}
        {Object.entries(folders).map(([folder, children]) => {
          const expanded = expandedFolders[folder] ?? true;
          return (
            <div
              key={folder}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDropOnFolder(folder)}
            >
              <div
                className="px-2 py-1 text-xs text-gray-500 uppercase flex items-center gap-1 cursor-pointer hover:bg-[#020617] rounded"
                onClick={() => toggleFolder(folder)}
              >
                <span>
                  {expanded ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block align-middle mb-0.5"
                    >
                      <path
                        d="M6 8L10 12L14 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block align-middle mb-0.5"
                    >
                      <path
                        d="M8 6L12 10L8 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span>📁 {folder}/</span>
              </div>
              {expanded &&
                children.map((sub) => {
                  const full = `${folder}/${sub}`;
                  const label = sub;
                  return renderFile(full, label, 1);
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
