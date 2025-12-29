import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GoatModeProps {
  onClose: () => void;
}

const GoatMode: React.FC<GoatModeProps> = ({ onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Fonte confiável (Wikimedia Commons) para evitar bloqueio de CORS/Hotlink
    const audioUrl = "https://upload.wikimedia.org/wikipedia/commons/7/77/Maniacal_laugh.ogg"; 
    
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = 0.7; 
    
    // Tenta tocar e loga erro se o navegador bloquear (ex: falta de interação)
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Audio playback blocked:", error);
      });
    }

    audioRef.current.onended = onClose;
    const timer = setTimeout(onClose, 5000); // 5 segundos de caos

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "brightness(0)" }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black overflow-hidden cursor-pointer"
      onClick={onClose}
    >
      {/* 1. Background Caótico com Efeito Glitch */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900 via-black to-black animate-pulse"></div>
      
      {/* Strobe Light Effect (Piscadas Rápidas) */}
      <motion.div 
        animate={{ opacity: [0, 1, 0, 0.5, 0, 1, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none"
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      {/* Container Principal */}
      <div className="relative flex flex-col items-center justify-center z-20">
        
        {/* Texto G.O.A.T - Estilo Capa de Álbum */}
        <div className="relative mb-6">
            <motion.h1 
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="text-7xl md:text-[10rem] font-black text-white font-mono drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] tracking-tighter leading-none"
            >
            THE G.O.A.T.
            </motion.h1>
            {/* Texto Glitch Duplicado */}
            <motion.h1 
                animate={{ x: [-5, 5, -5], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 0.05, repeat: Infinity }}
                className="absolute inset-0 text-7xl md:text-[10rem] font-black text-red-600 font-mono tracking-tighter leading-none mix-blend-difference pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 60%)" }}
            >
            THE G.O.A.T.
            </motion.h1>
        </div>

        {/* Imagem do Ozzy - Estilo Gritty/High Contrast */}
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          className="relative group"
        >
            {/* Moldura de Sangue/Fogo */}
            <div className="absolute -inset-4 bg-gradient-to-br from-red-600 to-transparent rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            
            <motion.img 
                animate={{ 
                    x: [-3, 3, -3, 3, 0],
                    y: [2, -2, 2, -2, 0],
                    filter: ["contrast(1.2) hue-rotate(0deg)", "contrast(2) hue-rotate(90deg)", "contrast(1.2) hue-rotate(0deg)"]
                }}
                transition={{ 
                    duration: 0.2, 
                    repeat: Infinity 
                }}
                src="https://imagens.ebc.com.br/bEiKmlxgU0tTMMig6y35kRpZ3fE=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2025/07/22/ozzy03.jpg?itok=m5vGGmns" 
                alt="Ozzy Osbourne Prince of Darkness" 
                className="relative w-full max-w-lg md:max-w-xl rounded border-4 border-white/20 shadow-[0_0_100px_rgba(255,0,0,0.5)] grayscale contrast-[1.5]"
            />

            {/* Olhos Vermelhos Brilhantes */}
            <div className="absolute top-[40%] left-[45%] w-4 h-4 bg-red-500 rounded-full blur-[2px] animate-pulse mix-blend-screen"></div>
            <div className="absolute top-[40%] left-[55%] w-4 h-4 bg-red-500 rounded-full blur-[2px] animate-pulse mix-blend-screen"></div>
        </motion.div>

        {/* Subtexto */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
            <p className="text-white font-mono text-2xl md:text-4xl font-black bg-red-600 px-8 py-3 uppercase tracking-[0.3em] shadow-[10px_10px_0px_rgba(255,255,255,0.2)] transform -rotate-2">
            🤘 PRINCE OF DARKNESS 🤘
            </p>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default GoatMode;