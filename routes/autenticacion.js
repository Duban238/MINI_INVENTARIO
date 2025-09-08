import { Router } from "express";
import { registrar, login } from "../controllers/autenticacion.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { nombreExiste, emailExiste, validarEmail } from "../helpers/autenticacion.js";



const router = Router();

router.post('/registrar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(nombreExiste),
    check('email', 'El email debe ser valido').isEmail(),
    check('email').custom(emailExiste),
    check('contraseña', 'La contraseña debe contener al menos 10 caracteres').isLength({ min: 5 }),
    validarCampos
], registrar);



router.post('/login', [
    check('email', 'El email debe ser valido').isEmail(),
    check('email').custom(validarEmail),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


export default router;