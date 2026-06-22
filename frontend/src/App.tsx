import React, { useState } from 'react';
import { BlushBackground } from './components/BlushBackground';
import { Navbar } from './components/Navbar';
import { MainCard } from './components/MainCard';
import { StepDots } from './components/StepDots';
import { FooterButtons } from './components/FooterButtons';
import { MoodSelection } from './components/MoodSelection';
import { Filters, FiltersState } from './components/Filters';
import { Result, MOVIES_COUNT } from './components/Result';
import { AnimatePresence } from 'framer-motion';
import { useScreenInit } from './useScreenInit';
export function App() {
  const screenInit = useScreenInit();
  const [step, setStep] = useState<1 | 2 | 3>(
    screenInit?.step as 1 | 2 | 3 ?? 1
  );
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [filters, setFilters] = useState<FiltersState>({
    era: '2000s',
    length: 'medium',
    language: 'hollywood'
  });
  const [isSurprise, setIsSurprise] = useState(false);
  const [surpriseIndex, setSurpriseIndex] = useState(0);
  const handleToggleMood = (id: string) => {
    setSelectedMoods((prev) => {
      if (prev.includes(id)) return prev.filter((m) => m !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };
  const handleSetFilter = (key: keyof FiltersState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const handleNext = () => setStep((s) => Math.min(3, s + 1) as 1 | 2 | 3);
  const handleBack = () => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3);
  const handleReset = () => {
    setStep(1);
    setSelectedMoods([]);
    setIsSurprise(false);
    setSurpriseIndex(0);
  };
  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * MOVIES_COUNT);
    setSurpriseIndex(randomIndex);
    setIsSurprise(true);
    setStep(3);
  };
  return (
    <BlushBackground>
      <Navbar onSurpriseMe={handleSurpriseMe} />
      <MainCard>
        <StepDots currentStep={step} />

        <AnimatePresence mode="wait">
          {step === 1 &&
          <MoodSelection
            key="step1"
            selectedMoods={selectedMoods}
            onToggleMood={handleToggleMood} />

          }
          {step === 2 &&
          <Filters
            key="step2"
            filters={filters}
            setFilter={handleSetFilter} />

          }
          {step === 3 && <Result key="step3" onReset={handleReset} isSurprise={isSurprise} surpriseIndex={surpriseIndex} />}
        </AnimatePresence>

        <FooterButtons
          step={step}
          onBack={handleBack}
          onNext={handleNext}
          nextDisabled={step === 1 && selectedMoods.length === 0} />
        
      </MainCard>
    </BlushBackground>);

}