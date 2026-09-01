import { Router } from "express";
import * as controller from "../controllers/medico.controller.js";
import { validateBody } from "../middlewares/validate.js";
import { medicoSchema, medicoUpdateSchema } from "../schemas/medico.schema.js";

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", validateBody(medicoSchema), controller.create);
router.put("/:id", validateBody(medicoUpdateSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
