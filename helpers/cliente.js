import Cliente from '../models/cliente.js'

const nombreExiste= async(nombre)=>{
    const existe=await Cliente.findOne({nombre})
    if(existe){
        throw new Error("El cliente que ingresaste ya esta registrado");
    }
}

const emailExiste=async(email)=>{
    const existe= await Cliente.findOne({email})
    if(existe){
        throw new Error("El email de cliente ya esta registrado");
    }
}

const listarClienteId=async(_id)=>{
    const existe=await Cliente.findById({_id})
    if(!existe){
        throw new Error("El id del cliente no existe verficalo");
    }
}

const modificarClienteId=async(_id)=>{
    const existe=await Cliente.findById({_id})
    if(!existe){
        throw new Error("El id del cliente no existe para modificarlo");
        
    }
}
const eliminarClienteId=async(_id)=>{
    const existe=await Cliente.findById(_id)
    if(!existe){
        throw new Error("El id del cliente no existe para eliminarlo");
        
    }
}

export{
    nombreExiste,
    emailExiste,
    listarClienteId,
    modificarClienteId,
    eliminarClienteId
}