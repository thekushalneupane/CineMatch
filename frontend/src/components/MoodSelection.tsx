import React from 'react';
import { motion } from 'framer-motion';
import {
  HeartCrack, Smile, Swords, Popcorn, Sparkles, Ghost, Heart, Map
} from 'lucide-react';

const MOODS = [
  { id: 'Want to cry', name: 'Want to cry', desc: 'Tearjerkers & emotional dramas', icon: HeartCrack, color: 'bg-pink-100 text-pink-600' },
  { id: 'Need to laugh', name: 'Need to laugh', desc: 'Comedies that lift the mood', icon: Smile, color: 'bg-amber-100 text-amber-600' },
  { id: 'Edge of my seat', name: 'Edge of my seat', desc: 'Thrillers & nail-biters', icon: Swords, color: 'bg-blue-100 text-blue-600' },
  { id: 'Turn my brain off', name: 'Turn my brain off', desc: 'Easy, fun popcorn flicks', icon: Popcorn, color: 'bg-green-100 text-green-600' },
  { id: 'Feel inspired', name: 'Feel inspired', desc: 'Uplifting true stories', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
  { id: 'Get scared', name: 'Get scared', desc: 'Horror & spine-chillers', icon: Ghost, color: 'bg-red-100 text-red-600' },
  { id: 'Fall in love', name: 'Fall in love', desc: 'Romance & cozy nights', icon: Heart, color: 'bg-rose-100 text-rose-600' },
  { id: 'Go on a journey', name: 'Go on a journey', desc: 'Epic adventures & worlds', icon: Map, color: 'bg-cyan-100 text-cyan-600' }
];

export function MoodSelection({
  selectedMoods,
  onToggleMood
}: { selectedMoods: string[]; onToggleMood: (id: string) => void; }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col flex-1">
      
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
          Pick your movie mood
        </h1>
        <p className="text-slate-500">
          Choose 1 or 2 moods to find the perfect match for tonight.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 content-start">
        {MOODS.map((mood) => {
          const isSelected = selectedMoods.includes(mood.id);
          const isDisabled = !isSelected && selectedMoods.length >= 2;
          const Icon = mood.icon;
          return (
            <button
              key={mood.id}
              onClick={() => onToggleMood(mood.id)}
              disabled={isDisabled}
              className={`relative text-left p-6 rounded-2xl border transition-all duration-200 ${isSelected ? 'border-crimson bg-crimson/5 shadow-[0_0_0_1px_rgba(225,29,72,1)]' : isDisabled ? 'border-slate-200 bg-white opacity-40 cursor-not-allowed' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'}`}>
              
              {isSelected && (
                <div className="absolute top-4 right-4 w-5 h-5 bg-crimson rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${mood.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{mood.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {mood.desc}
              </p>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}