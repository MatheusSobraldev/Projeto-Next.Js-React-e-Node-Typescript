import { Request, Response } from "express";
import * as UsuarioModel from "../models/usuários-model";

// GET /usuarios
export async function listarUsuarios(req: Request, res: Response) {
  const usuarios = await UsuarioModel.getUsuarios();
  res.json(usuarios);
}

// GET /usuarios/:id
export async function buscarUsuario(req: Request, res: Response) {
  const { id } = req.params;
  const usuario = await UsuarioModel.getUsuarioById(Number(id));
  res.json(usuario);
}

// POST /usuarios
export async function criarUsuario(req: Request, res: Response) {
  const { nome, login, senha, perfil } = req.body;
  const result = await UsuarioModel.createUsuario(nome, login, senha, perfil);
  res.json({ message: "Usuário criado!", result });
}

// PUT /usuarios/:id
export async function atualizarUsuario(req: Request, res: Response) {
  const { id } = req.params;
  const { nome, login, senha, perfil, ativo } = req.body;
  const result = await UsuarioModel.updateUsuario(Number(id), nome, login, senha, perfil, ativo);
  res.json({ message: "Usuário atualizado!", result });
}

// DELETE /usuarios/:id
export async function excluirUsuario(req: Request, res: Response) {
  const { id } = req.params;
  const result = await UsuarioModel.deleteUsuario(Number(id));
  res.json({ message: "Usuário excluído (lógico)!", result });
}
