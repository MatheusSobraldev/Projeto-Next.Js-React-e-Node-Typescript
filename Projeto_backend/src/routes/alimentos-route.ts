import express from "express";
import * as alimentosController from "../controllers/alimentos-controller";
import { verificarPermissao } from "../middleware/permissoes";

const router = express.Router();

// Leitura - qualquer perfil com permissão de prato
router.get(
  "/",
  verificarPermissao(["Leitor", "Editor", "Admin"]),
  alimentosController.getAlimentos
);

// Criar alimento - Editor/Admin
router.post(
  "/",
  verificarPermissao(["Editor", "Admin"]),
  alimentosController.createAlimento
);

// Editar alimento - Editor/Admin
router.put(
  "/:id",
  verificarPermissao(["Editor", "Admin"]),
  alimentosController.updateAlimento
);

// Excluir alimento - apenas Admin
router.delete(
  "/:id",
  verificarPermissao(["Admin"]),
  alimentosController.deleteAlimento
);

export default router;
