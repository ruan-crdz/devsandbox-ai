"use client";

import { useEffect, useState } from "react";
import type { WebContainer } from "@webcontainer/api";

export function useWebContainer() {
  const [container, setContainer] = useState<WebContainer | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [booting, setBooting] = useState(false);

  useEffect(() => {
    let disposed = false;

    async function boot() {
      setBooting(true);
      const { WebContainer } = await import("@webcontainer/api");
      const wc = await WebContainer.boot();
      if (!disposed) {
        setContainer(wc);
      }
      setBooting(false);
    }

    boot();

    return () => {
      disposed = true;
    };
  }, []);

  async function runCommand(cmd: string, args: string[] = []) {
    if (!container) return;

    const process = await container.spawn(cmd, args);

    const output = process.output.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await output.read();
      if (done) break;
      if (value !== undefined) {
        setLogs((prev) => [
          ...prev,
          decoder.decode(value as unknown as Uint8Array),
        ]);
      }
    }
  }

  return {
    container,
    booting,
    logs,
    runCommand,
  };
}
