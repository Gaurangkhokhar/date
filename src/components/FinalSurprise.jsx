import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiEffect from './ConfettiEffect';

const FinalSurprise = ({ selections }) => {
  const [stage, setStage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showILoveYou, setShowILoveYou] = useState(false);
  const { date, time, place, food } = selections;

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2500),
      setTimeout(() => setStage(3), 4000),
      setTimeout(() => setStage(4), 6000),
      setTimeout(() => setStage(5), 8000),
      setTimeout(() => {
        setShowConfetti(true);
        setShowILoveYou(true);
      }, 9000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'TBD';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {showConfetti && <ConfettiEffect />}
      <div className="absolute inset-0 bg-gradient-to-br from-[#09090F] via-[#1A1026] to-[#2D103F]" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-romantic-pink rounded-full blur-3xl"
      />
      {[...Array(15)].map((_, i) => (
        <motion.div key={i} className="absolute text-xl" style={{ left: `${Math.random() * 100}%` }}
          animate={{ y: ['100vh', '-10vh'], opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3, ease: 'easeOut' }}
        >
          {['❤️','💕','💖','💗','💘','💝','✨','⭐','🌹','🌸'][i % 10]}
        </motion.div>
      ))}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div key="s1" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="mb-8">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}
                className="text-7xl block mb-4">❤️</motion.span>
              <motion.h1 className="text-5xl md:text-7xl font-dancing font-bold gradient-text">YAY!! ❤️</motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {stage >= 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }} className="mb-8">
              <motion.h2 className="text-3xl md:text-4xl font-dancing font-bold text-romantic-soft-pink mb-4">Our Date is Official! 🎉</motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="text-white/50 text-sm font-poppins">Everything is set for our perfect day ✨</motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {stage >= 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }} className="glass-card mb-8">
              <h3 className="text-xl font-dancing font-bold text-romantic-gold mb-4">❤️ Our Date ❤️</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3"><span className="text-xl">📅</span><span className="text-white/80 font-poppins text-sm">{formatDate(date)}</span></div>
                <div className="flex items-center gap-3"><span className="text-xl">🕒</span><span className="text-white/80 font-poppins text-sm">{time?.name || 'TBD'}</span></div>
                <div className="flex items-center gap-3"><span className="text-xl">📍</span><span className="text-white/80 font-poppins text-sm">{place?.name || 'TBD'}</span></div>
                <div className="flex items-center gap-3"><span className="text-xl">🍽</span><span className="text-white/80 font-poppins text-sm">{food?.map(f => f.emoji).join(' ') || 'TBD'}</span></div>
            
              </div></motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {stage >= 4 && (
            <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="mb-8">
              <p className="text-lg md:text-xl font-dancing text-romantic-soft-pink italic">"I can't wait to spend this beautiful day with you ❤️"</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {stage >= 5 && (
            <motion.div key="s5" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              {showILoveYou && (
                <motion.div animate={{ scale: [1, 1.1, 1], textShadow: ['0 0 20px rgba(255,105,180,0.5)','0 0 40px rgba(255,105,180,0.8)','0 0 20px rgba(255,105,180,0.5)'] }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  <span className="text-4xl block mb-4">💖</span>
                  <h2 className="text-3xl md:text-5xl font-dancing font-bold gradient-text">I Love You ❤️</h2>
                </motion.div>
              )}
              <p className="text-white/40 text-sm mt-4 font-poppins">With love, forever yours 🌹</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FinalSurprise;
