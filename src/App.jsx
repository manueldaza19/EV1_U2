import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Componente/Navbar';
import Inicio from './pages/inicio';
import MisCompaneros from './pages/MisCompaneros';
import Registro from './pages/Registro';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/mis-companeros" element={<MisCompaneros />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/registrarme" element={<Registro />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}