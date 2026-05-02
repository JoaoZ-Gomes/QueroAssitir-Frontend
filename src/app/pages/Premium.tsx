import { motion } from 'motion/react';
import { Heart, Copy, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Premium() {
  const qrRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!qrRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => {
      qrRef.current.innerHTML = '';
      new window.QRCode(qrRef.current, {
        text: '(75) 99184-1847',
        width: 172,
        height: 172,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: window.QRCode.CorrectLevel.H,
      });
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  function copyKey() {
    navigator.clipboard.writeText('(75) 99184-1847').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <main
      className="min-h-screen pb-20 overflow-hidden"
      style={{ backgroundColor: '#0f0f0f' }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-14 flex flex-col items-center gap-10">
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
              background: 'rgba(249, 115, 22, 0.12)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
            }}
          >
            <Heart size={14} style={{ color: '#f97316' }} />
            <span style={{ color: '#fdba74', fontSize: 13, fontWeight: 500 }}>
              Quero Assistir · Apoie o criador
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
            Esse app é feito{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #fb923c 60%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              com amor
            </span>
          </h1>
          <p style={{ color: '#71717a', fontSize: 15, lineHeight: 1.7, maxWidth: 380 }}>
            Se você curte e quer ajudar a manter o projeto vivo, qualquer valor via Pix já faz
            diferença!
          </p>
        </motion.div>

        {/* Card Pix */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col items-center gap-5 rounded-3xl p-8 w-full"
          style={{
            maxWidth: 380,
            backgroundColor: '#141414',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            boxShadow: '0 0 60px rgba(249, 115, 22, 0.08)',
          }}
        >
          {/* Inter logo text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#f97316', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>
              ✦ inter
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <p style={{ color: '#ffffff', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>
              Pix
            </p>
            <p style={{ color: '#52525b', fontSize: 12 }}>Informe o valor quando for pagar</p>
          </div>

          {/* QR Code */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: 14,
              width: 200,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div ref={qrRef} />
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.06)' }} />

          {/* Info */}
          <div className="w-full flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span style={{ color: '#52525b', fontSize: 13 }}>Nome</span>
              <span style={{ color: '#ffffff', fontWeight: 600, fontSize: 13 }}>
                JOAO ALVES GOMES
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: '#52525b', fontSize: 13 }}>Chave Pix</span>
              <span style={{ color: '#ffffff', fontWeight: 600, fontSize: 13 }}>
                (75) 99184-1847
              </span>
            </div>
          </div>

          {/* Copy button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={copyKey}
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #ea580c, #f97316)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)',
            }}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? 'Chave copiada!' : 'Copiar chave Pix'}
          </motion.button>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2"
          style={{ color: '#3f3f46', fontSize: 12 }}
        >
          <Check size={13} style={{ color: '#22c55e' }} />
          <span>100% seguro · Qualquer valor é bem-vindo · Obrigado!</span>
        </motion.div>
      </div>
    </main>
  );
}
