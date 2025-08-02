import { Router } from "express";
import * as PratosController from "../controllers/pratos-controller";
import { verificarPermissao } from "../middleware/permissoes";

const router = Router();

// Listar todos os pratos que o usuário pode ver
router.get(
  "/",
  verificarPermissao(["Leitor", "Editor", "Admin"]),
  PratosController.listarPratos
);

// Buscar prato específico (com autorização por prato)
router.get(
  "/:id",
  verificarPermissao(["Leitor", "Editor", "Admin"], true),
  PratosController.buscarPrato
);

// Criar prato (apenas Admin)
router.post(
  "/",
  verificarPermissao(["Admin"]),
  PratosController.criarPrato
);

// Atualizar prato (Editor/Admin com autorização)
router.put(
  "/:id",
  verificarPermissao(["Editor", "Admin"], true),
  PratosController.atualizarPrato
);

// Exclusão lógica de prato (apenas Admin)
router.delete(
  "/:id",
  verificarPermissao(["Admin"]),
  PratosController.excluirPrato
);

export default router;
