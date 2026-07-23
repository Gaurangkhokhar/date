import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            setTimeout(() => onComplete?.(), 500);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  const quotes = [
    "Loading love... 💕",
    "Preparing butterflies... 🦋",
    "Adding sparkles... ✨",
    "Almost there... ❤️",
    "You're worth the wait... 🌹",
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-romantic"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mb-8"
          >
            ❤️
          </motion.div>

          <motion.p
            key={Math.floor(progress / 20)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-romantic-soft-pink font-dancing text-xl mb-6"
          >
            {quotes[Math.min(Math.floor(progress / 20), quotes.length - 1)]}
          </motion.p>

          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-romantic-pink to-romantic-purple rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <p className="text-white/40 text-sm mt-4 font-poppins">
            {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
