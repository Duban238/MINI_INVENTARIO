import mongoose from "mongoose";

const productosSchema=new mongoose.Schema({
    nombre_producto:{type:String , required:true},
    categoria:{type:String, required:true},
    precio:{type:Number, required:true},
    descripcion:{type:String, required:true},
    cantidad:{type:Number, required:true}
})

export default mongoose.model('productos',productosSchema)