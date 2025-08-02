"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api-jquery";
import Modal from "@/components/modal";
import "./alimentos.css";

export default function AlimentosPage() {
  const [alimentos, setAlimentos] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [alimentoSelecionado, setAlimentoSelecionado] = useState<any>(null);

  // Carrega lista inicial
  useEffect(() => {
    carregarAlimentos();
  }, []);

  const carregarAlimentos = () => {
    apiGet("/alimentos", 1, (res) => {
      if (Array.isArray(res)) setAlimentos(res);
    }, (err) => console.error("Erro ao carregar alimentos:", err));
  };

  const handleEdit = (item: any) => {
    setAlimentoSelecionado(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este alimento?")) {
      apiDelete(`/alimentos/${id}`, 1, carregarAlimentos, (err) => console.error("Erro:", err));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const alimento = {
      nome: formData.get("nome"),
      preco: formData.get("preco"),
      peso: formData.get("peso"),
      custo: formData.get("custo"),
    };

    if (alimentoSelecionado) {
      apiPut(`/alimentos/${alimentoSelecionado.idalimento}`, 1, alimento,
        () => { carregarAlimentos(); setModalOpen(false); });
    } else {
      apiPost("/alimentos", 1, alimento,
        () => { carregarAlimentos(); setModalOpen(false); });
    }
  };

  return (
    <div className="page-container">
      <h1>Lista de Alimentos</h1>
      <button onClick={() => { setAlimentoSelecionado(null); setModalOpen(true); }}>
        Adicionar Alimento
      </button>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Peso</th>
            <th>Custo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alimentos.map((item) => (
            <tr key={item.idalimento}>
              <td>{item.nome}</td>
              <td>{item.preco}</td>
              <td>{item.peso}</td>
              <td>{item.custo}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Editar</button>
                <button onClick={() => handleDelete(item.idalimento)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>{alimentoSelecionado ? "Editar Alimento" : "Adicionar Alimento"}</h2>
        <form onSubmit={handleSave}>
          <input name="nome" placeholder="Nome" defaultValue={alimentoSelecionado?.nome || ""} required />
          <input name="preco" placeholder="Preço" defaultValue={alimentoSelecionado?.preco || ""} required />
          <input name="peso" placeholder="Peso" defaultValue={alimentoSelecionado?.peso || ""} required />
          <input name="custo" placeholder="Custo" defaultValue={alimentoSelecionado?.custo || ""} required />
          <button type="submit">Salvar</button>
        </form>
      </Modal>
    </div>
  );
}













