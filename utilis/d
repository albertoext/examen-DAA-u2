import Loki from 'lokijs';
import path from 'path';

const rutaArchivo = path.join(process.cwd(), 'esit_db.json');

const db = new Loki(rutaArchivo, {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000
});

export function obtenerTablaSolicitudes() {
  let solicitudes = db.getCollection('solicitudes');
  
  if (solicitudes === null) {
    solicitudes = db.addCollection('solicitudes');
    solicitudes.insert({ nombre: 'Instalación de Windows', estado: 'Pendiente' });
  }
  
  return solicitudes;
}
