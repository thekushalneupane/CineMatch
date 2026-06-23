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

  // --- UPDATED STATE FOR SHUFFLE ---
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [recIndex, setRecIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchRecommendation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: selectedMoods[0], 
          era: filters.era,
          length: filters.length,
          language: filters.language
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch recommendation");

      const data = await response.json();
      
      // Save all 5 recommendations and start at index 0
      setRecommendations(data.recommendations); 
      setRecIndex(0);
      setStep(3); 
    } catch (error) {
      console.error("API Error:", error);
      setStep(3); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    if (step === 2) fetchRecommendation(); 
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3);
  
  const handleReset = () => {
    setStep(1);
    setSelectedMoods([]);
    setIsSurprise(false);
    setSurpriseIndex(0);
    setRecommendations([]);
    setRecIndex(0);
  };

  const handleSurpriseMe = async () => {
    // Clear current data so the loading spinner shows up!
    setRecommendations([]); 
    setIsSurprise(true);
    setStep(3); 

    try {
      const response = await fetch('http://127.0.0.1:8000/random');
      if (!response.ok) throw new Error("Failed to fetch surprise movie");

      const data = await response.json();
      setRecommendations(data.recommendations); 
      setRecIndex(0);
      
    } catch (error) {
      console.error("API Error:", error);
      const randomIndex = Math.floor(Math.random() * MOVIES_COUNT);
      setSurpriseIndex(randomIndex);
    }
  };

  const handleShuffle = () => {
    // If it's a surprise OR we only have 1 match from the backend, fetch a new one
    if (isSurprise || recommendations.length <= 1) {
      handleSurpriseMe();
    } else {
      // Otherwise, cycle to the next movie in your top 5
      setRecIndex((prev) => (prev + 1) % recommendations.length);
    }
  };

  return (
    <BlushBackground>
      <Navbar onSurpriseMe={handleSurpriseMe} />
      <MainCard>
        <StepDots currentStep={step} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <MoodSelection
              key="step1"
              selectedMoods={selectedMoods}
              onToggleMood={handleToggleMood} 
            />
          )}
          {step === 2 && (
            <Filters
              key="step2"
              filters={filters}
              setFilter={handleSetFilter} 
            />
          )}
          {step === 3 && (
            <Result 
              key="step3" 
              onReset={handleReset} 
              isSurprise={isSurprise} 
              surpriseIndex={surpriseIndex}
              movieData={recommendations[recIndex]} // Pass current movie from array
              onShuffle={handleShuffle} // Pass shuffle function
            />
          )}
        </AnimatePresence>

        <FooterButtons
          step={step}
          onBack={handleBack}
          onNext={handleNext}
          nextDisabled={step === 1 && selectedMoods.length === 0}
          isLoading={isLoading} 
        />
        
      </MainCard>
    </BlushBackground>
  );
}