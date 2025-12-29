import React, { useState } from 'react';
import { motion, Variants, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowRight, Github, Brain, Cloud, Database, BarChart3, Code2, Server } from 'lucide-react';
import { heroData } from '../data';
import D20Roller from './D20Roller';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const [showD20, setShowD20] = useState(false);
  const { language } = useLanguage();
  const data = heroData[language];
  
  // --- Stardew Valley Easter Egg Logic ---
  const [clickCount, setClickCount] = useState(0);
  const [isAlienOpen, setIsAlienOpen] = useState(false);
  const nameControls = useAnimation();

  const handleNameClick = async () => {
    await nameControls.start({
      x: [0, -5, 5, -5, 5, 0],
      scale: [1, 0.9, 1],
      color: ["#18181b", "#2E6DB4", "#18181b"], // Changed to PS Blue
      transition: { duration: 0.3 }
    });
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 10) {
      setIsAlienOpen(true);
      setClickCount(0); 
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Ícones Flutuantes - Configuração UNIFICADA (PALETA SOLICITADA)
  // Distribuição: Verde, Azul, Amarelo, Vermelho
  const floatingIcons = [
    { Icon: Brain, color: "text-ps-green", bg: "bg-ps-green/10", border: "border-ps-green/20", delay: 0, top: "0%", left: "10%" },
    { Icon: Cloud, color: "text-ps-blue", bg: "bg-ps-blue/10", border: "border-ps-blue/20", delay: 1.5, top: "5%", left: "85%" },
    { Icon: Database, color: "text-ps-yellow", bg: "bg-ps-yellow/10", border: "border-ps-yellow/20", delay: 0.5, top: "45%", left: "-10%" },
    { Icon: BarChart3, color: "text-ps-red", bg: "bg-ps-red/10", border: "border-ps-red/20", delay: 2, top: "50%", left: "95%" },
    { Icon: Code2, color: "text-ps-green", bg: "bg-ps-green/10", border: "border-ps-green/20", delay: 1, top: "90%", left: "5%" },
    { Icon: Server, color: "text-ps-blue", bg: "bg-ps-blue/10", border: "border-ps-blue/20", delay: 2.5, top: "85%", left: "85%" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-0 overflow-hidden">
      
      {/* D20 Modal Overlay */}
      <AnimatePresence>
        {showD20 && <D20Roller onClose={() => setShowD20(false)} />}
      </AnimatePresence>

      {/* Easter Egg Overlay */}
      <AnimatePresence>
        {isAlienOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsAlienOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          >
             <div className="relative flex flex-col items-center justify-center p-8">
                 <h1 className="text-4xl text-white font-mono">👽</h1>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Global Grid - Subtle & Professional */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-ps-blue/5 dark:bg-ps-blue/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-ps-blue/5 dark:bg-ps-blue/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl">
        
        {/* TEXT CONTENT */}
        <div className="order-2 lg:order-1 relative z-50">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {data.openToWork && (
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-8">
                <div className="inline-flex items-start gap-3 px-4 py-2 rounded-full bg-white dark:bg-ps-green/10 border border-zinc-200 dark:border-ps-green/20 backdrop-blur-sm shadow-sm">
                    <span className="relative flex h-2.5 w-2.5 mt-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ps-green opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ps-green"></span>
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 leading-tight">
                            AVAILABLE FOR HIRE
                        </span>
                        <span className="hidden sm:inline-block w-[1px] h-3 bg-zinc-300 dark:bg-zinc-700"></span>
                        <span className="hidden sm:inline-block text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400 leading-tight">
                            {data.openToWorkText.replace("Open to Work: ", "")}
                        </span>
                    </div>
                </div>
              </motion.div>
            )}
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight text-zinc-900 dark:text-white relative">
              <div className="relative inline-block">
                <motion.span animate={nameControls} onClick={handleNameClick} className="block cursor-pointer select-none relative z-10">
                  {data.logoName}
                </motion.span>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-800 to-zinc-900 dark:from-zinc-400 dark:via-zinc-200 dark:to-white">
                {data.logoSurname}.
              </span>
            </motion.h1>
            
            {/* Primary Accent Bar (Blue) */}
            <motion.div variants={itemVariants} className="h-1.5 w-24 bg-ps-blue mb-8 rounded-full shadow-[0_0_15px_rgba(46,109,180,0.5)]"></motion.div>

            <motion.p variants={itemVariants} className="text-zinc-600 dark:text-zinc-300 text-lg md:text-xl mb-10 max-w-xl lg:max-w-2xl leading-relaxed font-light">
              {data.description}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
              <a 
                href="#projects" 
                className="relative z-50 cursor-pointer group px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl overflow-hidden shadow-xl shadow-ps-blue/10 hover:shadow-ps-blue/30 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-center"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {data.primaryCtaText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
              
              <a href={data.secondaryCtaLink} target="_blank" rel="noreferrer" className="relative z-50 cursor-pointer px-8 py-4 glass text-zinc-800 dark:text-zinc-200 font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-ps-blue/50 hover:bg-ps-blue/5 transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-95 duration-300">
                {data.secondaryCtaText}
              </a>

              {data.githubLink && (
                  <a href={data.githubLink} target="_blank" rel="noreferrer" className="relative z-50 cursor-pointer p-4 glass text-zinc-800 dark:text-zinc-200 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-500 hover:bg-zinc-500/10 transition-all flex items-center justify-center group shadow-sm active:scale-95 duration-300">
                    <Github size={24} />
                  </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* VISUAL CONTENT - "Data Constellation" Style */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-center relative z-10 w-full h-full min-h-[600px] lg:pr-10">
           
          {/* Main Container */}
          <div className="relative w-full max-w-[360px] h-[450px] md:w-[550px] md:h-[650px] flex items-center justify-center">
             
             {/* Glow Behind */}
             <div className="absolute inset-0 bg-ps-blue/10 blur-[120px] rounded-full animate-pulse-slow"></div>

             {/* Background Decoration Rings & Grid (Behind Photo) */}
             <div className="absolute inset-[-15%] z-0 pointer-events-none opacity-60 dark:opacity-100 transition-opacity">
                 {/* Outer Ring - Solid/Thin */}
                 <div className="absolute inset-0 border border-zinc-300 dark:border-zinc-700/60 rounded-full animate-[spin_60s_linear_infinite]"></div>
                 
                 {/* Middle Ring - Dashed */}
                 <div className="absolute inset-[10%] border border-dashed border-zinc-400 dark:border-zinc-600 rounded-full animate-[spin_80s_linear_infinite_reverse]"></div>
                 
                 {/* Inner Ring - Dotted - Accent Color */}
                 <div className="absolute inset-[25%] border-2 border-dotted border-ps-blue/30 rounded-full animate-[spin_120s_linear_infinite]"></div>

                 {/* Data Points Pattern */}
                 <div 
                    className="absolute inset-0 opacity-[0.1]" 
                    style={{ 
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', 
                        backgroundSize: '20px 20px',
                        maskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
                    }}
                 ></div>
             </div>

             {/* Central Photo Card - Retângulo Vertical (Portrait) */}
             <div className="relative w-72 h-96 md:w-[24rem] md:h-[32rem] z-20 group perspective-1000">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    onClick={() => setShowD20(true)}
                    className="w-full h-full relative cursor-pointer"
                >
                    {/* Border Gradient & Glass Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-zinc-200 via-ps-blue/40 to-zinc-800 rounded-[2.5rem] blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* The Image Container */}
                    <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] overflow-hidden border-2 border-white/50 dark:border-white/10 shadow-2xl">
                        <img 
                          src={data.heroImage} 
                          alt={data.title} 
                          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                        />
                        
                        {/* Overlay Text/Badge */}
                        <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-white/10 flex items-center justify-between shadow-lg">
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-ps-green animate-pulse"></div>
                                <span className="text-[10px] font-mono text-zinc-900 dark:text-white/90 font-bold tracking-wider">SYSTEM_ONLINE</span>
                             </div>
                             <Brain size={14} className="text-ps-blue" />
                        </div>
                    </div>
                </motion.div>
             </div>

             {/* Floating Icons Constellation - Optimized with will-change */}
             <div className="absolute inset-0 pointer-events-none z-30">
                {floatingIcons.map((item, index) => (
                   <motion.div
                      key={index}
                      className="absolute will-change-transform"
                      style={{ top: item.top, left: item.left }}
                      animate={{ 
                        y: ["-15%", "15%", "-15%"], // Float Up and Down relative to position
                      }}
                      transition={{ 
                        duration: 5 + index, // Varied duration for organic feel
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay
                      }}
                   >
                      {/* Added pointer-events-auto to enable hover on the specific icon card */}
                      <div className={`
                          pointer-events-auto cursor-pointer
                          p-4 rounded-2xl bg-white/90 dark:bg-zinc-900/90 
                          border ${item.border} 
                          shadow-lg backdrop-blur-md 
                          flex items-center justify-center 
                          transition-all duration-300
                          hover:scale-110 hover:-rotate-3 hover:shadow-2xl hover:bg-white dark:hover:bg-zinc-800
                          group
                      `}>
                          <item.Icon size={22} className={`${item.color} transition-transform duration-300 group-hover:scale-110`} />
                      </div>
                   </motion.div>
                ))}
             </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;