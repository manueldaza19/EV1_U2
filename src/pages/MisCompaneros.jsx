import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MisCompaneros() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const API_URL = 'https://backend-react-fcsl.onrender.com/api-backend/users';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Verificamos si data es un array o si viene dentro de una propiedad
        const listaUsuarios = Array.isArray(data) ? data : (data.users || data.data || []);
        setUsuarios(listaUsuarios);
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
        setCargando(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Mis Compañeros</h2>
        <button
          onClick={() => navigate('/registro')}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Registrarme
        </button>
      </div>

      {cargando ? (
        <p className="text-center text-gray-500">Cargando compañeros...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(usuarios) && usuarios.length > 0 ? (
            usuarios.map((user, idx) => (
              <div key={user.id || idx} className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">{user.name} {user.lastName}</h3>
                <p className="text-sm text-gray-600"><strong>RUT:</strong> {user.rut}</p>
                <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">No hay usuarios registrados.</p>
          )}
        </div>
      )}
    </div>
  );
}