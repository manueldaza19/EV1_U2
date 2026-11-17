// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Componente/Navbar';
import Inicio from './pages/Inicio';
import PostsPage from './pages/Postpage';
import CreatePostPage from './pages/CreatePostPage';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/crear" element={<CreatePostPage />} />
      </Routes>
    </Router>
  );
} 