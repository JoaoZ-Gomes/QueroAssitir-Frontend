import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Search, Users, User, Zap, Clock, Shuffle } from 'lucide-react';
import type { Mood, Context, Duration } from '../data/movies';
import { moodConfig } from '../data/movies';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [mood, setMood] = useState<Mood | null>(null);
  const [context, setContext] = useState<Context>('sozinho');
  const [duration, setDuration] = useState<Duration>('qualquer');

  const handleSearch = () => {
    const selectedMood: Mood = mood || 'leve';
    navigate('/resultados', {
      state: { query, mood: selectedMood, context, duration },
    });
  };

  const canSearch = query.trim().length > 0 || mood !== null;

  return (
    <main
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: '#0f0f0f' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(192, 38, 211, 0.07) 0%, transparent 70%)',
        }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative w-full max-w-2xl flex flex-col items-center gap-10">
        {/* Header text */}
        <motion.div {...fadeUp(0)} className="text-center flex flex-col items-center gap-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs mb-2"
            style={{
              borderColor: 'rgba(167, 139, 250, 0.3)',
              backgroundColor: 'rgba(167, 139, 250, 0.08)',
              color: '#c4b5fd',
              fontWeight: 500,
            }}
          >
            <Shuffle size={11} />
            Recomendação personalizada por humor
          </motion.div>
          <h1
            className="text-4xl sm:text-5xl text-center"
            style={{
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#ffffff',
            }}
          >
            O filme certo para{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #e879f9 60%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              o seu momento
            </span>
          </h1>
          <p className="text-sm sm:text-base max-w-md" style={{ color: '#71717a', lineHeight: 1.7 }}>
            Descreva como você está se sentindo e deixa a gente encontrar o filme perfeito pra você.
          </p>
        </motion.div>

        {/* Search input */}
        <motion.div {...fadeUp(0.1)} className="w-full">
          <div
            className="relative rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: '#141414',
              boxShadow: query
                ? '0 0 0 1px rgba(139, 92, 246, 0.4), 0 20px 60px rgba(139, 92, 246, 0.1)'
                : '0 8px 40px rgba(0,0,0,0.4)',
            }}
          >
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && canSearch) {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="O que você quer assistir hoje? Ex: estou me sentindo melancólico e quero chorar um pouco..."
              rows={3}
              className="w-full resize-none bg-transparent px-5 pt-5 pb-4 text-sm outline-none placeholder-[#3f3f46] text-white"
              style={{
                lineHeight: 1.7,
                caretColor: '#a78bfa',
              }}
            />
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              <span className="text-xs" style={{ color: '#3f3f46' }}>
                {query.length > 0 ? `${query.length} caracteres` : 'Pressione Enter para buscar'}
              </span>
              <Search size={14} style={{ color: '#3f3f46' }} />
            </div>
          </div>
        </motion.div>

        {/* Mood selector */}
        <motion.div {...fadeUp(0.2)} className="w-full flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest" style={{ color: '#52525b', fontWeight: 600 }}>
            Qual é o seu humor?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(moodConfig) as Mood[]).map((m, i) => {
              const cfg = moodConfig[m];
              const selected = mood === m;
              return (
                <motion.button
                  key={m}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setMood(selected ? null : m)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm transition-all duration-200"
                  style={{
                    borderColor: selected ? 'rgba(167, 139, 250, 0.5)' : 'rgba(255, 255, 255, 0.07)',
                    backgroundColor: selected ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                    color: selected ? '#e4d9ff' : '#71717a',
                    fontWeight: selected ? 500 : 400,
                    boxShadow: selected ? '0 0 20px rgba(139, 92, 246, 0.15)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{cfg.emoji}</span>
                  <span>{cfg.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Filters row */}
        <motion.div {...fadeUp(0.35)} className="w-full flex flex-col sm:flex-row gap-4">
          {/* Context toggle */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-xs uppercase tracking-widest" style={{ color: '#52525b', fontWeight: 600 }}>
              Assistindo com...
            </p>
            <div
              className="flex rounded-xl p-1 gap-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {[
                { value: 'sozinho' as Context, label: 'Sozinho', icon: User },
                { value: 'amigos' as Context, label: 'Com amigos', icon: Users },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setContext(value)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition-all duration-200"
                  style={{
                    backgroundColor: context === value ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
                    color: context === value ? '#c4b5fd' : '#52525b',
                    fontWeight: context === value ? 500 : 400,
                    border: context === value ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
                  }}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration filter */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-xs uppercase tracking-widest" style={{ color: '#52525b', fontWeight: 600 }}>
              Duração
            </p>
            <div
              className="flex rounded-xl p-1 gap-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {[
                { value: 'curto' as Duration, label: 'Curto', icon: Zap },
                { value: 'qualquer' as Duration, label: 'Qualquer', icon: Shuffle },
                { value: 'longo' as Duration, label: 'Longo', icon: Clock },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setDuration(value)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs transition-all duration-200"
                  style={{
                    backgroundColor: duration === value ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
                    color: duration === value ? '#c4b5fd' : '#52525b',
                    fontWeight: duration === value ? 500 : 400,
                    border: duration === value ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
                  }}
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div {...fadeUp(0.45)} className="w-full">
          <motion.button
            whileHover={canSearch ? { scale: 1.02, y: -2 } : {}}
            whileTap={canSearch ? { scale: 0.98 } : {}}
            onClick={handleSearch}
            disabled={!canSearch}
            className="w-full py-4 rounded-2xl text-sm relative overflow-hidden group transition-all duration-300"
            style={{
              background: canSearch
                ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c026d3 100%)'
                : 'rgba(255,255,255,0.05)',
              color: canSearch ? '#fff' : '#3f3f46',
              fontWeight: 600,
              letterSpacing: '0.01em',
              cursor: canSearch ? 'pointer' : 'not-allowed',
              boxShadow: canSearch
                ? '0 8px 32px rgba(124, 58, 237, 0.35), 0 2px 8px rgba(0,0,0,0.3)'
                : 'none',
              border: canSearch ? 'none' : '1px solid rgba(255,255,255,0.06)',
              fontSize: '15px',
            }}
          >
            {canSearch && (
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%)',
                }}
              />
            )}
            <span className="relative flex items-center justify-center gap-2">
              <Search size={16} />
              Encontrar filme
            </span>
          </motion.button>
          {!canSearch && (
            <p className="text-center text-xs mt-2" style={{ color: '#3f3f46' }}>
              Descreva seu humor ou selecione um estado de ânimo para continuar
            </p>
          )}
        </motion.div>

        {/* Footer hint */}
        <motion.p
          {...fadeUp(0.55)}
          className="text-xs text-center"
          style={{ color: '#3f3f46' }}
        >
          Mais de 500 filmes catalogados · Atualizado semanalmente
        </motion.p>
      </div>
    </main>
  );
}
