import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface D20RollerProps {
  onClose: () => void;
}

// --- 3D MATH CONSTANTS FOR ICOSAHEDRON ---
const PHI = (1 + Math.sqrt(5)) / 2; // Golden Ratio

// Vertices of an Icosahedron centered at (0,0,0)
const BASE_VERTICES = [
  [-1,  PHI, 0], [ 1,  PHI, 0], [-1, -PHI, 0], [ 1, -PHI, 0],
  [ 0, -1,  PHI], [ 0,  1,  PHI], [ 0, -1, -PHI], [ 0,  1, -PHI],
  [ PHI, 0, -1], [ PHI, 0,  1], [-PHI, 0, -1], [-PHI, 0,  1]
];

// Triangles connecting the vertices (Indices)
const FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
];

const D20Roller: React.FC<D20RollerProps> = ({ onClose }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(true);
  const [isCritical, setIsCritical] = useState(false);
  
  // Refs for 3D Rendering
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });
  const speedRef = useRef({ x: 0.1, y: 0.1, z: 0.1 });
  
  // Refs for Particle System
  const particlesRef = useRef<Particle[]>([]);

  // --- LOGIC: ROLLING NUMBERS & STATE ---
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    let timeoutId: ReturnType<typeof setTimeout>;

    // Random Number Shuffle Animation
    intervalId = setInterval(() => {
      setCurrentNumber(Math.floor(Math.random() * 20) + 1);
    }, 50);

    // Stop Rolling
    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      const finalNumber = Math.floor(Math.random() * 20) + 1;
      setCurrentNumber(finalNumber);
      setIsRolling(false);
      
      if (finalNumber === 20) {
        setIsCritical(true);
      } else {
        // Slow down rotation for "Idle" state
        speedRef.current = { x: 0.005, y: 0.005, z: 0.002 };
      }
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  // --- LOGIC: 3D RENDER LOOP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Helper: Rotate point in 3D
    const rotate = (point: number[], rot: {x: number, y: number, z: number}) => {
      let [x, y, z] = point;

      // Rotate X
      let ry = y * Math.cos(rot.x) - z * Math.sin(rot.x);
      let rz = y * Math.sin(rot.x) + z * Math.cos(rot.x);
      y = ry; z = rz;

      // Rotate Y
      let rx = x * Math.cos(rot.y) + z * Math.sin(rot.y);
      rz = -x * Math.sin(rot.y) + z * Math.cos(rot.y);
      x = rx; z = rz;

      // Rotate Z
      rx = x * Math.cos(rot.z) - y * Math.sin(rot.z);
      ry = x * Math.sin(rot.z) + y * Math.cos(rot.z);
      x = rx; y = ry;

      return [x, y, z];
    };

    const render = () => {
      // 1. Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.15; // Scale of the die

      // 2. Update Rotation
      if (isRolling) {
         rotationRef.current.x += 0.05;
         rotationRef.current.y += 0.03;
         rotationRef.current.z += 0.02;
      } else {
         rotationRef.current.x += speedRef.current.x;
         rotationRef.current.y += speedRef.current.y;
         rotationRef.current.z += speedRef.current.z;
      }

      // 3. Project Vertices
      const projectedVertices = BASE_VERTICES.map(v => {
        const rotated = rotate(v, rotationRef.current);
        // Perspective Projection (simple)
        const distance = 4;
        const zScale = distance / (distance - rotated[2] * 0.2); // slight perspective
        return {
          x: rotated[0] * scale * zScale + cx,
          y: rotated[1] * scale * zScale + cy,
          z: rotated[2] // Keep Z for sorting if needed (though wireframe usually implies transparency)
        };
      });

      // 4. Draw Faces (Wireframe Style)
      ctx.lineJoin = 'round';
      
      // Theme Colors
      const primaryColor = isCritical ? '239, 68, 68' : '46, 109, 180'; // Red or Blue
      const glowColor = isCritical ? '#f59e0b' : '#2e6db4';

      FACES.forEach(face => {
        const v1 = projectedVertices[face[0]];
        const v2 = projectedVertices[face[1]];
        const v3 = projectedVertices[face[2]];

        // Draw path
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineTo(v3.x, v3.y);
        ctx.closePath();

        // Fill (Semi-transparent Hologram)
        ctx.fillStyle = `rgba(${primaryColor}, 0.05)`;
        ctx.fill();

        // Stroke (Glowing Lines)
        ctx.strokeStyle = `rgba(${primaryColor}, ${isCritical ? 0.8 : 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // 5. Draw Particles (Fireworks) if Critical
      if (isCritical) {
          particlesRef.current.forEach((p, index) => {
            p.update();
            p.draw(ctx);
            if (p.alpha <= 0) particlesRef.current.splice(index, 1);
          });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Firework Logic Trigger
    if (isCritical) {
        const createExplosion = () => {
             const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];
             const color = colors[Math.floor(Math.random() * colors.length)];
             const x = canvas.width / 2 + (Math.random() - 0.5) * 200;
             const y = canvas.height / 2 + (Math.random() - 0.5) * 200;
             
             for (let i = 0; i < 40; i++) {
                particlesRef.current.push(new Particle(x, y, color));
             }
        };
        // Burst initially
        createExplosion();
        // Burst periodically
        const interval = setInterval(createExplosion, 400);
        return () => clearInterval(interval);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRolling, isCritical]); // Re-run whenever state changes significantly

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-pointer"
      onClick={onClose}
    >
      {/* 3D Canvas Layer */}
      <canvas 
          ref={canvasRef} 
          className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Floating UI Layer (Centered Number) */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        
        {/* Holographic Number */}
        <motion.div
            key={isRolling ? 'rolling' : 'result'}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`font-mono font-black text-7xl md:text-8xl drop-shadow-[0_0_25px_rgba(0,0,0,0.8)] ${isCritical ? 'text-amber-400 animate-pulse' : 'text-white'}`}
            style={{ 
                textShadow: isCritical 
                    ? '0 0 10px #ef4444, 0 0 20px #ef4444' 
                    : '0 0 10px #2e6db4, 0 0 20px #2e6db4' 
            }}
        >
            {currentNumber}
        </motion.div>

        {/* Status Text */}
        <AnimatePresence>
            {!isRolling && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-32 md:mt-40 text-center" // Pushed down to clear the 3D die
                >
                    {isCritical ? (
                        <div>
                             <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse tracking-tighter uppercase">
                                Critical Hit!
                            </h2>
                            <p className="text-white/80 font-mono mt-2 text-sm">Natural 20 - System Overclocked</p>
                        </div>
                    ) : (
                        <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
                            <p className="text-primary-300 font-mono text-lg font-bold">
                                {currentNumber === 1 ? "CRITICAL FAILURE" : "SKILL CHECK PASSED"}
                            </p>
                        </div>
                    )}
                    <p className="text-zinc-500 text-[10px] mt-4 uppercase tracking-widest animate-bounce">
                        [ Click anywhere to close ]
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- PARTICLE CLASS FOR FIREWORKS ---
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  
  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // Gravity
    this.vx *= 0.99; // Air resistance
    this.alpha -= 0.02;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export default D20Roller;