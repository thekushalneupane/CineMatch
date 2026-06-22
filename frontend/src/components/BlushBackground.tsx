import React from 'react';
export function BlushBackground({ children }: {children: React.ReactNode;}) {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden font-sans text-slate-900 flex flex-col items-center p-4 sm:p-8">
      {/* Top Right Blush */}
      <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-crimson/5 blur-[120px] pointer-events-none" />
      {/* Bottom Left Blush */}
      <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-crimson/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center h-full min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </div>);

}