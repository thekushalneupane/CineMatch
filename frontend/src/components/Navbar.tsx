import React from 'react';
import { Clapperboard, Dices } from 'lucide-react';
export function Navbar({ onSurpriseMe }: { onSurpriseMe: () => void }) {
  return (
    <nav className="w-full max-w-5xl bg-white/80 backdrop-blur-md shadow-sm border border-slate-100 rounded-full px-6 py-3 flex items-center justify-between mb-8 shrink-0">
      <div className="flex items-center gap-2">
        <Clapperboard className="w-5 h-5 text-crimson" />
        <span className="font-bold text-lg tracking-tight">CineMatch</span>
      </div>
      <button onClick={onSurpriseMe} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
        Surprise Me
        <Dices className="w-4 h-4" />
      </button>
    </nav>);

}