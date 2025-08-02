import { connectDB } from "../banco-de-dados";

export async function getPratos() {
  const conn = await connectDB();
  const [rows] = await conn.query("SELECT * FROM pratos WHERE excluido = FALSE");
  await conn.end();
  return rows;
}

export async function getPratoById(id: number) {
  const conn = await connectDB();
  const [rows] = await conn.query("SELECT * FROM pratos WHERE idprato = ? AND excluido = FALSE", [id]);
  await conn.end();
  return rows;
}

export async function createPrato(nome: string, preco: number, data: string, custo: number) {
  const conn = await connectDB();
  const [result] = await conn.query(
    "INSERT INTO pratos (nome, preco, data_lancamento, custo) VALUES (?, ?, ?, ?)",
    [nome, preco, data, custo]
  );
  await conn.end();
  return result;
}

export async function updatePrato(id: number, nome: string, preco: number, data: string, custo: number) {
  const conn = await connectDB();
  const [result] = await conn.query(
    "UPDATE pratos SET nome=?, preco=?, data_lancamento=?, custo=? WHERE idprato=?",
    [nome, preco, data, custo, id]
  );
  await conn.end();
  return result;
}

export async function deletePrato(id: number) {
  const conn = await connectDB();
  const [result] = await conn.query("UPDATE pratos SET excluido=TRUE WHERE idprato=?", [id]);
  await conn.end();
  return result;
}
