import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Terminal, Home, Briefcase, Cpu, Layers, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroData, footerData } from '../data';
import { useLanguage } from '../context/LanguageContext';

// Mapeamento de ícones para os links de navegação para a Sidebar
const iconMap: Record<string, React.ElementType> = {
  'Início': Home,
  'Home': Home,
  'Skills': Cpu,
  'Experiência': Briefcase,
  'Experience': Briefcase,
  'Projetos': Layers,
  'Projects': Layers,
  'Posts': Share2,
};

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { language, setLanguage, toggleLanguage } = useLanguage();
  
  // State for Logo Color Cycling
  const [logoColorIndex, setLogoColorIndex] = useState(0);

  const currentNavLinks = footerData[language].navLinks;
  const logoName = heroData[language].logoName;

  // COLOR LOGIC: Cycle through the palette based on index
  const getNavColor = (index: number) => {
    // 0: Blue, 1: Green, 2: Yellow, 3: Red
    const colors = ['bg-ps-blue', 'bg-ps-green', 'bg-ps-yellow', 'bg-ps-red'];
    return colors[index % 4];
  };

  const getNavShadow = (index: number) => {
    // Hex equivalents for shadows
    const shadows = [
        'shadow-[0_0_15px_rgba(46,109,180,0.4)]', // Blue
        'shadow-[0_0_15px_rgba(0,172,159,0.4)]',  // Green
        'shadow-[0_0_15px_rgba(243,195,0,0.4)]',  // Yellow
        'shadow-[0_0_15px_rgba(223,0,36,0.4)]'     // Red
    ];
    return shadows[index % 4];
  };

  // Text color on Active (Yellow needs black text for contrast, others white)
  const getActiveIconColor = (index: number) => {
      const idx = index % 4;
      return idx === 2 ? 'text-black' : 'text-white'; // 2 is Yellow
  };

  // Logo Color Cycling Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoColorIndex((prev) => (prev + 1) % 4);
    }, 2000); // Cycles every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const getLogoStyle = () => {
      const styles = [
          { bg: 'bg-ps-blue', shadow: 'shadow-ps-blue/40' },
          { bg: 'bg-ps-green', shadow: 'shadow-ps-green/40' },
          { bg: 'bg-ps-yellow', shadow: 'shadow-ps-yellow/40' },
          { bg: 'bg-ps-red', shadow: 'shadow-ps-red/40' }
      ];
      return styles[logoColorIndex];
  };

  const currentLogoStyle = getLogoStyle();

  // Sincronização de tema e ScrollSpy
  useEffect(() => {
    const handleScroll = () => {
      const sections = currentNavLinks.map(link => link.href.substring(1));
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = '#' + section;
          }
        }
      }
      if (window.scrollY < 100) current = '#';
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDark, currentNavLinks]);

  return (
    <>
      {/* =======================================================
          MOBILE NAVBAR (Top Bar - Visível apenas mobile)
         ======================================================= */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 glass-nav border-b border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-300">
        <div className="px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md transition-colors duration-700 ${currentLogoStyle.bg} ${currentLogoStyle.shadow}`}>
              <Terminal size={16} strokeWidth={3} className={logoColorIndex === 2 ? 'text-black' : 'text-white'} />
            </div>
            <span className="font-bold text-zinc-900 dark:text-white text-sm tracking-tight">
              {logoName}
            </span>
          </a>

          <div className="flex items-center gap-2">
             <button
               onClick={toggleLanguage}
               className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-900 dark:text-white shadow-sm active:scale-95 transition-all"
               aria-label="Switch Language"
             >
                <span className="text-base leading-none">{language === 'pt' ? '🇧🇷' : '🇺🇸'}</span>
                <span className="font-mono pt-0.5">{language.toUpperCase()}</span>
             </button>

             <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-900 dark:text-white p-1"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {currentNavLinks.map((link, idx) => (
                  <motion.a 
                    key={link.name} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      text-base font-medium py-3 border-b border-zinc-100 dark:border-zinc-900/50 flex items-center justify-between
                      ${activeSection === link.href ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-600 dark:text-zinc-300'}
                    `}
                  >
                    {link.name}
                    {/* Indicador colorido no mobile */}
                    {activeSection === link.href && (
                        <div className={`w-2 h-2 rounded-full ${getNavColor(idx)}`}></div>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* =======================================================
          DESKTOP SIDEBAR (Vertical - Visível apenas md+)
         ======================================================= */}
      <aside className="hidden md:flex flex-col justify-between items-center fixed left-0 top-0 bottom-0 w-20 z-50 glass-sidebar border-r border-zinc-200 dark:border-zinc-800 py-8 shadow-2xl">
        
        {/* Sidebar Logo - Auto Cycling Color */}
        <a href="#" className={`group relative z-20 flex items-center justify-center w-10 h-10 text-white rounded-xl shadow-lg hover:scale-110 transition-all duration-700 ${currentLogoStyle.bg} ${currentLogoStyle.shadow}`}>
           <Terminal size={20} strokeWidth={3} className={logoColorIndex === 2 ? 'text-black' : 'text-white'} />
        </a>

        {/* Navigation Links - CYBER GLASS STYLE */}
        <div className="flex flex-col gap-3 w-full px-3">
          {currentNavLinks.map((link, idx) => {
            const Icon = iconMap[link.name] || Home;
            const isActive = activeSection === link.href || (activeSection === '' && link.href === '#');
            
            // Determine dynamic colors based on index
            const cursorColorClass = getNavColor(idx);
            const cursorShadowClass = getNavShadow(idx);
            const iconColorClass = getActiveIconColor(idx);

            return (
              <a 
                key={link.name} 
                href={link.href}
                className="relative flex items-center justify-center w-full aspect-square group"
                aria-label={link.name}
              >
                {/* 
                   BACKGROUND DESLIZANTE (MAGNETIC CURSOR)
                   Agora usa a cor específica do índice (Azul, Verde, Amarelo, Vermelho).
                */}
                {isActive && (
                  <motion.div 
                    layoutId="cyber-cursor"
                    className={`absolute inset-0 rounded-xl ${cursorColorClass} ${cursorShadowClass}`}
                    transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 25 
                    }}
                  >
                     {/* Detalhe "Tech" Branco para contraste */}
                     <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-white rounded-full animate-pulse opacity-80"></div>
                  </motion.div>
                )}

                {/* Ícone */}
                <div className={`
                    relative z-10 p-2 transition-all duration-300
                    ${isActive 
                        ? `${iconColorClass} scale-105` 
                        : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-xl'}
                `}>
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>

                {/* Tooltip (Hover) - Estilo Tech */}
                <div className="absolute left-full ml-5 px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50 border border-zinc-700 dark:border-zinc-200">
                    {link.name}
                    {/* Seta do Tooltip */}
                    <div className="absolute top-1/2 right-full -mt-1 -mr-px border-4 border-transparent border-r-zinc-900 dark:border-r-white"></div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-6 w-full px-3 pb-6 z-20">
          
          {/* Language Selector */}
          <div className="flex flex-col w-full bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-1 shadow-inner">
             <button 
                onClick={() => setLanguage('pt')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-300 ${
                  language === 'pt' 
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md font-bold' 
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                }`}
                title="Português"
             >
               <span className="text-sm leading-none">🇧🇷</span>
               <span className="text-[10px] font-mono">PT</span>
             </button>
             
             <button 
                onClick={() => setLanguage('en')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-300 ${
                  language === 'en' 
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md font-bold' 
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                }`}
                title="English"
             >
               <span className="text-sm leading-none">🇺🇸</span>
               <span className="text-[10px] font-mono">EN</span>
             </button>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-full aspect-square flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-ps-blue dark:hover:text-white hover:ring-2 ring-ps-blue/20 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-95 shadow-sm hover:shadow-md"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;