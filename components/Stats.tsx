
import React from 'react';
import { motion } from 'framer-motion';
import { statsData } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Stats: React.FC = () => {
  const { language } = useLanguage();
  const data = statsData[language];

  // Cores estilo GNOME/Adwaita Palette para cada card
  const colors = [
    { bg: "bg-blue-100 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", iconBg: "bg-blue-500 text-white" },
    { bg: "bg-emerald-100 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", iconBg: "bg-emerald-500 text-white" },
    { bg: "bg-amber-100 dark:bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", iconBg: "bg-amber-500 text-white" },
  ];

  return (
    <section className="py-12 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
      
      {/* Background sutil estilo OS */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#71717a 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {data.map((stat, index) => {
            const theme = colors[index % colors.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 25, delay: index * 0.1 }}
                className="group cursor-default"
              >
                {/* 
                   GNOME STYLE PILL (Quick Settings Style)
                   - Alto Border Radius (rounded-2xl ou 3xl)
                   - Flat Background com leve contraste
                   - Layout Horizontal limpo
                */}
                <div className="h-full flex items-center gap-4 p-4 rounded-[1.25rem] bg-white dark:bg-[#1e1e1e] border border-zinc-200 dark:border-[#333] shadow-sm hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300 relative overflow-hidden">
                   
                   {/* Hover Gradient Overlay Sutil */}
                   <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${theme.bg}`}></div>

                   {/* Icon Container (Circle) */}
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${theme.iconBg}`}>
                      <stat.icon size={22} strokeWidth={2} />
                   </div>

                   {/* Text Content */}
                   <div className="flex flex-col">
                      <span className={`text-2xl font-black tracking-tight leading-none mb-1 text-zinc-900 dark:text-white group-hover:translate-x-1 transition-transform duration-300`}>
                        {stat.value}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {stat.label}
                      </span>
                   </div>

                   {/* Indicador de Status (Ponto no canto) */}
                   <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${theme.iconBg.split(' ')[0]}`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
