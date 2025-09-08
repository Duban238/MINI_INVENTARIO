import { GoogleGenAI } from "@google/genai";
import "dotenv/config"


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const descripcion_producto = async (req, res) => {
  try {
    const { nombre_producto, categoria } = req.body;
    const chat1 = ai.chats.create({
      model: "gemini-2.0-flash",
      config: {
        systemInstruction: process.env.descripcion,
      },
      history: [],
    });
    const response = await chat1.sendMessage({
      message: `Describe una descripción profesional y atractiva para un producto llamado ${nombre_producto} y ten en cuenta su categoria que es ${categoria} `,
    });
    console.log(response.text);
   return res.json({ descripcion: response.text })
  } catch (error) {
    res.json({ mensaje: "Error al obtner la descripcion del producto" })
  }

}

const precio = async (req, res) => {
  const{nombre_producto}=req.body
  try {
     const chat1 = ai.chats.create({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: process.env.precio,
    },
    history: [],
  });
  const response = await chat1.sendMessage({
    message: `A partir del nombre del producto "${nombre_producto}", sugiéreme un precio justo en **pesos colombianos (COP)**. Solo responde con el valor numérico estimado en COP, sin texto adicional.`,
  });
  console.log("Precio:", response.text);
  return res.json({precio:response.text})
  } catch (error) {
    res.json({mensaje: "Error al obtener el precio del producto", error})
  }
 
}

export {
  descripcion_producto,
  precio
}