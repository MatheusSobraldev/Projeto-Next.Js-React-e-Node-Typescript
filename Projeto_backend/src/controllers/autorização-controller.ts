import { Request, Response } from "express";
import * as AutorizacaoModel from "../models/autorização-model";

// GET /autorizacoes/:idUsuario
export async function listarAutorizacoes(req: Request, res: Response) {
  const { idUsuario } = req.params;
  const autorizacoes = await AutorizacaoModel.getAutorizacoesByUsuario(Number(idUsuario));
  res.json(autorizacoes);
}

// POST /autorizacoes
export async function adicionarAutorizacao(req: Request, res: Response) {
  const { idUsuario, idPrato } = req.body;
  const result = await AutorizacaoModel.addAutorizacao(idUsuario, idPrato);
  res.json({ message: "Autorização adicionada!", result });
}

// DELETE /autorizacoes
export async function removerAutorizacao(req: Request, res: Response) {
  const { idUsuario, idPrato } = req.body;
  const result = await AutorizacaoModel.removeAutorizacao(idUsuario, idPrato);
  res.json({ message: "Autorização removida!", result });
}
