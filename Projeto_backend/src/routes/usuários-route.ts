import { Router } from "express";
import * as UsuariosController from "../controllers/usuários-controller";

const router = Router();

router.get("/", UsuariosController.listarUsuarios);
router.get("/:id", UsuariosController.buscarUsuario);
router.post("/", UsuariosController.criarUsuario);
router.put("/:id", UsuariosController.atualizarUsuario);
router.delete("/:id", UsuariosController.excluirUsuario);

export default router;
