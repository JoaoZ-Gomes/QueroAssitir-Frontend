import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Menu, X, Sparkles } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/historico', label: 'Histórico' },
    { to: '/premium', label: 'Premium', badge: true },
  ];

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <header
      style={{
        backgroundColor: 'rgba(15, 15, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ color: '#a78bfa' }}
          >
            <Film size={22} />
          </motion.div>
          <span
            className="text-lg tracking-tight select-none"
            style={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #a78bfa 0%, #e879f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            QueroAssistir
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-200"
              style={{
                color: isActive(link.to) ? '#fff' : '#a1a1aa',
                backgroundColor: isActive(link.to) ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              }}
            >
              {link.badge && <Sparkles size={12} style={{ color: '#e879f9' }} />}
              <span style={{ fontWeight: isActive(link.to) ? 500 : 400 }}>{link.label}</span>
              {link.badge && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  PRO
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: '#a1a1aa' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: 'rgba(15, 15, 15, 0.98)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              overflow: 'hidden',
            }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all"
                  style={{
                    color: isActive(link.to) ? '#fff' : '#a1a1aa',
                    backgroundColor: isActive(link.to)
                      ? 'rgba(139, 92, 246, 0.15)'
                      : 'transparent',
                    fontWeight: isActive(link.to) ? 500 : 400,
                  }}
                >
                  {link.badge && <Sparkles size={14} style={{ color: '#e879f9' }} />}
                  {link.label}
                  {link.badge && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 600,
                      }}
                    >
                      PRO
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
