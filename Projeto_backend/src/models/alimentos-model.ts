import { connectDB } from "../banco-de-dados";

export async function getAlimentos() {
  const conn = await connectDB();
  const [rows] = await conn.query("SELECT * FROM alimentos WHERE excluido = FALSE");
  await conn.end();
  return rows;
}

export async function getAlimentoById(id: number) {
  const conn = await connectDB();
  const [rows] = await conn.query("SELECT * FROM alimentos WHERE idalimento = ? AND excluido = FALSE", [id]);
  await conn.end();
  return rows;
}

export async function createAlimento(nome: string, custo: number, peso: number) {
  const conn = await connectDB();
  const [result] = await conn.query(
    "INSERT INTO alimentos (nome, custo, peso) VALUES (?, ?, ?)",
    [nome, custo, peso]
  );
  await conn.end();
  return result;
}

export async function updateAlimento(id: number, nome: string, custo: number, peso: number) {
  const conn = await connectDB();
  const [result] = await conn.query(
    "UPDATE alimentos SET nome=?, custo=?, peso=? WHERE idalimento=?",
    [nome, custo, peso, id]
  );
  await conn.end();
  return result;
}


export async function deleteAlimento(id: number) {
  const conn = await connectDB();
  const [result] = await conn.query("UPDATE alimentos SET excluido=TRUE WHERE idalimento=?", [id]);
  await conn.end();
  return result;
}

