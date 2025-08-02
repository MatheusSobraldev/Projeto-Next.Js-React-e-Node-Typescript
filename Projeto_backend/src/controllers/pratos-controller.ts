import { Request, Response } from "express";
import * as PratoModel from "../models/pratos-model";

export async function listarPratos(req: Request, res: Response) {
  const pratos = await PratoModel.getPratos();
  res.json(pratos);
}

export async function buscarPrato(req: Request, res: Response) {
  const { id } = req.params;
  const prato = await PratoModel.getPratoById(Number(id));
  res.json(prato);
}

export async function criarPrato(req: Request, res: Response) {
  const { nome, preco, data_lancamento, custo } = req.body;
  const result = await PratoModel.createPrato(nome, preco, data_lancamento, custo);
  res.json({ message: "Prato criado!", result });
}

export async function atualizarPrato(req: Request, res: Response) {
  const { id } = req.params;
  const { nome, preco, data_lancamento, custo } = req.body;
  const result = await PratoModel.updatePrato(Number(id), nome, preco, data_lancamento, custo);
  res.json({ message: "Prato atualizado!", result });
}

export async function excluirPrato(req: Request, res: Response) {
  const { id } = req.params;
  const result = await PratoModel.deletePrato(Number(id));
  res.json({ message: "Prato excluído (lógico)!", result });
}
