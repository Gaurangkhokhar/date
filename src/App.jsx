import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import Landing from './components/Landing';
import LoadingScreen from './components/LoadingScreen';
import ProgressIndicator from './components/ProgressIndicator';
import FloatingHearts from './components/FloatingHearts';
import BackgroundParticles from './components/BackgroundParticles';
import MusicPlayer from './components/MusicPlayer';
import DateProposal from './components/DateProposal';
import SelectDate from './components/SelectDate';
import SelectTime from './components/SelectTime';
import ChoosePlace from './components/ChoosePlace';
import FoodSelection from './components/FoodSelection';
import FinalSurprise from './components/FinalSurprise';

const pageVariants = {
  initial: { opacity: 0, x: 300, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, x: -300, scale: 0.95, transition: { duration: 0.4, ease: 'easeIn' } },
};

function App() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [showLoveLetter, setShowLoveLetter] = useState(false);

  const [selections, setSelections] = useLocalStorage('dateSelections', {
    date: null,
    time: null,
    place: null,
    food: [],
  });

  const handleLoadingComplete = () => {
    setLoading(false);
    setStep(0);
  };

  const handleEnterApp = () => {
    setStep(1);
  };

  const handleStep1Complete = () => {
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setSelections(prev => ({ ...prev, date }));
    setStep(3);
  };

  const handleTimeSelect = (time) => {
    setSelections(prev => ({ ...prev, time }));
    setStep(4);
  };

  const handlePlaceSelect = (place) => {
    setSelections(prev => ({ ...prev, place }));
    setStep(5);
  };

  const handleFoodSelect = (food) => {
    setSelections(prev => ({ ...prev, food }));
    if (food && food.length > 0) {
      setStep(6);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Landing onEnter={handleEnterApp} herName="beautiful prakriti" />
          </motion.div>
        );
      case 1:
        return (
          <motion.div key="proposal" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <DateProposal onYes={handleStep1Complete} />
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="date" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SelectDate onSelect={handleDateSelect} selectedDate={selections.date} />
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="time" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SelectTime onSelect={handleTimeSelect} selectedTime={selections.time} />
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="place" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ChoosePlace onSelect={handlePlaceSelect} selectedPlace={selections.place} />
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="food" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <FoodSelection onSelect={handleFoodSelect} selectedFood={selections.food} />
          </motion.div>
        );
      case 6:
        return (
          <motion.div key="final" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <FinalSurprise selections={selections} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-romantic relative overflow-hidden font-poppins">
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {!loading && (
        <>
          <BackgroundParticles />
          <FloatingHearts count={10} />
          <MusicPlayer />

          {/* Hidden love letter trigger */}
          {step >= 1 && (
            <button
              onClick={() => setShowLoveLetter(true)}
              className="fixed top-4 left-4 z-30 w-10 h-10 rounded-full glass flex items-center justify-center text-lg hover:scale-110 transition-all"
              title="Open Love Letter"
            >
              💌
            </button>
          )}

          {/* Easter egg heart click */}
          {step >= 1 && (
            <div className="fixed top-4 right-4 z-30 opacity-30 hover:opacity-100 transition-opacity">
              <span className="text-sm text-white/30 font-poppins">❤️</span>
            </div>
          )}

          {/* Progress indicator */}
          {step >= 1 && step <= 5 && <ProgressIndicator currentStep={step} />}

          {/* Step content */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
