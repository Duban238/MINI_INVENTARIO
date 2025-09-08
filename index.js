import 'dotenv/config'
import express from "express"
import mongoose from 'mongoose'
import autenticacionRoutes from './routes/autenticacion.js'
import productoRoutes from './routes/producto.js'
import clienteRoutes from './routes/cliente.js'
import ventaRoutes from './routes/venta.js'
import iaRoutes from './routes/ia.js'

const app=express()
app.use(express.json())


mongoose.connect(process.env.MONGO_CNX)
.then(()=>console.log("Conectado a la DB"));

app.use('/api',autenticacionRoutes)
app.use('/api',productoRoutes)
app.use('/api',clienteRoutes)
app.use('/api',ventaRoutes)
app.use('/api',iaRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    
})
