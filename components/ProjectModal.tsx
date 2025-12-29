import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, FileText, Calendar, CheckCircle2, Clock, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, onNext, onPrev }) => {
  const { language } = useLanguage();

  // Traduções dos rótulos fixos da UI
  const labels = {
    pt: {
      repo: "Ver Código",
      demo: "Demo Online",
      docs: "Documentação",
      challenge: "O Desafio",
      solution: "A Solução",
      gallery: "Galeria",
      stack: "Tecnologias",
      close: "Fechar"
    },
    en: {
      repo: "Code Repository",
      demo: "Live Demo",
      docs: "Documentation",
      challenge: "The Challenge",
      solution: "The Solution",
      gallery: "Gallery",
      stack: "Tech Stack",
      close: "Close"
    }
  };

  const t = labels[language];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Keys (ESC and Arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Navigation Buttons (Desktop - Outside Modal) */}
      <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-8 pointer-events-none z-[110]">
          <button 
             onClick={(e) => { e.stopPropagation(); onPrev && onPrev(); }}
             className="pointer-events-auto p-3 rounded-full bg-zinc-900/50 hover:bg-zinc-900 text-white border border-white/10 hover:border-primary-500 transition-all hover:scale-110 active:scale-95"
          >
             <ChevronLeft size={32} />
          </button>
          <button 
             onClick={(e) => { e.stopPropagation(); onNext && onNext(); }}
             className="pointer-events-auto p-3 rounded-full bg-zinc-900/50 hover:bg-zinc-900 text-white border border-white/10 hover:border-primary-500 transition-all hover:scale-110 active:scale-95"
          >
             <ChevronRight size={32} />
          </button>
      </div>

      {/* Modal Container */}
      <motion.div 
        key={project.id} // Key change triggers animation
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800 z-[120]"
      >
        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-grow custom-scrollbar">
          
          {/* 1. HEADER (Sticky) */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
             <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
                   {project.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mt-0.5">
                   {project.status && (
                     <span className={`flex items-center gap-1 ${project.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {project.status === 'Completed' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                        {project.status}
                     </span>
                   )}
                   {project.date && (
                     <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={10} /> {project.date}
                        </span>
                     </>
                   )}
                </div>
             </div>
             
             <button 
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-white hover:bg-primary-500 transition-all"
                title={t.close}
             >
                <X size={20} />
             </button>
          </div>

          {/* 2. HERO IMAGE */}
          <div className="relative h-64 md:h-96 bg-zinc-200 dark:bg-zinc-900">
             <img 
               src={project.image} 
               alt={project.title} 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div>
                   <span className="px-3 py-1 bg-primary-500 text-white text-xs font-bold uppercase tracking-wider rounded-md mb-3 inline-block">
                     {project.category}
                   </span>
                   {project.subtitle && (
                      <p className="text-white/90 text-lg md:text-2xl font-light leading-snug max-w-2xl">
                        {project.subtitle}
                      </p>
                   )}
                </div>
             </div>
             
             {/* Mobile Navigation Arrows (Overlay on Image) */}
             <div className="absolute bottom-4 right-4 flex gap-2 md:hidden">
                <button 
                    onClick={(e) => { e.stopPropagation(); onPrev && onPrev(); }}
                    className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 active:scale-90"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onNext && onNext(); }}
                    className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 active:scale-90"
                >
                    <ChevronRight size={20} />
                </button>
             </div>
          </div>

          {/* 3. METRICS SECTION (High Impact) */}
          {project.impactMetrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
               {project.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="p-4 md:p-6 border-r border-zinc-200 dark:border-zinc-800 last:border-r-0 text-center">
                     <p className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-1">
                       {metric.value}
                     </p>
                     <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">
                       {metric.label}
                     </p>
                  </div>
               ))}
            </div>
          )}

          {/* 4. CONTENT & SIDEBAR */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-10">
             
             {/* Left Column: Context */}
             <div className="lg:col-span-2 space-y-8">
                {/* Action Bar (Mobile First) */}
                <div className="flex flex-wrap gap-3 mb-8">
                   {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-zinc-500/20">
                         <Github size={16} /> {t.repo}
                      </a>
                   )}
                   {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-bold text-sm hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/30">
                         <Zap size={16} /> {t.demo}
                      </a>
                   )}
                   {project.docsUrl && (
                      <a href={project.docsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg font-bold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                         <FileText size={16} /> {t.docs}
                      </a>
                   )}
                </div>

                {/* Problem & Solution */}
                <div className="space-y-6">
                   {project.problem && (
                     <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                           <span className="w-1 h-6 bg-red-500 rounded-full"></span> {t.challenge}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base">
                           {project.problem}
                        </p>
                     </div>
                   )}
                   
                   {project.solution && (
                     <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                           <span className="w-1 h-6 bg-emerald-500 rounded-full"></span> {t.solution}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base">
                           {project.solution}
                        </p>
                     </div>
                   )}
                </div>
                
                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                   <div className="pt-8">
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">{t.gallery}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {project.gallery.map((img, idx) => (
                            <img 
                              key={idx} 
                              src={img} 
                              alt={`Gallery ${idx}`} 
                              className="rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:scale-[1.02] transition-transform duration-300 w-full h-48 object-cover" 
                            />
                         ))}
                      </div>
                   </div>
                )}
             </div>

             {/* Right Column: Tech Stack Sidebar */}
             <div className="lg:col-span-1">
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 sticky top-24">
                   <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-4">
                      {t.stack}
                   </h3>
                   <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                         <span key={tag} className="px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300">
                           {tag}
                         </span>
                      ))}
                   </div>
                   
                   {/* Fallback description if no problem/solution provided */}
                   {(!project.problem && !project.solution) && (
                      <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400 italic">
                         {project.description}
                      </p>
                   )}
                </div>
             </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;