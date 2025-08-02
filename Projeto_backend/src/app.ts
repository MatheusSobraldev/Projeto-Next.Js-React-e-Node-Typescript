
import express from "express";
import cors from "cors"

import pratosRoutes from "./routes/pratos-route";
import alimentosRoutes from "./routes/alimentos-route";
import usuariosRoutes from "./routes/usuários-route";
import autorizacoesRoutes from "./routes/autorização-route";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'usuarioid'], 
}));

app.use("/pratos", pratosRoutes);
app.use("/alimentos", alimentosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/autorizacoes", autorizacoesRoutes);


app.listen(3001, () => console.log("Servidor rodando na porta 3001"));



