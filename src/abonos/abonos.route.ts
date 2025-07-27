import { Router } from "express";
import { createAb, deleteAb, getAb, updateAb } from "./abonos.controller";

const router = Router();

router.post("/abonos", createAb);
router.get("/abonos", getAb);
router.put("/update/abono/:id", updateAb);
router.delete("/delete/abono/:id", deleteAb);

export default router;
