import { obtenerTablaSolicitudes } from '../../utils/db';

export default function handler(req, res) {
  const tabla = obtenerTablaSolicitudes();

  if (req.method === 'GET') {
    const listaCompleta = tabla.find();
    return res.status(200).json(listaCompleta);
  }

  if (req.method === 'POST') {
    const nuevaTarea = req.body.nombre;

    if (!nuevaTarea) {
      return res.status(400).json({ error: 'Debes escribir el nombre de la solicitud' });
    }

    const guardado = tabla.insert({
      nombre: nuevaTarea,
      estado: 'Pendiente'
    });

    return res.status(201).json({ mensaje: '¡Guardado con éxito!', datos: guardado });
  }

  return res.status(405).json({ error: 'Operación no permitida' });
}
