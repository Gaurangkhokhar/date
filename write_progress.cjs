const fs = require('fs');
const path = 'C:/Users/jaatg/Desktop/romantic-date-invite/src/components/ProgressIndicator.jsx';
const content = `import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: 1, label: 'Proposal' },
  { num: 2, label: 'Date' },
  { num: 3, label: 'Time' },
  { num: 4, label: 'Place' },
  { num: 5, label: 'Food' },
];

const ProgressIndicator = ({ currentStep }) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4">
      <div className="glass px-4 py-3">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.num} className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={"w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 " + (
                  currentStep > step.num ? 'bg-romantic-pink text-white' :
                  currentStep === step.num ? 'bg-romantic-pink/30 text-romantic-pink border border-romantic-pink/50' :
                  'bg-white/5 text-white/30'
                )}
              >
                {currentStep > step.num ? '\\u2713' : step.num}
              </motion.div>
              {index < steps.length - 1 && (
                <div className={"w-8 md:w-12 h-0.5 mx-1 transition-all duration-300 " + (currentStep > step.num + 1 ? 'bg-romantic-pink' : 'bg-white/10')} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-white/40 mt-2 font-poppins">Step {currentStep} of {steps.length}</p>
      </div>
    </div>
  );
};

export default ProgressIndicator;
`;
fs.writeFileSync(path, content, 'utf8');
console.log('written successfully');

