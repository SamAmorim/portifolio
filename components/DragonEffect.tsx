import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

interface DragonEffectProps {
  onComplete: () => void;
}

const DragonEffect: React.FC<DragonEffectProps> = ({ onComplete }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Fonte confiável (Google Sounds) - Monster/Alien Growl
    const audioUrl = "https://actions.google.com/sounds/v1/horror/monster_alien_growl_panted.ogg"; 
    
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = 0.6;
    
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Dragon audio playback blocked:", error);
      });
    }

    // A animação dura 5s, mas damos uma margem
    const timer = setTimeout(onComplete, 5500);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div 
      onClick={onComplete} 
      className="fixed inset-0 z-[99999] overflow-hidden cursor-pointer"
      title="Clique para parar o terremoto!"
    >
      {/* 
        O Dragão voando.
        Movimento de curva Bezier simulada via Keyframes
      */}
      <motion.img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHFpcnd6MzJ5bXh3bWpheGhjdjJmc21vY3Z3bmJna3B3M3dlOGh0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/14wCd5tKL4zV7y/giphy.gif"
        alt="Flying Dragon"
        initial={{ x: "120vw", y: "-10vh", scale: 0.5, rotate: 10 }}
        animate={{ 
          x: ["120vw", "50vw", "-50vw", "-120vw"], 
          y: ["-10vh", "15vh", "0vh", "-20vh"], // Voo Alto: Começa fora, desce até o header, sobe e sai
          scale: [0.5, 1.2, 1, 0.8], // Fica gigante no meio (perto da tela)
          rotate: [10, 0, -5, -5]
        }}
        transition={{ 
          duration: 5, 
          ease: "easeInOut",
          times: [0, 0.4, 0.8, 1] 
        }}
        style={{ willChange: "transform" }} // Otimização de renderização
        className="absolute w-[600px] md:w-[1000px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] filter brightness-75 contrast-125 pointer-events-none"
      />

      {/* Sombra no chão (Move com o dragão) */}
      <motion.div
         initial={{ x: "120vw", opacity: 0 }}
         animate={{ 
            x: ["120vw", "50vw", "-120vw"], 
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.2, 0.5]
         }}
         transition={{ 
            duration: 5, 
            ease: "easeInOut",
         }}
         className="absolute top-[10vh] w-[400px] h-[80px] bg-black/40 blur-[60px] rounded-[100%] pointer-events-none"
      />
      
      {/* Texto de instrução sutil */}
      <div className="absolute bottom-10 w-full text-center text-red-500/80 font-mono text-sm animate-pulse pointer-events-none font-bold tracking-widest">
        ⚠ ALERTA DE DRAGÃO DETECTADO ⚠
      </div>
    </div>
  );
};

// O segundo argumento "() => true" força o React a NUNCA renderizar novamente este componente
// enquanto ele estiver montado, ignorando atualizações de props (como funções inline do pai).
// Isso elimina completamente o "flickering" causado pelo movimento do mouse no App.tsx.
export default memo(DragonEffect, () => true);