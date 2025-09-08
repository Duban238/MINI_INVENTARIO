import Venta from '../models/venta.js'
import Cliente from '../models/cliente.js'
import venta from '../models/venta.js';




const listarVentaId=async(_id)=>{
    const existe=await Venta.findById(_id)
    if(!existe){
        throw new Error("El id de la venta no existe verficalo");
    }
}

const ventaCliente=async(cliente)=>{
    const existe=await Venta.findOne({cliente})
    if(!existe){
        throw new Error("Este cliente no tiene ventas a su nombre");
    }
}

export{
    listarVentaId,
    ventaCliente
}