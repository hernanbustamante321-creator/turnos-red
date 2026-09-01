import { Router } from "express";
import * as controller from "../controllers/turno.controller.js";
import { validateBody } from "../middlewares/validate.js";
import { turnoSchema, turnoUpdateSchema } from "../schemas/turno.schema.js";

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", validateBody(turnoSchema), controller.create);
router.put("/:id", validateBody(turnoUpdateSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
