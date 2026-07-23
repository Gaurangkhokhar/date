import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingHearts = ({ count = 8 }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const createHeart = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      opacity: Math.random() * 0.5 + 0.3,
    });

    const initialHearts = Array.from({ length: count }, createHeart);
    setHearts(initialHearts);

    const interval = setInterval(() => {
      setHearts(prev => [...prev.slice(1), createHeart()]);
    }, 3000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              y: '100vh',
              x: `${heart.x}vw`,
              scale: 0,
              opacity: 0,
              rotate: 0,
            }}
            animate={{ 
              y: '-10vh',
              opacity: heart.opacity,
              scale: 1,
              rotate: 360,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute"
            style={{ fontSize: `${heart.size}px` }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
