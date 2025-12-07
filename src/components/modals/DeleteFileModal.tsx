"use client";

import { useModal } from "@/core/ui/useModal";

export default function DeleteFileModal({
  name,
  onDelete,
}: {
  name: string;
  onDelete: () => void;
}) {
  const { closeModal } = useModal();

  function handleDelete() {
    onDelete();
    closeModal();
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-red-400">
        Excluir arquivo
      </h2>

      <p className="text-sm mb-4 text-white">
        Tem certeza que deseja excluir o arquivo{" "}
        <strong className="text-white">{name}</strong>?
      </p>

      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 text-sm bg-[#1E293B] rounded text-white cursor-pointer"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button
          className="px-3 py-1 text-sm bg-red-500 rounded text-white cursor-pointer"
          onClick={handleDelete}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
