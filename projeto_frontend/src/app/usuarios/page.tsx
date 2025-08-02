"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api-jquery";
import Modal from "@/components/modal";
import "./usuarios.css";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<any>(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = () => {
    apiGet("/usuarios", 1, (res) => {
      if (Array.isArray(res)) setUsuarios(res);
    }, (err) => console.error("Erro ao carregar usuários:", err));
  };

  const handleEdit = (usuario: any) => {
    setUsuarioSelecionado(usuario);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      apiDelete(`/usuarios/${id}`, 1, carregarUsuarios, (err) => console.error("Erro:", err));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const usuario = {
      nome: formData.get("nome"),
      perfil: formData.get("perfil"),
    };

    if (usuarioSelecionado) {
      apiPut(`/usuarios/${usuarioSelecionado.idusuario}`, 1, usuario,
        () => { carregarUsuarios(); setModalOpen(false); });
    } else {
      apiPost("/usuarios", 1, usuario,
        () => { carregarUsuarios(); setModalOpen(false); });
    }
  };

  return (
    <div className="page-container">
      <h1>Lista de Usuários</h1>
      <button onClick={() => { setUsuarioSelecionado(null); setModalOpen(true); }}>
        Adicionar Usuário
      </button>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((item) => (
            <tr key={item.idusuario}>
              <td>{item.nome}</td>
              <td>{item.perfil}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Editar</button>
                <button onClick={() => handleDelete(item.idusuario)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>{usuarioSelecionado ? "Editar Usuário" : "Adicionar Usuário"}</h2>
        <form onSubmit={handleSave}>
          <input
            name="nome"
            placeholder="Nome"
            defaultValue={usuarioSelecionado?.nome || ""}
            required
          />
          <select
            name="perfil"
            defaultValue={usuarioSelecionado?.perfil || "Leitor"}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Leitor">Leitor</option>
          </select>
          <button type="submit">Salvar</button>
        </form>
      </Modal>
    </div>
  );
}







