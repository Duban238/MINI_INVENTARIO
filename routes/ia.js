import { Router } from "express";
import { descripcion_producto,precio } from "../controllers/ia.js";

const router=Router()

router.post('/descripcion_producto', descripcion_producto)
router.post('/precio',precio)

export default router;