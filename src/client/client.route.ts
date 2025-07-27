import { Router } from "express";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "./client.controller";

const router = Router();

router.post("/client", createClient);
router.get("/clients", getClients);
router.put("/update/client/:id", updateClient);
router.delete("/delete/client/:id", deleteClient);

export default router;
