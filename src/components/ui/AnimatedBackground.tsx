"use client";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Tech grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.08]" style={{
        backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}></div>

      {/* Circuit-like connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuit-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="circuit-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path d="M0,150 Q300,100 600,150 T1200,150 L1920,150" stroke="url(#circuit-1)" strokeWidth="3" fill="none" className="animate-float" />
        <path d="M1920,400 Q1600,450 1300,400 T700,400 L0,400" stroke="url(#circuit-2)" strokeWidth="3" fill="none" className="animate-float-delayed" />
        <circle cx="600" cy="150" r="6" fill="#EC4899" className="animate-pulse-slow dark:opacity-80" />
        <circle cx="1300" cy="400" r="6" fill="#F59E0B" className="animate-pulse-slow dark:opacity-80" />
        <circle cx="300" cy="100" r="5" fill="#8B5CF6" className="animate-pulse-slow dark:opacity-80" />
        <circle cx="1600" cy="450" r="5" fill="#10B981" className="animate-pulse-slow dark:opacity-80" />
      </svg>

      {/* Large gradient orbs with enhanced dark mode - reduced opacity for better text readability */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-gradient-to-br from-purple-400/15 dark:from-purple-500/35 via-purple-300/10 dark:via-purple-400/25 to-transparent rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-20 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-400/15 dark:from-cyan-500/35 via-blue-400/10 dark:via-blue-500/25 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] bg-gradient-to-tr from-pink-400/12 dark:from-pink-500/30 via-fuchsia-300/8 dark:via-fuchsia-400/20 to-transparent rounded-full blur-3xl animate-float-slow"></div>

      {/* Vibrant accent orbs - reduced opacity */}
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-orange-300/10 dark:from-orange-400/25 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-emerald-300/10 dark:from-emerald-400/25 to-transparent rounded-full blur-2xl animate-float-delayed"></div>
      <div className="absolute top-1/5 left-1/2 w-64 h-64 bg-gradient-to-br from-violet-300/8 dark:from-violet-400/22 to-transparent rounded-full blur-2xl animate-float"></div>

      {/* Purple morphing hexagon - reduced opacity for text readability */}
      <div className="absolute top-1/4 right-1/4 w-56 h-56 bg-gradient-to-br from-purple-500/12 dark:from-purple-500/30 via-purple-400/8 dark:via-purple-400/22 to-transparent border-2 border-purple-400/30 dark:border-purple-400/50 rounded-[3rem] rotate-12 animate-morph backdrop-blur-sm shadow-xl shadow-purple-500/25 dark:shadow-purple-400/45"></div>

      {/* Cyan/Blue floating shape */}
      <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-gradient-to-br from-cyan-500/10 dark:from-cyan-400/28 via-blue-500/12 dark:via-blue-400/32 to-sky-400/6 dark:to-sky-400/18 border-2 border-cyan-400/30 dark:border-cyan-400/50 rounded-[3.5rem] -rotate-6 animate-morph-delayed backdrop-blur-sm shadow-xl shadow-cyan-500/25 dark:shadow-cyan-400/48"></div>

      {/* Pink/Magenta octagon */}
      <div className="absolute bottom-1/3 right-1/3 w-52 h-52 bg-gradient-to-br from-pink-500/12 dark:from-pink-400/32 via-fuchsia-500/10 dark:via-fuchsia-400/24 to-rose-400/6 dark:to-rose-400/18 border-2 border-pink-500/30 dark:border-pink-400/50 rounded-[2.5rem] rotate-45 animate-morph backdrop-blur-sm shadow-xl shadow-pink-500/28 dark:shadow-pink-400/48" style={{
        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
      }}></div>

      {/* Orange/Amber circle */}
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-orange-500/15 dark:from-orange-400/35 via-amber-500/12 dark:via-amber-400/28 to-yellow-400/8 dark:to-yellow-400/20 border-2 border-orange-500/30 dark:border-orange-400/50 rounded-full animate-pulse-slow backdrop-blur-sm shadow-xl shadow-orange-500/25 dark:shadow-orange-400/45"></div>

      {/* Emerald star */}
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-emerald-500/10 dark:from-emerald-400/30 via-green-500/8 dark:via-green-400/24 to-teal-400/6 dark:to-teal-400/18 border-2 border-emerald-500/28 dark:border-emerald-400/50 animate-spin-slow backdrop-blur-sm shadow-xl shadow-emerald-500/22 dark:shadow-emerald-400/42" style={{
        clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        borderRadius: "15%"
      }}></div>

      {/* Violet triangle */}
      <div className="absolute top-2/3 right-1/5 w-44 h-44 bg-gradient-to-br from-violet-500/14 dark:from-violet-400/34 via-indigo-500/10 dark:via-indigo-400/26 to-purple-400/6 dark:to-purple-400/18 border-2 border-violet-500/30 dark:border-violet-400/50 rounded-[2rem] rotate-[30deg] animate-morph backdrop-blur-sm shadow-xl shadow-violet-500/25 dark:shadow-violet-400/45" style={{
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)"
      }}></div>

      {/* Teal diamond */}
      <div className="absolute top-1/6 left-1/3 w-40 h-40 bg-gradient-to-br from-teal-500/14 dark:from-teal-400/34 via-cyan-400/10 dark:via-cyan-400/26 to-blue-400/6 dark:to-blue-400/18 border-2 border-teal-500/30 dark:border-teal-400/50 rounded-[1.8rem] rotate-45 animate-morph-delayed backdrop-blur-sm shadow-xl shadow-teal-500/25 dark:shadow-teal-400/45" style={{
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
      }}></div>

      {/* Rose pentagon */}
      <div className="absolute bottom-1/5 right-2/5 w-36 h-36 bg-gradient-to-br from-rose-500/12 dark:from-rose-400/32 via-pink-400/8 dark:via-pink-400/22 to-fuchsia-400/6 dark:to-fuchsia-400/16 border-2 border-rose-500/30 dark:border-rose-400/50 rounded-[1.5rem] rotate-[72deg] animate-morph backdrop-blur-sm shadow-xl shadow-rose-500/24 dark:shadow-rose-400/44" style={{
        clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
      }}></div>

      {/* Animated lines with rainbow gradients */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400/30 dark:via-purple-400/60 to-transparent animate-shimmer"></div>
      <div className="absolute top-2/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/25 dark:via-cyan-400/55 to-transparent animate-shimmer-delayed"></div>
      <div className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-400/25 dark:via-pink-400/55 to-transparent animate-shimmer"></div>

      {/* Rainbow floating particles */}
      <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-purple-500/70 dark:bg-purple-400/90 rounded-full animate-float-particle-1 shadow-lg shadow-purple-500/60 dark:shadow-purple-400/80"></div>
      <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-cyan-500/70 dark:bg-cyan-400/90 rounded-full animate-float-particle-2 shadow-lg shadow-cyan-500/60 dark:shadow-cyan-400/80"></div>
      <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-pink-500/75 dark:bg-pink-400/95 rounded-full animate-float-particle-3 shadow-lg shadow-pink-500/65 dark:shadow-pink-400/85"></div>
      <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-orange-500/70 dark:bg-orange-400/90 rounded-full animate-float-particle-1 shadow-lg shadow-orange-500/60 dark:shadow-orange-400/80"></div>
      <div className="absolute top-1/5 right-2/5 w-3 h-3 bg-emerald-500/70 dark:bg-emerald-400/90 rounded-full animate-float-particle-2 shadow-lg shadow-emerald-500/60 dark:shadow-emerald-400/80"></div>
      <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-violet-500/75 dark:bg-violet-400/95 rounded-full animate-float-particle-3 shadow-lg shadow-violet-500/65 dark:shadow-violet-400/85"></div>
      <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-amber-500/70 dark:bg-amber-400/90 rounded-full animate-float-particle-1 shadow-lg shadow-amber-500/60 dark:shadow-amber-400/80"></div>
    </div>
  );
}
