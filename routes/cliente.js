import { Router } from "express";
import { listar_clientes, registrar_cliente, listar_clientes_id, modificar_cliente, eliminar_cliente } from "../controllers/cliente.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { nombreExiste, emailExiste, listarClienteId, modificarClienteId, eliminarClienteId } from "../helpers/cliente.js";
const router = Router();

router.post('/registrar_cliente', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom(nombreExiste),
  check('direccion', 'La direccion es obligatoria').trim().notEmpty(),
  check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
  check('telefono', 'El teléfono debe tener solo números').isNumeric(),
  check('telefono', 'El teléfono debe tener al menos 10 dígitos').isLength({ min: 10, max: 10 }),
  check('email', 'El email debe ser valido').isEmail(),
  check('email').custom(emailExiste),
  validarCampos
], registrar_cliente);

router.get('/listar_cliente', listar_clientes);


router.get('/listar_cliente_id', [
  check('_id', 'El id debe que ser valido').isMongoId(),
  check('_id').custom(listarClienteId),
  validarCampos,
], listar_clientes_id);


router.put('/modificar_cliente/:id', [
  validarJWT,
  check('id', 'El ID es obligatorio para editar el cliente').notEmpty(),
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom(modificarClienteId),
  validarCampos,
], modificar_cliente);


router.delete('/eliminar_cliente', [
  validarJWT,
  check('_id', 'El id es obligatorio para poder eliminar el usuario').notEmpty(),
  check('_id', 'El id no es valido').isMongoId(),
  check('_id').custom(eliminarClienteId),
  validarCampos,
], eliminar_cliente);

export default router;