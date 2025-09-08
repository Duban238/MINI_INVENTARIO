import Usuario from '../models/autenticacion.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generarJWT } from '../middlewares/validar-jwt.js';


const registrar=async(req, res)=>{
const {nombre, contraseña, email}=req.body;
try {
    const contra = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({ nombre,email, contraseña: contra });
    await nuevoUsuario.save();
    res.json({ mensaje: 'El usuario fue registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor', error });
  }
}


const login = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    const validar_contraseña = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!validar_contraseña){
      return res.json({ mensaje: 'Contraseña incorrecta' });
    } 
   const token=await generarJWT(usuario._id)
   res.json({usuario, token})
  } catch (error) {
    res.json({ mensaje: 'Error', error });
  }
};


export{
    registrar,
    login
}