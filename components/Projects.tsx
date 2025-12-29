
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { ArrowUpRight, Terminal as TerminalIcon, ChevronLeft, ChevronRight, Disc, Layers, Eye, Code } from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import ProjectModal from './ProjectModal';
import OrbitDecoration from './ui/OrbitDecoration';

// --- COMPONENTE DE TERMINAL BASH (TYPING EFFECT) ---
const BashTyper = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  
  // Segmentos do comando Bash
  const lines = [
    { text: "root@portfolio", className: "text-emerald-400 font-bold" },
    { text: ":", className: "text-zinc-400" },
    { text: "~/projects", className: "text-blue-400 font-bold" },
    { text: "$ ", className: "text-zinc-400" },
    { text: "./deploy_models.sh ", className: "text-zinc-100" },
    { text: "--target", className: "text-zinc-400" },
    { text: "=", className: "text-zinc-500" },
    { text: "production", className: "text-amber-300" },
    { text: "\n", className: "" },
    { text: "> Initializing inference engine...", className: "text-zinc-500 italic" },
    { text: "\n", className: "" },
    { text: "> Models loaded: ", className: "text-zinc-500 italic" },
    { text: "[98.5% Accuracy]", className: "text-emerald-500 font-bold" },
  ];

  const fullText = lines.map(l => l.text).join("");

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      let currentIndex = 0;
      
      const typeChar = () => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
          const randomDelay = 20 + Math.random() * 30; 
          setTimeout(typeChar, randomDelay);
        }
      };
      
      typeChar();
    }
  }, [isInView, started, fullText]);

  const renderHighlightedText = () => {
    let currentLength = 0;
    const elements = [];

    for (let i = 0; i < lines.length; i++) {
      const segment = lines[i];
      const segmentLength = segment.text.length;
      
      if (displayedText.length >= currentLength + segmentLength) {
         elements.push(<span key={i} className={segment.className}>{segment.text}</span>);
      } else if (displayedText.length > currentLength) {
         const sliceEnd = displayedText.length - currentLength;
         elements.push(<span key={i} className={segment.className}>{segment.text.slice(0, sliceEnd)}</span>);
         break;
      }
      currentLength += segmentLength;
    }
    return elements;
  };

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="w-full max-w-xl mx-auto mb-10 font-mono text-xs sm:text-sm relative z-0"
    >
        <div className="relative z-10 bg-[#1e1e1e] rounded-xl border border-zinc-700 shadow-2xl overflow-hidden">
            <div className="bg-[#2d2d2d] px-3 py-2 flex items-center justify-between border-b border-black/50">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 opacity-60">
                    <TerminalIcon size={10} />
                    <span className="text-[10px]">bash</span>
                </div>
            </div>
            <div className="p-4 min-h-[80px]">
                <pre className="whitespace-pre-wrap leading-relaxed">
                    {renderHighlightedText()}
                    <span className="inline-block w-2 h-4 bg-zinc-400 ml-0.5 align-middle animate-pulse"></span>
                </pre>
            </div>
        </div>
    </motion.div>
  );
};

// Componente Interno do Card (Visual)
const CardContent: React.FC<{ project: Project; isActive: boolean }> = ({ project, isActive }) => {
    return (
        <div className={`h-full w-full bg-white dark:bg-[#0c0c0c] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col transition-all duration-500 ${isActive ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(46,109,180,0.15)] ring-1 ring-primary-500/20' : 'shadow-lg grayscale-[0.8] opacity-70'}`}>
            {/* Imagem Cover */}
            <div className="relative h-48 sm:h-56 bg-zinc-100 dark:bg-black overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent opacity-60 z-10" />
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}
                />
                
                {/* Badge de Categoria */}
                <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded border shadow-sm backdrop-blur-md transition-colors ${isActive ? 'bg-primary-500 text-white border-primary-400' : 'bg-black/60 text-zinc-300 border-white/10'}`}>
                        {project.category}
                    </span>
                </div>
            </div>
            
            {/* Corpo */}
            <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-xl sm:text-2xl font-black tracking-tight transition-colors ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>
                        {project.title}
                    </h3>
                </div>
                
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed flex-grow line-clamp-3 mb-4">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-mono font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 rounded border border-zinc-200 dark:border-zinc-700">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Botão de Ação (Só aparece quando ativo ou hover) */}
                <div className={`mt-auto flex items-center gap-3 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold text-sm group-hover:underline">
                        <span>Ver Detalhes</span>
                        <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const data = projectsData[language];
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  
  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedProject = selectedProjectId 
    ? data.find(p => p.id === selectedProjectId) || null 
    : null;

  // Navegação
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const goToIndex = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Define variants for card positions
  const cardVariants = {
    center: { x: '0%', scale: 1, zIndex: 50, opacity: 1, filter: 'blur(0px)', rotateY: 0 },
    left: { x: '-60%', scale: 0.85, zIndex: 10, opacity: 0.5, filter: 'blur(3px)', rotateY: 5 },
    right: { x: '60%', scale: 0.85, zIndex: 10, opacity: 0.5, filter: 'blur(3px)', rotateY: -5 },
    back: { x: '0%', scale: 0.6, zIndex: 5, opacity: 0, filter: 'blur(10px)', rotateY: 0 }
  };

  const getCardState = (index: number, currentIndex: number, total: number) => {
    let offset = (index - currentIndex + total) % total;
    if (offset > total / 2) offset -= total;
    
    // Determine state based on offset
    if (offset === 0) return 'center';
    if (offset === -1) return 'left';
    if (offset === 1) return 'right';
    return 'back';
  };

  return (
    <section id="projects" className="py-24 bg-zinc-50 dark:bg-transparent relative z-20 overflow-hidden">
      
      {/* Decoração de Fundo (Orbit) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-40 pointer-events-none">
          <OrbitDecoration size="w-[800px] h-[800px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
            title={language === 'pt' ? "Laboratório de Projetos" : "Project Laboratory"}
            subtitle={language === 'pt' ? "Tech Stack Showcase" : "Tech Stack Showcase"} 
        />
        
        {/* Bash Terminal Effect */}
        <BashTyper />

        <div className="flex flex-col items-center">
            
            {/* 1. TOP NAVIGATION (Abas do Nome do Projeto) */}
            <div className="w-full max-w-4xl mb-12 overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex justify-center min-w-max px-4 gap-3">
                    {data.map((p, idx) => {
                        const isActive = currentIndex === idx;
                        return (
                            <button
                                key={p.id}
                                onClick={() => goToIndex(idx)}
                                className={`
                                    group relative flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300
                                    ${isActive 
                                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white shadow-lg scale-105' 
                                        : 'bg-white/50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-ps-blue hover:text-ps-blue backdrop-blur-sm'}
                                `}
                            >
                                {isActive && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-ps-blue rounded-full"></span>
                                )}
                                {isActive ? <Disc size={12} className="animate-spin-slow" /> : <Layers size={12} />}
                                {p.title}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* 2. CAROUSEL AREA (Cyber Focus Style) */}
            <div className="relative w-full max-w-[1200px] h-[500px] flex items-center justify-center perspective-1000">
                
                {/* Botões de Navegação Laterais (Desktop) */}
                <button 
                    onClick={handlePrev}
                    className="hidden lg:flex absolute left-0 z-[60] p-4 rounded-full bg-white/10 hover:bg-white/20 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 backdrop-blur-md transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                >
                    <ChevronLeft size={32} />
                </button>
                
                <button 
                    onClick={handleNext}
                    className="hidden lg:flex absolute right-0 z-[60] p-4 rounded-full bg-white/10 hover:bg-white/20 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 backdrop-blur-md transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                >
                    <ChevronRight size={32} />
                </button>

                {/* Card Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {data.map((project, index) => {
                        const state = getCardState(index, currentIndex, data.length);
                        const isActive = state === 'center';
                        
                        return (
                            <motion.div
                                key={project.id}
                                variants={cardVariants}
                                initial="back"
                                animate={state}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 25,
                                    mass: 0.8
                                }}
                                className="absolute w-full max-w-[400px] md:max-w-[450px]"
                                onClick={() => {
                                    if (isActive) {
                                        setSelectedProjectId(project.id);
                                    } else {
                                        goToIndex(index);
                                    }
                                }}
                                style={{ 
                                    cursor: isActive ? 'pointer' : 'default',
                                    pointerEvents: state === 'back' ? 'none' : 'auto'
                                }}
                                drag={isActive ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(e, { offset, velocity }) => {
                                    if (isActive) {
                                        const swipe = offset.x;
                                        if (swipe < -50) handleNext();
                                        else if (swipe > 50) handlePrev();
                                    }
                                }}
                            >
                                <CardContent project={project} isActive={isActive} />
                                
                                {/* Overlay para Click nos cards laterais (Melhora UX) */}
                                {!isActive && (
                                    <div 
                                        className="absolute inset-0 z-50 hover:bg-black/10 transition-colors rounded-2xl cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Impede drag se houver
                                            goToIndex(index);
                                        }}
                                    ></div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Contador Inferior - Pagination Dots */}
            <div className="mt-8 flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800">
                {data.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => goToIndex(idx)}
                        className={`transition-all duration-500 ease-out rounded-full ${currentIndex === idx ? 'w-8 bg-primary-500 shadow-[0_0_10px_rgba(46,109,180,0.5)]' : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'} h-2`}
                    />
                ))}
            </div>

        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            isOpen={!!selectedProject} 
            onClose={() => setSelectedProjectId(null)} 
            onNext={() => {
                const nextIdx = (currentIndex + 1) % data.length;
                setCurrentIndex(nextIdx);
                setSelectedProjectId(data[nextIdx].id);
            }}
            onPrev={() => {
                const prevIdx = (currentIndex - 1 + data.length) % data.length;
                setCurrentIndex(prevIdx);
                setSelectedProjectId(data[prevIdx].id);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
