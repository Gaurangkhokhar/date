import React from 'react';
import { motion } from 'framer-motion';
import { foodOptions } from '../utils/messages';

const FoodSelection = ({ onSelect, selectedFood: initialFood }) => {
  const selectedFoods = initialFood || [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  const handleToggle = (option) => {
    const isSelected = selectedFoods.find(f => f.name === option.name);
    let newSelection;
    if (isSelected) {
      newSelection = selectedFoods.filter(f => f.name !== option.name);
    } else {
      newSelection = [...selectedFoods, option];
    }
    onSelect(newSelection);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="glass-card text-center mb-8">
          <span className="text-4xl block mb-4">🍕</span>
          <h2 className="text-2xl md:text-3xl font-dancing font-bold mb-2">
            What shall we eat?
          </h2>
          <p className="text-white/50 text-sm font-poppins">
            Pick your favorites (multiple choices allowed)
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3"
        >
          {foodOptions.map((option) => {
            const isSelected = selectedFoods.find(f => f.name === option.name);
            return (
              <motion.button
                key={option.name}
                variants={item}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleToggle(option)}
                className={`glass-card text-center cursor-pointer relative overflow-hidden transition-all ${
                  isSelected
                    ? 'border-romantic-pink/50 bg-romantic-pink/15 ring-2 ring-romantic-pink/30'
                    : ''
                }`}
              >
                <div className="relative z-10">
                  <span className="text-3xl block mb-2">{option.emoji}</span>
                  <h3 className="text-sm md:text-base font-dancing font-semibold text-romantic-soft-pink">
                    {option.name}
                  </h3>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-romantic-pink rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {selectedFoods.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className="glass-card mb-4">
              <p className="text-white/60 text-sm font-poppins mb-2">
                Selected: {selectedFoods.map(f => f.emoji).join(' ')}
              </p>
              <p className="text-romantic-soft-pink font-dancing text-lg">
                Yummy choices!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(selectedFoods)}
              className="glow-button text-lg px-10 py-3"
            >
              Looks Delicious!
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FoodSelection;
