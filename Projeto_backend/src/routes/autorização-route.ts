import { Router } from "express";
import * as AutorizacoesController from "../controllers/autorização-controller";

const router = Router();

router.get("/:idUsuario", AutorizacoesController.listarAutorizacoes);
router.post("/", AutorizacoesController.adicionarAutorizacao);
router.delete("/", AutorizacoesController.removerAutorizacao);

export default router;
