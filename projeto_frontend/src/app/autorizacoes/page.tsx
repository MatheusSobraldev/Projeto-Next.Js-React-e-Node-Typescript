"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api-jquery";
import DataTable from "@/components/Datatable";
import Modal from "@/components/modal";

export default function AutorizacoesPage() {
  const [autorizacoes, setAutorizacoes] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [autorizacaoSelecionada, setAutorizacaoSelecionada] = useState<any>(null);

  // Carregar lista ao abrir página
  useEffect(() => {
    carregarAutorizacoes();
  }, []);

  const carregarAutorizacoes = () => {
    apiGet("/autorizacoes", 1, (res) => {
      if (Array.isArray(res)) {
        setAutorizacoes(res);
      } else {
        setAutorizacoes([]);
      }
    }, (err) => console.error("Erro ao carregar autorizações:", err));
  };

  // Abrir modal para editar
  const handleEdit = (autorizacao: any) => {
    setAutorizacaoSelecionada(autorizacao);
    setModalOpen(true);
  };

  // Excluir autorização
  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta autorização?")) {
      apiDelete(`/autorizacoes/${id}`, 1,
        () => carregarAutorizacoes(),
        (err) => console.error("Erro ao excluir:", err)
      );
    }
  };

  // Salvar (criar ou editar)
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const autorizacao = {
      idusuario: formData.get("idusuario"),
      idprato: formData.get("idprato")
    };

    if (autorizacaoSelecionada) {
      // Atualizar
      apiPut(`/autorizacoes/${autorizacaoSelecionada.idautorizacao}`, 1, autorizacao,
        () => {
          carregarAutorizacoes();
          setModalOpen(false);
        },
        (err) => console.error("Erro ao atualizar:", err)
      );
    } else {
      // Criar
      apiPost("/autorizacoes", 1, autorizacao,
        () => {
          carregarAutorizacoes();
          setModalOpen(false);
        },
        (err) => console.error("Erro ao criar:", err)
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Autorizações</h1>
      
      <button
        onClick={() => { setAutorizacaoSelecionada(null); setModalOpen(true); }}
        className="bg-green-500 text-white px-4 py-2 mb-4 rounded"
      >
        Adicionar Autorização
      </button>

      <DataTable
        data={autorizacoes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">
          {autorizacaoSelecionada ? "Editar Autorização" : "Adicionar Autorização"}
        </h2>
        <form onSubmit={handleSave}>
          <input
            type="number"
            name="idusuario"
            placeholder="ID Usuário"
            defaultValue={autorizacaoSelecionada?.idusuario || ""}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="number"
            name="idprato"
            placeholder="ID Prato"
            defaultValue={autorizacaoSelecionada?.idprato || ""}
            className="border p-2 w-full mb-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
        </form>
      </Modal>
    </div>
  );
}




