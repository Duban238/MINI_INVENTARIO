import { Router } from "express";
import { registrar_producto, listar_Productos, listar_producto_id, editar_producto, eilimar_producto } from "../controllers/producto.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { productoExiste, listarProductoId, editarProductoId, eliminarProductoId } from "../helpers/producto.js";

const router = Router();

router.post('/registrar_producto', [validarJWT,
    check('nombre_producto', 'El nombre del producto es obligatorio').notEmpty(),
    check('nombre_producto').custom(productoExiste),
    check('categoria', 'La categoria del producto es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion del producto es obligatoria').not().isEmpty(),

    check('precio', 'El precio del producto es obligatorio').not().isEmpty(),
    check('precio', 'El precio debe ser un numero valido').isFloat({ min: 0 }),

    check('cantidad', 'La cantidad del producto es obligatoria'),
    check('cantidad', 'La cantidad del producto debe ser valida').isInt({ min: 0 }),
    validarCampos,
], registrar_producto)


router.get('/listar_productos', listar_Productos)

router.get('/listar_producto_id', [
    check('_id', 'El id debe ser valido').isMongoId(),
    check('_id').custom(listarProductoId),
    validarCampos
], listar_producto_id)


router.put('/editar_producto/:id',[
    validarJWT,
    check("id", "El id no puede ir vacio").notEmpty(),
     check('id', 'El id debe ser valido').isMongoId(),
     check('id').custom(editarProductoId),
    validarCampos
],  editar_producto)


router.delete('/eliminar_producto',[
    validarJWT,
   check('_id', 'El id debe ser valido').isMongoId(),
   check('_id').custom(eliminarProductoId),
  validarCampos
] , eilimar_producto)

export default router;