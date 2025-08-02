import { connectDB } from "../banco-de-dados";

// Listar autorizações de um usuário
export async function getAutorizacoesByUsuario(idUsuario: number) {
  const conn = await connectDB();
  const [rows] = await conn.query(
    `SELECT a.idprato, p.nome 
     FROM autorizacoes a
     JOIN pratos p ON a.idprato = p.idprato
     WHERE a.idusuario=?`,
    [idUsuario]
  );
  await conn.end();
  return rows;
}

// Dar acesso de um prato a um usuário
export async function addAutorizacao(idUsuario: number, idPrato: number) {
  const conn = await connectDB();
  const [result] = await conn.query(
    "INSERT INTO autorizacoes (idusuario, idprato) VALUES (?, ?)",
    [idUsuario, idPrato]
  );
  await conn.end();
  return result;
}

// Remover acesso de um prato a um usuário
export async function removeAutorizacao(idUsuario: number, idPrato: number) {
  const conn = await connectDB();
  const [result] = await conn.query(
    "DELETE FROM autorizacoes WHERE idusuario=? AND idprato=?",
    [idUsuario, idPrato]
  );
  await conn.end();
  return result;
}
