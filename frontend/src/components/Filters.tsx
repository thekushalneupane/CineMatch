import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Globe } from 'lucide-react';
export type FiltersState = {
  era: string;
  length: string;
  language: string;
};
const FILTER_OPTIONS = {
  era: [
  {
    id: 'classic',
    label: 'Classic (pre-1990)'
  },
  {
    id: '2000s',
    label: '2000s Hits'
  },
  {
    id: 'recent',
    label: 'Recent (2015+)'
  }],

  length: [
  {
    id: 'short',
    label: 'Short (<90 min)'
  },
  {
    id: 'medium',
    label: 'Medium (90–120 min)'
  },
  {
    id: 'epic',
    label: 'Epic (2hr+)'
  }],

  language: [
  {
    id: 'hollywood',
    label: 'Hollywood'
  },
  {
    id: 'foreign',
    label: 'Foreign Cinema'
  },
  {
    id: 'any',
    label: 'Any Language'
  }]

};
export function Filters({
  filters,
  setFilter



}: {filters: FiltersState;setFilter: (key: keyof FiltersState, value: string) => void;}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{
        opacity: 0,
        x: 20
      }}
      className="flex flex-col flex-1">
      
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
          Refine your pick
        </h1>
        <p className="text-slate-500">
          Quick settings to find your perfect match.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 content-start">
        {/* Era */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-crimson" />
            <h2 className="font-semibold text-slate-900">Era</h2>
          </div>
          <div className="space-y-2">
            {FILTER_OPTIONS.era.map((opt) =>
            <button
              key={opt.id}
              onClick={() => setFilter('era', opt.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${filters.era === opt.id ? 'bg-crimson text-white shadow-md shadow-crimson/20' : 'text-slate-600 hover:bg-slate-50'}`}>
              
                {opt.label}
              </button>
            )}
          </div>
        </div>

        {/* Length */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-crimson" />
            <h2 className="font-semibold text-slate-900">Length</h2>
          </div>
          <div className="space-y-2">
            {FILTER_OPTIONS.length.map((opt) =>
            <button
              key={opt.id}
              onClick={() => setFilter('length', opt.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${filters.length === opt.id ? 'bg-crimson text-white shadow-md shadow-crimson/20' : 'text-slate-600 hover:bg-slate-50'}`}>
              
                {opt.label}
              </button>
            )}
          </div>
        </div>

        {/* Language */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-crimson" />
            <h2 className="font-semibold text-slate-900">Language</h2>
          </div>
          <div className="space-y-2">
            {FILTER_OPTIONS.language.map((opt) =>
            <button
              key={opt.id}
              onClick={() => setFilter('language', opt.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${filters.language === opt.id ? 'bg-crimson text-white shadow-md shadow-crimson/20' : 'text-slate-600 hover:bg-slate-50'}`}>
              
                {opt.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>);

}