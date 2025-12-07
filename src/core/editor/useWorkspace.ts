"use client";

import { useEffect, useState } from "react";

export interface WorkspaceFiles {
  [filename: string]: string;
}

const STORAGE_KEY = "devsandbox-workspace-v1";

interface WorkspaceState {
  files: WorkspaceFiles;
  currentFile: string;
}

function loadInitialState(): WorkspaceState {
  if (typeof window === "undefined") {
    return {
      files: {
        "main.js": `console.log("Hello from main.js");`,
      },
      currentFile: "main.js",
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        files: {
          "main.js": `console.log("Hello from main.js");`,
        },
        currentFile: "main.js",
      };
    }

    const parsed = JSON.parse(raw) as WorkspaceState;
    if (!parsed.files || !parsed.currentFile) {
      throw new Error("estado inválido");
    }
    return parsed;
  } catch {
    return {
      files: {
        "main.js": `console.log("Hello from main.js");`,
      },
      currentFile: "main.js",
    };
  }
}

export function useWorkspace() {
  const [files, setFiles] = useState<WorkspaceFiles>({});
  const [currentFile, setCurrentFile] = useState<string>("");

  // carregar do localStorage
  useEffect(() => {
    const initial = loadInitialState();
    setFiles(initial.files);
    setCurrentFile(initial.currentFile);
  }, []);

  // salvar no localStorage sempre que mudar
  useEffect(() => {
    if (!currentFile) return;
    const state: WorkspaceState = { files, currentFile };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [files, currentFile]);

  function openFile(name: string) {
    setCurrentFile(name);
  }

  function updateFile(name: string, content: string) {
    setFiles((prev) => ({
      ...prev,
      [name]: content,
    }));
  }

  function createFile(name: string) {
    if (!name.trim()) return;
    if (files[name]) {
      setCurrentFile(name);
      return;
    }
    setFiles((prev) => ({
      ...prev,
      [name]: "// novo arquivo\n",
    }));
    setCurrentFile(name);
  }

  function deleteFile(name: string) {
    const all = Object.keys(files);
    if (all.length === 1) return; // nunca apaga o único arquivo

    const newFiles = { ...files };
    delete newFiles[name];

    let newCurrent = currentFile;
    if (currentFile === name) {
      const remaining = Object.keys(newFiles);
      newCurrent = remaining[0] ?? "";
    }

    setFiles(newFiles);
    setCurrentFile(newCurrent);
  }

  function renameFile(oldName: string, newName: string) {
    newName = newName.trim();
    if (!newName || oldName === newName) return;
    if (!files[oldName]) return;
    if (files[newName]) {
      // já existe -> apenas troca arquivo atual
      setCurrentFile(newName);
      return;
    }

    const newFiles: WorkspaceFiles = { ...files };
    newFiles[newName] = newFiles[oldName];
    delete newFiles[oldName];

    setFiles(newFiles);
    if (currentFile === oldName) {
      setCurrentFile(newName);
    }
  }

  return {
    files,
    currentFile,
    openFile,
    updateFile,
    createFile,
    deleteFile,
    renameFile,
  };
}
