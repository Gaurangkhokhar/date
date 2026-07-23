import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SelectDate = ({ onSelect, selectedDate: initialDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate ? new Date(initialDate) : null);
  const [showConfirm, setShowConfirm] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const handleDateClick = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (date >= today) {
      setSelectedDate(date);
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    if (selectedDate) onSelect(selectedDate.toISOString());
  };

  const isToday = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === today.toDateString();
  };

  const isPast = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date < today;
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-md">
        <div className="glass-card text-center mb-8">
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl block mb-4">📅</motion.span>
          <h2 className="text-2xl md:text-3xl font-dancing font-bold mb-2">Choose our special day ❤️</h2>
          <p className="text-white/50 text-sm font-poppins">Pick any date that works for you</p>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between mb-6">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={handlePrevMonth}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">←</motion.button>
            <h3 className="text-lg font-dancing font-semibold text-romantic-soft-pink">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={handleNextMonth}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">→</motion.button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} className="text-center text-white/40 text-xs font-poppins py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const past = isPast(day);
              const selected = isSelected(day);
              const todayDate = isToday(day);
              return (
                <motion.button key={day} whileHover={!past ? { scale: 1.1 } : {}} whileTap={!past ? { scale: 0.9 } : {}}
                  onClick={() => !past && handleDateClick(day)}
                  className={`relative w-full aspect-square rounded-lg flex items-center justify-center text-sm font-poppins transition-all duration-200
                    ${past ? 'text-white/10 cursor-not-allowed' : 'text-white/70 hover:bg-white/10 cursor-pointer'}
                    ${selected ? 'bg-romantic-pink/20 border-2 border-romantic-pink text-romantic-pink font-bold' : 'border-2 border-transparent'}
                    ${todayDate && !selected ? 'border-2 border-romantic-pink/30 text-romantic-pink' : ''}`}>
                  {day}
                  {todayDate && !selected && <span className="absolute -top-1 -right-1 w-2 h-2 bg-romantic-pink rounded-full" />}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {showConfirm && selectedDate && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="mt-6 text-center">
                <div className="glass-card mb-4">
                  <p className="text-romantic-soft-pink font-dancing text-lg mb-2">Perfect choice ❤️</p>
                  <p className="text-white/60 text-sm font-poppins">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm} className="glow-button text-lg px-10 py-3">Confirm Date 💖</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectDate;
