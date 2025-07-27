import { Router } from "express";
import { create, get, update, deleted } from "./compras.controller";
import { authRequire } from "../libs/validate.token";

const router = Router();

router.post("/compras", create);
router.get("/compras", get);
router.put("/update/compra/:id", update);
router.delete("/delete/crompra/:id", deleted);

export default router;
