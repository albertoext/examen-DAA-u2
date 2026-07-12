import { useState, useEffect } from 'react';

export default function PaginaPrincipal() {
  const [lista, setLista] = useState([]);
  const [textoIngresado, setTextoIngresado] = useState('');

  const traerDatos = async () => {
    const respuesta = await fetch('/api/solicitudes');
    const datos = await respuesta.json();
    setLista(datos);
  };

  useEffect(() => {
    traerDatos();
  }, []);

  const enviarNuevaSolicitud = async (e) => {
    e.preventDefault();
    
    await fetch('/api/solicitudes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: textoIngresado })
    });

    setTextoIngresado('');
    traerDatos();
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Control de Solicitudes - ESIT</h2>
      
      <form onSubmit={enviarNuevaSolicitud} style={{ marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Ej. Crear cuenta de correo" 
          value={textoIngresado} 
          onChange={(e) => setTextoIngresado(e.target.value)}
          style={{ padding: '10px', width: '70%', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Agregar</button>
      </form>

      <h3>Solicitudes en la Base de Datos (LokiJS):</h3>
      <ul>
        {lista.map((item, id) => (
          <li key={id} style={{ margin: '10px 0' }}>
            <strong>{item.nombre}</strong> - <span style={{ color: 'blue' }}>{item.estado}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
