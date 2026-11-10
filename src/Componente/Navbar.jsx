import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">CFT Estatal</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/mis-companeros" className="hover:underline">Mis Compañeros</Link>
        </div>
      </div>
    </nav>
  );
}