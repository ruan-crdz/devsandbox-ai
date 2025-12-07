"use client";

import { transpileForRuntime } from "./transpile";
import { runCodeInSandbox } from "./runInIframe";
import type { LogEntry, LogType } from "./types";
import { useState } from "react";

let nextId = 1;


export function useRuntime() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  function clearLogs() {
    setLogs([]);
  }

  function run(filename: string, code: string) {
    clearLogs();

    const jsCode = transpileForRuntime(filename, code);

    runCodeInSandbox(jsCode, (type: LogType, message: string) => {
      setLogs((prev) => [...prev, { id: nextId++, type, message }]);
    });
  }

  return {
    logs,
    run,
    clearLogs,
  };
}

