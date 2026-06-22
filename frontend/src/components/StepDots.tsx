import React from 'react';
import { motion } from 'framer-motion';
export function StepDots({ currentStep }: {currentStep: number;}) {
  return (
    <div className="flex items-center justify-center gap-2.5 mb-8">
      {[1, 2, 3].map((step) => {
        const isActive = step === currentStep;
        const isComplete = step < currentStep;
        return (
          <motion.div
            key={step}
            layout
            initial={false}
            animate={{
              width: isActive ? 28 : 8,
              backgroundColor: isActive || isComplete ? '#E11D48' : '#E2E8F0',
              opacity: isComplete ? 0.5 : 1
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30
            }}
            className="h-2 rounded-full relative overflow-hidden">
            
            {isActive &&
            <motion.span
              className="absolute inset-0 rounded-full bg-white/40"
              initial={{
                x: '-100%'
              }}
              animate={{
                x: '100%'
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut'
              }} />

            }
          </motion.div>);

      })}
    </div>);

}