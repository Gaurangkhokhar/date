import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Landing = ({ onEnter, herName }) => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 500);
    const timer2 = setTimeout(() => setShowButton(true), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Image with blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#09090F] via-[#1A1026] to-[#2D103F]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,105,180,0.15)_0%,_transparent_70%)]" />
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 text-3xl opacity-30"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-32 right-16 text-4xl opacity-25"
      >
        🌟
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 right-10 text-2xl opacity-20"
      >
        💫
      </motion.div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 text-center max-w-2xl mx-auto"
          >
            {/* Decorative top hearts */}
            <motion.div variants={itemVariants} className="flex justify-center gap-3 mb-6">
              {['💖', '💗', '💕'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="text-3xl"
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-dancing font-bold mb-6"
            >
<span className="gradient-text">Hi {herName} ❤️</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="space-y-3 mb-8">
              <p className="text-lg md:text-xl text-romantic-soft-pink/80 font-light">
                This little website has only one purpose...
              </p>
              <p className="text-xl md:text-2xl text-white/70 font-dancing">
                To ask you something I've been waiting to ask.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <p className="text-base md:text-lg text-romantic-lavender/60 italic">
                "Every great love story starts with a simple question..."
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            className="relative z-10 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,105,180,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="glow-button text-lg md:text-xl px-10 py-4 flex items-center gap-3 mx-auto"
            >
              <span>Open My Surprise</span>
              <motion.span
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/30 text-sm mt-6 font-poppins"
            >
              ✨ Click when you're ready ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A1026] to-transparent" />
    </div>
  );
};

export default Landing;
