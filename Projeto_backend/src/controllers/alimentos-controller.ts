import { Request, Response } from "express";
import * as alimentosModel from "../models/alimentos-model";
import { connectDB } from "../banco-de-dados";

// Listar alimentos autorizados
export async function getAlimentos(req: Request, res: Response) {
  try {
    const usuarioId = req.headers['usuarioid'] as string;


    const connection = await connectDB();
    const [rows]: any = await connection.execute(
      `SELECT DISTINCT a.*
      FROM alimentos a
      JOIN prato_alimento pa ON a.idalimento = pa.idalimento
      JOIN autorizacoes au ON pa.idprato = au.idprato
      WHERE au.idusuario = ? AND a.excluido = false`,
      [usuarioId]
    );

    res.json(rows);
  } catch (error: any) {
  console.error("Erro detalhado:", error);
  res.status(500).json({ erro: "Erro ao buscar alimentos", detalhe: error.message });
}

}

// Criar novo alimento
export async function createAlimento(req: Request, res: Response) {
  try {
    const { nome, custo, peso } = req.body;
    const connection = await connectDB();
    await connection.execute(
      `INSERT INTO alimentos (nome, custo, peso) VALUES (?, ?, ?)`,
      [nome, custo, peso]
    );
    res.status(201).json({ mensagem: "Alimento criado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar alimento" });
  }
}

// Atualizar alimento
export async function updateAlimento(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, custo, peso } = req.body;
    const connection = await connectDB();
    await connection.execute(
      `UPDATE alimentos SET nome=?, custo=?, peso=? WHERE idalimento=?`,
      [nome, custo, peso, id]
    );
    res.json({ mensagem: "Alimento atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar alimento" });
  }
}

// Exclusão lógica de alimento
export async function deleteAlimento(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const connection = await connectDB();
    await connection.execute(
      `UPDATE alimentos SET excluido=true WHERE idalimento=?`,
      [id]
    );
    res.json({ mensagem: "Alimento excluído (lógico) com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao excluir alimento" });
  }
}
