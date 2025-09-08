import Producto from '../models/producto.js'

const productoExiste=async (nombre_producto)=>{
     const existe=await Producto.findOne({nombre_producto})
     if(existe){
        throw new Error("El producto que ingresaste ya esta registrado");
     }
}


const listarProductoId=async(_id)=>{
    const existe=await Producto.findById({_id})
    if(!existe){
        throw new Error("El id del producto no existe verficalo");
    }
}

const editarProductoId=async(_id)=>{
    const existe= await Producto.findById({_id})
    if(!existe){
        throw new Error("El id del producto no existe");
        
    }
}
const eliminarProductoId=async(_id)=>{
     const existe= await Producto.findById({_id})
     if (!existe) {
  throw new Error("El id del producto no existe");
  
    }
}
export{
    productoExiste,
   listarProductoId,
   editarProductoId,
   eliminarProductoId
}