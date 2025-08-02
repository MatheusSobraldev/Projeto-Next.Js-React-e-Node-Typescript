import { connectDB } from "../banco-de-dados";

// Listar todos usuários
export async function getUsuarios() {
  const conn = await connectDB();
  const [rows] = await conn.query("SELECT idusuario, nome, login, perfil, ativo FROM usuarios");
  await conn.end();
  return rows;
}

// Buscar usuário por ID
export async function getUsuarioById(id: number) {
  const conn = await connectDB();
  const [rows] = await conn.query("SELECT idusuario, nome, login, perfil, ativo FROM usuarios WHERE idusuario=?", [id]);
  await conn.end();
  return rows;
}

// Criar usuário
export async function createUsuario(nome: string, login: string, senha: string, perfil: string) {
  const conn = await connectDB();
  const [result] = await conn.query(
    "INSERT INTO usuarios (nome, login, senha, perfil) VALUES (?, ?, ?, ?)",
    [nome, login, senha, perfil]
  );
  await conn.end();
  return result;
}

// Atualizar usuário
export async function updateUsuario(id: number, nome: string, login: string, senha: string, perfil: string, ativo: boolean) {
  const conn = await connectDB();
  const [result] = await conn.query(
    "UPDATE usuarios SET nome=?, login=?, senha=?, perfil=?, ativo=? WHERE idusuario=?",
    [nome, login, senha, perfil, ativo, id]
  );
  await conn.end();
  return result;
}

// Exclusão lógica
export async function deleteUsuario(id: number) {
  const conn = await connectDB();
  const [result] = await conn.query("UPDATE usuarios SET ativo=FALSE WHERE idusuario=?", [id]);
  await conn.end();
  return result;
}
