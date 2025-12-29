import React, { useState, useEffect, useRef } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ReferenceLine, ReferenceArea, LabelList, Legend, ZAxis
} from 'recharts';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import HyperspaceMode from './HyperspaceMode'; // Updated Easter Egg
import { Globe2, Cpu, Code2, Users, MapPin, Database, Brain, BarChart3, Layers, Braces, Filter } from 'lucide-react';
import { 
  skillsClusterData, skillColors, hardSkillsList,
  impactMetrics, globalLocations
} from '../data';
import { SkillCategory, SkillPoint } from '../types';
import { useLanguage } from '../context/LanguageContext';

// --- COMPONENTE JSON TYPER (Inline Style) ---
const ConfigTyper = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  
  // Linha de configuração fictícia estilo JS Object
  const segments = [
    { text: "const ", className: "text-purple-600 dark:text-purple-400 font-bold" },
    { text: "capabilities ", className: "text-zinc-800 dark:text-zinc-200" },
    { text: "= ", className: "text-zinc-500" },
    { text: "{ ", className: "text-yellow-600 dark:text-yellow-500" },
    { text: "mode", className: "text-blue-600 dark:text-blue-400" },
    { text: ": ", className: "text-zinc-500" },
    { text: "'FullStack Data'", className: "text-emerald-600 dark:text-emerald-500" },
    { text: ", ", className: "text-zinc-500" },
    { text: "analytics", className: "text-blue-600 dark:text-blue-400" },
    { text: ": ", className: "text-zinc-500" },
    { text: "true", className: "text-purple-600 dark:text-purple-400 font-bold" },
    { text: " };", className: "text-yellow-600 dark:text-yellow-500" },
  ];

  const fullText = segments.map(s => s.text).join("");

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      let currentIndex = 0;
      
      const typeChar = () => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
          const randomDelay = 30 + Math.random() * 50; 
          setTimeout(typeChar, randomDelay);
        }
      };
      
      typeChar();
    }
  }, [isInView, started, fullText]);

  const renderHighlightedText = () => {
    let currentLength = 0;
    const elements = [];

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
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
    <div ref={containerRef} className="flex justify-center mb-8">
       <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md">
          <Braces size={14} className="text-zinc-400" />
          <div className="font-mono text-xs sm:text-sm whitespace-pre">
             {renderHighlightedText()}
             <span className="inline-block w-1.5 h-3 bg-primary-500 ml-1 align-middle animate-pulse"></span>
          </div>
       </div>
    </div>
  );
};


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const color = skillColors[data.category as SkillCategory];
    
    return (
      <div className="glass-card p-4 rounded-xl shadow-2xl z-50 min-w-[180px] border-l-4" style={{ borderLeftColor: color }}>
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-zinc-200 dark:border-zinc-700">
          <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color }}></div>
          <p className="font-bold text-zinc-900 dark:text-white text-sm font-mono">{data.name}</p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: color }}>{data.category}</p>
      </div>
    );
  }
  return null;
};

// Custom Label Component for ReferenceArea to ensure visibility
const AreaLabel = (props: any) => {
  const { viewBox, value, fill } = props;
  const { x, y, width } = viewBox;
  return (
    <text 
      x={x + width / 2} 
      y={y + 30} 
      fill={fill} 
      textAnchor="middle" 
      dominantBaseline="middle"
      style={{ 
        fontSize: '12px', 
        fontWeight: 'bold', 
        fontFamily: 'JetBrains Mono', 
        opacity: 0.6,
        letterSpacing: '0.1em',
        pointerEvents: 'none',
        textTransform: 'uppercase'
      }}
    >
      {value}
    </text>
  );
};

// Componente de Mapa de Pontos Abstrato (SVG)
const DottedMapBackground = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" className="fill-current text-zinc-900 dark:text-white" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#dotPattern)" />
    {/* Linhas de Conexão Abstratas */}
    <path d="M50 50 Q 150 150 250 50" stroke="currentColor" fill="none" className="text-zinc-900 dark:text-white opacity-10" />
    <path d="M200 200 Q 300 100 400 200" stroke="currentColor" fill="none" className="text-zinc-900 dark:text-white opacity-10" />
  </svg>
);

const SkillsDashboard: React.FC = () => {
  const [clicks, setClicks] = useState(0);
  const [showHyperspace, setShowHyperspace] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // State for filtering
  const { language } = useLanguage();

  // Load language specific data
  const currentClusterData = skillsClusterData[language];
  const currentMetrics = impactMetrics[language];
  const currentLocations = globalLocations[language];

  // Agrupar dados por categoria para a visualização mobile
  const categories = Array.from(new Set(currentClusterData.map(item => item.category)));

  // Mapear ícones para categorias
  const getCategoryIcon = (category: string) => {
    if (category.includes('Engenharia') || category.includes('Engineering')) return Database;
    if (category.includes('Science') || category.includes('AI')) return Brain;
    if (category.includes('Analytics') || category.includes('Viz')) return BarChart3;
    return Layers;
  };

  const handleTitleClick = () => {
    // Se já estiver ativo, clicar desativa (Toggle OFF)
    if (showHyperspace) {
      setShowHyperspace(false);
      setClicks(0);
      return;
    }

    // Contagem para ativar
    const newCount = clicks + 1;
    setClicks(newCount);
    
    // Ativar com 5 cliques
    if (newCount >= 5) {
      setShowHyperspace(true);
      setClicks(0);
    }
  };

  // Toggle filter logic
  const toggleCategory = (cat: string) => {
    setActiveCategory(prev => prev === cat ? null : cat);
  };

  return (
    <section id="skills" className="py-24 bg-zinc-50 dark:bg-darkbg relative overflow-hidden">
      
      {/* Hyperspace Mode Overlay */}
      <AnimatePresence>
        {showHyperspace && (
          <HyperspaceMode onClose={() => setShowHyperspace(false)} />
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-gradient-to-b from-primary-100 to-transparent dark:from-primary-900/20 dark:to-transparent rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
            title={language === 'pt' ? "Minhas Habilidades" : "My Skills"}
            subtitle="Analytics Dashboard" 
            onTitleClick={handleTitleClick}
        />
        
        {/* Insert Config Typer Effect */}
        <ConfigTyper />

        {/* TOP ROW: KEY ACHIEVEMENTS (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {currentMetrics.map((kpi, idx) => (
                <motion.div
                    key={kpi.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-6 rounded-2xl border ${kpi.border} ${kpi.bg} backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group`}
                >
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                        <kpi.icon size={80} className={kpi.color} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <kpi.icon size={20} className={kpi.color} />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">{kpi.suffix}</span>
                        </div>
                        <h4 className={`text-4xl font-black ${kpi.color} tracking-tight mb-1`}>
                            {kpi.value}
                        </h4>
                        <h5 className="font-bold text-zinc-800 dark:text-white text-sm mb-1">{kpi.label}</h5>
                        <p className="text-xs text-zinc-500 leading-snug">{kpi.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Section - Responsive Switch */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card rounded-2xl flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800 min-h-[500px] shadow-lg"
          >
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/80 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-md">
                   <Cpu size={16} className="text-zinc-500 dark:text-zinc-400" />
                </div>
                <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 font-mono tracking-tight">
                  SKILL_CLUSTER_ANALYSIS_V2
                </h3>
              </div>
              <div className="flex items-center gap-2">
                 <Filter size={14} className={`transition-colors ${activeCategory ? 'text-primary-500 animate-pulse' : 'text-zinc-400'}`} />
                 <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
                    {activeCategory ? `FILTER: ${activeCategory}` : 'ALL DATA'}
                 </span>
              </div>
            </div>

            <div className="flex-grow relative w-full bg-white/40 dark:bg-black/20 p-6">
              
              {/* DESKTOP VIEW: Scatter Chart */}
              <div className="hidden lg:block w-full h-full min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 50, right: 30, bottom: 40, left: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="#71717a" />
                    <ReferenceArea 
                      x1={-110} x2={0} y1={-10} y2={110} 
                      fill="#be123c" fillOpacity={0.02} 
                      label={<AreaLabel value="SOFT SKILLS" fill="#be123c" />}
                    />
                    <ReferenceArea 
                      x1={0} x2={110} y1={-10} y2={110} 
                      fill="#52525b" fillOpacity={0.03}
                      label={<AreaLabel value="HARD SKILLS" fill="#71717a" />}
                    />
                    <XAxis type="number" dataKey="x" domain={[-110, 110]} hide />
                    <YAxis type="number" dataKey="y" domain={[0, 110]} hide />
                    <ZAxis type="number" dataKey="z" range={[60, 300]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3', strokeOpacity: 0.3 }} content={<CustomTooltip />} isAnimationActive={false} />
                    <Legend 
                        verticalAlign="top" 
                        height={36} 
                        iconType="circle" 
                        wrapperStyle={{ fontSize: '11px', fontWeight: '600', paddingTop: '10px', fontFamily: 'JetBrains Mono', cursor: 'pointer' }}
                        onClick={(e) => toggleCategory(e.value)} 
                    />
                    <ReferenceLine x={0} stroke="#d4d4d8" strokeDasharray="4 4" strokeWidth={1} />
                    {Object.keys(skillColors).filter(cat => {
                        return currentClusterData.some(d => d.category === cat);
                    }).map((cat) => (
                      <Scatter 
                          key={cat} 
                          name={cat} 
                          data={currentClusterData.filter(d => d.category === cat)} 
                          fill={skillColors[cat as SkillCategory]} 
                          shape="circle"
                          isAnimationActive={false}
                          opacity={activeCategory && activeCategory !== cat ? 0.1 : 0.9} // Dim others
                          style={{ transition: 'opacity 0.3s ease' }}
                          cursor="pointer"
                          onClick={() => toggleCategory(cat)}
                      >
                           <LabelList 
                              dataKey="name" 
                              position="top" 
                              offset={8}
                              className="fill-zinc-600 dark:fill-zinc-400 font-semibold"
                              style={{ 
                                  fontSize: '9px', 
                                  opacity: activeCategory && activeCategory !== cat ? 0.1 : 0.9,
                                  fontFamily: 'JetBrains Mono, monospace',
                                  pointerEvents: 'none',
                                  textShadow: '0 1px 2px rgba(0,0,0,0.1)' 
                              }} 
                           />
                      </Scatter>
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* MOBILE VIEW: Categorized List (Chips) */}
              <div className="block lg:hidden space-y-6">
                {categories.map((category) => {
                  const CategoryIcon = getCategoryIcon(category as string);
                  const color = skillColors[category as SkillCategory];
                  const isActive = !activeCategory || activeCategory === category;
                  
                  return (
                    <motion.div 
                        key={category as string} 
                        className={`bg-white/60 dark:bg-zinc-900/50 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40 grayscale'}`}
                        onClick={() => toggleCategory(category as string)}
                    >
                       <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                          <div className="p-1.5 rounded-md" style={{ backgroundColor: `${color}20` }}>
                              <CategoryIcon size={16} style={{ color }} />
                          </div>
                          <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{category as string}</h4>
                       </div>
                       <div className="flex flex-wrap gap-2">
                          {currentClusterData.filter(item => item.category === category).map((skill, idx) => (
                             <span 
                                key={idx}
                                className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg border shadow-sm"
                                style={{ 
                                  backgroundColor: `${color}10`, // 10 = low opacity hex
                                  borderColor: `${color}30`,
                                  color: color
                                }}
                             >
                               {skill.name}
                             </span>
                          ))}
                       </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </motion.div>

          {/* Side Card - Global Collaboration & Tech Stack */}
          <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-6 h-full"
          >
              {/* Global Collaboration Card */}
              <div className="glass-card rounded-2xl overflow-hidden flex-grow border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl flex flex-col relative group hover:border-primary-500/20 transition-all">
                 {/* Decorative abstract map */}
                 <DottedMapBackground />
                 
                 <div className="relative z-10 px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-black/80 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                          <Globe2 size={16} className="text-primary-500" />
                          <h3 className="font-bold text-sm text-zinc-700 dark:text-zinc-200 tracking-tight">
                            {language === 'pt' ? 'Colaboração Global' : 'Global Collaboration'}
                          </h3>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Online</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                      {language === 'pt' ? 'Atuação em times alocados nos países' : 'Acting in teams allocated across countries'}
                    </p>
                 </div>
                 
                 <div className="relative z-10 p-3 flex-grow flex flex-col justify-center">
                    <div className="space-y-2">
                       {currentLocations.map((loc, idx) => (
                             <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/50 hover:border-primary-500/30 transition-all group/item hover:bg-white dark:hover:bg-zinc-800">
                                 <div className="flex items-center gap-3">
                                     {/* Flag/Icon Container */}
                                     <div className="w-10 h-10 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-lg shadow-sm group-hover/item:scale-110 transition-transform">
                                        {loc.flag}
                                     </div>
                                     
                                     <div>
                                         <h4 className="font-bold text-xs text-zinc-800 dark:text-zinc-200 leading-tight mb-0.5">
                                           {loc.city}, {loc.country}
                                         </h4>
                                         <div className="flex items-center gap-1.5">
                                            <Users size={10} className="text-zinc-400" />
                                            <span className="text-[10px] text-zinc-500 font-medium">{loc.role}</span>
                                         </div>
                                     </div>
                                 </div>
                                 
                                 <div className="flex flex-col items-end gap-1">
                                      <div className={`w-1.5 h-1.5 rounded-full ${loc.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} title={loc.status}></div>
                                      <MapPin size={10} className="text-zinc-300 dark:text-zinc-600" />
                                 </div>
                             </div>
                       ))}
                    </div>
                 </div>
                 
                 {/* Footer decoration */}
                 <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
              </div>

              {/* Tech Stack List - Redesigned for Better Visibility */}
              <div className="glass-card p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg relative overflow-hidden group hover:border-primary-500/20 transition-all">
                  {/* Decorative gradient blob */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors"></div>

                  <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                        <div className="p-2 bg-primary-500/10 rounded-lg text-primary-600 dark:text-primary-400">
                           <Code2 size={18} />
                        </div>
                        <div>
                           <h3 className="font-bold text-base text-zinc-900 dark:text-white leading-tight">
                              Tech Inventory
                           </h3>
                           <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                              Core Technologies & Frameworks
                           </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2.5">
                         {hardSkillsList.map((skill, idx) => (
                             <span 
                                key={idx} 
                                className="
                                    px-3 py-1.5 
                                    rounded-lg 
                                    bg-zinc-50 dark:bg-zinc-800/80 
                                    border border-zinc-200 dark:border-zinc-700 
                                    text-xs font-bold text-zinc-700 dark:text-zinc-300 
                                    hover:bg-primary-500 hover:text-white hover:border-primary-500 
                                    dark:hover:bg-primary-500 dark:hover:text-white dark:hover:border-primary-500
                                    transition-all duration-300 
                                    cursor-default
                                    shadow-sm
                                "
                             >
                                 {skill}
                             </span>
                         ))}
                      </div>
                  </div>
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsDashboard;