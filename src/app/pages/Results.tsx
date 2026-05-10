import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Sparkles,
  Bookmark,
  Play,
  ChevronRight,
  Clapperboard,
  X,
} from 'lucide-react';
import type { Mood, Context, Duration, RecommendationResult, Movie } from '../data/movies';
import { getRecommendation, saveToHistory, moodConfig } from '../data/movies';

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating / 2);
  const partial = (rating / 2) % 1;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            color:
              i < full
                ? '#fbbf24'
                : i === full && partial >= 0.5
                ? '#fbbf24'
                : 'rgba(255,255,255,0.15)',
            fontSize: 14,
          }}
        >
          ★
        </span>
      ))}
      <span className="text-sm ml-1" style={{ color: '#fbbf24', fontWeight: 600 }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function AlternativeCard({
  movie,
  index,
}: {
  movie: Movie;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1 min-w-0"
      style={{
        backgroundColor: '#161616',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(22,22,22,0.9) 0%, transparent 60%)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(139, 92, 246, 0.9)', backdropFilter: 'blur(8px)' }}
          >
            <Play size={14} fill="white" style={{ color: 'white', marginLeft: 2 }} />
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((g) => (
            <span
              key={g}
              className="px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                color: '#c4b5fd',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              {g}
            </span>
          ))}
        </div>
        <h3 className="text-sm text-white" style={{ fontWeight: 600, lineHeight: 1.3 }}>
          {movie.title}
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star size={11} fill="#fbbf24" style={{ color: '#fbbf24' }} />
            <span className="text-xs" style={{ color: '#fbbf24', fontWeight: 600 }}>
              {movie.rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={11} style={{ color: '#52525b' }} />
            <span className="text-xs" style={{ color: '#52525b' }}>
              {movie.duration}
            </span>
          </div>
          <span className="text-xs" style={{ color: '#52525b' }}>
            {movie.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Mapear nomes de plataformas do backend para emojis/ícones
const PLATFORM_CONFIG: Record<string, { emoji: string; color: string }> = {
  netflix: { emoji: '🎬', color: '#E50914' },
  'amazon prime': { emoji: '📺', color: '#146EB4' },
  'amazon prime video': { emoji: '📺', color: '#146EB4' },
  'disney+': { emoji: '✨', color: '#113CCF' },
  disney: { emoji: '✨', color: '#113CCF' },
  'max (hbo)': { emoji: '🎭', color: '#001EE8' },
  hbo: { emoji: '🎭', color: '#001EE8' },
  'paramount+': { emoji: '⭐', color: '#0064FF' },
  paramount: { emoji: '⭐', color: '#0064FF' },
  'apple tv+': { emoji: '🍎', color: '#000000' },
  'apple tv': { emoji: '🍎', color: '#000000' },
  apple: { emoji: '🍎', color: '#000000' },
  globoplay: { emoji: '🎬', color: '#FF0000' },
  'google play movies': { emoji: '🎬', color: '#4285F4' },
};

function WatchProvidersModal({
  movieTitle,
  platforms,
  isOpen,
  onClose,
}: {
  movieTitle: string;
  platforms: string[];
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div
              className="w-full max-w-md rounded-2xl p-6"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
                    Onde assistir
                  </h3>
                  <p style={{ color: '#a1a1aa', fontSize: 13 }} className="truncate">
                    {movieTitle}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#a1a1aa',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Platforms List */}
              {platforms.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {platforms.map((platform, idx) => {
                      const config = PLATFORM_CONFIG[platform.toLowerCase()];
                      const emoji = config?.emoji || '📺';
                      const color = config?.color || '#7c3aed';

                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-4 rounded-xl border-2"
                          style={{
                            backgroundColor: `${color}20`,
                            borderColor: color,
                          }}
                        >
                          <div className="text-center">
                            <span style={{ fontSize: 24 }}>{emoji}</span>
                            <p
                              style={{
                                color: color,
                                fontWeight: 600,
                                fontSize: 13,
                                marginTop: 4,
                              }}
                            >
                              {platform}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Info */}
                  <div
                    className="p-4 rounded-xl text-center mb-6"
                    style={{
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                    }}
                  >
                    <p style={{ color: '#c4b5fd', fontSize: 13, lineHeight: 1.6 }}>
                      Filme disponível em {platforms.length} plataforma{platforms.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </>
              ) : (
                <div
                  className="p-6 rounded-xl text-center mb-6"
                  style={{
                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                    border: '1px solid rgba(255, 68, 68, 0.2)',
                  }}
                >
                  <p style={{ color: '#ff8888', fontSize: 13, lineHeight: 1.6 }}>
                    Filme não disponível em plataformas de streaming no Brasil no momento
                  </p>
                </div>
              )}

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full px-4 py-3 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Fechar
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ErrorScreen({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#0f0f0f' }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 max-w-md"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #ff4444, #ff8888)',
            boxShadow: '0 0 40px rgba(255, 68, 68, 0.4)',
          }}
        >
          <X size={32} style={{ color: 'white' }} />
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <h2 style={{ color: '#ffffff', fontWeight: 700, fontSize: 20 }}>
            Oops! Algo deu errado
          </h2>
          <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.7 }}>
            {error}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="w-full px-4 py-3 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Tentar novamente
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/'}
            className="w-full px-4 py-3 rounded-xl"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: '#71717a',
              border: '1px solid rgba(255,255,255,0.08)',
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Voltar para home
          </motion.button>
        </div>

        <p style={{ color: '#52525b', fontSize: 12, marginTop: 8 }}>
          Se o problema persistir, tente mais tarde ou entre em contato com suporte.
        </p>
      </motion.div>
    </div>
  );
}

function AnalyzingScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#0f0f0f' }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.4)',
          }}
        >
          <Clapperboard size={28} style={{ color: 'white' }} />
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            <p style={{ color: '#a1a1aa', fontWeight: 400, fontSize: 16 }}>
              Analisando seu humor
            </p>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                style={{ color: '#a78bfa', fontSize: 22, lineHeight: 1 }}
              >
                .
              </motion.span>
            ))}
          </div>
          <p style={{ color: '#3f3f46', fontSize: 13 }}>
            Encontrando o filme perfeito para você
          </p>
        </div>

        <div
          className="w-48 h-0.5 rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #7c3aed, #c026d3)' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showWatchModal, setShowWatchModal] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const state = location.state as {
    query: string;
    mood: Mood;
    context: Context;
    duration: Duration;
  } | null;

  useEffect(() => {
    if (!state) {
      navigate('/');
      return;
    }

    let isMounted = true;

    async function fetchRecommendation() {
      try {
        const rec = await getRecommendation(state!.mood, state!.context, state!.duration, state!.query);
        
        if (isMounted) {
          console.log("[DEBUG] Recomendação recebida:", rec);
          
          // Validar e enriquecer matchReason
          if (!rec || !rec.matchReason || rec.matchReason.trim().length < 10) {
            console.warn("[FALLBACK] matchReason inválido ou vazio, usando fallback contextual");
            
            // Fallback inteligente baseado no contexto
            const contextLabel = state!.context === 'amigos' ? 'para assistir com amigos' : 'para uma sessão solo';
            const moodLabel = state!.mood.charAt(0).toUpperCase() + state!.mood.slice(1);
            
            rec.matchReason = `Perfeito para quando você está ${state!.mood} e quer ${contextLabel}. Uma escolha que vai surpreender você.`;
          }

          setResult(rec);
          setLoading(false);
          
          if (rec && rec.primary) {
            saveToHistory({
              id: Date.now().toString(),
              query: state!.query,
              mood: state!.mood,
              context: state!.context,
              duration: state!.duration,
              timestamp: Date.now(),
              movie: {
                id: rec.primary.id,
                title: rec.primary.title,
                image: rec.primary.image,
              },
            });
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("[RECOMMENDATION-ERROR] Erro ao buscar recomendação", error);
          
          // Determinar mensagem de erro apropriada
          let errorMsg = "Não conseguimos carregar a recomendação. Tente novamente mais tarde.";
          
          if (error instanceof Error) {
            if (error.message.includes("timeout") || error.message.includes("Timeout")) {
              errorMsg = "A requisição expirou. O servidor está demorando muito. Tente novamente.";
            } else if (error.message.includes("Failed to fetch")) {
              errorMsg = "Erro de conexão. Verifique sua internet e tente novamente.";
            } else {
              errorMsg = error.message;
            }
          }
          
          setError(errorMsg);
          setLoading(false);
        }
      }
    }

    fetchRecommendation();

    return () => {
      isMounted = false;
    };
  }, [state, navigate, retryCount]);

  if (!state) return null;

  const moodCfg = state ? moodConfig[state.mood] : null;

  return (
    <>
      <WatchProvidersModal
        movieTitle={result?.primary.title || ''}
        platforms={result?.primary.platforms || []}
        isOpen={showWatchModal}
        onClose={() => setShowWatchModal(false)}
      />
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <AnalyzingScreen />
          </motion.div>
        ) : error ? (
          <motion.div key="error" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ErrorScreen 
              error={error} 
              onRetry={() => {
                setError(null);
                setLoading(true);
                setResult(null);
                setRetryCount((prev) => prev + 1);
              }}
            />
          </motion.div>
        ) : result ? (
          <motion.main
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen pb-20"
            style={{ backgroundColor: '#0f0f0f' }}
          >
            <div
              className="fixed inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 60%)',
              }}
            />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-8">
              {/* Navigation row */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between mb-8"
              >
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 text-sm group"
                  style={{ color: '#71717a' }}
                >
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform duration-200"
                  />
                  Nova busca
                </button>

                {state.query && (
                  <div
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full max-w-xs"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: '#71717a',
                      fontSize: 12,
                    }}
                  >
                    <span
                      className="truncate max-w-[200px]"
                      style={{ fontStyle: 'italic' }}
                    >
                      "{state.query}"
                    </span>
                  </div>
                )}

                {moodCfg && (
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: 'rgba(139, 92, 246, 0.12)',
                      border: '1px solid rgba(139, 92, 246, 0.25)',
                      color: '#c4b5fd',
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  >
                    <span>{moodCfg.emoji}</span>
                    <span>{moodCfg.label}</span>
                  </div>
                )}
              </motion.div>

              {/* Match banner */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex items-center gap-2 mb-6"
              >
                <Sparkles size={14} style={{ color: '#a78bfa' }} />
                <span style={{ color: '#71717a', fontSize: 14 }}>
                  Encontramos o filme ideal para o seu momento
                </span>
              </motion.div>

              {/* Main movie card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl overflow-hidden mb-12"
                style={{
                  backgroundColor: '#141414',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Poster */}
                  <div className="relative lg:w-72 xl:w-80 flex-shrink-0">
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: '2/3', minHeight: 260 }}
                    >
                      <img
                        src={result.primary.image}
                        alt={result.primary.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 lg:hidden"
                        style={{
                          background: 'linear-gradient(to top, #141414 0%, transparent 50%)',
                        }}
                      />
                      <div
                        className="absolute inset-0 hidden lg:block"
                        style={{
                          background: 'linear-gradient(to right, transparent 60%, #141414 100%)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-6 lg:p-8 xl:p-10 flex flex-col gap-5">
                    {/* Genres */}
                    <div className="flex flex-wrap gap-2">
                      {result.primary.genres.map((g) => (
                        <span
                          key={g}
                          className="px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: 'rgba(139, 92, 246, 0.15)',
                            color: '#c4b5fd',
                            border: '1px solid rgba(139, 92, 246, 0.25)',
                            fontWeight: 500,
                            fontSize: 12,
                          }}
                        >
                          {g}
                        </span>
                      ))}
                    </div>

                    {/* Title + director */}
                    <div>
                      <h2
                        style={{
                          fontWeight: 800,
                          color: '#ffffff',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.15,
                          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                          marginBottom: 6,
                        }}
                      >
                        {result.primary.title}
                      </h2>
                      <p style={{ color: '#52525b', fontSize: 13 }}>
                        Dirigido por {result.primary.director}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4">
                      <StarRating rating={result.primary.rating} />
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} style={{ color: '#52525b' }} />
                        <span style={{ color: '#71717a', fontSize: 14 }}>
                          {result.primary.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} style={{ color: '#52525b' }} />
                        <span style={{ color: '#71717a', fontSize: 14 }}>
                          {result.primary.year}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        color: '#a1a1aa',
                        fontSize: 14,
                        lineHeight: 1.75,
                      }}
                    >
                      {result.primary.description}
                    </p>

                    {/* Match reason */}
                    <div
                      className="rounded-2xl p-4 flex gap-3"
                      style={{
                        backgroundColor: 'rgba(124, 58, 237, 0.1)',
                        border: '1px solid rgba(124, 58, 237, 0.2)',
                      }}
                    >
                      <Sparkles
                        size={16}
                        className="flex-shrink-0"
                        style={{ color: '#a78bfa', marginTop: 2 }}
                      />
                      <div>
                        <p
                          className="uppercase tracking-wider mb-1"
                          style={{ color: '#7c3aed', fontWeight: 600, fontSize: 11 }}
                        >
                          Por que este filme?
                        </p>
                        <p style={{ color: '#c4b5fd', fontSize: 13, lineHeight: 1.7 }}>
                          {result.matchReason}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowWatchModal(true)}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl"
                        style={{
                          background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
                          color: '#fff',
                          fontWeight: 600,
                          fontSize: 14,
                          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.35)',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <Play size={14} fill="white" />
                        Onde assistir
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSaved(!saved)}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all"
                        style={{
                          backgroundColor: saved ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                          border: saved
                            ? '1px solid rgba(139, 92, 246, 0.4)'
                            : '1px solid rgba(255,255,255,0.08)',
                          color: saved ? '#c4b5fd' : '#71717a',
                          fontWeight: 500,
                          fontSize: 14,
                          cursor: 'pointer',
                        }}
                      >
                        <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
                        {saved ? 'Salvo' : 'Salvar'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Alternatives */}
              {result.alternatives.length > 0 && (
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="flex items-center justify-between mb-5"
                  >
                    <div>
                      <h3 style={{ color: '#ffffff', fontWeight: 600, fontSize: 16, marginBottom: 2 }}>
                        Outras sugestões
                      </h3>
                      <p style={{ color: '#52525b', fontSize: 12 }}>
                        Mais opções para o seu humor {moodCfg?.emoji}
                      </p>
                    </div>
                    <Link
                      to="/"
                      className="flex items-center gap-1"
                      style={{ color: '#7c3aed', fontSize: 12 }}
                    >
                      Ver mais
                      <ChevronRight size={12} />
                    </Link>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {result.alternatives.map((movie, i) => (
                      <AlternativeCard key={movie.id} movie={movie} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Try again */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="mt-12 flex justify-center"
              >
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 transition-colors"
                  style={{ color: '#52525b', fontSize: 14, border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                >
                  <ArrowLeft size={14} />
                  Buscar com outro humor
                </button>
              </motion.div>
            </div>
          </motion.main>
        ) : null}
      </AnimatePresence>
    </>
  );
}
