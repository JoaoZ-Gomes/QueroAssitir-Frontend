import { motion } from 'motion/react';
import { Sparkles, Check, Zap, Brain, Infinity, Star } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'IA Avançada de Humor',
    desc: 'Análise profunda do seu humor com mais de 50 variáveis emocionais para recomendações ultra-precisas.',
  },
  {
    icon: Infinity,
    title: 'Histórico Ilimitado',
    desc: 'Acesse todo o seu histórico de buscas e favoritos sem limite de armazenamento.',
  },
  {
    icon: Zap,
    title: 'Recomendações Instantâneas',
    desc: 'Sem espera. Resultados em tempo real com base no seu perfil emocional personalizado.',
  },
  {
    icon: Star,
    title: 'Catálogo Premium',
    desc: 'Acesso a mais de 5.000 filmes, incluindo títulos exclusivos e raridades do cinema mundial.',
  },
];

const plans = [
  {
    name: 'Mensal',
    price: 'R$ 12',
    period: '/mês',
    desc: 'Perfeito para experimentar',
    highlight: false,
  },
  {
    name: 'Anual',
    price: 'R$ 89',
    period: '/ano',
    desc: 'Economize 38%',
    highlight: true,
    badge: 'Mais popular',
  },
];

export function Premium() {
  return (
    <main
      className="min-h-screen pb-20 overflow-hidden"
      style={{ backgroundColor: '#0f0f0f' }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-14 flex flex-col items-center gap-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center flex flex-col items-center gap-4 max-w-xl"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(192, 38, 211, 0.2))',
              border: '1px solid rgba(167, 139, 250, 0.3)',
            }}
          >
            <Sparkles size={14} style={{ color: '#a78bfa' }} />
            <span style={{ color: '#c4b5fd', fontSize: 13, fontWeight: 500 }}>
              QueroAssistir Premium
            </span>
          </div>

          <h1
            style={{
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            }}
          >
            Cinema feito para{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #e879f9 60%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              o seu eu
            </span>
          </h1>
          <p style={{ color: '#71717a', fontSize: 15, lineHeight: 1.7, maxWidth: 380 }}>
            Desbloqueie uma experiência de recomendação ainda mais personalizada e precisa.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="relative flex-1 max-w-xs rounded-3xl p-6 flex flex-col gap-4"
              style={{
                backgroundColor: plan.highlight ? 'rgba(124, 58, 237, 0.1)' : '#141414',
                border: plan.highlight
                  ? '1px solid rgba(139, 92, 246, 0.4)'
                  : '1px solid rgba(255,255,255,0.07)',
                boxShadow: plan.highlight ? '0 0 60px rgba(124, 58, 237, 0.15)' : 'none',
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
                    color: '#fff',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div>
                <p style={{ color: '#71717a', fontSize: 13, marginBottom: 4 }}>{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span
                    style={{
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: 36,
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </span>
                  <span style={{ color: '#52525b', fontSize: 14, paddingBottom: 4 }}>
                    {plan.period}
                  </span>
                </div>
                <p style={{ color: '#a78bfa', fontSize: 12, marginTop: 4, fontWeight: 500 }}>
                  {plan.desc}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl"
                style={{
                  background: plan.highlight
                    ? 'linear-gradient(135deg, #7c3aed, #c026d3)'
                    : 'rgba(255,255,255,0.06)',
                  color: plan.highlight ? '#fff' : '#a1a1aa',
                  fontWeight: 600,
                  fontSize: 14,
                  border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: plan.highlight ? '0 4px 20px rgba(124, 58, 237, 0.35)' : 'none',
                }}
              >
                Assinar agora
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Features grid */}
        <div className="w-full">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
            style={{ color: '#ffffff', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}
          >
            O que você desbloqueia
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                className="flex gap-4 p-5 rounded-2xl"
                style={{
                  backgroundColor: '#141414',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)' }}
                >
                  <f.icon size={18} style={{ color: '#a78bfa' }} />
                </div>
                <div>
                  <p style={{ color: '#ffffff', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                    {f.title}
                  </p>
                  <p style={{ color: '#52525b', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2"
          style={{ color: '#3f3f46', fontSize: 12 }}
        >
          <Check size={13} style={{ color: '#22c55e' }} />
          <span>Cancele quando quiser · Sem compromisso · Garantia de 7 dias</span>
        </motion.div>
      </div>
    </main>
  );
}
