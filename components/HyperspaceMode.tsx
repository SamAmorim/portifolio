import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HyperspaceModeProps {
  onClose: () => void;
}

const HyperspaceMode: React.FC<HyperspaceModeProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Audio: Sci-Fi Ambience (Space Ship Hum)
    const audioUrl = "https://actions.google.com/sounds/v1/science_fiction/scifi_drone_low.ogg";
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = 0.6;
    audioRef.current.loop = true;
    
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => console.warn("Audio blocked:", error));
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Star properties
    const numStars = 800;
    const stars: any[] = [];
    let speed = 20; // Initial speed

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width
      });
    }

    let animationFrameId: number;

    const render = () => {
      // Clear with trail effect for "blur"
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; 
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Accelerate effect
      if (speed < 60) speed += 0.2;

      stars.forEach((star) => {
        // Move star closer
        star.z -= speed;

        // Reset star if it passes the screen
        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
        }

        // Project 3D to 2D
        const x = (star.x / star.z) * width + cx;
        const y = (star.y / star.z) * height + cy;

        // Calculate size based on proximity
        const size = (1 - star.z / width) * 4;

        // Draw Star / Streak
        ctx.beginPath();
        const prevZ = star.z + speed * 2; // Point further back for trail
        const prevX = (star.x / prevZ) * width + cx;
        const prevY = (star.y / prevZ) * height + cy;
        
        ctx.strokeStyle = `rgba(200, 220, 255, ${1 - star.z / width})`;
        ctx.lineWidth = size;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
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
      className="fixed inset-0 z-[99999] bg-black overflow-hidden font-mono"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Cockpit / HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)] opacity-80"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
         <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
         >
            <h1 className="text-4xl md:text-6xl font-black text-yellow-400 tracking-[0.2em] mb-4 uppercase drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" style={{ fontFamily: 'Impact, sans-serif' }}>
              HYPERDRIVE ENGAGED
            </h1>
            <p className="text-blue-300 text-sm md:text-lg tracking-widest animate-pulse">
              CALCULATING JUMP COORDINATES...
            </p>
         </motion.div>
      </div>

      {/* Button Panel */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-30 pointer-events-auto">
        <button
          onClick={onClose}
          className="group relative px-8 py-3 bg-zinc-900 border border-blue-500/50 text-blue-400 font-bold uppercase tracking-widest rounded hover:bg-blue-500/20 hover:border-blue-400 hover:text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
           Disengage
           <span className="absolute inset-0 border border-blue-400 scale-105 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all rounded"></span>
        </button>
      </div>
      
      {/* Tech Lines */}
      <div className="absolute top-10 left-10 w-32 h-1 bg-blue-500/30"></div>
      <div className="absolute top-12 left-10 w-20 h-1 bg-blue-500/20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-1 bg-blue-500/30"></div>
      <div className="absolute bottom-12 right-10 w-20 h-1 bg-blue-500/20"></div>

    </motion.div>
  );
};

export default HyperspaceMode;