import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { funnyMessages } from '../utils/messages';

const DateProposal = ({ onYes }) => {
  const [noCount, setNoCount] = useState(0);
  const [noBtnStyle, setNoBtnStyle] = useState({});
  const [showMessage, setShowMessage] = useState('');
  const [yesBtnSize, setYesBtnSize] = useState(1);
  const [noBtnVisible, setNoBtnVisible] = useState(true);
  const [noHoverCount, setNoHoverCount] = useState(0);

  const getFunnyMessage = () => {
    return funnyMessages[Math.min(noCount, funnyMessages.length - 1)];
  };

  const handleNoClick = useCallback((e) => {
    e.preventDefault();
    const newCount = noCount + 1;
    setNoCount(newCount);
    setShowMessage(getFunnyMessage());

    // Make YES button bigger
    setYesBtnSize(prev => Math.min(prev + 0.15, 2.5));

    // Hide NO button after too many attempts
    if (newCount >= 15) {
      setNoBtnVisible(false);
      setShowMessage("Fine! Only YES then! 💖");
    }

    // Random position on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setNoBtnStyle({
        position: 'absolute',
        left: `${Math.random() * 70 + 5}%`,
        top: `${Math.random() * 70 + 10}%`,
        transform: `rotate(${Math.random() * 360}deg) scale(${Math.max(1 - newCount * 0.05, 0.3)})`,
        transition: 'all 0.3s ease',
      });
    }
  }, [noCount]);

  const handleNoHover = useCallback((e) => {
    if (window.innerWidth < 768) return;
    const newCount = noHoverCount + 1;
    setNoHoverCount(newCount);

    // Button runs away from cursor
    const btn = e.target;
    const rect = btn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    let deltaX = btnX - mouseX;
    let deltaY = btnY - mouseY;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (dist < 200) {
      const angle = Math.atan2(deltaY, deltaX);
      const moveX = Math.cos(angle) * 150;
      const moveY = Math.sin(angle) * 150;

      setNoBtnStyle({
        transform: `translate(${moveX}px, ${moveY}px) scale(${Math.max(1 - newCount * 0.02, 0.5)})`,
        transition: 'all 0.3s ease',
      });

      // Make YES button bigger
      setYesBtnSize(prev => Math.min(prev + 0.05, 2.5));
    }
  }, [noHoverCount]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#09090F] via-[#1A1026] to-[#2D103F]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,105,180,0.1)_0%,_transparent_70%)]" />
      
      {/* Floating hearts animation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{ y: '100vh', x: `${10 + i * 15}vw`, opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.5, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 2 }}
        >
          {['❤️', '💕', '💖', '💗', '💘', '💝'][i]}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg mx-auto"
      >
        {/* Question */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl block mb-4"
          >
            💖
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-dancing font-bold mb-4">
            Will you go on a date with me? ❤️
          </h2>
        </motion.div>

        {/* Funny message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              key={showMessage}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass px-6 py-3 rounded-full mb-8 inline-block"
            >
              <p className="text-romantic-soft-pink font-dancing text-lg">
                {showMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="relative flex items-center justify-center gap-6 min-h-[100px]">
          {/* YES Button */}
          <motion.button
            animate={{ scale: yesBtnSize }}
            whileHover={{ 
              scale: yesBtnSize * 1.05,
              boxShadow: '0 0 40px rgba(255,105,180,0.6)',
            }}
            whileTap={{ scale: yesBtnSize * 0.95 }}
            onClick={onYes}
            className="glow-button text-xl px-10 py-4 rounded-full z-10"
            style={{ 
              fontSize: `${Math.min(16 + (yesBtnSize - 1) * 10, 28)}px`,
            }}
          >
            YES 💖
          </motion.button>

          {/* NO Button */}
          <AnimatePresence>
            {noBtnVisible && (
              <motion.button
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                onMouseMove={handleNoHover}
                onClick={handleNoClick}
                style={noBtnStyle}
                className="relative px-6 py-3 rounded-full border-2 border-red-500/50 text-red-400 font-semibold text-lg cursor-pointer hover:bg-red-500/10 transition-all"
              >
                NO 😢
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default DateProposal;
