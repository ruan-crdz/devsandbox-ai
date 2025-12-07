"use client";

import { useState } from "react";
import { useModal } from "@/core/ui/useModal";

export default function CreateFileModal({ onCreate }: { onCreate: (name: string) => void }) {
  const { closeModal } = useModal();
  const [name, setName] = useState("");

  function handleSubmit() {
    if (!name.trim()) return;
    onCreate(name.trim());
    closeModal();
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-white">Criar arquivo</h2>

      <input
        type="text"
        placeholder="ex: src/utils.js"
        className="w-full mb-4 px-2 py-1 bg-[#050816] border border-[#1E293B] rounded text-white placeholder-gray-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />

      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 text-sm bg-[#1E293B] rounded text-white cursor-pointer"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button
          className="px-3 py-1 text-sm bg-[#38BDF8] text-black rounded cursor-pointer"
          onClick={handleSubmit}
        >
          Criar
        </button>
      </div>
    </div>
  );
}
