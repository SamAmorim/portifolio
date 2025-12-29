import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContactBalloon: React.FC = () => {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const text = language === 'pt' ? "Vamos conversar?" : "Let's talk?";

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Adiciona um highlight temporário nos ícones sociais do footer
      setTimeout(() => {
         const footer = document.querySelector('footer');
         if(footer) {
             footer.classList.add('ring-2', 'ring-primary-500', 'transition-all', 'duration-500');
             setTimeout(() => footer.classList.remove('ring-2', 'ring-primary-500'), 1500);
         }
      }, 800);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 flex items-center justify-end"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        onClick={scrollToContact}
        layout
        className="group flex items-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(225,29,72,0.4)] transition-shadow duration-300 relative overflow-hidden"
      >
        {/* Glow Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon */}
        <div className="relative z-10">
            <MessageSquareText size={24} className="group-hover:scale-110 transition-transform duration-300" />
            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500 border-2 border-zinc-900 dark:border-white"></span>
            </span>
        </div>

        {/* Text Expansion */}
        <AnimatePresence>
            {isHovered && (
                <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="relative z-10 whitespace-nowrap font-bold text-sm overflow-hidden"
                >
                    <span className="pl-1 pr-2">{text}</span>
                </motion.span>
            )}
        </AnimatePresence>

      </motion.button>
    </motion.div>
  );
};

export default ContactBalloon;