import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Título */}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {/* Conteúdo */}
        <div>{children}</div>
      </div>
    </div>
  );
}

