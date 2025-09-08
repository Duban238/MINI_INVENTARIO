import Venta from "../models/venta.js";
import Producto from "../models/producto.js";
import Cliente from "../models/cliente.js";

const registrar_venta = async (req, res) => {
    try {
        const { cliente, producto } = req.body;
        const existeCliente = await Cliente.findById(cliente)
        if (!existeCliente) {
            return res.json({ mensaje: 'Este cliente no se encuentra' })
        }
        let precioTotal = 0;
        let ventaFinal = []

        for (const element of producto) {
            const exisProducto = await Producto.findById(element.producto);
            if (!exisProducto) {
                return res.json({ mensaje: `Este producto no se encuentra ` })
            }
            if (element.cantidad > exisProducto.cantidad) {
                return res.json({ mensaje: `Stock insuficiente para el producto` })
            }
            const total = exisProducto.precio * element.cantidad;
            precioTotal += total;
            exisProducto.cantidad -= element.cantidad;
            await exisProducto.save()

            ventaFinal.push({
                producto: exisProducto._id,
                nombre: exisProducto.nombre_producto,
                cantidad: element.cantidad
            });
        }
       const nuevaVenta= await new Venta({
            cliente,
            producto: ventaFinal,
            precioTotal: precioTotal
        }).save();

       return res.json({ mensaje: "Esta venta fue registrada exitosamente", nuevaVenta })
    } catch (error) {
       return res.json({ mensaje: "Error al registrar la venta" })
    }
}

const listar_ventas = async (req, res) => {
    try {
        const listar = await Venta.find()
        res.json({ mensaje: "Estas son las ventas registradas", listar })
    } catch (error) {
        res.json({ mensaje: "Erros al listar las ventas" })
    }
}

const listar_ventas_id = async (req, res) => {
    const { _id } = req.body
    try {
        const listar_id = await Venta.findById(_id)
        res.json({ listar_id })
    } catch (error) {
        res.json({ mensaje: "Error", error })
    }
}

const ventas_cliente = async (req, res) => {
    const { cliente } = req.body
    try {
        const buscar_ventas = await Venta.find({ cliente })
        res.json({ buscar_ventas })
    } catch (error) {
        res.json({ mensaje: "Error ", error })
    }
}
const ventas_producto = async (req, res) => {
    const { _id, fechaInicio, fechaFinal } = req.body
    try {
        const ventaProducto = await Venta.find({ nombre_producto })
        if (!ventaProducto) {
            return res.json({ mensaje: "Este producto no ah tenido ventas" })
        }
        res.json({ ventaProducto })
    } catch (error) {
        res.json({ mensaje: "Error ", error })
    }
}
export {
    registrar_venta,
    listar_ventas,
    listar_ventas_id,
    ventas_cliente,
    ventas_producto
}