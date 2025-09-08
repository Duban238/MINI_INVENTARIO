
import mongoose from "mongoose";

const clienteSchema=new mongoose.Schema({
    nombre:{type:String, required:true},
    direccion:{type:String, required:true},
    telefono:{type:Number, required:true},
    email:{type:String, required:true}
})

export default mongoose.model('Clientes', clienteSchema);