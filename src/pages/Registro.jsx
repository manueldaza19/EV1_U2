import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    rut: '',
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const response = await fetch('https://backend-react-fcsl.onrender.com/api-backend/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('¡Usuario registrado con éxito!');
        navigate('/mis-companeros');
      } else {
        const errData = await response.json();
        setMensaje(errData.message || 'Error al registrar el usuario.');
      }
    } catch (error) {
      console.error(error);
      setMensaje('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Formulario de Registro</h2>
      
      {mensaje && <p className="text-red-500 mb-4 text-center">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Apellido</label>
          <input
            type="text"
            name="lastName"
            required
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">RUT (ej: 12.345.678-9)</label>
          <input
            type="text"
            name="rut"
            placeholder="12.345.678-9"
            required
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}