import FomatoProyeccion from "../models/formato_proyeccion.schema.js";


export async function getFormatoProyeccion(req, res){
  
    try{
        const formatos = await FomatoProyeccion.find();
        res.send(formatos);

    } catch(error){

        res.status(500).send('Error al obtener los formatos', error.message);
    }
}