import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { placeOptions } from '../utils/messages';

const ChoosePlace = ({ onSelect, selectedPlace }) => {
  const [customPlace, setCustomPlace] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="relative z-10 w-full max-w-lg">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="glass-card text-center mb-8">
            <span className="text-4xl block mb-4">📍</span>
            <h2 className="text-2xl md:text-3xl font-dancing font-bold mb-2">Where should we meet?</h2>
            <p className="text-white/50 text-sm font-poppins">Choose the perfect spot</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {placeOptions.map((option) => (
              <motion.button key={option.name} whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(option)}
                className={"glass-card text-center cursor-pointer " + (selectedPlace?.name === option.name ? 'border-romantic-pink/50 bg-romantic-pink/10' : '')}>
                <span className="text-3xl block mb-2">{option.emoji}</span>
                <h3 className="text-base font-dancing font-semibold text-romantic-soft-pink">{option.name}</h3>
              </motion.button>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6">
            <div className="glass-card">
              <p className="text-white/50 text-sm mb-3 text-center font-poppins">Or type a custom place ✨</p>
              <div className="flex gap-2">
                <input type="text" value={customPlace} onChange={(e) => setCustomPlace(e.target.value)}
                  placeholder="e.g., Beach, Rooftop..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 font-poppins focus:outline-none focus:border-romantic-pink/50 transition-all"/>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => { if(customPlace.trim()) onSelect({ emoji: '📍', name: customPlace, custom: true }); }}
                  className="glow-button px-6">Set</motion.button>
              </div>
            </div>
          </motion.div>
          {selectedPlace && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center">
              <div className="glass-card mb-4">
                <p className="text-romantic-soft-pink font-dancing text-lg">Perfect choice! 💕</p>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(selectedPlace)} className="glow-button text-lg px-10 py-3">Confirm Place ✨</motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ChoosePlace;

