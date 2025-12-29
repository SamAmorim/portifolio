import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FIRE_WIDTH = 60; // Largura em "pixels de fogo" (baixa resolução para o efeito retrô)
const FIRE_HEIGHT = 40; // Altura
const FIRE_COLORS_PALETTE = [
  {r:7,g:7,b:7},{r:31,g:7,b:7},{r:47,g:15,b:7},{r:71,g:15,b:7},{r:87,g:23,b:7},{r:103,g:31,b:7},{r:119,g:31,b:7},{r:143,g:39,b:7},{r:159,g:47,b:7},{r:175,g:63,b:7},{r:191,g:71,b:7},{r:199,g:71,b:7},{r:223,g:79,b:7},{r:223,g:87,b:7},{r:223,g:87,b:7},{r:215,g:95,b:7},{r:215,g:95,b:7},{r:215,g:103,b:15},{r:207,g:111,b:15},{r:207,g:119,b:15},{r:207,g:127,b:15},{r:207,g:135,b:23},{r:199,g:135,b:23},{r:199,g:143,b:23},{r:199,g:151,b:31},{r:191,g:159,b:31},{r:191,g:159,b:31},{r:191,g:167,b:39},{r:191,g:167,b:39},{r:191,g:175,b:47},{r:183,g:183,b:47},{r:183,g:183,b:55},{r:207,g:207,b:111},{r:223,g:223,b:159},{r:239,g:239,b:199},{r:255,g:255,b:255}
];

interface DoomFireProps {
  onClose: () => void;
}

const DoomFire: React.FC<DoomFireProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firePixelsRef = useRef<number[]>([]);
  
  // Refs para controle suave do vento
  const targetWindRef = useRef<number>(0);  // Onde o vento QUER chegar (posição do mouse)
  const currentWindRef = useRef<number>(0); // Onde o vento ESTÁ agora (atualizado frame a frame)

  useEffect(() => {
    // Listener de Mouse para controlar o vento
    const handleMouseMove = (e: MouseEvent) => {
      // Normaliza a posição X do mouse entre -1 (esquerda) e 1 (direita)
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      
      // AJUSTE: Reduzida a intensidade máxima para 1.5 para ficar mais natural
      targetWindRef.current = normalizedX * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Inicializar Array de Fogo
    const numberOfPixels = FIRE_WIDTH * FIRE_HEIGHT;
    firePixelsRef.current = new Array(numberOfPixels).fill(0);

    // Configurar base do fogo (última linha com intensidade máxima)
    for (let i = 0; i < FIRE_WIDTH; i++) {
      const overflowPixelIndex = FIRE_WIDTH * FIRE_HEIGHT;
      const pixelIndex = (overflowPixelIndex - FIRE_WIDTH) + i;
      firePixelsRef.current[pixelIndex] = 36; // 36 é a cor branca/mais quente na paleta
    }

    let animationFrameId: number;

    const calculateFirePropagation = () => {
      // AJUSTE: Suavização (Lerp). 
      // Aproxima o vento atual do vento alvo em 5% a cada frame.
      currentWindRef.current += (targetWindRef.current - currentWindRef.current) * 0.05;

      for (let column = 0; column < FIRE_WIDTH; column++) {
        for (let row = 0; row < FIRE_HEIGHT; row++) {
          const pixelIndex = column + (FIRE_WIDTH * row);
          updateFireIntensityPerPixel(pixelIndex);
        }
      }
    };

    const updateFireIntensityPerPixel = (currentPixelIndex: number) => {
      const belowPixelIndex = currentPixelIndex + FIRE_WIDTH;
      
      // Se estiver na última linha, não faz nada
      if (belowPixelIndex >= FIRE_WIDTH * FIRE_HEIGHT) {
        return;
      }

      const decay = Math.floor(Math.random() * 3);
      const belowPixelFireIntensity = firePixelsRef.current[belowPixelIndex];
      const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

      // Usa o valor suavizado do vento
      const windBias = Math.round(currentWindRef.current);
      
      // Target = Posição atual - Decaimento aleatório + Vento Suave
      const targetIndex = currentPixelIndex - decay + windBias;

      // Boundary check simples para evitar escrita fora do array
      if (targetIndex >= 0 && targetIndex < firePixelsRef.current.length) {
         firePixelsRef.current[targetIndex] = newFireIntensity;
      }
    };

    const renderFire = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const imageData = ctx.createImageData(FIRE_WIDTH, FIRE_HEIGHT);
      
      for (let i = 0; i < firePixelsRef.current.length; i++) {
        const fireIntensity = firePixelsRef.current[i];
        const color = FIRE_COLORS_PALETTE[Math.min(fireIntensity, 35)] || {r:0, g:0, b:0}; // Fallback para preto
        
        // R G B A no ImageData (4 posições por pixel)
        const pixelIndex = i * 4;
        imageData.data[pixelIndex] = color.r;
        imageData.data[pixelIndex + 1] = color.g;
        imageData.data[pixelIndex + 2] = color.b;
        
        // Alpha: se for preto (intensidade 0), deixa transparente para ver o fundo
        imageData.data[pixelIndex + 3] = fireIntensity === 0 ? 240 : 255; 
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      calculateFirePropagation();
      animationFrameId = requestAnimationFrame(renderFire);
    };

    renderFire();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
    // REMOVIDO [onClose] DA DEPENDÊNCIA PARA EVITAR RESTART
  }, []); 

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Clique para fechar
      className="fixed inset-0 z-[9999] cursor-pointer flex flex-col items-center justify-end bg-black/90"
    >
      <div className="absolute top-1/3 text-center font-mono animate-pulse z-20 pointer-events-none">
          <p className="text-white font-black text-4xl uppercase tracking-[0.2em] glow-text drop-shadow-[0_0_15px_rgba(255,100,0,0.8)]">
            GOD MODE ACTIVATED
          </p>
          <p className="text-orange-400 text-sm mt-4 tracking-widest bg-black/50 p-2 rounded inline-block">
            MOVE MOUSE TO CONTROL FIRE
          </p>
      </div>

      {/* Canvas esticado via CSS para dar o efeito pixelado */}
      <canvas 
        ref={canvasRef}
        width={FIRE_WIDTH}
        height={FIRE_HEIGHT}
        className="w-full h-full object-fill absolute inset-0 z-10 opacity-80 pointer-events-none"
        style={{ 
            imageRendering: 'pixelated', // Chave para o efeito retrô
        }}
      />
    </motion.div>
  );
};

export default DoomFire;