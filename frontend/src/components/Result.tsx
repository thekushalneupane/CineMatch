import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Bookmark, User, RotateCcw, Share2, MoreVertical,
  Shuffle, SlidersHorizontal, ChevronRight
} from 'lucide-react';

type CastMember = { name: string; role: string; };

type Movie = {
  title: string; rating: string; year: string; runtime: string;
  certificate: string; poster: string; story: string; director: string;
  cinematography: string; cast: CastMember[]; genre: string; studio: string;
  language: string; status: string; moodMatch: string;
};

const MOVIES: Movie[] = [
  {
    title: 'Stellar Drift', rating: '8.4', year: '2024', runtime: '2h 15m', certificate: 'PG-13',
    poster: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80',
    story: 'In a future where humanity lives among the stars, a lone explorer discovers a signal from a forgotten era that challenges everything they know about their origin and destiny. A visual masterpiece exploring the silence of the cosmos.',
    director: 'Elena Vance', cinematography: 'M. Arisawa',
    cast: [
      { name: 'Cillian Ross', role: 'Jax' }, { name: 'Amara Sy', role: 'Nova' },
      { name: 'Benicio Wu', role: 'Dr. Aris' }, { name: 'Tilda Vance', role: 'The AI' }
    ],
    genre: 'Sci-Fi, Drama', studio: 'Astra Pictures', language: 'English', status: 'Trending #1',
    moodMatch: 'Matches your mood for a journey and the cinematic feel of recent favorites like Interstellar.'
  },
  {
    title: 'The Quiet Coast', rating: '7.9', year: '2022', runtime: '1h 48m', certificate: 'PG',
    poster: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&q=80',
    story: 'A weathered lighthouse keeper and a runaway artist forge an unlikely friendship over one luminous summer. A tender, slow-burning story about second chances and the courage to begin again.',
    director: 'Marco Ferreira', cinematography: 'Lena Okafor',
    cast: [
      { name: 'Iris Hale', role: 'Mara' }, { name: 'Theo Nguyen', role: 'Sol' },
      { name: 'Grace Lin', role: 'Edie' }, { name: 'Omar Daw', role: 'Pascal' }
    ],
    genre: 'Drama, Romance', studio: 'Lantern Films', language: 'English', status: 'Critically Acclaimed',
    moodMatch: 'A warm, character-driven pick for when you want something heartfelt and unhurried tonight.'
  },
  {
    title: 'Neon Verdict', rating: '8.1', year: '2023', runtime: '2h 02m', certificate: 'R',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80',
    story: 'A burnt-out detective races against a 24-hour deadline through a rain-soaked city to clear her partner of a crime he didn’t commit. A relentless, neon-lit thriller that never lets up.',
    director: 'Dahlia Cross', cinematography: 'R. Solberg',
    cast: [
      { name: 'June Park', role: 'Det. Reyes' }, { name: 'Kwame Boateng', role: 'Vell' },
      { name: 'Sasha Idris', role: 'The Broker' }, { name: 'Lev Mori', role: 'Captain Cole' }
    ],
    genre: 'Thriller, Crime', studio: 'Midnight Reel', language: 'English', status: 'Fan Favorite',
    moodMatch: 'Edge-of-your-seat tension and stylish visuals — perfect when you want your pulse racing.'
  }
];

export const MOVIES_COUNT = MOVIES.length;

interface ResultProps {
  onReset: () => void;
  isSurprise?: boolean;
  surpriseIndex?: number;
  movieData?: any; 
}

export function Result({ onReset, isSurprise = false, surpriseIndex = 0, movieData }: ResultProps) {
  const [index, setIndex] = useState(surpriseIndex);
  const [modalOpen, setModalOpen] = useState(false);
  
  const fallbackMovie = MOVIES[index];

  if (!movieData && !isSurprise) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-crimson border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Analyzing vectors to find your match...</p>
      </div>
    );
  }

  // Map data dynamically (Prioritize the real backend data!)
  const title = movieData?.title || fallbackMovie.title;
  const story = movieData?.overview || fallbackMovie.story;
  const director = movieData?.director || fallbackMovie.director;
  const year = movieData?.release_year || fallbackMovie.year;
  const runtime = movieData?.runtime ? `${movieData.runtime} min` : fallbackMovie.runtime;
  const language = movieData?.original_language ? String(movieData.original_language).toUpperCase() : fallbackMovie.language;
  const poster = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80'; // Keeps your aesthetic placeholder
  const rating = 'N/A';
  const certificate = 'NR';
  const status = movieData?.match_score === 100 ? "Pure Chaos (100% Random)" : (movieData ? `Score: ${Math.round(movieData.match_score * 100)}% Match` : fallbackMovie.status);
  const moodMatch = isSurprise ? "A completely random pull from the CineMatch vault!" : "Calculated via Cosine Similarity based on your selected mood profile.";
  
  const rawGenres = movieData ? movieData.genres : fallbackMovie.genre;
  const genre = Array.isArray(rawGenres) ? rawGenres.join(', ') : rawGenres;

  const handleAnotherMovie = () => {
    setIndex((i) => (i + 1) % MOVIES.length);
    setModalOpen(false);
  };

  const handleChangeMood = () => {
    setModalOpen(false);
    onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col flex-1">
      
      <div className="text-center mb-6">
        <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">
          {isSurprise ? 'Surprise Pick 🎲' : "Tonight's pick 🎬"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr_230px] gap-6 lg:gap-8 flex-1 min-h-0">
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={poster}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
              
              <img
                src={poster}
                alt={`${title} Poster`}
                className="w-full h-full object-cover" />
              
            </motion.div>
          </AnimatePresence>
          <button className="w-full bg-crimson hover:bg-[#be123c] text-white rounded-xl py-3.5 font-medium flex items-center justify-center gap-2 shadow-md shadow-crimson/20 transition-colors">
            <Play className="w-5 h-5 fill-current" />
            Watch Trailer
          </button>
          <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl py-3.5 font-medium flex items-center justify-center gap-2 transition-colors">
            <Bookmark className="w-5 h-5" />
            Add to Watchlist
          </button>
        </div>

        <div className="flex flex-col min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}>
              
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3 tracking-tight">
                    {title}
                  </h1>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600 flex-wrap">
                    <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                      ⭐ {rating}
                    </span>
                    <span>•</span>
                    <span>{year}</span>
                    <span>•</span>
                    <span>{runtime}</span>
                    <span>•</span>
                    <span className="border border-slate-200 px-2 py-0.5 rounded text-xs">
                      {certificate}
                    </span>
                  </div>
                </div>
                <div className="items-center gap-2 text-slate-400 hidden sm:flex">
                  <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-bold text-crimson tracking-widest mb-2">
                  THE STORY
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {story}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                  <h3 className="text-xs font-bold text-crimson tracking-widest mb-1">
                    DIRECTOR
                  </h3>
                  <p className="font-medium text-slate-900">{director}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-crimson tracking-widest mb-1">
                    CINEMATOGRAPHY
                  </h3>
                  <p className="font-medium text-slate-900">
                    {isSurprise ? fallbackMovie.cinematography : "Various"}
                  </p>
                </div>
              </div>

              {isSurprise && fallbackMovie.cast && (
                <div className="mt-7">
                  <h3 className="text-xs font-bold text-slate-400 tracking-widest mb-4">
                    STARRING
                  </h3>
                  <div className="flex flex-wrap gap-5">
                    {fallbackMovie.cast.map((actor, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-2 border border-slate-200">
                          <User className="w-6 h-6 text-slate-400" />
                        </div>
                        <span className="text-sm font-bold text-slate-900">{actor.name}</span>
                        <span className="text-xs text-slate-500">{actor.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 tracking-widest mb-4">
              DETAILS
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-200/60 pb-3">
                <span className="text-slate-500">Genre</span>
                <span className="font-semibold text-slate-900 text-right max-w-[120px] truncate">
                  {genre}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-3">
                <span className="text-slate-500">Studio</span>
                <span className="font-semibold text-slate-900">
                  {isSurprise ? fallbackMovie.studio : "Various"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-3">
                <span className="text-slate-500">Language</span>
                <span className="font-semibold text-slate-900">
                  {language}
                </span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500">Status</span>
                <span className="font-bold text-crimson">{status}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 tracking-widest mb-3">
              MOOD MATCH
            </h3>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <AnimatePresence mode="wait">
                <motion.p
                  key={moodMatch}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-slate-600 italic leading-relaxed">
                  "{moodMatch}"
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-5">
              <button
                onClick={() => setModalOpen(true)}
                aria-haspopup="dialog"
                className="flex items-center gap-2 text-sm font-semibold text-crimson hover:text-[#be123c] transition-colors">
                <RotateCcw className="w-4 h-4" />
                Not feeling it?
              </button>
            </div>

            <AnimatePresence>
              {modalOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="fixed inset-0 z-50 flex items-center justify-center"
                  aria-modal="true"
                  role="dialog"
                  aria-label="Not feeling it? options">

                  <div
                    className="absolute inset-0 bg-white/60"
                    onClick={() => setModalOpen(false)} />

                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-sm mx-4 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="px-6 pt-6 pb-5">
                      <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
                        Options
                      </p>
                      <h2 className="font-serif text-xl font-bold text-slate-900 leading-snug">
                        What would you like to do?
                      </h2>
                    </div>

                    <button
                      onClick={handleAnotherMovie}
                      className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-crimson/10 text-crimson flex items-center justify-center shrink-0">
                        <Shuffle className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900">Pick a new movie</p>
                        <p className="text-xs text-slate-500 mt-0.5">Shuffle to a different pick</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                    </button>

                    <div className="h-px bg-slate-100 mx-6" />

                    <button
                      onClick={handleChangeMood}
                      className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-crimson/10 text-crimson flex items-center justify-center shrink-0">
                        <SlidersHorizontal className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900">Change mood &amp; type</p>
                        <p className="text-xs text-slate-500 mt-0.5">Redo moods and filters</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                    </button>

                    <div className="px-6 pb-6 pt-2">
                      <button
                        onClick={() => setModalOpen(false)}
                        className="w-full py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                        Cancel
                      </button>
                    </div>

                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}