import React from 'react';
import { motion } from 'framer-motion';
import { Cat, Sword, Guitar, FlaskConical, Sigma, Telescope, TreeDeciduous } from 'lucide-react';
import { footerData } from '../data';
import { useLanguage } from '../context/LanguageContext';

// Ícone Customizado: Saudação Vulcana (Spock)
const VulcanSaluteIcon = ({ size = 24, strokeWidth = 1.5, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8 2a2 2 0 0 0-2 2v8l-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6l-2-2V3a2 2 0 0 0-2-2h-1.5a1 1 0 0 0-1 1v6a.5.5 0 0 1-1 0V3a1 1 0 0 0-1-1H8z" />
    <path d="M12 11v-1" /> {/* Separação dos dedos */}
  </svg>
);

interface FooterProps {
  onTriggerEffect?: (effectId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onTriggerEffect }) => {
  const { language } = useLanguage();
  const data = footerData[language];
  const socialLinks = footerData.socialLinks;
  const legalLinks = footerData.legalLinks;
  
  // Easter Eggs Configuration
  const easterEggs = [
    { 
      id: "starwars",
      icon: Sword, 
      color: "hover:text-red-500", // Cor Sith
      glow: "hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)]", // Efeito Neon/Sabre
      rotate: "group-hover:-rotate-45", // Gira para parecer segurando um sabre vertical
      delay: 0, 
      scale: 1.2 
    }, 
    { 
      id: "nerd",
      icon: VulcanSaluteIcon, 
      color: "hover:text-blue-400", 
      glow: "", 
      rotate: "group-hover:rotate-12", // Leve inclinação de saudação
      delay: 0.1, 
      scale: 1.1 
    },
    { id: "cats", icon: Cat, color: "hover:text-pink-400", glow: "", rotate: "", delay: 0.2, scale: 1.1 }, 
    { id: "nature", icon: TreeDeciduous, color: "hover:text-green-500", glow: "", rotate: "group-hover:rotate-3", delay: 0.3, scale: 1.1 },
    { id: "astronomy", icon: Telescope, color: "hover:text-indigo-400", glow: "", rotate: "group-hover:-rotate-12", delay: 0.4, scale: 1.1 }, 
    { id: "science", icon: FlaskConical, color: "hover:text-emerald-400", glow: "", rotate: "", delay: 0.5, scale: 1.1 }, 
    { id: "math", icon: Sigma, color: "hover:text-cyan-400", glow: "", rotate: "", delay: 0.6, scale: 1.1 }, 
    { id: "music", icon: Guitar, color: "hover:text-amber-500", glow: "", rotate: "group-hover:rotate-6", delay: 0.7, scale: 1.1 }, 
  ];

  const handleIconClick = (id: string) => {
    if (onTriggerEffect) {
      onTriggerEffect(id);
    }
  };

  return (
    <footer id="contact" className="bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8 relative overflow-hidden">
      
      {/* --- BACKGROUND DECORATION (ATOM & DOTS) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Padrão de Pontos (Dots Pattern) - Sutil */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
          style={{ 
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', 
              backgroundSize: '20px 20px',
              // Fade out nas bordas para misturar com o bg
              maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
          }}
        ></div>

        {/* O Átomo Centralizado */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.04] dark:opacity-[0.06]">
           {/* Anel Externo - Lento */}
           <div className="absolute inset-0 border border-zinc-900 dark:border-white rounded-full animate-[spin_60s_linear_infinite]"></div>
           
           {/* Anel Médio - Tracejado - Velocidade Média - Inverso */}
           <div className="absolute inset-[15%] border border-dashed border-zinc-900 dark:border-white rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
           
           {/* Anel Interno - Pontilhado - Rápido */}
           <div className="absolute inset-[30%] border-2 border-dotted border-zinc-900 dark:border-white rounded-full animate-[spin_20s_linear_infinite]"></div>
           
           {/* Núcleo Sutil */}
           <div className="absolute inset-[48%] bg-zinc-900 dark:bg-white rounded-full blur-3xl opacity-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight relative inline-block">
                {data.title}
                {/* Decorative underline */}
                <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary-500 rounded-full"></span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-sm font-light leading-relaxed">
              {data.description}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                 return (
                  <a 
                    key={index} 
                    href={social.href} 
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-primary-500 hover:text-white hover:border-primary-500 dark:hover:bg-primary-500 dark:hover:text-white dark:hover:border-primary-500 transition-all duration-300 shadow-sm hover:scale-110"
                  >
                    <social.icon size={20} />
                  </a>
                 );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                {language === 'pt' ? 'Navegação' : 'Navigation'}
            </h3>
            <ul className="space-y-2">
              {data.navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors hover:translate-x-1 inline-block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h3 className="font-bold text-zinc-900 dark:text-white mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                {language === 'pt' ? 'Contato' : 'Contact'}
             </h3>
             <ul className="space-y-3">
               <li className="text-zinc-600 dark:text-zinc-400 text-sm hover:text-zinc-900 dark:hover:text-white transition-colors cursor-default">
                  {data.email}
               </li>
               <li className="text-zinc-600 dark:text-zinc-400 text-sm hover:text-zinc-900 dark:hover:text-white transition-colors cursor-default">
                  {data.location}
               </li>
             </ul>
          </div>

        </div>

        {/* Easter Eggs Row - Personal Side */}
        <div className="py-8 flex justify-center items-center gap-6 md:gap-8 border-t border-zinc-100 dark:border-zinc-900/50">
           {easterEggs.map((item, idx) => (
             <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
                whileHover={{ y: -5, scale: item.scale }}
                onClick={() => handleIconClick(item.id)}
                className={`group relative text-zinc-300 dark:text-zinc-700 transition-all duration-300 cursor-pointer ${item.color} ${item.glow}`}
                title="Clique para ativar o efeito!"
             >
                <div className={`transition-transform duration-300 ${item.rotate}`}>
                   <item.icon size={24} strokeWidth={1.5} />
                </div>
             </motion.div>
           ))}
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-zinc-500 dark:text-zinc-600 text-xs md:text-sm font-mono">
            © {new Date().getFullYear()} Samuel Amorim. {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link, idx) => (
              <a key={idx} href={link.href} className="text-zinc-400 text-xs md:text-sm hover:text-primary-500 transition-colors font-mono">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;