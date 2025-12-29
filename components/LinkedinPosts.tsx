import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { linkedinPostsData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { Share2, ExternalLink, Play } from 'lucide-react';

// Componente de Efeito de Digitação Python (Estilo VS Code)
const PythonTyper = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  
  // Segmentos do código para Syntax Highlighting
  const codeLines = [
    { text: "import ", className: "text-purple-400 font-bold" },
    { text: "pandas ", className: "text-zinc-100" },
    { text: "as ", className: "text-purple-400 font-bold" },
    { text: "pd", className: "text-zinc-100" },
    { text: "\n", className: "" },
    { text: "# Loading high-impact content...", className: "text-zinc-500 italic" },
    { text: "\n", className: "" },
    { text: "df = pd.read_csv(", className: "text-zinc-100" },
    { text: "'linkedin_insights.csv'", className: "text-emerald-400" },
    { text: ")", className: "text-zinc-100" },
    { text: "\n", className: "" },
    { text: "print", className: "text-yellow-300" },
    { text: "(", className: "text-zinc-100" },
    { text: "df.nlargest(3, 'engagement')", className: "text-zinc-100" },
    { text: ")", className: "text-zinc-100" },
  ];

  const fullText = codeLines.map(l => l.text).join("");

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      let currentIndex = 0;
      
      const typeChar = () => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
          // Velocidade de digitação variável para realismo
          const randomDelay = 30 + Math.random() * 40; 
          setTimeout(typeChar, randomDelay);
        }
      };
      
      typeChar();
    }
  }, [isInView, started, fullText]);

  const renderHighlightedText = () => {
    let currentLength = 0;
    const elements = [];

    for (let i = 0; i < codeLines.length; i++) {
      const segment = codeLines[i];
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mb-16 rounded-lg bg-[#1e1e1e] border border-zinc-700 shadow-2xl overflow-hidden font-mono text-sm md:text-base relative group"
    >
        {/* Efeito de Glow sutil no hover */}
        <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

        {/* Header do Editor */}
        <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-zinc-700">
            <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <span className="text-xs text-zinc-400 font-medium">analysis.py</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Python 3.10</span>
                <Play size={10} className="text-emerald-500 fill-emerald-500 animate-pulse" />
            </div>
        </div>
        
        {/* Área de Código */}
        <div className="p-5 text-left bg-[#1e1e1e]">
            <pre className="whitespace-pre-wrap font-mono leading-relaxed text-zinc-300">
                {renderHighlightedText()}
                <span className="inline-block w-2 h-4 bg-primary-500 ml-1 align-middle animate-pulse"></span>
            </pre>
        </div>
    </motion.div>
  );
}

const LinkedinPosts: React.FC = () => {
  const { language } = useLanguage();
  const data = linkedinPostsData[language];

  if (!data || data.length === 0) return null;

  return (
    <section id="posts" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-6">
        <SectionHeading 
            title={language === 'pt' ? "Publicações em Destaque" : "Featured Insights"}
            subtitle={language === 'pt' ? "Feed de Transmissão" : "Transmission Feed"} 
        />

        {/* Inserindo o efeito de digitação Python antes dos posts */}
        <PythonTyper />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {data.map((post, index) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col h-full"
                >
                    {/* Window Header (Terminal/Browser Style) */}
                    <div className="bg-zinc-200 dark:bg-zinc-800 rounded-t-xl px-4 py-2 flex items-center justify-between border-x border-t border-zinc-300 dark:border-zinc-700">
                        <div className="flex items-center gap-2">
                             <Share2 size={14} className="text-primary-500" />
                             <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 font-bold uppercase truncate max-w-[150px]">
                                {post.title}
                             </span>
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600"></div>
                            <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600"></div>
                        </div>
                    </div>

                    {/* Iframe Container */}
                    <div className="bg-white dark:bg-white rounded-b-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-lg relative h-[600px] w-full">
                        {/* Loading/Background Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 animate-pulse z-0">
                            <span className="text-zinc-400 font-mono text-xs">Loading external resource...</span>
                        </div>

                        <iframe 
                            src={post.embedUrl} 
                            height="100%" 
                            width="100%" 
                            title={post.title}
                            className="relative z-10 w-full h-full border-none"
                            loading="lazy"
                        ></iframe>
                    </div>

                    {/* Footer / Fallback Link */}
                    <div className="mt-2 text-center">
                        <a 
                           href="https://www.linkedin.com/in/samamorim/recent-activity/all/" 
                           target="_blank" 
                           rel="noreferrer"
                           className="text-[10px] text-zinc-400 hover:text-primary-500 transition-colors inline-flex items-center gap-1"
                        >
                            View on LinkedIn <ExternalLink size={10} />
                        </a>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default LinkedinPosts;