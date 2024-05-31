import { Router } from "express";
import {
  createClientRoutine,
  deleteClientRoutine,
  getClientRoutines,
} from "../controllers/clientController.js";

const router = Router();

router.post("/", createClientRoutine);
router.delete("/:routineId", deleteClientRoutine);
router.get("/", getClientRoutines);

export default router;
