import mongoose from "mongoose";

const detalleproducto = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "producto"
    },
    nombre: { type: String },
    cantidad: { type: Number },
})
const ventaSchema = new mongoose.Schema({
    producto: [detalleproducto],
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cliente"
    },
    precioTotal: { type: Number },
    fecha: { type: Date, default:Date.now}
})

export default mongoose.model('Ventas',ventaSchema)