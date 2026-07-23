import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-xl hover:shadow-lg hover:shadow-romantic-pink/20 transition-all cursor-pointer"
      title={isPlaying ? 'Mute Music' : 'Play Music'}
    >
      {isPlaying ? (
        <motion.span animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🎵</motion.span>
      ) : (
        <span>🔇</span>
      )}
    </motion.button>
  );
};

export default MusicPlayer;
