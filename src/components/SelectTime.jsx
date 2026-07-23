import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timeOptions = [
  { id: 'morning', name: '🌅 Morning', time: '8:00 AM - 12:00 PM' },
  { id: 'afternoon', name: '☀ Afternoon', time: '12:00 PM - 4:00 PM' },
  { id: 'evening', name: '🌇 Evening', time: '4:00 PM - 7:00 PM' },
  { id: 'night', name: '🌙 Night', time: '7:00 PM - 11:00 PM' },
];

const SelectTime = ({ onSelect, selectedTime: initialTime }) => {
  const [selected, setSelected] = useState(initialTime || null);
  const [customTime, setCustomTime] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  const handleCustomConfirm = () => {
    if (customTime) {
      onSelect({ id: 'custom', name: `🕐 ${customTime}`, time: customTime });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-lg">
        <div className="glass-card text-center mb-8">
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl block mb-4">🕒</motion.span>
          <h2 className="text-2xl md:text-3xl font-dancing font-bold mb-2">What time should we meet? ⏰</h2>
          <p className="text-white/50 text-sm font-poppins">Pick a time or set your own</p>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 mb-6">
          {timeOptions.map((option) => (
            <motion.button key={option.id} variants={item} whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(option)}
              className={`glass-card text-center cursor-pointer transition-all ${
                selected?.id === option.id
                  ? 'border-romantic-pink/50 bg-romantic-pink/15 ring-2 ring-romantic-pink/30'
                  : ''
              }`}>
              <div className="text-center">
                <span className="text-2xl block mb-2">{option.name}</span>
                <span className="text-white/40 text-xs font-poppins">{option.time}</span>
              </div>
              {selected?.id === option.id && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="mt-2 w-6 h-6 rounded-full bg-romantic-pink/30 mx-auto flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        <button onClick={() => setShowCustom(!showCustom)}
          className="w-full glass-card text-center cursor-pointer hover:bg-white/5 transition-all mb-4">
          <span className="text-sm text-white/50 font-poppins">{showCustom ? '− Hide Custom Time' : '+ Custom Time'}</span>
        </button>

        <AnimatePresence>
          {showCustom && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="glass-card mb-4 overflow-hidden">
              <div className="p-4">
                <label className="text-white/60 text-sm font-poppins block mb-2">Enter time:</label>
                <input type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white font-poppins focus:border-romantic-pink/50 focus:outline-none" />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCustomConfirm}
                  disabled={!customTime}
                  className="mt-3 glow-button text-sm px-6 py-2 w-full disabled:opacity-30 disabled:cursor-not-allowed">
                  Set Time
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selected && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="glass-card mb-4">
              <p className="text-romantic-soft-pink font-dancing text-lg">Great choice! 💕</p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleConfirm} className="glow-button text-lg px-10 py-3">Confirm Time ✨</motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SelectTime;
