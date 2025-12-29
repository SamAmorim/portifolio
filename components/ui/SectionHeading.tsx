import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Props {
  title: string;
  subtitle: string;
  align?: 'left' | 'center';
  onTitleClick?: () => void;
}

const SectionHeading: React.FC<Props> = ({ title, subtitle, align = 'center', onTitleClick }) => {
  const controls = useAnimation();

  const handleClick = async () => {
    if (onTitleClick) {
      // Animação de "Toque"
      await controls.start({
        x: [0, -3, 3, -3, 3, 0],
        scale: [1, 1.02, 1],
        color: ["#18181b", "#16a34a", "#18181b"], // Pisca verde rápido (dark mode handled via css classes usually, keeping simple here)
        transition: { duration: 0.3 }
      });
      onTitleClick();
    }
  };

  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 justify-center mb-4"
      >
        <div className="h-[1px] w-8 bg-zinc-300 dark:bg-zinc-700"></div>
        <span className="text-primary-600 dark:text-primary-400 font-mono font-bold tracking-widest uppercase text-xs">
          {subtitle}
        </span>
        <div className="h-[1px] w-8 bg-zinc-300 dark:bg-zinc-700"></div>
      </motion.div>
      
      <motion.h2 
        animate={controls}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        onClick={handleClick}
        className={`text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight ${onTitleClick ? 'cursor-pointer select-none hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors' : ''}`}
      >
        {title}
        <span className="text-primary-500">.</span>
      </motion.h2>
    </div>
  );
};

export default SectionHeading;