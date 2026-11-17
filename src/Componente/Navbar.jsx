import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-blue-700 text-white shadow-sm'
      : 'text-blue-100 hover:bg-blue-600/60 hover:text-white';

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Título */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white text-blue-800 font-extrabold rounded-lg w-9 h-9 flex items-center justify-center shadow">
              MC
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-none">
                Mi-Clase
              </span>
              <span className="text-[11px] text-blue-200 tracking-wider uppercase">
                CFT Estatal
              </span>
            </div>
          </Link>

          {/* Enlaces de navegación */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/')}`}
            >
              Inicio
            </Link>
            <Link
              to="/posts"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/posts')}`}
            >
              Publicaciones
            </Link>
            <Link
              to="/posts/crear"
              className="ml-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 flex items-center gap-1"
            >
              <span>+</span> Nueva Publicación
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}