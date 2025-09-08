import cliente from "../models/cliente.js";

const registrar_cliente = async (req, res) => {
    const { nombre, direccion, telefono, email } = req.body;
    try {
        let guardar_cliente = new cliente({ nombre, direccion, telefono, email });
        await guardar_cliente.save();
        res.json({ mensaje: "El cliente fue registrado exitosamnete" })
    } catch (error) {
        res.json({ mensaje: "Error al registrar el cliente" })
    }
}
const listar_clientes = async (req, res) => {
    try {
        let mostrar_clientes = await cliente.find()
        res.json({ mostrar_clientes })
    } catch (error) {
        res.json({ mensaje: "Error a listar los clientes" })
    }
}

const listar_clientes_id = async (req, res) => {
    const { _id } = req.body
    try {
        const listar_id = await cliente.findById(_id)
        res.json({ listar_id })
    } catch (error) {
        res.json({ mensaje: "Error al listar el cliente" })
    }
}

const modificar_cliente = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, direccion, telefono, email } = req.body
        const editar_cliente = await cliente.findByIdAndUpdate({ _id: id }, {
            nombre,
            direccion,
            telefono,
            email
        })
        res.json({ mensaje: "El cliente fue modificado exitosamente", editar_cliente })
    } catch (error) {
        res.json({ mensaje: "Error al modificar el cliente" })
    }
}

const eliminar_cliente = async (req, res) => {
    const { _id } = req.body
    try {
        let eliminar_id = await cliente.findById(_id)
        await eliminar_id.deleteOne();
        res.json({ mensaje: "El cliente fue eliminado exitosamente" })
    } catch (error) {
        res.json({ mensaje: "Error al eliminar el cliente" })
    }
}
export {
    registrar_cliente,
    listar_clientes,
    listar_clientes_id,
    modificar_cliente,
    eliminar_cliente,
}