import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { Table2, ArrowDown, Key, Terminal } from 'lucide-react';
import { timelineData } from '../data';
import { useLanguage } from '../context/LanguageContext';

// Função auxiliar para criar nomes de tabela estilo SQL
const toSnakeCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]+/g, '');
};

const DatabaseTable: React.FC<{ item: any, index: number, isLast: boolean }> = ({ item, index, isLast }) => {
  return (
    <div className="flex flex-col items-center relative z-10 w-full">
      
      {/* ER Diagram Entity (Table) - Visual Limpo e Técnico */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-full max-w-2xl bg-white dark:bg-[#0c0c0c] border border-zinc-200 dark:border-zinc-800 shadow-xl dark:shadow-none rounded-xl flex flex-col overflow-hidden group hover:border-primary-500/40 transition-all duration-300"
      >
        {/* Table Header - Schema Style */}
        <div className="bg-zinc-50 dark:bg-zinc-900/50 px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate">
                <Table2 size={15} className="text-primary-600 dark:text-primary-500 flex-shrink-0" />
                <span className="truncate">dbo.{toSnakeCase(item.company)}</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono flex-shrink-0 ml-2 px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800/80">
                <span className="font-bold">PK:</span> id
            </div>
        </div>

        {/* Table Content (Rows) - Com Scroll Horizontal para Mobile */}
        <div className="overflow-x-auto">
          <div className="font-mono text-xs min-w-[500px]">
              {/* Header Columns Definition */}
              <div className="grid grid-cols-12 border-b border-zinc-100 dark:border-zinc-800/50 bg-white dark:bg-black/20 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  <div className="col-span-1 py-2 text-center border-r border-zinc-100 dark:border-zinc-800/50">PK</div>
                  <div className="col-span-3 py-2 px-4 border-r border-zinc-100 dark:border-zinc-800/50">Column</div>
                  <div className="col-span-2 py-2 px-4 border-r border-zinc-100 dark:border-zinc-800/50">Type</div>
                  <div className="col-span-6 py-2 px-4">Value</div>
              </div>

              {/* Row 1: ID */}
              <div className="grid grid-cols-12 border-b border-zinc-50 dark:border-zinc-800/30 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                  <div className="col-span-1 py-3 flex justify-center items-center border-r border-zinc-50 dark:border-zinc-800/30 text-amber-500">
                      <Key size={12} />
                  </div>
                  <div className="col-span-3 py-3 px-4 border-r border-zinc-50 dark:border-zinc-800/30 font-semibold text-zinc-700 dark:text-zinc-300">
                      id
                  </div>
                  <div className="col-span-2 py-3 px-4 border-r border-zinc-50 dark:border-zinc-800/30 text-zinc-400">
                      int
                  </div>
                  <div className="col-span-6 py-3 px-4 text-blue-600 dark:text-blue-400 font-bold">
                      {item.id}
                  </div>
              </div>

              {/* Row 2: Role (Cargo) */}
              <div className="grid grid-cols-12 border-b border-zinc-50 dark:border-zinc-800/30 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                  <div className="col-span-1 py-3 border-r border-zinc-50 dark:border-zinc-800/30"></div>
                  <div className="col-span-3 py-3 px-4 border-r border-zinc-50 dark:border-zinc-800/30 font-semibold text-zinc-700 dark:text-zinc-300">
                      role
                  </div>
                  <div className="col-span-2 py-3 px-4 border-r border-zinc-50 dark:border-zinc-800/30 text-zinc-400">
                      varchar
                  </div>
                  <div className="col-span-6 py-3 px-4 text-emerald-600 dark:text-emerald-500 font-medium">
                      "{item.title}"
                  </div>
              </div>

              {/* Row 3: Period (Período) */}
              <div className="grid grid-cols-12 border-b border-zinc-50 dark:border-zinc-800/30 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                  <div className="col-span-1 py-3 border-r border-zinc-50 dark:border-zinc-800/30"></div>
                  <div className="col-span-3 py-3 px-4 border-r border-zinc-50 dark:border-zinc-800/30 font-semibold text-zinc-700 dark:text-zinc-300">
                      period
                  </div>
                  <div className="col-span-2 py-3 px-4 border-r border-zinc-50 dark:border-zinc-800/30 text-zinc-400">
                      date
                  </div>
                  <div className="col-span-6 py-3 px-4 text-purple-600 dark:text-purple-400">
                      {item.year}
                  </div>
              </div>

              {/* Row 4: Description (Descrição) */}
              <div className="grid grid-cols-12 border-b border-zinc-50 dark:border-zinc-800/30 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                  <div className="col-span-1 py-3 border-r border-zinc-50 dark:border-zinc-800/30"></div>
                  <div className="col-span-3 py-3 px-4 border-r border-zinc-50 dark:border-zinc-800/30 font-semibold text-zinc-700 dark:text-zinc-300">
                      description
                  </div>
                  <div className="col-span-2 py-3 px-4 border-r border-zinc-50 dark:border-zinc-800/30 text-zinc-400">
                      text
                  </div>
                  <div className="col-span-6 py-3 px-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px] whitespace-normal">
                      {item.description}
                  </div>
              </div>

              {/* Row 5: Tech Stack */}
              <div className="grid grid-cols-12 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                  <div className="col-span-1 py-3 border-r border-zinc-50 dark:border-zinc-800/30"></div>
                  <div className="col-span-3 py-3 px-4 border-r border-zinc-50 dark:border-zinc-800/30 font-semibold text-zinc-700 dark:text-zinc-300">
                      stack
                  </div>
                  <div className="col-span-2 py-3 px-4 border-r border-zinc-50 dark:border-zinc-800/30 text-zinc-400">
                      json
                  </div>
                  <div className="col-span-6 py-3 px-4">
                      <div className="flex flex-wrap gap-1.5">
                          {item.skills.slice(0, 4).map((s: string, i: number) => (
                              <span key={i} className="text-[10px] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900">{s}</span>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </motion.div>

      {/* Connector */}
      {!isLast && (
        <div className="h-16 flex flex-col items-center justify-start relative">
            <div className="w-px h-full bg-zinc-300 dark:bg-zinc-800 relative"></div>
            <ArrowDown size={14} className="text-zinc-300 dark:text-zinc-700 absolute bottom-0" />
            <div className="absolute top-1/2 left-1/2 ml-3 -translate-y-1/2 bg-white dark:bg-[#080808] px-1 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-400 font-bold">1:1</span>
            </div>
        </div>
      )}
    </div>
  );
};

// --- COMPONENTE DE DIGITAÇÃO SEQUENCIAL COM SYNTAX HIGHLIGHTING ---
const SQLTyper = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  
  // Segmentos do comando SQL com suas classes de cor
  const segments = [
    { text: "SELECT", className: "text-primary-600 dark:text-primary-400 font-bold" },
    { text: " *", className: "text-zinc-600 dark:text-zinc-300 font-bold" },
    { text: " FROM", className: "text-primary-600 dark:text-primary-400 font-bold" },
    { text: " professional_journey", className: "text-emerald-600 dark:text-emerald-500 font-semibold" },
    { text: " ORDER BY", className: "text-primary-600 dark:text-primary-400 font-bold" },
    { text: " date", className: "text-blue-600 dark:text-blue-400" },
    { text: " DESC", className: "text-primary-600 dark:text-primary-400 font-bold" },
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
          
          // Velocidade variável para realismo (20ms - 60ms)
          const randomDelay = 30 + Math.random() * 40;
          setTimeout(typeChar, randomDelay);
        }
      };
      
      typeChar();
    }
  }, [isInView, started, fullText]);

  // Renderização inteligente: Quebra o texto digitado de volta nos segmentos coloridos
  const renderHighlightedText = () => {
    let currentLength = 0;
    const elements = [];

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const segmentLength = segment.text.length;
      
      // Se já passamos todo esse segmento, renderiza ele inteiro
      if (displayedText.length >= currentLength + segmentLength) {
        elements.push(
          <span key={i} className={segment.className}>{segment.text}</span>
        );
      } 
      // Se estamos no meio deste segmento, renderiza parcialmente
      else if (displayedText.length > currentLength) {
        const sliceEnd = displayedText.length - currentLength;
        elements.push(
          <span key={i} className={segment.className}>{segment.text.slice(0, sliceEnd)}</span>
        );
        // O cursor está aqui, então paramos
        break; 
      }
      
      currentLength += segmentLength;
    }

    return elements;
  };

  return (
    <div ref={containerRef} className="whitespace-pre flex items-center min-h-[24px]">
      {renderHighlightedText()}
      {/* Cursor Piscante */}
      <span className="inline-block w-2 h-4 bg-primary-500 ml-1 align-middle animate-pulse"></span>
    </div>
  );
};

const Timeline: React.FC = () => {
  const { language } = useLanguage();
  const data = timelineData[language];

  return (
    <section id="experience" className="py-24 bg-zinc-50 dark:bg-[#080808] border-t border-zinc-200 dark:border-zinc-900">
      <div className="container mx-auto px-6">
        <SectionHeading 
            title={language === 'pt' ? "Jornada Profissional" : "Professional Journey"} 
            subtitle={language === 'pt' ? "Pipeline de Carreira (ETL)" : "Career Pipeline (ETL)"}
        />

        <div className="flex justify-center mb-16">
            {/* SQL Select Statement Header (Interactive) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg dark:shadow-none font-mono text-xs sm:text-sm overflow-x-auto max-w-full"
            >
                <Terminal size={14} className="text-zinc-400 mr-2 flex-shrink-0" />
                
                {/* Componente de Digitação Sequencial */}
                <SQLTyper />
            </motion.div>
        </div>

        <div className="relative max-w-3xl mx-auto flex flex-col items-center">
          {data.map((item, index) => (
            <DatabaseTable 
              key={item.id} 
              item={item} 
              index={index} 
              isLast={index === data.length - 1} 
            />
          ))}
          
          {/* End of Stream */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mt-2"
          >
             <div className="h-8 w-px bg-dashed bg-zinc-300 dark:bg-zinc-700"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;