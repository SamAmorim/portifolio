import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import SkillsDashboard from './components/SkillsDashboard';
import Timeline from './components/Timeline';
import Education from './components/Education'; 
import Projects from './components/Projects';
import LinkedinPosts from './components/LinkedinPosts'; // Import Linkedin Posts
import Footer from './components/Footer';
import ContactBalloon from './components/ContactBalloon'; 
import DoomFire from './components/DoomFire'; 
import SpecialEffects from './components/SpecialEffects'; 
import GoatMode from './components/GoatMode'; 
import DragonEffect from './components/DragonEffect'; 
import JungleMode from './components/JungleMode'; // Import Jungle Mode
import AdminDocs from './components/AdminDocs'; 
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';

// Definindo o tipo aqui ou importando de um arquivo de tipos
type EffectType = 'starwars' | 'cats' | 'nerd' | 'music' | 'science' | 'math' | 'astronomy' | null;

function AppContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Easter Egg States
  const [showDoomFire, setShowDoomFire] = useState(false);
  const [showGoatMode, setShowGoatMode] = useState(false);
  const [showDragon, setShowDragon] = useState(false);
  const [showJungle, setShowJungle] = useState(false); // Jungle State
  const [showAdminDocs, setShowAdminDocs] = useState(false);
  
  const [activeEffect, setActiveEffect] = useState<EffectType>(null);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  // Sequência do Konami Code
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Lógica de Detecção de Teclas
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeySequence((prev) => {
        // Mantém um buffer maior
        const newSequence = [...prev, e.key];
        if (newSequence.length > 20) {
          newSequence.shift();
        }
        
        // 1. Check Konami Code (Array match)
        const konamiAttempt = newSequence.slice(-konamiCode.length);
        if (JSON.stringify(konamiAttempt) === JSON.stringify(konamiCode)) {
          setShowDoomFire(true);
          return [];
        }

        // Check Strings
        const textSequence = newSequence.join('').toLowerCase();

        // 2. Check "GOAT"
        if (textSequence.includes('goat')) {
          setShowGoatMode(true);
          return [];
        }

        // 3. Check "DRAGON"
        if (textSequence.includes('dragon')) {
          setShowDragon(true);
          return [];
        }

        // 4. Check "NATURE" or "JUNGLE"
        if (textSequence.includes('nature') || textSequence.includes('jungle')) {
          setShowJungle(true);
          return [];
        }
        
        // 5. Check "ADMIN" (Documentation)
        if (textSequence.includes('admin')) {
          setShowAdminDocs(true);
          return [];
        }
        
        return newSequence;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerEffect = (effectId: string) => {
    if (effectId === 'nature') {
      setShowJungle(true);
      return;
    }
    // Se clicar no mesmo efeito, desativa. Se for outro, troca.
    setActiveEffect(prev => prev === effectId ? null : effectId as EffectType);
  };

  return (
    <div className={`min-h-screen relative bg-zinc-50 dark:bg-[#050505] transition-colors duration-500 ${activeEffect === 'starwars' ? 'cursor-none' : ''}`}>
      
      {/* Admin Docs Overlay */}
      <AnimatePresence>
        {showAdminDocs && (
          <AdminDocs onClose={() => setShowAdminDocs(false)} />
        )}
      </AnimatePresence>

      {/* Special Effects Overlay */}
      <AnimatePresence>
        {activeEffect && (
          <SpecialEffects effect={activeEffect} onClose={() => setActiveEffect(null)} />
        )}
      </AnimatePresence>

      {/* Doom Fire Easter Egg Overlay */}
      <AnimatePresence>
        {showDoomFire && (
          <DoomFire onClose={() => setShowDoomFire(false)} />
        )}
      </AnimatePresence>

      {/* Goat Mode (Ozzy) Easter Egg Overlay */}
      <AnimatePresence>
        {showGoatMode && (
          <GoatMode onClose={() => setShowGoatMode(false)} />
        )}
      </AnimatePresence>

      {/* Dragon Mode - Overlay do Dragão */}
      <AnimatePresence>
        {showDragon && (
          <DragonEffect onComplete={() => setShowDragon(false)} />
        )}
      </AnimatePresence>

      {/* Jungle Mode Overlay */}
      <AnimatePresence>
        {showJungle && (
          <JungleMode onClose={() => setShowJungle(false)} />
        )}
      </AnimatePresence>

      {/* Global Spotlight Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-0 dark:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(225, 29, 72, 0.05), transparent 40%)`
        }}
      />
      
      {/* Subtle Noise Texture */}
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      {/* 
         WRAPPER PRINCIPAL QUE VAI TREMER
         Se showDragon for true, adicionamos a classe 'earthquake-mode' definida no index.html 
      */}
      <div className={`transition-all ${showDragon ? 'earthquake-mode' : ''}`}>
        <Navbar />
        
        <main className="relative z-10 flex flex-col gap-0 md:pl-20 transition-all duration-300">
          <Hero />
          <Stats />
          <SkillsDashboard />
          <Timeline />
          <Education /> 
          <Projects />
          <LinkedinPosts /> 
          <Footer onTriggerEffect={handleTriggerEffect} />
        </main>
      </div>
      
      {/* Contact Balloon - Always visible on bottom right */}
      <ContactBalloon />

      {/* Back to Top Button - Positioned slightly higher or to the left on mobile to avoid overlap */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            // Ajustado "bottom-24" para ficar acima do balão de contato
            className="fixed bottom-24 right-6 z-30 p-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white shadow-lg transition-all duration-300 group"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;