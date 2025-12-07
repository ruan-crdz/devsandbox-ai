"use client";

import { createContext, useContext, useState } from "react";

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
}

interface ModalContextType {
  showModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    content: null,
  });

  function showModal(content: React.ReactNode) {
    setModal({ isOpen: true, content });
  }

  function closeModal() {
    setModal({ isOpen: false, content: null });
  }

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[#0B1020] border border-[#1E293B] p-5 rounded-lg w-80 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {modal.content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
