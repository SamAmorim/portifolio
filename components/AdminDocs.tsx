import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, FileJson, Layers, Terminal, Lock, Layout, BarChart3, Briefcase, GraduationCap, Share2, Info, AlertTriangle, Code2 } from 'lucide-react';

interface AdminDocsProps {
  onClose: () => void;
}

const CodeBlock = ({ children, label }: { children?: React.ReactNode; label?: string }) => (
  <div className="my-3 rounded-lg bg-[#1e1e1e] border border-zinc-700 overflow-hidden text-left shadow-inner">
    {label && (
      <div className="bg-[#2d2d2d] px-3 py-1.5 text-[10px] font-mono text-zinc-400 border-b border-zinc-700 flex justify-between items-center">
        <span>{label}</span>
        <span className="text-[9px] uppercase tracking-widest opacity-50">JSON / TSX</span>
      </div>
    )}
    <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed custom-scrollbar">
      <code>{children}</code>
    </pre>
  </div>
);

const Section = ({ title, icon: Icon, color, children }: { title: string; icon: React.ElementType; color: string; children?: React.ReactNode }) => (
  <div className={`mb-10 border-l-2 ${color} pl-6 relative`}>
    <div className="flex items-center gap-2 mb-4">
      <div className={`p-1.5 rounded-md ${color.replace('border-', 'bg-').replace('500', '500/10')} ${color.replace('border-', 'text-').replace('500', '500')}`}>
        <Icon size={18} />
      </div>
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-tight">{title}</h3>
    </div>
    <div className="text-zinc-600 dark:text-zinc-400 space-y-3 leading-relaxed text-sm">
      {children}
    </div>
  </div>
);

const AdminDocs: React.FC<AdminDocsProps> = ({ onClose }) => {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Window */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3">
             <div className="bg-primary-500/10 p-2 rounded-lg text-primary-500">
                <Terminal size={20} />
             </div>
             <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-mono leading-none">
                   DEV_MANUAL.md
                </h2>
                <p className="text-[10px] text-zinc-500 font-mono mt-1">Guia de Edição & Manutenção do Portfólio</p>
             </div>
          </div>
          <button 
             onClick={onClose}
             className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors group"
             title="Fechar"
          >
             <X size={20} className="text-zinc-500 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar bg-zinc-50 dark:bg-[#050505]">
          
          {/* Intro Warning */}
          <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg mb-10 flex gap-4 items-start">
            <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
            <div>
               <h4 className="font-bold text-blue-500 text-sm mb-1">Cérebro do Sistema: data.tsx</h4>
               <p className="text-sm text-zinc-500 dark:text-zinc-400">
                 Todo o conteúdo deste site é controlado pelo arquivo <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono text-primary-500">src/data.tsx</code>. 
                 Não é necessário editar HTML ou componentes React para alterar textos, imagens ou gráficos.
                 Abaixo está o guia detalhado de cada variável exportada.
               </p>
            </div>
          </div>

          {/* 1. HERO SECTION */}
          <Section title="1. Hero Section (Topo)" icon={Layout} color="border-blue-500">
             <p>A constante <code>heroData</code> controla a apresentação inicial.</p>
             <ul className="list-disc list-inside ml-2 space-y-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <li><strong>logoName/Surname:</strong> O nome no topo esquerdo e no centro.</li>
                <li><strong>openToWork:</strong> Boolean (<code>true/false</code>). Exibe o badge "Available for Hire".</li>
                <li><strong>heroImage:</strong> URL da imagem central (formato Retrato/Vertical funciona melhor).</li>
                <li><strong>floatCard1/2:</strong> Os cards flutuantes ao redor da foto. Use ícones do pacote <code>lucide-react</code>.</li>
             </ul>
             <CodeBlock label="Exemplo heroData">
{`export const heroData = {
  pt: {
    logoName: "Seu",
    logoSurname: "Nome",
    openToWork: true,
    title: "Título Principal",
    description: <>Pode usar HTML como <strong>Negrito</strong> aqui.</>,
    // ...
  },
  // ... versão en
};`}
             </CodeBlock>
          </Section>

          {/* 2. SKILLS CHART */}
          <Section title="2. Gráfico de Skills (Cluster)" icon={BarChart3} color="border-teal-500">
             <p>A parte mais complexa visualmente. Controlada por <code>skillsClusterData</code> e <code>skillColors</code>.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded border border-zinc-200 dark:border-zinc-800">
                    <h5 className="font-bold text-xs uppercase text-zinc-500 mb-2">Entendendo os Eixos (X, Y, Z)</h5>
                    <ul className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                        <li><strong>X (Horizontal):</strong> <span className="text-red-500">-100 (Soft Skills)</span> a <span className="text-zinc-500">100 (Hard Skills)</span>.</li>
                        <li><strong>Y (Vertical):</strong> <span className="text-zinc-500">0 (Base/Teórico)</span> a <span className="text-blue-500">100 (Aplicado/Visual)</span>.</li>
                        <li><strong>Z (Profundidade):</strong> Tamanho da bolha. Use entre <code>80</code> (Pequeno) e <code>120</code> (Grande destaque).</li>
                    </ul>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded border border-zinc-200 dark:border-zinc-800">
                    <h5 className="font-bold text-xs uppercase text-zinc-500 mb-2">Categorias</h5>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        O campo <code>category</code> deve corresponder <strong>exatamente</strong> às chaves definidas em <code>skillColors</code>. Se errar uma letra, a cor não carrega.
                    </p>
                </div>
             </div>

             <CodeBlock label="Adicionar Nova Skill">
{`{ 
  name: 'Nova Skill', 
  x: 50, // Lado Direito (Hard Skill)
  y: 80, // Topo (Alta visibilidade)
  z: 100, // Tamanho médio
  category: 'Engenharia de Dados' // Deve existir em skillColors
},`}
             </CodeBlock>
          </Section>

          {/* 3. TIMELINE (EXPERIÊNCIA) */}
          <Section title="3. Timeline (Carreira)" icon={Briefcase} color="border-purple-500">
             <p>Controlada por <code>timelineData</code>. O visual simula uma tabela de banco de dados SQL.</p>
             <CodeBlock label="Novo Item de Experiência">
{`{
  id: 3, // Incremental
  year: '2023 - 2024',
  title: 'Senior Data Analyst',
  company: 'Empresa X',
  description: 'Descrição das atividades...',
  skills: ['SQL', 'Python', 'AWS'] // Tags coloridas que aparecem na linha "Stack"
},`}
             </CodeBlock>
          </Section>

          {/* 4. EDUCATION (FORMAÇÃO) */}
          <Section title="4. Formação Acadêmica" icon={GraduationCap} color="border-amber-500">
             <p>Controlada por <code>educationData</code>. O campo <code>type</code> define o ícone.</p>
             <p className="text-xs mt-2">Valores válidos para <code>type</code>: 'Bachelor', 'MBA', 'Master', 'PhD', 'Bootcamp'.</p>
             <p className="text-xs">Valores válidos para <code>status</code>: 'Completed', 'In Progress', 'Planned'.</p>
          </Section>

          {/* 5. PROJETOS (PORTFÓLIO) */}
          <Section title="5. Projetos (Portfolio)" icon={Layers} color="border-red-500">
             <p>A seção mais importante. Controlada por <code>projectsData</code>.</p>
             
             <div className="bg-red-500/5 border-l-4 border-red-500 p-3 my-3">
                <p className="text-xs font-bold text-red-500">IMPORTANTE: Sincronia de IDs</p>
                <p className="text-xs text-zinc-500">
                    Ao adicionar um projeto, você deve adicioná-lo na lista <code>pt</code> E na lista <code>en</code> com o <strong>MESMO ID</strong>. 
                    O sistema usa o ID para manter o modal aberto se o usuário trocar de idioma.
                </p>
             </div>

             <CodeBlock label="Estrutura Completa de Projeto">
{`{
  id: 99,
  title: "Nome do Projeto",
  subtitle: "Uma frase de efeito curta",
  category: "Machine Learning", // Etiqueta no card
  status: "Completed",
  date: "Jan 2025",
  image: "https://...", // URL da imagem de capa (Wide)
  gallery: [
    "https://...", // Imagem 1 da galeria
    "https://..."  // Imagem 2 da galeria
  ],
  description: "Resumo curto para o card na home.",
  problem: "Texto longo explicando o desafio de negócio...",
  solution: "Texto longo explicando a solução técnica...",
  // Métricas que aparecem em destaque no modal
  impactMetrics: [
    { label: 'Acurácia', value: '99%' },
    { label: 'ROI', value: '$ 50k' }
  ],
  tags: ['Python', 'Docker', 'AWS'], // Tags laterais
  repoUrl: "https://github.com...", // Botão Código
  liveUrl: "https://...", // Botão Demo
  docsUrl: "https://..." // Botão Docs
},`}
             </CodeBlock>
          </Section>

          {/* 6. LINKEDIN POSTS */}
          <Section title="6. LinkedIn Embeds" icon={Share2} color="border-indigo-500">
             <p>Exibe seus posts em destaque. Controlado por <code>linkedinPostsData</code>.</p>
             <p className="mb-2"><strong>Como pegar o link correto:</strong></p>
             <ol className="list-decimal list-inside ml-2 space-y-1 text-xs font-mono text-zinc-500">
                <li>Vá no post do LinkedIn.</li>
                <li>Clique nos três pontos (...) no canto superior direito do post.</li>
                <li>Selecione <strong>"Incorporar essa publicação" (Embed this post)</strong>.</li>
                <li>No código gerado, procure por <code>src=""</code>. Copie APENAS a URL dentro das aspas.</li>
                <li>A URL deve se parecer com: <code>https://www.linkedin.com/embed/feed/update/urn:li:share:...</code></li>
             </ol>
          </Section>

          {/* 7. ÍCONES E ASSETS */}
          <Section title="7. Ícones & Imagens" icon={Code2} color="border-zinc-500">
             <p><strong>Ícones:</strong> O projeto usa a biblioteca <a href="https://lucide.dev/icons" target="_blank" className="text-primary-500 underline">Lucide React</a>.</p>
             <p className="mt-2">Para usar um novo ícone:</p>
             <ol className="list-decimal list-inside ml-2 space-y-1 text-xs font-mono text-zinc-500">
                <li>Importe no topo do <code>data.tsx</code>: <code>import {'{ NomeDoIcone }'} from 'lucide-react';</code></li>
                <li>Use o nome do ícone (sem aspas) nos campos que pedem ícone (ex: <code>icon: NomeDoIcone</code>).</li>
             </ol>
             <p className="mt-4"><strong>Imagens:</strong></p>
             <p className="text-xs text-zinc-500">
                Use URLs diretas (https://...). Para imagens locais, coloque na pasta <code>public/</code> e use o caminho <code>/nome-da-imagem.jpg</code>.
                Recomenda-se usar Unsplash ou hospedar no próprio GitHub/LinkedIn para performance.
             </p>
          </Section>

          {/* GAMIFICATION */}
          <Section title="Easter Eggs & Segredos" icon={Lock} color="border-pink-500">
             <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                 <p className="text-xs font-mono mb-3 text-zinc-500">
                    O site possui gatilhos secretos baseados em digitação (teclado) em qualquer lugar da tela.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-1">
                        <span className="font-bold text-pink-500">"goat"</span>
                        <span className="text-xs">Modo Ozzy Osbourne (Som + Visual)</span>
                     </div>
                     <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-1">
                        <span className="font-bold text-red-500">"dragon"</span>
                        <span className="text-xs">Dragão voando + Terremoto</span>
                     </div>
                     <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-1">
                        <span className="font-bold text-emerald-500">"nature"</span>
                        <span className="text-xs">Modo Selva (Cipós + Som)</span>
                     </div>
                     <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-1">
                        <span className="font-bold text-blue-500">Konami Code</span>
                        <span className="text-xs">↑ ↑ ↓ ↓ ← → ← → B A (Doom Fire)</span>
                     </div>
                 </div>
             </div>
          </Section>

        </div>
      </motion.div>
    </div>
  );
};

export default AdminDocs;