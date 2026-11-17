import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Postpage() {
  const [posts, setPosts] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('https://backend-react-fcsl.onrender.com/api-backend/posts');
      const data = await res.json();
      
      let postsArray = [];
      if (Array.isArray(data)) {
        postsArray = data;
      } else if (data && Array.isArray(data.posts)) {
        postsArray = data.posts;
      }

      // Combinamos con las publicaciones locales creadas por el usuario si existen
      const localPosts = JSON.parse(localStorage.getItem('local_posts') || '[]');
      const combined = [...localPosts, ...postsArray];

      setPosts(combined);
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
      const localPosts = JSON.parse(localStorage.getItem('local_posts') || '[]');
      setPosts(localPosts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleReaction = async (postId, type) => {
    setErrorMsg('');
    const userId = localStorage.getItem('userId') || null;

    // Actualización optimista en la interfaz de usuario de inmediato
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const currentCounts = post.counts || { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 };
          return {
            ...post,
            counts: {
              ...currentCounts,
              [type]: (currentCounts[type] || 0) + 1
            }
          };
        }
        return post;
      })
    );

    try {
      const res = await fetch(
        `https://backend-react-fcsl.onrender.com/api-backend/posts/${postId}/reactions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, userId }),
        }
      );

      if (res.status === 409) {
        setErrorMsg('Ya registraste esta reacción anteriormente en esta publicación (Error 409 Conflict).');
        // Revertir el incremento si hubo conflicto 409
        fetchPosts();
        return;
      }

      const result = await res.json().catch(() => ({}));
      if (result && result.counts) {
        setPosts(prevPosts =>
          prevPosts.map(p => (p.id === postId ? { ...p, counts: result.counts } : p))
        );
      }
    } catch (error) {
      console.error('Error al reaccionar con el servidor, manteniendo contador local:', error);
    }
  };

  const reactionEmojis = {
    like: '👍',
    love: '❤️',
    haha: '😆',
    wow: '😮',
    sad: '😢',
    angry: '😡',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Muro de Publicaciones
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Revisa las publicaciones e interactúa con los botones de reacciones.
          </p>
        </div>
        <Link
          to="/posts/crear"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm transition"
        >
          Escribir publicación
        </Link>
      </div>

      {errorMsg && (
        <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-800 p-4 rounded-r-xl shadow-sm mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={() => setErrorMsg('')}
            className="text-amber-600 hover:text-amber-900 font-bold text-lg leading-none"
          >
            &times;
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Cargando publicaciones...</p>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <p className="text-slate-500 font-medium">Aún no hay publicaciones registradas.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => {
            const authorName = post.author?.name || post.author || 'Anónimo';
            const initial = authorName.charAt(0).toUpperCase();

            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                      {initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{authorName}</p>
                      <p className="text-xs text-slate-400">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString('es-CL', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })
                          : 'Reciente'}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">{post.title}</h3>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {post.content}
                  </p>
                </div>

                <div className="bg-slate-50/80 px-6 py-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  {Object.entries(reactionEmojis).map(([type, emoji]) => (
                    <button
                      key={type}
                      onClick={() => handleReaction(post.id, type)}
                      title={type.toUpperCase()}
                      className="group bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer"
                    >
                      <span className="group-hover:scale-125 transition-transform duration-150">
                        {emoji}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700">
                        {post.counts?.[type] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}