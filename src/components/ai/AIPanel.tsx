"use client";

import { useState } from "react";
import AIMessage from "./AIMessage";
import { askAI } from "@/core/ai/aiClient";
import {
  promptExplainCode,
  promptRefactorCode,
  promptGenerateTests,
  promptFindBugs,
} from "@/core/ai/prompts";

interface CurrentFile {
  name: string;
  content: string;
}

export default function AIPanel({
  getCurrentFile,
}: {
  getCurrentFile: () => CurrentFile | null;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function runPrompt(builder: (name: string, code: string) => string) {
    const file = getCurrentFile();
    if (!file) return;

    const prompt = builder(file.name, file.content);

    setLoading(true);
    setMessages((m) => [
      ...m,
      { id: Date.now(), sender: "user", content: prompt },
    ]);

    const answer = await askAI(prompt);

    setMessages((m) => [
      ...m,
      { id: Date.now(), sender: "ai", content: answer },
    ]);

    setLoading(false);
  }

  function clearChat() {
    setMessages([]);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-400">Assistente IA</p>
        <button
          className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer"
          onClick={clearChat}
        >
          Limpar
        </button>
      </div>

      {/* AÇÕES RÁPIDAS */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          className="px-2 py-1 bg-[#38BDF8] text-black rounded text-xs hover:bg-[#0ea5e9] cursor-pointer"
          onClick={() => runPrompt(promptExplainCode)}
        >
          Explicar
        </button>

        <button
          className="px-2 py-1 bg-[#1E293B] rounded text-xs cursor-pointer"
          onClick={() => runPrompt(promptRefactorCode)}
        >
          Refatorar
        </button>

        <button
          className="px-2 py-1 bg-[#1E293B] rounded text-xs cursor-pointer"
          onClick={() => runPrompt(promptGenerateTests)}
        >
          Testes
        </button>

        <button
          className="px-2 py-1 bg-[#1E293B] rounded text-xs cursor-pointer"
          onClick={() => runPrompt(promptFindBugs)}
        >
          Bugs
        </button>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-auto pr-2 space-y-2">
        {messages.map((m) => (
          <AIMessage key={m.id} sender={m.sender} content={m.content} />
        ))}

        {loading && <p className="text-xs text-gray-500">IA pensando...</p>}
      </div>
    </div>
  );
}
