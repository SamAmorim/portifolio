import React from 'react';

interface OrbitDecorationProps {
  className?: string;
  size?: string;
  opacity?: string;
}

const OrbitDecoration: React.FC<OrbitDecorationProps> = ({ 
  className = "", 
  size = "w-[500px] h-[500px]",
  opacity = "opacity-100" // Default opacity full
}) => {
  return (
    <div className={`absolute pointer-events-none select-none flex items-center justify-center ${size} ${className} ${opacity}`}>
        {/* Glow Central */}
        <div className="absolute inset-0 bg-primary-500/10 blur-[80px] rounded-full animate-pulse-slow"></div>

        {/* Outer Ring - Solid/Thin */}
        <div className="absolute inset-0 border border-zinc-400/50 dark:border-zinc-600/50 rounded-full animate-[spin_60s_linear_infinite]"></div>
        
        {/* Middle Ring - Dashed - Reverse */}
        <div className="absolute inset-[15%] border border-dashed border-zinc-500/40 dark:border-zinc-500/40 rounded-full animate-[spin_80s_linear_infinite_reverse]"></div>
        
        {/* Inner Ring - Dotted - Accent Color */}
        <div className="absolute inset-[30%] border-2 border-dotted border-primary-500/40 rounded-full animate-[spin_120s_linear_infinite]"></div>

        {/* Data Points Pattern */}
        <div 
        className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15]" 
        style={{ 
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', 
            backgroundSize: '20px 20px',
            maskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
        }}
        ></div>
    </div>
  );
};

export default OrbitDecoration;