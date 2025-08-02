"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api-jquery";
import Modal from "@/components/modal";
import "./pratos.css";

export default function PratosPage() {
  const [pratos, setPratos] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pratoSelecionado, setPratoSelecionado] = useState<any>(null);

  // Carrega lista inicial
  useEffect(() => {
    carregarPratos();
  }, []);

  const carregarPratos = () => {
    apiGet("/pratos", 1, (res) => {
      if (Array.isArray(res)) setPratos(res);
    }, (err) => console.error("Erro ao carregar pratos:", err));
  };

  const handleEdit = (item: any) => {
    setPratoSelecionado(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este prato?")) {
      apiDelete(`/pratos/${id}`, 1, carregarPratos, (err) => console.error("Erro:", err));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const prato = {
      nome: formData.get("nome"),
      preco: formData.get("preco"),
      custo: formData.get("custo"),
    };

    if (pratoSelecionado) {
      apiPut(`/pratos/${pratoSelecionado.idprato}`, 1, prato,
        () => { carregarPratos(); setModalOpen(false); });
    } else {
      apiPost("/pratos", 1, prato,
        () => { carregarPratos(); setModalOpen(false); });
    }
  };

  return (
    <div className="page-container">
      <h1>Lista de Pratos</h1>
      <button onClick={() => { setPratoSelecionado(null); setModalOpen(true); }}>
        Adicionar Prato
      </button>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Custo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pratos.map((item) => (
            <tr key={item.idprato}>
              <td>{item.nome}</td>
              <td>{item.preco}</td>
              <td>{item.custo}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Editar</button>
                <button onClick={() => handleDelete(item.idprato)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>{pratoSelecionado ? "Editar Prato" : "Adicionar Prato"}</h2>
        <form onSubmit={handleSave}>
          <input name="nome" placeholder="Nome" defaultValue={pratoSelecionado?.nome || ""} required />
          <input name="preco" placeholder="Preço" defaultValue={pratoSelecionado?.preco || ""} required />
          <input name="custo" placeholder="Custo" defaultValue={pratoSelecionado?.custo || ""} required />
          <button type="submit">Salvar</button>
        </form>
      </Modal>
    </div>
  );
}







