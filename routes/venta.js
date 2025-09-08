import { Router } from "express";
import { registrar_venta, listar_ventas, listar_ventas_id, ventas_cliente, ventas_producto } from "../controllers/venta.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { listarVentaId, ventaCliente } from "../helpers/venta.js";
const router = Router();

router.post('/registrar_venta', validarJWT, registrar_venta)
router.get('/listar_venta', listar_ventas)

router.get('/listar_venta_id', [
    check('_id', 'El id es obligatorio').notEmpty(),
    check('_id', 'El id debe ser valido').isMongoId(),
    check('_id').custom(listarVentaId),
    validarCampos
], listar_ventas_id)
router.get('/ventas_cliente', [
    check('cliente', 'El id del cliente es requerido').notEmpty(),
    check('cliente', 'el id debe ser valido').isMongoId(),
    check('cliente').custom(ventaCliente),
    validarCampos
], ventas_cliente)
router.get('/ventas_producto', ventas_producto)

export default router;