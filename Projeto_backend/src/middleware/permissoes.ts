import { Request, Response, NextFunction } from "express";
import { connectDB } from "../banco-de-dados";

export function verificarPermissao(perfisPermitidos: string[], checarPrato = false) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuarioId = req.headers.usuarioid;

      if (!usuarioId) {
        return res.status(401).json({ erro: "Usuário não autenticado" });
      }

      const connection = await connectDB();

      // Verificar perfil do usuário
      const [rows]: any = await connection.execute(
        "SELECT perfil FROM usuarios WHERE idusuario = ? AND ativo = true",
        [usuarioId]
      );

      if (rows.length === 0) {
        return res.status(403).json({ erro: "Usuário não encontrado ou inativo" });
      }

      const perfil = rows[0].perfil;

      if (!perfisPermitidos.includes(perfil)) {
        return res.status(403).json({ erro: "Permissão negada" });
      }

      // Se precisar checar autorização de prato
      if (checarPrato && perfil !== "Admin") {
        const pratoId = req.params.id || req.body.idprato;

        if (!pratoId) {
          return res.status(400).json({ erro: "ID do prato não informado" });
        }

        const [autorizacoes]: any = await connection.execute(
          "SELECT * FROM autorizacoes WHERE idusuario = ? AND idprato = ?",
          [usuarioId, pratoId]
        );

        if (autorizacoes.length === 0) {
          return res.status(403).json({ erro: "Usuário não tem autorização para este prato" });
        }
      }

      next();
    } catch (error) {
      return res.status(500).json({ erro: "Erro interno ao verificar permissões" });
    }
  };
}
