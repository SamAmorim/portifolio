import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface JungleModeProps {
  onClose: () => void;
}

// SVG Component: Cipó (Vine)
const VineSVG = ({ delay, swingDuration, heightClass, color }: any) => (
  <motion.div
    initial={{ rotate: -5 }}
    animate={{ rotate: 5 }}
    transition={{ 
      duration: swingDuration, 
      repeat: Infinity, 
      repeatType: "mirror", 
      ease: "easeInOut" 
    }}
    className={`absolute top-0 origin-top ${heightClass} pointer-events-none z-40`}
    style={{ left: typeof delay === 'number' ? `${delay * 20}%` : '10%' }}
  >
    <motion.svg 
      viewBox="0 0 100 800" 
      preserveAspectRatio="none" 
      className="w-full h-full drop-shadow-xl"
      initial={{ height: 0 }}
      animate={{ height: "100%" }}
      transition={{ duration: 1.5, ease: "easeOut", delay: delay * 0.2 }}
    >
      {/* Caule do Cipó */}
      <path 
        d="M50,0 Q60,200 40,400 T50,800" 
        fill="none" 
        stroke={color} 
        strokeWidth="8" 
        strokeLinecap="round"
      />
      {/* Folhas Alternadas */}
      <circle cx="50" cy="100" r="10" fill={color} />
      <path d="M50,150 Q20,130 10,160 Q30,190 50,170" fill={color} />
      <path d="M50,300 Q80,280 90,310 Q70,340 50,320" fill={color} />
      <path d="M45,450 Q15,430 5,460 Q25,490 45,470" fill={color} />
      <path d="M50,600 Q80,580 90,610 Q70,640 50,620" fill={color} />
    </motion.svg>
  </motion.div>
);

// SVG Component: Arbusto (Bush)
const BushSVG = ({ color, className }: any) => (
  <motion.svg
    viewBox="0 0 500 200"
    className={`absolute bottom-0 w-[40vw] h-auto ${className} z-50 drop-shadow-2xl`}
    initial={{ y: 200, opacity: 0 }}
    animate={{ y: 20, opacity: 1 }}
    transition={{ duration: 1, type: "spring", bounce: 0.4 }}
  >
    <path 
      d="M0,200 L500,200 L500,150 Q450,50 350,100 Q300,20 200,80 Q150,40 100,100 Q50,60 0,150 Z" 
      fill={color} 
    />
    <circle cx="100" cy="120" r="40" fill={color} fillOpacity="0.8" />
    <circle cx="250" cy="100" r="60" fill={color} fillOpacity="0.7" />
    <circle cx="400" cy="130" r="50" fill={color} fillOpacity="0.9" />
  </motion.svg>
);

const JungleMode: React.FC<JungleModeProps> = ({ onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Fonte confiável (Google Sounds) - Jungle Atmosphere
    const audioUrl = "https://actions.google.com/sounds/v1/ambiences/jungle_atmosphere_late_night.ogg"; 
    
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
    
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Jungle audio playback blocked:", error);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden font-sans"
    >
      {/* Overlay Verde Atmosférico */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-transparent to-emerald-900/60 mix-blend-multiply pointer-events-none"></div>

      {/* Botão de Fechar - Z-Index Alto e Pointer Events Auto */}
      <div className="absolute top-8 right-8 pointer-events-auto z-[999999] cursor-pointer">
        <button 
            onClick={onClose}
            className="group relative bg-black/80 hover:bg-black text-white px-6 py-3 rounded-full backdrop-blur-xl border-2 border-emerald-500/70 hover:border-emerald-400 transition-all font-mono text-xs uppercase tracking-widest flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
        >
            <span className="font-bold">Exit Ecosystem</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse group-hover:bg-red-400"></span>
        </button>
      </div>

      {/* --- CIPÓS (VINES) --- */}
      {/* Ajustado delay/posição para evitar sobrepor o botão de fechar no canto superior direito */}
      <VineSVG delay={0.2} swingDuration={4} heightClass="h-[70vh] w-[100px]" color="#064e3b" />
      <VineSVG delay={1.5} swingDuration={5} heightClass="h-[50vh] w-[80px]" color="#065f46" />
      <VineSVG delay={3.2} swingDuration={6} heightClass="h-[85vh] w-[120px]" color="#047857" />
      <VineSVG delay={4.8} swingDuration={4.5} heightClass="h-[40vh] w-[60px]" color="#059669" />

      {/* --- ARBUSTOS (BUSHES) --- */}
      <BushSVG color="#064e3b" className="left-[-5%]" />
      <BushSVG color="#065f46" className="right-[-5%] scale-x-[-1]" />
      <BushSVG color="#047857" className="left-[30%] w-[30vw] h-[200px] bottom-[-20px] blur-[1px]" />

      {/* --- PARTÍCULAS (Folhas caindo) --- */}
      <div className="absolute inset-0 pointer-events-none">
         {[...Array(15)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ 
                  y: -50, 
                  x: Math.random() * window.innerWidth, 
                  rotate: 0, 
                  opacity: 0 
                }}
                animate={{ 
                    y: window.innerHeight + 100, 
                    x: `calc(${Math.random() * 100}vw + ${(Math.random() - 0.5) * 300}px)`, 
                    rotate: 360 + Math.random() * 360,
                    opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                    duration: 8 + Math.random() * 7, 
                    repeat: Infinity, 
                    delay: Math.random() * 5,
                    ease: "linear"
                }}
                className="absolute w-4 h-4 bg-emerald-500 rounded-tl-full rounded-br-full shadow-lg"
                style={{ opacity: 0.7 }}
            />
         ))}
      </div>

      {/* Scanlines Sutis (Tech-Jungle vibe) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[60] bg-[length:100%_4px,6px_100%] pointer-events-none"></div>

    </motion.div>
  );
};

export default JungleMode;