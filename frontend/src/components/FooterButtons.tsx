import React from 'react';

interface FooterButtonsProps {
  step: number;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  isLoading?: boolean; 
}

export function FooterButtons({
  step,
  onBack,
  onNext,
  nextDisabled,
  isLoading
}: FooterButtonsProps) {
  if (step === 3) return null;
  return (
    <div className="flex items-center justify-between mt-10 pt-6">
      <button
        onClick={onBack}
        disabled={step === 1 || isLoading}
        className={`px-8 py-3 rounded-full font-medium transition-all ${step === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
        Back
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled || isLoading}
        className={`px-8 py-3 rounded-full font-medium text-white transition-all ${(nextDisabled || isLoading) ? 'bg-crimson/50 cursor-not-allowed' : 'bg-crimson hover:bg-[#be123c] shadow-md shadow-crimson/20'}`}>
        {isLoading ? 'Loading...' : (step === 1 ? 'Next' : 'Show Recommendations')}
      </button>
    </div>
  );
}