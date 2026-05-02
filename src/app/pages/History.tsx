import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Trash2, Search, Film } from 'lucide-react';
import type { HistoryItem, Mood } from '../data/movies';
import { getHistory, clearHistory, moodConfig } from '../data/movies';

function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return 'agora mesmo';
  if (mins < 60) return `há ${mins} min`;
  if (hours < 24) return `há ${hours}h`;
  if (days === 1) return 'ontem';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function EmptyState() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-6 py-24"
    >
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center"
        style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}
      >
        <Film size={32} style={{ color: '#7c3aed' }} />
      </div>
      <div className="text-center flex flex-col gap-2">
        <h3 style={{ color: '#ffffff', fontWeight: 600, fontSize: 18 }}>
          Nenhuma busca ainda
        </h3>
        <p style={{ color: '#52525b', fontSize: 14, maxWidth: 280, lineHeight: 1.6 }}>
          Suas buscas aparecerão aqui. Comece descrevendo seu humor e encontre um filme perfeito.
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-5 py-3 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
          color: '#fff',
          fontWeight: 600,
          fontSize: 14,
          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
        }}
      >
        <Search size={14} />
        Fazer primeira busca
      </motion.button>
    </motion.div>
  );
}

export function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    setShowConfirm(false);
  };

  const handleReSearch = (item: HistoryItem) => {
    navigate('/resultados', {
      state: {
        query: item.query,
        mood: item.mood,
        context: item.context,
        duration: item.duration,
      },
    });
  };

  return (
    <main
      className="min-h-screen pb-20"
      style={{ backgroundColor: '#0f0f0f' }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(124, 58, 237, 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1
              style={{
                fontWeight: 800,
                color: '#ffffff',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: 4,
              }}
            >
              Histórico
            </h1>
            <p style={{ color: '#52525b', fontSize: 13 }}>
              {history.length > 0
                ? `${history.length} busca${history.length > 1 ? 's' : ''} recente${history.length > 1 ? 's' : ''}`
                : 'Suas buscas anteriores'}
            </p>
          </div>

          {history.length > 0 && (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#71717a',
                  fontSize: 13,
                }}
              >
                <Trash2 size={13} />
                Limpar
              </motion.button>

              <AnimatePresence>
                {showConfirm && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 rounded-2xl p-4 flex flex-col gap-3 z-10"
                    style={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                      minWidth: 200,
                    }}
                  >
                    <p style={{ color: '#a1a1aa', fontSize: 13, lineHeight: 1.5 }}>
                      Deseja apagar todo o histórico?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleClear}
                        className="flex-1 py-2 rounded-lg text-xs"
                        style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#fca5a5',
                          fontWeight: 500,
                        }}
                      >
                        Apagar
                      </button>
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="flex-1 py-2 rounded-lg text-xs"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#71717a',
                          fontWeight: 500,
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Content */}
        {history.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {history.map((item, index) => {
                const moodCfg = moodConfig[item.mood as Mood];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="group flex items-center gap-4 rounded-2xl p-4 cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: '#141414',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                    whileHover={{
                      backgroundColor: '#1a1a1a',
                      borderColor: 'rgba(139, 92, 246, 0.2)',
                    }}
                    onClick={() => handleReSearch(item)}
                  >
                    {/* Movie thumbnail */}
                    <div
                      className="relative flex-shrink-0 rounded-xl overflow-hidden"
                      style={{ width: 64, height: 48 }}
                    >
                      <img
                        src={item.movie.image}
                        alt={item.movie.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(124, 58, 237, 0.6)' }}
                      >
                        <Search size={14} style={{ color: 'white' }} />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: 'rgba(139, 92, 246, 0.15)',
                            color: '#c4b5fd',
                            border: '1px solid rgba(139, 92, 246, 0.25)',
                            fontSize: 11,
                            fontWeight: 500,
                          }}
                        >
                          {moodCfg?.emoji} {moodCfg?.label}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            color: '#52525b',
                            border: '1px solid rgba(255,255,255,0.06)',
                            fontSize: 11,
                          }}
                        >
                          {item.context === 'sozinho' ? '👤 Sozinho' : '👥 Com amigos'}
                        </span>
                      </div>
                      {item.query && (
                        <p
                          className="truncate"
                          style={{ color: '#71717a', fontSize: 13, fontStyle: 'italic' }}
                        >
                          "{item.query}"
                        </p>
                      )}
                      <p style={{ color: '#a1a1aa', fontSize: 13, fontWeight: 500 }}>
                        → {item.movie.title}
                      </p>
                    </div>

                    {/* Time */}
                    <div
                      className="flex-shrink-0 flex items-center gap-1"
                      style={{ color: '#3f3f46', fontSize: 11 }}
                    >
                      <Clock size={11} />
                      <span>{formatDate(item.timestamp)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
