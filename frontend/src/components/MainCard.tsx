import React from 'react';
import { motion } from 'framer-motion';

export function MainCard({ children }: { children: React.ReactNode; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12 flex-1 flex flex-col">
      {children}
    </motion.div>
  );
}