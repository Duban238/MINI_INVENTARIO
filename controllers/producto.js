import Producto from '../models/producto.js'
import { GoogleGenAI } from "@google/genai";
import "dotenv/config"


const registrar_producto = async (req, res) => {
  const { nombre_producto, categoria, descripcion, precio, cantidad } = req.body;
  try {
    const guardar_producto = new Producto({ nombre_producto, categoria, precio, descripcion, cantidad })
    await guardar_producto.save();
    res.json({ mensaje: 'El producto fue registrado exitosamente', guardar_producto })
  } catch (error) {
    res.json({ mensaje: 'Error el producto no se registro', error })
  }
}


const listar_Productos = async (req, res) => {
  try {
    const mostrar_productos = await Producto.find()
    res.json(mostrar_productos)
  } catch (error) {
    res.json({ mensaje: 'Error a listar los productos', error })
  }
}

const listar_producto_id = async (req, res) => {
  const { _id } = req.body
  try {
    const validar_id = await Producto.findById(_id);
    res.json({ validar_id })
  } catch (error) {
    res.json({ mensaje: 'Error al listar el producto' })
  }
}

const editar_producto = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre_producto, categoria, descripcion, precio, cantidad } = req.body;
    const editar_producto = await Producto.findByIdAndUpdate({ _id: id }, {
      nombre_producto,
      categoria,
      descripcion,
      precio,
      cantidad
    })
    res.json({
      mensaje: "El producto fue editado exitosamente", editar_producto
    })
  } catch (error) {
    res.json({ mensaje: "Error al editar el producto" });
  }
};

const eilimar_producto = async (req, res) => {
  try {
    const { _id } = req.body
    const delete_producto = await Producto.findById(_id)
    await delete_producto.deleteOne();
    res.json({ mensaje: "El producto fue eliminado exitosamente" })
  } catch (error) {
    res.json({ mensaje: "Error al eliminar el producto" })
  }
}

export {
  registrar_producto,
  listar_Productos,
  listar_producto_id,
  editar_producto,
  eilimar_producto
}


