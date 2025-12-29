import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { educationData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Award, BookOpen, CheckCircle2, Clock, Terminal, Database } from 'lucide-react';
import OrbitDecoration from './ui/OrbitDecoration';

const Education: React.FC = () => {
  const { language } = useLanguage();
  const data = educationData[language];

  // Configuração de Textos da Interface (UI Labels)
  const uiLabels = {
    pt: {
        completed: "Concluído",
        inProgress: "Em Andamento",
        progress: "Progresso",
        systemIntegrity: "Integridade do Sistema: Verificada",
        lastSync: "ÚLTIMA_SYNC",
        server: "SERVIDOR: ACADEMIC_DB_01"
    },
    en: {
        completed: "Completed",
        inProgress: "In Progress",
        progress: "Progress",
        systemIntegrity: "System Integrity: Verified",
        lastSync: "LAST_SYNC",
        server: "SERVER: ACADEMIC_DB_01"
    }
  };
  const t = uiLabels[language];

  // Helper para ícones
  const getIcon = (type: string) => {
    switch (type) {
      case 'Bachelor': return GraduationCap;
      case 'MBA': return Award;
      case 'Master': return BookOpen;
      case 'PhD': return BookOpen;
      default: return GraduationCap;
    }
  };

  return (
    <section id="education" className="py-24 bg-zinc-50 dark:bg-[#050505] border-t border-zinc-200 dark:border-zinc-900 relative overflow-hidden">
      
      {/* Background Decorativo Sutil */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute right-10 top-20 w-64 h-64 border border-dashed border-zinc-500 rounded-full animate-[spin_60s_linear_infinite]"></div>
         <div className="absolute right-10 top-20 w-64 h-64 border border-zinc-500 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
            title={language === 'pt' ? "Formação Acadêmica" : "Education"}
            subtitle="Education Intelligence Hub" 
        />

        <div className="max-w-5xl mx-auto relative">
            
            {/* Orbit Decoration behind the main panel (Sem opacidade reduzida) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
               <OrbitDecoration size="w-[800px] h-[800px]" />
            </div>

            {/* MAIN DASHBOARD PANEL */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden relative z-10"
            >
                {/* Panel Header (Terminal Style) */}
                <div className="bg-zinc-50 dark:bg-zinc-900/80 px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                        </div>
                        <div className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                            <Terminal size={12} />
                            <span>academic_records.json</span>
                        </div>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest hidden sm:block">
                        {t.systemIntegrity}
                    </div>
                </div>

                {/* Panel Content (List) */}
                <div className="p-0">
                    {data.map((item, index) => {
                        const Icon = getIcon(item.type);
                        const isCompleted = item.status === 'Completed';
                        
                        return (
                            <div 
                                key={item.id} 
                                className="group relative border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 transition-colors"
                            >
                                {/* Active Indicator Strip */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                    
                                    {/* COL 1: Icon & ID */}
                                    <div className="md:col-span-1 flex flex-col items-center justify-center gap-2">
                                        <div className={`p-3 rounded-xl ${isCompleted ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600'} border border-zinc-200 dark:border-zinc-800 shadow-sm`}>
                                            <Icon size={24} strokeWidth={1.5} />
                                        </div>
                                        <span className="text-[9px] font-mono text-zinc-400">ID:0{item.id}</span>
                                    </div>

                                    {/* COL 2: Main Info */}
                                    <div className="md:col-span-8 flex flex-col gap-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                                                {item.type}
                                            </span>
                                            <span className="text-[10px] font-mono text-zinc-400">
                                                {item.year}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                            {item.degree}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium mt-1">
                                            <Database size={14} className="text-zinc-400" />
                                            {item.institution}
                                        </div>

                                        {item.description && (
                                            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed font-light max-w-2xl">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* COL 3: Status & Progress */}
                                    <div className="md:col-span-3 flex flex-col items-end justify-center gap-3 pl-4 md:border-l border-zinc-100 dark:border-zinc-800/50">
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${isCompleted ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/5 border-amber-500/20 text-amber-600'}`}>
                                            {isCompleted ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                            {isCompleted ? t.completed : t.inProgress}
                                        </div>

                                        {/* Fake Progress Bar */}
                                        <div className="w-full max-w-[140px]">
                                            <div className="flex justify-between text-[9px] font-mono text-zinc-400 mb-1">
                                                <span>{t.progress}</span>
                                                <span>{isCompleted ? '100%' : '65%'}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                                                <div 
                                                    className={`h-full rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500'} relative transition-all duration-1000 ease-out`}
                                                    style={{ width: isCompleted ? '100%' : '65%' }}
                                                >
                                                    {/* Shimmer effect on bar */}
                                                    <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Panel Footer */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>{t.lastSync}: {new Date().toLocaleDateString()}</span>
                    <span>{t.server}</span>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;