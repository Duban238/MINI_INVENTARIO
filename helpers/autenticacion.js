import Usuario from "../models/autenticacion.js"




const nombreExiste=async (nombre)=>{
    const existe=await Usuario.findOne({nombre})
    if(existe){
        throw new Error("El nombre que ingresaste ya esta registrado");
    }
};

const emailExiste=async(email)=>{
    const existe=await Usuario.findOne({email})
    if(existe){
        throw new Error("El email que ingresaste ya esta registrado") 
    }
}


//LOGIN
const validarEmail=async(email, )=>{
    const exi_email=await Usuario.findOne({email})
    if(!exi_email){
        throw new Error("El email que ingresaste no se encuentra");
        
    }
}


export {
nombreExiste,
emailExiste,
validarEmail
}